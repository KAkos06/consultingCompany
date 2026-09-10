import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";

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
        this._auth = null;

        this.consumeContext(UMB_AUTH_CONTEXT, (auth) => {
            this._auth = auth;
            if (auth) {
                this.loadData();
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        if (this._auth) {
            this.loadData();
        }
    }

    async getAuthHeaders() {
        const headers = { "Content-Type": "application/json" };
        if (this._auth) {
            const token = await this._auth.getLatestToken();
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return headers;
    }

    async loadData() {
        this.loading = true;
        try {
            const headers = await this.getAuthHeaders();
            const [contactsRes, newsRes] = await Promise.all([
                fetch("/umbraco/api/submissions/contacts", { headers, credentials: "include" }),
                fetch("/umbraco/api/submissions/newsletters", { headers, credentials: "include" })
            ]);

            if (contactsRes.ok) {
                this.contacts = await contactsRes.json();
            }
            if (newsRes.ok) {
                this.newsletters = await newsRes.json();
            }
        } catch (err) {
            console.error("Error loading submissions:", err);
        } finally {
            this.loading = false;
        }
    }

    async toggleRead(id, e) {
        if (e) e.stopPropagation();
        try {
            const headers = await this.getAuthHeaders();
            const res = await fetch(`/umbraco/api/submissions/contacts/${id}/toggle-read`, {
                method: "POST",
                headers,
                credentials: "include"
            });
            if (res.ok) {
                this.contacts = this.contacts.map(c => c.id === id ? { ...c, isRead: !c.isRead } : c);
                if (this.selectedContact && this.selectedContact.id === id) {
                    this.selectedContact = { ...this.selectedContact, isRead: !this.selectedContact.isRead };
                }
            }
        } catch (err) {
            console.error("Error updating status:", err);
        }
    }

    async deleteContact(id, e) {
        if (e) e.stopPropagation();
        if (!confirm("Are you sure you want to delete this inquiry?")) return;

        try {
            const headers = await this.getAuthHeaders();
            const res = await fetch(`/umbraco/api/submissions/contacts/${id}`, {
                method: "DELETE",
                headers,
                credentials: "include"
            });
            if (res.ok) {
                this.contacts = this.contacts.filter(c => c.id !== id);
                if (this.selectedContact && this.selectedContact.id === id) {
                    this.selectedContact = null;
                }
            }
        } catch (err) {
            console.error("Error deleting inquiry:", err);
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

    async exportCsv() {
        try {
            const headers = await this.getAuthHeaders();
            const res = await fetch("/umbraco/api/submissions/newsletters/export", {
                headers,
                credentials: "include"
            });
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error("Error exporting CSV:", err);
        }
    }

    formatDate(dateStr) {
        if (!dateStr) return "";
        try {
            const d = new Date(dateStr);
            return d.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
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
                        <h1 class="title">Forms & Inquiries</h1>
                        <p class="subtitle">Submissions received through website contact forms and newsletter signups</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary" @click=${this.loadData}>
                            ${this.loading ? "Loading..." : "↻ Refresh"}
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="stats-row">
                    <div class="stat-card">
                        <span class="stat-label">Total Inquiries</span>
                        <span class="stat-value">${this.contacts.length}</span>
                    </div>
                    <div class="stat-card ${unreadCount > 0 ? 'highlight' : ''}">
                        <span class="stat-label">New / Unread Messages</span>
                        <span class="stat-value">${unreadCount}</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Newsletter Subscribers</span>
                        <span class="stat-value">${this.newsletters.length}</span>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="tabs-nav">
                    <button class="tab-btn ${this.activeTab === 'contacts' ? 'active' : ''}" 
                            @click=${() => this.activeTab = 'contacts'}>
                        ✉ Contact Inquiries
                        ${unreadCount > 0 ? html`<span class="badge badge-unread">${unreadCount}</span>` : ''}
                    </button>
                    <button class="tab-btn ${this.activeTab === 'newsletter' ? 'active' : ''}" 
                            @click=${() => this.activeTab = 'newsletter'}>
                        📰 Newsletter Subscribers (${this.newsletters.length})
                    </button>
                </div>

                <!-- Filter Bar -->
                <div class="filter-bar">
                    <input type="text" 
                           class="search-input" 
                           placeholder="Search by name, email, or message..." 
                           .value=${this.filterText} 
                           @input=${e => this.filterText = e.target.value} />
                    
                    ${this.activeTab === 'newsletter' ? html`
                        <button class="btn btn-primary" @click=${this.exportCsv}>
                            📥 Export to CSV
                        </button>
                    ` : ''}
                </div>

                <!-- Content Area -->
                <div class="table-container">
                    ${this.loading && !this.contacts.length && !this.newsletters.length ? html`
                        <div class="empty-state">Loading submissions...</div>
                    ` : this.activeTab === 'contacts' ? html`
                        ${filteredContacts.length === 0 ? html`
                            <div class="empty-state">No contact inquiries found.</div>
                        ` : html`
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th style="width: 80px;">Status</th>
                                        <th style="width: 140px;">Date</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Company / Role</th>
                                        <th>Message Preview</th>
                                        <th style="width: 160px; text-align: right;">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredContacts.map(c => html`
                                        <tr class="${c.isRead ? '' : 'unread-row'}" @click=${() => this.openModal(c)}>
                                            <td>
                                                <span class="status-pill ${c.isRead ? 'read' : 'unread'}">
                                                    ${c.isRead ? 'Read' : 'New'}
                                                </span>
                                            </td>
                                            <td class="date-cell">${this.formatDate(c.createdAt)}</td>
                                            <td class="bold-cell">${c.name}</td>
                                            <td><a href="mailto:${c.email}" @click=${e => e.stopPropagation()} class="link">${c.email}</a></td>
                                            <td>${c.company || "-"}</td>
                                            <td class="message-preview">${c.message}</td>
                                            <td style="text-align: right;" @click=${e => e.stopPropagation()}>
                                                <button class="action-btn" title="Toggle read status" @click=${e => this.toggleRead(c.id, e)}>
                                                    ${c.isRead ? '✉ Mark Unread' : '✔ Mark Read'}
                                                </button>
                                                <button class="action-btn danger" title="Delete" @click=${e => this.deleteContact(c.id, e)}>
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
                            <div class="empty-state">No newsletter subscribers found.</div>
                        ` : html`
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th style="width: 180px;">Subscribed At</th>
                                        <th>Email</th>
                                        <th style="width: 100px;">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredNews.map(n => html`
                                        <tr>
                                            <td class="date-cell">${this.formatDate(n.subscribedAt)}</td>
                                            <td class="bold-cell"><a href="mailto:${n.email}" class="link">${n.email}</a></td>
                                            <td>
                                                <span class="status-pill read">Active</span>
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
                                    <span class="field-label">Email:</span>
                                    <a href="mailto:${this.selectedContact.email}" class="link font-medium">${this.selectedContact.email}</a>
                                </div>
                                ${this.selectedContact.company ? html`
                                    <div class="field-group">
                                        <span class="field-label">Company / Role:</span>
                                        <span>${this.selectedContact.company}</span>
                                    </div>
                                ` : ''}
                                <div class="field-group message-box">
                                    <span class="field-label">Message:</span>
                                    <div class="message-content">${this.selectedContact.message}</div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a href="mailto:${this.selectedContact.email}?subject=Regarding your inquiry&body=Dear ${encodeURIComponent(this.selectedContact.name)}," class="btn btn-primary">
                                    ✉ Reply
                                </a>
                                <button class="btn btn-secondary" @click=${() => this.toggleRead(this.selectedContact.id)}>
                                    ${this.selectedContact.isRead ? 'Mark as Unread' : 'Mark as Read'}
                                </button>
                                <button class="btn btn-danger" @click=${() => this.deleteContact(this.selectedContact.id)}>
                                    Delete
                                </button>
                                <button class="btn btn-secondary" style="margin-left: auto;" @click=${this.closeModal}>
                                    Close
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
            color: var(--uui-color-text, #f8fafc);
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
            color: var(--uui-color-text, #f8fafc);
        }
        .subtitle {
            font-size: 14px;
            color: var(--uui-color-text-alt, #94a3b8);
            margin: 0;
        }
        .stats-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .stat-card {
            background: var(--uui-color-surface, #1e293b);
            border: 1px solid var(--uui-color-border, #334155);
            border-radius: 12px;
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stat-card.highlight {
            border-color: #f87171;
            background: rgba(248, 113, 113, 0.12);
        }
        .stat-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--uui-color-text-alt, #94a3b8);
            margin-bottom: 6px;
        }
        .stat-value {
            font-size: 28px;
            font-weight: 700;
            color: var(--uui-color-text, #f8fafc);
        }
        .tabs-nav {
            display: flex;
            gap: 8px;
            border-bottom: 1px solid var(--uui-color-border, #334155);
            margin-bottom: 16px;
        }
        .tab-btn {
            background: none;
            border: none;
            padding: 10px 18px;
            font-size: 14px;
            font-weight: 600;
            color: var(--uui-color-text-alt, #94a3b8);
            cursor: pointer;
            border-bottom: 2px solid transparent;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.15s ease;
        }
        .tab-btn:hover {
            color: var(--uui-color-text, #ffffff);
        }
        .tab-btn.active {
            color: var(--uui-color-interactive, #38bdf8);
            border-bottom-color: var(--uui-color-interactive, #38bdf8);
            font-weight: 700;
        }
        .badge {
            font-size: 11px;
            padding: 2px 7px;
            border-radius: 999px;
            font-weight: 700;
        }
        .badge-unread {
            background-color: #ef4444;
            color: #ffffff;
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
            border: 1px solid var(--uui-color-border, #475569);
            font-size: 14px;
            background: var(--uui-color-surface, #1e293b);
            color: var(--uui-color-text, #f8fafc);
            outline: none;
        }
        .search-input:focus {
            border-color: var(--uui-color-interactive, #38bdf8);
            box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
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
            background-color: var(--uui-color-interactive, #38bdf8);
            color: var(--uui-color-surface, #0f172a) !important;
            font-weight: 700;
        }
        .btn-primary:hover {
            filter: brightness(1.1);
            color: var(--uui-color-surface, #0f172a) !important;
        }
        .btn-secondary {
            background-color: var(--uui-color-surface, #1e293b);
            border-color: var(--uui-color-border, #475569);
            color: var(--uui-color-text, #f8fafc);
        }
        .btn-secondary:hover {
            background-color: var(--uui-color-surface-alt, #334155);
        }
        .btn-danger {
            background-color: rgba(239, 68, 68, 0.15);
            color: #fca5a5;
            border-color: rgba(239, 68, 68, 0.3);
        }
        .btn-danger:hover {
            background-color: rgba(239, 68, 68, 0.25);
        }
        .table-container {
            background: var(--uui-color-surface, #1e293b);
            border: 1px solid var(--uui-color-border, #334155);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            text-align: left;
        }
        .data-table th {
            background: var(--uui-color-surface-alt, rgba(255,255,255,0.03));
            color: var(--uui-color-text-alt, #94a3b8);
            font-weight: 600;
            padding: 12px 16px;
            border-bottom: 1px solid var(--uui-color-border, #334155);
        }
        .data-table td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--uui-color-border, rgba(255,255,255,0.06));
            vertical-align: middle;
            color: var(--uui-color-text, #f8fafc);
        }
        .data-table tbody tr {
            cursor: pointer;
            transition: background 0.1s ease;
        }
        .data-table tbody tr:hover {
            background: var(--uui-color-surface-hover, rgba(255,255,255,0.05));
        }
        .unread-row {
            background: rgba(248, 113, 113, 0.08);
            font-weight: 600;
        }
        .bold-cell {
            font-weight: 600;
            color: var(--uui-color-text, #f8fafc);
        }
        .date-cell {
            color: var(--uui-color-text-alt, #94a3b8);
            font-size: 12px;
        }
        .message-preview {
            max-width: 280px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--uui-color-text-alt, #cbd5e1);
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
            background-color: rgba(248, 113, 113, 0.2);
            color: #fca5a5;
            border: 1px solid rgba(248, 113, 113, 0.35);
        }
        .status-pill.read {
            background-color: rgba(148, 163, 184, 0.15);
            color: var(--uui-color-text-alt, #94a3b8);
            border: 1px solid rgba(148, 163, 184, 0.25);
        }
        .action-btn {
            background: none;
            border: 1px solid var(--uui-color-border, #475569);
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            color: var(--uui-color-text, #f8fafc);
            margin-left: 4px;
        }
        .action-btn:hover {
            background: var(--uui-color-surface-alt, rgba(255,255,255,0.1));
        }
        .action-btn.danger:hover {
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
            border-color: #f87171;
        }
        .link {
            color: var(--uui-color-interactive, #38bdf8);
            text-decoration: underline;
        }
        .link:hover {
            opacity: 0.85;
        }
        .empty-state {
            padding: 48px;
            text-align: center;
            color: var(--uui-color-text-alt, #94a3b8);
            font-size: 14px;
        }
        /* Modal */
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(4px);
        }
        .modal-box {
            background: var(--uui-color-surface, #1e293b);
            border: 1px solid var(--uui-color-border, #334155);
            border-radius: 16px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: popIn 0.2s ease;
            color: var(--uui-color-text, #f8fafc);
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
            border-bottom: 1px solid var(--uui-color-border, #334155);
        }
        .modal-title {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
        }
        .modal-subtitle {
            font-size: 12px;
            color: var(--uui-color-text-alt, #94a3b8);
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: var(--uui-color-text-alt, #94a3b8);
            padding: 4px;
        }
        .close-btn:hover {
            color: var(--uui-color-text, #ffffff);
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
            color: var(--uui-color-text-alt, #94a3b8);
        }
        .message-content {
            background: var(--uui-color-surface-alt, rgba(0,0,0,0.25));
            border: 1px solid var(--uui-color-border, #334155);
            border-radius: 8px;
            padding: 16px;
            white-space: pre-wrap;
            line-height: 1.5;
            font-size: 14px;
            max-height: 250px;
            overflow-y: auto;
            color: var(--uui-color-text, #f8fafc);
        }
        .modal-footer {
            padding: 16px 24px;
            border-top: 1px solid var(--uui-color-border, #334155);
            background: var(--uui-color-surface-alt, rgba(0,0,0,0.2));
            display: flex;
            gap: 8px;
            align-items: center;
        }
    `;
}

customElements.define("submissions-dashboard", SubmissionsDashboard);
