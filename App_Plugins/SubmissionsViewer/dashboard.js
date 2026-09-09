import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

export default class SubmissionsDashboard extends UmbElementMixin(LitElement) {
    static properties = {
        activeTab: { type: String },
        contacts: { type: Array },
        newsletters: { type: Array },
        loading: { type: Boolean },
        filterText: { type: String },
        selectedContact: { type: Object }
    };

    constructor() {
        super();
        this.activeTab = "contacts";
        this.contacts = [];
        this.newsletters = [];
        this.loading = false;
        this.filterText = "";
        this.selectedContact = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this.loadData();
    }

    async loadData() {
        this.loading = true;
        try {
            const [contactsRes, newsRes] = await Promise.all([
                fetch("/umbraco/api/submissions/contacts", { credentials: "include" }),
                fetch("/umbraco/api/submissions/newsletters", { credentials: "include" })
            ]);

            if (contactsRes.ok) {
                this.contacts = await contactsRes.json();
            }
            if (newsRes.ok) {
                this.newsletters = await newsRes.json();
            }
        } catch (err) {
            console.error("Hiba a megkeresések betöltésekor:", err);
        } finally {
            this.loading = false;
        }
    }

    async toggleRead(id, e) {
        if (e) e.stopPropagation();
        try {
            const res = await fetch(`/umbraco/api/submissions/contacts/${id}/toggle-read`, {
                method: "POST",
                credentials: "include"
            });
            if (res.ok) {
                this.contacts = this.contacts.map(c => c.id === id ? { ...c, isRead: !c.isRead } : c);
                if (this.selectedContact && this.selectedContact.id === id) {
                    this.selectedContact = { ...this.selectedContact, isRead: !this.selectedContact.isRead };
                }
            }
        } catch (err) {
            console.error("Hiba a státusz módosításakor:", err);
        }
    }

    async deleteContact(id, e) {
        if (e) e.stopPropagation();
        if (!confirm("Biztosan törölni szeretné ezt a megkeresést?")) return;

        try {
            const res = await fetch(`/umbraco/api/submissions/contacts/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (res.ok) {
                this.contacts = this.contacts.filter(c => c.id !== id);
                if (this.selectedContact && this.selectedContact.id === id) {
                    this.selectedContact = null;
                }
            }
        } catch (err) {
            console.error("Hiba a törlés során:", err);
        }
    }

    openModal(contact) {
        this.selectedContact = contact;
        if (!contact.isRead) {
            this.toggleRead(contact.id);
        }
    }

    closeModal() {
        this.selectedContact = null;
    }

    exportCsv() {
        window.location.href = "/umbraco/api/submissions/newsletters/export";
    }

    formatDate(dateStr) {
        if (!dateStr) return "";
        try {
            const d = new Date(dateStr);
            return d.toLocaleString("hu-HU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch {
            return dateStr;
        }
    }

    render() {
        const unreadCount = this.contacts.filter(c => !c.isRead).length;
        const q = (this.filterText || "").toLowerCase().trim();

        const filteredContacts = this.contacts.filter(c => {
            if (!q) return true;
            return (c.name && c.name.toLowerCase().includes(q)) ||
                   (c.email && c.email.toLowerCase().includes(q)) ||
                   (c.company && c.company.toLowerCase().includes(q)) ||
                   (c.message && c.message.toLowerCase().includes(q));
        });

        const filteredNews = this.newsletters.filter(n => {
            if (!q) return true;
            return n.email && n.email.toLowerCase().includes(q);
        });

        return html`
            <div class="dashboard-wrapper">
                <!-- Header -->
                <div class="header">
                    <div>
                        <h1 class="title">Űrlapok és Megkeresések</h1>
                        <p class="subtitle">A weboldal kapcsolatfelvételi űrlapján és hírlevelén keresztül érkező adatok</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" @click=${this.loadData}>
                            ${this.loading ? "Betöltés..." : "↻ Frissítés"}
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="stats-row">
                    <div class="stat-card">
                        <span class="stat-label">Összes megkeresés</span>
                        <span class="stat-value">${this.contacts.length}</span>
                    </div>
                    <div class="stat-card ${unreadCount > 0 ? 'highlight' : ''}">
                        <span class="stat-label">Új / Olvasatlan üzenet</span>
                        <span class="stat-value">${unreadCount}</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Hírlevél feliratkozó</span>
                        <span class="stat-value">${this.newsletters.length}</span>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="tabs-nav">
                    <button class="tab-btn ${this.activeTab === 'contacts' ? 'active' : ''}" 
                            @click=${() => this.activeTab = 'contacts'}>
                        ✉ Kapcsolati üzenetek
                        ${unreadCount > 0 ? html`<span class="badge badge-unread">${unreadCount}</span>` : ''}
                    </button>
                    <button class="tab-btn ${this.activeTab === 'newsletter' ? 'active' : ''}" 
                            @click=${() => this.activeTab = 'newsletter'}>
                        📰 Hírlevél feliratkozók (${this.newsletters.length})
                    </button>
                </div>

                <!-- Filter Bar -->
                <div class="filter-bar">
                    <input type="text" 
                           class="search-input" 
                           placeholder="Keresés név, email vagy szöveg alapján..." 
                           .value=${this.filterText} 
                           @input=${e => this.filterText = e.target.value} />
                    
                    ${this.activeTab === 'newsletter' ? html`
                        <button class="btn btn-primary" @click=${this.exportCsv}>
                            📥 Exportálás CSV-be
                        </button>
                    ` : ''}
                </div>

                <!-- Content Area -->
                <div class="table-container">
                    ${this.loading && !this.contacts.length && !this.newsletters.length ? html`
                        <div class="empty-state">Adatok betöltése...</div>
                    ` : this.activeTab === 'contacts' ? html`
                        ${filteredContacts.length === 0 ? html`
                            <div class="empty-state">Nincs megjeleníthető kapcsolatfelvételi üzenet.</div>
                        ` : html`
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th style="width: 80px;">Státusz</th>
                                        <th style="width: 140px;">Dátum</th>
                                        <th>Név</th>
                                        <th>E-mail cím</th>
                                        <th>Cég / Pozíció</th>
                                        <th>Üzenet részlet</th>
                                        <th style="width: 160px; text-align: right;">Műveletek</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredContacts.map(c => html`
                                        <tr class="${c.isRead ? '' : 'unread-row'}" @click=${() => this.openModal(c)}>
                                            <td>
                                                <span class="status-pill ${c.isRead ? 'read' : 'unread'}">
                                                    ${c.isRead ? 'Olvasott' : 'Új'}
                                                </span>
                                            </td>
                                            <td class="date-cell">${this.formatDate(c.createdAt)}</td>
                                            <td class="bold-cell">${c.name}</td>
                                            <td><a href="mailto:${c.email}" @click=${e => e.stopPropagation()} class="link">${c.email}</a></td>
                                            <td>${c.company || "-"}</td>
                                            <td class="message-preview">${c.message}</td>
                                            <td style="text-align: right;" @click=${e => e.stopPropagation()}>
                                                <button class="action-btn" title="Olvasottnak jelölés" @click=${e => this.toggleRead(c.id, e)}>
                                                    ${c.isRead ? '✉ Újnak' : '✔ Olvasott'}
                                                </button>
                                                <button class="action-btn danger" title="Törlés" @click=${e => this.deleteContact(c.id, e)}>
                                                    🗑
                                                </button>
                                            </td>
                                        </tr>
                                    `)}
                                </tbody>
                            </table>
                        `}
                    ` : html`
                        ${filteredNews.length === 0 ? html`
                            <div class="empty-state">Nincs megjeleníthető feliratkozó.</div>
                        ` : html`
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th style="width: 180px;">Feliratkozás ideje</th>
                                        <th>E-mail cím</th>
                                        <th style="width: 100px;">Státusz</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredNews.map(n => html`
                                        <tr>
                                            <td class="date-cell">${this.formatDate(n.subscribedAt)}</td>
                                            <td class="bold-cell"><a href="mailto:${n.email}" class="link">${n.email}</a></td>
                                            <td>
                                                <span class="status-pill read">Aktív</span>
                                            </td>
                                        </tr>
                                    `)}
                                </tbody>
                            </table>
                        `}
                    `}
                </div>

                <!-- Modal Detail View -->
                ${this.selectedContact ? html`
                    <div class="modal-backdrop" @click=${this.closeModal}>
                        <div class="modal-box" @click=${e => e.stopPropagation()}>
                            <div class="modal-header">
                                <div>
                                    <h2 class="modal-title">${this.selectedContact.name}</h2>
                                    <span class="modal-subtitle">${this.formatDate(this.selectedContact.createdAt)}</span>
                                </div>
                                <button class="close-btn" @click=${this.closeModal}>✕</button>
                            </div>
                            <div class="modal-body">
                                <div class="field-group">
                                    <span class="field-label">E-mail cím:</span>
                                    <a href="mailto:${this.selectedContact.email}" class="link font-medium">${this.selectedContact.email}</a>
                                </div>
                                ${this.selectedContact.company ? html`
                                    <div class="field-group">
                                        <span class="field-label">Cég / Pozíció:</span>
                                        <span>${this.selectedContact.company}</span>
                                    </div>
                                ` : ''}
                                <div class="field-group message-box">
                                    <span class="field-label">Üzenet:</span>
                                    <div class="message-content">${this.selectedContact.message}</div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a href="mailto:${this.selectedContact.email}?subject=Válasz a megkeresésére&body=Kedves ${encodeURIComponent(this.selectedContact.name)}!" class="btn btn-primary">
                                    ✉ Válasz küldése
                                </a>
                                <button class="btn btn-secondary" @click=${() => this.toggleRead(this.selectedContact.id)}>
                                    ${this.selectedContact.isRead ? 'Jelölés olvasatlanként' : 'Jelölés olvasottként'}
                                </button>
                                <button class="btn btn-danger" @click=${() => this.deleteContact(this.selectedContact.id)}>
                                    Törlés
                                </button>
                                <button class="btn btn-secondary" style="margin-left: auto;" @click=${this.closeModal}>
                                    Bezárás
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
            padding: 24px 32px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: var(--uui-color-text, #1A2A4F);
            box-sizing: border-box;
        }
        .dashboard-wrapper {
            max-width: 1300px;
            margin: 0 auto;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        .title {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 6px 0;
            color: var(--uui-color-text, #1A2A4F);
        }
        .subtitle {
            font-size: 14px;
            color: var(--uui-color-text-alt, #666);
            margin: 0;
        }
        .stats-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .stat-card {
            background: var(--uui-color-surface, #ffffff);
            border: 1px solid var(--uui-color-border, #e0e0e0);
            border-radius: 12px;
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .stat-card.highlight {
            border-color: #F7A5A5;
            background: rgba(247, 165, 165, 0.08);
        }
        .stat-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--uui-color-text-alt, #777);
            margin-bottom: 6px;
        }
        .stat-value {
            font-size: 28px;
            font-weight: 700;
            color: var(--uui-color-text, #1A2A4F);
        }
        .tabs-nav {
            display: flex;
            gap: 8px;
            border-bottom: 1px solid var(--uui-color-border, #e0e0e0);
            margin-bottom: 16px;
        }
        .tab-btn {
            background: none;
            border: none;
            padding: 10px 18px;
            font-size: 14px;
            font-weight: 600;
            color: var(--uui-color-text-alt, #666);
            cursor: pointer;
            border-bottom: 2px solid transparent;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.15s ease;
        }
        .tab-btn:hover {
            color: var(--uui-color-text, #1A2A4F);
        }
        .tab-btn.active {
            color: #1A2A4F;
            border-bottom-color: #1A2A4F;
            font-weight: 700;
        }
        .badge {
            font-size: 11px;
            padding: 2px 7px;
            border-radius: 999px;
            font-weight: 700;
        }
        .badge-unread {
            background-color: #F7A5A5;
            color: #1A2A4F;
        }
        .filter-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
        }
        .search-input {
            flex: 1;
            max-width: 400px;
            padding: 8px 14px;
            border-radius: 8px;
            border: 1px solid var(--uui-color-border, #ccc);
            font-size: 14px;
            background: var(--uui-color-surface, #fff);
            color: var(--uui-color-text, #1A2A4F);
            outline: none;
        }
        .search-input:focus {
            border-color: #1A2A4F;
            box-shadow: 0 0 0 2px rgba(26,42,79,0.1);
        }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.15s ease;
            border: 1px solid transparent;
        }
        .btn-primary {
            background-color: #1A2A4F;
            color: #ffffff;
        }
        .btn-primary:hover {
            background-color: #2A3A5F;
        }
        .btn-secondary {
            background-color: var(--uui-color-surface, #fff);
            border-color: var(--uui-color-border, #ccc);
            color: var(--uui-color-text, #333);
        }
        .btn-secondary:hover {
            background-color: var(--uui-color-surface-alt, #f5f5f5);
        }
        .btn-danger {
            background-color: #fee2e2;
            color: #b91c1c;
            border-color: #fecaca;
        }
        .btn-danger:hover {
            background-color: #fca5a5;
        }
        .table-container {
            background: var(--uui-color-surface, #ffffff);
            border: 1px solid var(--uui-color-border, #e0e0e0);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            text-align: left;
        }
        .data-table th {
            background: var(--uui-color-surface-alt, #f9f9fb);
            color: var(--uui-color-text-alt, #666);
            font-weight: 600;
            padding: 12px 16px;
            border-bottom: 1px solid var(--uui-color-border, #e0e0e0);
        }
        .data-table td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--uui-color-border, #eee);
            vertical-align: middle;
        }
        .data-table tbody tr {
            cursor: pointer;
            transition: background 0.1s ease;
        }
        .data-table tbody tr:hover {
            background: var(--uui-color-surface-alt, #f9f9fb);
        }
        .unread-row {
            background: rgba(247, 165, 165, 0.05);
            font-weight: 600;
        }
        .bold-cell {
            font-weight: 600;
            color: var(--uui-color-text, #1A2A4F);
        }
        .date-cell {
            color: var(--uui-color-text-alt, #777);
            font-size: 12px;
        }
        .message-preview {
            max-width: 280px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--uui-color-text-alt, #555);
        }
        .status-pill {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 999px;
            text-align: center;
        }
        .status-pill.unread {
            background-color: #F7A5A5;
            color: #1A2A4F;
        }
        .status-pill.read {
            background-color: #e5e7eb;
            color: #4b5563;
        }
        .action-btn {
            background: none;
            border: 1px solid var(--uui-color-border, #ddd);
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            color: var(--uui-color-text, #333);
            margin-left: 4px;
        }
        .action-btn:hover {
            background: var(--uui-color-surface-alt, #f0f0f5);
        }
        .action-btn.danger:hover {
            background: #fee2e2;
            color: #b91c1c;
            border-color: #fca5a5;
        }
        .link {
            color: #1A2A4F;
            text-decoration: underline;
        }
        .link:hover {
            color: #2A3A5F;
        }
        .empty-state {
            padding: 48px;
            text-align: center;
            color: var(--uui-color-text-alt, #777);
            font-size: 14px;
        }
        /* Modal */
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(2px);
        }
        .modal-box {
            background: var(--uui-color-surface, #ffffff);
            border-radius: 16px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: popIn 0.2s ease;
        }
        @keyframes popIn {
            from { transform: scale(0.96); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 20px 24px;
            border-bottom: 1px solid var(--uui-color-border, #eee);
        }
        .modal-title {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
        }
        .modal-subtitle {
            font-size: 12px;
            color: #777;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #888;
            padding: 4px;
        }
        .close-btn:hover {
            color: #111;
        }
        .modal-body {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .field-group {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .field-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #888;
        }
        .message-content {
            background: var(--uui-color-surface-alt, #f9f9fb);
            border: 1px solid var(--uui-color-border, #eee);
            border-radius: 8px;
            padding: 16px;
            white-space: pre-wrap;
            line-height: 1.5;
            font-size: 14px;
            max-height: 250px;
            overflow-y: auto;
        }
        .modal-footer {
            padding: 16px 24px;
            border-top: 1px solid var(--uui-color-border, #eee);
            background: var(--uui-color-surface-alt, #fafafa);
            display: flex;
            gap: 8px;
            align-items: center;
        }
    `;
}

customElements.define("submissions-dashboard", SubmissionsDashboard);
