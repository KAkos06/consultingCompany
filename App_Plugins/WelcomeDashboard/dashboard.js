import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";

export default class WelcomeDashboard extends UmbElementMixin(LitElement) {
    static properties = {
        overview: { type: Object },
        analytics: { type: Object },
        users: { type: Array },
        recentInquiries: { type: Array },
        selectedPeriod: { type: Number },
        loading: { type: Boolean },
        fullAnalyticsOpen: { type: Boolean },
        exporting: { type: Boolean }
    };

    constructor() {
        super();
        this.overview = null;
        this.analytics = null;
        this.users = [];
        this.recentInquiries = [];
        this.selectedPeriod = 7;
        this.loading = true;
        this.fullAnalyticsOpen = false;
        this.exporting = false;
        this._auth = null;

        this.consumeContext(UMB_AUTH_CONTEXT, (auth) => {
            this._auth = auth;
            this.loadAllData();
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.loadAllData();
    }

    async getAuthHeaders() {
        const headers = { "Content-Type": "application/json" };
        if (this._auth) {
            try {
                const token = await this._auth.getLatestToken();
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }
            } catch (err) {
                console.warn("Could not get auth token:", err);
            }
        }
        return headers;
    }

    async loadAllData() {
        this.loading = true;
        try {
            const headers = await this.getAuthHeaders();
            const [overviewRes, usersRes, analyticsRes, inquiriesRes] = await Promise.all([
                fetch("/umbraco/api/dashboard/overview", { headers, credentials: "include" }),
                fetch("/umbraco/api/dashboard/users", { headers, credentials: "include" }),
                fetch(`/umbraco/api/dashboard/analytics?days=${this.selectedPeriod}`, { headers, credentials: "include" }),
                fetch("/umbraco/api/dashboard/inquiries?count=4", { headers, credentials: "include" })
            ]);

            if (overviewRes.ok) this.overview = await overviewRes.json();
            if (usersRes.ok) this.users = await usersRes.json();
            if (analyticsRes.ok) this.analytics = await analyticsRes.json();
            if (inquiriesRes.ok) this.recentInquiries = await inquiriesRes.json();
        } catch (err) {
            console.error("Error loading dashboard data:", err);
        } finally {
            this.loading = false;
        }
    }

    async changePeriod(days) {
        if (this.selectedPeriod === days) return;
        this.selectedPeriod = days;
        try {
            const headers = await this.getAuthHeaders();
            const res = await fetch(`/umbraco/api/dashboard/analytics?days=${days}`, { headers, credentials: "include" });
            if (res.ok) {
                this.analytics = await res.json();
            }
        } catch (err) {
            console.error("Error changing analytics period:", err);
        }
    }

    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }

    formatRelativeTime(dateStr) {
        if (!dateStr) return "Never";
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) return "Just now";
        if (diffMin < 60) return `${diffMin}m ago`;
        if (diffHour < 24) return `${diffHour}h ago`;
        if (diffDay === 1) return "Yesterday";
        if (diffDay < 30) return `${diffDay}d ago`;
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    getInitials(name) {
        if (!name) return "U";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    getAvatarColor(name) {
        const colors = [
            "linear-gradient(135deg, #2563eb, #1d4ed8)",
            "linear-gradient(135deg, #059669, #047857)",
            "linear-gradient(135deg, #d97706, #b45309)",
            "linear-gradient(135deg, #7c3aed, #6d28d9)",
            "linear-gradient(135deg, #db2777, #be185d)",
            "linear-gradient(135deg, #0284c7, #0369a1)"
        ];
        let hash = 0;
        for (let i = 0; i < (name || "").length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    async exportCsv(days) {
        const period = days !== undefined ? days : this.selectedPeriod;
        if (this.exporting) return;
        this.exporting = true;
        this.requestUpdate();

        try {
            const headers = await this.getAuthHeaders();
            const res = await fetch(`/umbraco/api/dashboard/analytics/export?days=${period}`, {
                headers,
                credentials: "include"
            });

            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                const fileSuffix = period > 0 ? `${period}d` : "all";
                a.download = `analytics_traffic_${fileSuffix}_${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                    a.remove();
                }, 1000);
            } else {
                console.error("Failed to export analytics CSV:", res.status, res.statusText);
            }
        } catch (err) {
            console.error("Error exporting CSV:", err);
        } finally {
            this.exporting = false;
            this.requestUpdate();
        }
    }

    render() {
        if (this.loading && !this.overview) {
            return html`
                <div class="loading-container">
                    <uui-loader-bar></uui-loader-bar>
                    <p class="loading-text">Loading Executive Insight Dashboard...</p>
                </div>
            `;
        }

        const userName = this.overview?.currentUserName || "Executive";
        const isMaintenance = this.overview?.isMaintenanceMode ?? false;
        const isFrozen = this.overview?.isContentFrozen ?? false;
        const todayDateFormatted = new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        const totalViews = this.analytics?.totalPageviews ?? 0;
        const uniqueVisitors = this.analytics?.totalUniqueVisitors ?? 0;
        const viewsPerVisitor = this.analytics?.viewsPerVisitor ?? 0;

        return html`
            <div class="dashboard-wrapper">
                <!-- HERO HEADER WITH LIVE STATUS -->
                <header class="hero-header ${isMaintenance ? 'hero-maintenance' : ''}">
                    <div class="hero-content">
                        <div class="hero-badge ${isMaintenance ? 'badge-warn-border' : 'badge-green-border'}">
                            <span class="badge-pulse ${isMaintenance ? 'pulse-warn' : 'pulse-green'}"></span>
                            <span class="badge-text">
                                ${isMaintenance ? "🔴 Maintenance Mode Active" : "🟢 Website Online & Live"}
                            </span>
                            ${isFrozen ? html`
                                <span class="badge-sep">•</span>
                                <span class="badge-frozen">❄️ Content Changes Frozen</span>
                            ` : ""}
                            <span class="badge-sep">•</span>
                            <span class="badge-date">${todayDateFormatted}</span>
                        </div>
                        <h1 class="hero-title">${this.getGreeting()}, ${userName}! 👋</h1>
                        <p class="hero-subtitle">
                            ${isMaintenance 
                                ? "The public website is currently in Maintenance Mode. Non-authenticated visitors see the maintenance landing page."
                                : "The website is live and operational. Visitor tracking, contact forms, and content services are running normally."}
                        </p>
                    </div>
                    <div class="hero-actions">
                        ${isMaintenance ? html`
                            <a href="/umbraco/section/content/dashboard/maintenancemanager" class="btn-warn-action">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                                Open Maintenance Manager
                            </a>
                        ` : html`
                            <a href="/" target="_blank" rel="noopener noreferrer" class="btn-primary-action">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                Visit Live Website
                            </a>
                        `}
                        <button type="button" @click=${() => this.loadAllData()} class="btn-secondary-action" title="Refresh metrics">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                            Refresh
                        </button>
                    </div>
                </header>

                <!-- TOP KPI CARDS (DARK THEME COMPLIANT) -->
                <div class="kpi-grid">
                    <!-- Pageviews -->
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-label">Recorded Pageviews</span>
                            <div class="kpi-icon icon-blue">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </div>
                        </div>
                        <div class="kpi-value-row">
                            <span class="kpi-value">${totalViews.toLocaleString()}</span>
                            <span class="badge-neutral">${this.selectedPeriod}d window</span>
                        </div>
                        <div class="kpi-footer">
                            <span class="kpi-subtext"><strong>${this.overview?.todayPageviews ?? 0}</strong> pageviews logged today</span>
                        </div>
                    </div>

                    <!-- Unique Visitors -->
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-label">Unique Visitors</span>
                            <div class="kpi-icon icon-purple">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="kpi-value-row">
                            <span class="kpi-value">${uniqueVisitors.toLocaleString()}</span>
                            <span class="badge-neutral">${viewsPerVisitor} views / visitor</span>
                        </div>
                        <div class="kpi-footer">
                            <span class="kpi-subtext">Cookieless, real daily visitor hashes</span>
                        </div>
                    </div>

                    <!-- Client Inquiries (Dark theme fixed) -->
                    <div class="kpi-card ${this.overview?.unreadInquiriesCount > 0 ? 'card-highlight' : ''}">
                        <div class="kpi-header">
                            <span class="kpi-label">Client Inquiries</span>
                            <div class="kpi-icon icon-amber">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="kpi-value-row">
                            <span class="kpi-value">${this.overview?.unreadInquiriesCount ?? 0}</span>
                            ${this.overview?.unreadInquiriesCount > 0 ? html`
                                <span class="trend-badge trend-warn">Action needed</span>
                            ` : html`
                                <span class="trend-badge trend-ok">All processed</span>
                            `}
                        </div>
                        <div class="kpi-footer">
                            <a href="/umbraco/section/content/dashboard/submissions" class="kpi-action-link">
                                Review inquiries & newsletters →
                            </a>
                        </div>
                    </div>

                    <!-- Published Pages -->
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-label">Published Content</span>
                            <div class="kpi-icon icon-emerald">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="kpi-value-row">
                            <span class="kpi-value">${this.overview?.totalPublishedPages ?? 0}</span>
                            <span class="badge-neutral">Pages live</span>
                        </div>
                        <div class="kpi-footer">
                            <span class="kpi-subtext"><strong>${this.overview?.totalNewsletterSubscribers ?? 0}</strong> confirmed subscribers</span>
                        </div>
                    </div>
                </div>

                <!-- ANALYTICS SECTION (DARK THEME COMPLIANT) -->
                <section class="section-container">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Traffic & Visitor Analytics</h2>
                            <p class="section-desc">100% genuine request data collected by the native analytics engine.</p>
                        </div>
                        <div class="analytics-toolbar">
                            <div class="period-toggle">
                                <button type="button" class="period-btn ${this.selectedPeriod === 7 ? 'active' : ''}" @click=${() => this.changePeriod(7)}>7 Days</button>
                                <button type="button" class="period-btn ${this.selectedPeriod === 30 ? 'active' : ''}" @click=${() => this.changePeriod(30)}>30 Days</button>
                                <button type="button" class="period-btn ${this.selectedPeriod === 90 ? 'active' : ''}" @click=${() => this.changePeriod(90)}>90 Days</button>
                            </div>
                            <button type="button" class="btn-accent" @click=${() => this.fullAnalyticsOpen = !this.fullAnalyticsOpen}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="20" x2="18" y2="10"></line>
                                    <line x1="12" y1="20" x2="12" y2="4"></line>
                                    <line x1="6" y1="20" x2="6" y2="14"></line>
                                </svg>
                                ${this.fullAnalyticsOpen ? "Hide Detailed Metrics" : "Full Analytics Report"}
                            </button>
                            <button type="button" class="btn-ghost" @click=${() => this.exportCsv()} ?disabled=${this.exporting} title="Download traffic data as CSV">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                ${this.exporting ? "Exporting..." : "Export CSV"}
                            </button>
                        </div>
                    </div>

                    <!-- CHART & TOP PAGES ROW -->
                    <div class="analytics-layout">
                        <!-- SVG CHART -->
                        <div class="chart-card">
                            <div class="chart-header">
                                <span class="chart-title">Daily Visitors & Pageviews</span>
                                <div class="chart-legend">
                                    <span class="legend-item"><span class="legend-color color-pv"></span> Pageviews</span>
                                    <span class="legend-item"><span class="legend-color color-uv"></span> Unique Visitors</span>
                                </div>
                            </div>
                            <div class="chart-container">
                                ${this.renderChart()}
                            </div>
                        </div>

                        <!-- TOP PAGES -->
                        <div class="top-pages-card">
                            <h3 class="card-subtitle">Top Visited Pages</h3>
                            <div class="pages-list">
                                ${(this.analytics?.topPages || []).length === 0 ? html`
                                    <div class="empty-state-box">
                                        <p class="empty-state-title">No pageviews recorded yet</p>
                                        <p class="empty-state-desc">Browse your website pages to record live visitor traffic in real time.</p>
                                        <a href="/" target="_blank" class="btn-sm-action">Browse Website</a>
                                    </div>
                                ` : (this.analytics?.topPages || []).map(p => html`
                                    <div class="page-item">
                                        <div class="page-item-info">
                                            <span class="page-item-title" title="${p.title}">${p.title}</span>
                                            <span class="page-item-path">${p.path}</span>
                                        </div>
                                        <div class="page-item-metrics">
                                            <span class="page-item-count">${p.views} views</span>
                                            <div class="progress-bar-bg">
                                                <div class="progress-bar-fill" style="width: ${p.percentage}%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                `)}
                            </div>
                        </div>
                    </div>

                    <!-- STATISTICAL BREAKDOWN GRIDS -->
                    <div class="breakdown-grid">
                        <!-- Referrers -->
                        <div class="breakdown-card">
                            <h3 class="card-subtitle">Traffic Channels & Referrers</h3>
                            <div class="breakdown-list">
                                ${(this.analytics?.topReferrers || []).length === 0 ? html`
                                    <p class="empty-state-text">No external referral traffic recorded yet.</p>
                                ` : (this.analytics?.topReferrers || []).map(r => html`
                                    <div class="breakdown-item">
                                        <span class="breakdown-name" title="${r.source}">${r.source}</span>
                                        <div class="breakdown-bar-wrap">
                                            <div class="breakdown-bar-fill fill-blue" style="width: ${r.percentage}%;"></div>
                                        </div>
                                        <span class="breakdown-pct">${r.percentage}% (${r.count})</span>
                                    </div>
                                `)}
                            </div>
                        </div>

                        <!-- Devices & OS -->
                        <div class="breakdown-card">
                            <h3 class="card-subtitle">Devices & Platforms</h3>
                            <div class="breakdown-list">
                                ${(this.analytics?.deviceBreakdown || []).length === 0 ? html`
                                    <p class="empty-state-text">No device data available.</p>
                                ` : (this.analytics?.deviceBreakdown || []).map(d => html`
                                    <div class="breakdown-item">
                                        <span class="breakdown-name">${d.label}</span>
                                        <div class="breakdown-bar-wrap">
                                            <div class="breakdown-bar-fill fill-emerald" style="width: ${d.percentage}%;"></div>
                                        </div>
                                        <span class="breakdown-pct">${d.percentage}% (${d.count})</span>
                                    </div>
                                `)}
                            </div>
                        </div>
                    </div>

                    <!-- REAL-TIME RECENT ACTIVITY STREAM (GENUINE DATA) -->
                    <div class="activity-feed-card">
                        <div class="activity-header">
                            <h3 class="card-subtitle">Real-time Live Activity Stream</h3>
                            <span class="live-stream-badge">
                                <span class="dot-live"></span> Live Logging Active
                            </span>
                        </div>
                        ${(this.analytics?.recentActivity || []).length === 0 ? html`
                            <p class="empty-state-text">No recent visits recorded. Open the live website in another tab to see real-time hits appear here.</p>
                        ` : html`
                            <div class="activity-table-wrapper">
                                <table class="report-table">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Page Visited</th>
                                            <th>Source / Referrer</th>
                                            <th>Device & OS</th>
                                            <th>Browser</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${(this.analytics?.recentActivity || []).map(hit => html`
                                            <tr>
                                                <td class="nowrap-col"><strong>${hit.relativeTime}</strong></td>
                                                <td>
                                                    <span class="hit-path">${hit.path}</span>
                                                    <span class="hit-title">${hit.pageTitle}</span>
                                                </td>
                                                <td>${hit.referrer}</td>
                                                <td>${hit.deviceType} • ${hit.operatingSystem}</td>
                                                <td>${hit.browser}</td>
                                            </tr>
                                        `)}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>

                    <!-- EXPANDED DETAILED REPORT (CONDITIONAL) -->
                    ${this.fullAnalyticsOpen ? html`
                        <div class="full-analytics-panel">
                            <div class="full-panel-header">
                                <div>
                                    <h3 class="full-panel-title">Detailed Analytics Report (${this.selectedPeriod} Days)</h3>
                                    <p class="full-panel-subtitle">Comprehensive breakdown of actual visitor traffic and external integrations.</p>
                                </div>
                                <div class="full-panel-actions">
                                    <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" class="btn-external">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        Open Google Analytics 4 Console
                                    </a>
                                    <button type="button" class="btn-ghost" @click=${() => this.exportCsv(0)} ?disabled=${this.exporting}>
                                        ${this.exporting ? "Exporting..." : "Export Full CSV"}
                                    </button>
                                </div>
                            </div>

                            <table class="report-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Total Pageviews</th>
                                        <th>Unique Visitors</th>
                                        <th>Avg. Views / Visitor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${(this.analytics?.dailyTraffic || []).slice().reverse().map(d => html`
                                        <tr>
                                            <td><strong>${d.date}</strong></td>
                                            <td>${d.pageviews}</td>
                                            <td>${d.uniqueVisitors}</td>
                                            <td>${d.uniqueVisitors > 0 ? (d.pageviews / d.uniqueVisitors).toFixed(1) : "0.0"}</td>
                                        </tr>
                                    `)}
                                </tbody>
                            </table>
                        </div>
                    ` : ""}
                </section>

                <!-- ALL USERS SECTION (DARK THEME COMPLIANT) -->
                <section class="section-container">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">All Team Members & Users</h2>
                            <p class="section-desc">Backoffice users registered on this system, their assigned roles, and activity status.</p>
                        </div>
                        <a href="/umbraco/section/users" class="btn-secondary-action">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Manage Users & Roles
                        </a>
                    </div>

                    <div class="users-grid">
                        ${this.users.map(u => html`
                            <div class="user-card">
                                <div class="user-card-top">
                                    <div class="user-avatar" style="background: ${this.getAvatarColor(u.name)}">
                                        ${this.getInitials(u.name)}
                                        <span class="user-status-dot ${u.isActive ? 'dot-active' : 'dot-inactive'}" title="${u.isActive ? 'Active' : 'Inactive'}"></span>
                                    </div>
                                    <div class="user-details">
                                        <h4 class="user-name">${u.name}</h4>
                                        <span class="user-email">${u.email}</span>
                                    </div>
                                </div>
                                <div class="user-card-meta">
                                    <div class="user-roles">
                                        ${u.groups.map(g => html`<span class="role-badge">${g}</span>`)}
                                    </div>
                                    <div class="user-login-info">
                                        <span class="meta-label">Last Login:</span>
                                        <span class="meta-value">${this.formatRelativeTime(u.lastLoginDate)}</span>
                                    </div>
                                </div>
                            </div>
                        `)}
                    </div>
                </section>

                <!-- RECENT INQUIRIES & QUICK SHORTCUTS (DARK THEME COMPLIANT) -->
                <div class="inquiries-shortcuts-grid">
                    <!-- RECENT INQUIRIES -->
                    <div class="recent-inquiries-card">
                        <div class="card-header-flex">
                            <h3 class="card-subtitle">Recent Inquiries</h3>
                            <a href="/umbraco/section/content/dashboard/submissions" class="view-all-link">View all →</a>
                        </div>
                        <div class="inquiries-list">
                            ${this.recentInquiries.length === 0 ? html`
                                <p class="empty-state-text">No inquiries received yet.</p>
                            ` : this.recentInquiries.map(inq => html`
                                <div class="inquiry-item ${!inq.isRead ? 'inquiry-unread' : ''}">
                                    <div class="inquiry-item-header">
                                        <div>
                                            <strong class="inquiry-sender">${inq.name}</strong>
                                            ${inq.company ? html`<span class="inquiry-company">(${inq.company})</span>` : ""}
                                        </div>
                                        <span class="inquiry-date">${this.formatRelativeTime(inq.createdAt)}</span>
                                    </div>
                                    <p class="inquiry-message">${inq.message}</p>
                                </div>
                            `)}
                        </div>
                    </div>

                    <!-- QUICK ACTIONS -->
                    <div class="quick-actions-card">
                        <h3 class="card-subtitle">Quick Actions</h3>
                        <div class="actions-list">
                            <a href="/umbraco/section/content" class="action-item">
                                <div class="action-icon icon-blue">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </div>
                                <div class="action-text">
                                    <strong>Content Tree</strong>
                                    <span>Edit website pages, hero sections, and blocks</span>
                                </div>
                            </a>

                            <a href="/umbraco/section/media" class="action-item">
                                <div class="action-icon icon-emerald">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                </div>
                                <div class="action-text">
                                    <strong>Media Library</strong>
                                    <span>Manage images, executive photos, and logos</span>
                                </div>
                            </a>

                            <a href="/umbraco/section/content/dashboard/maintenancemanager" class="action-item">
                                <div class="action-icon icon-amber">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                    </svg>
                                </div>
                                <div class="action-text">
                                    <strong>Maintenance Manager</strong>
                                    <span>Configure maintenance mode, locks, and content freezes</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderChart() {
        const traffic = this.analytics?.dailyTraffic || [];
        const hasData = traffic.some(t => t.pageviews > 0 || t.uniqueVisitors > 0);

        if (!hasData) {
            return html`
                <div class="empty-chart-container">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="empty-chart-icon">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <p class="empty-chart-text">No pageviews recorded in this timeframe.</p>
                    <span class="empty-chart-sub">Open your website in another tab or browse pages to log real visitor metrics.</span>
                </div>
            `;
        }

        const maxVal = Math.max(...traffic.map(t => Math.max(t.pageviews, t.uniqueVisitors, 1))) * 1.2;
        const chartHeight = 220;
        const chartWidth = 680;
        const padX = 40;
        const padTop = 20;
        const padBottom = 36;
        const innerW = chartWidth - padX * 2;
        const innerH = chartHeight - padTop - padBottom;
        const stepX = innerW / Math.max(traffic.length - 1, 1);

        const pvPoints = traffic.map((t, idx) => ({
            x: padX + idx * stepX,
            y: padTop + innerH - (t.pageviews / maxVal) * innerH,
            data: t
        }));

        const uvPoints = traffic.map((t, idx) => ({
            x: padX + idx * stepX,
            y: padTop + innerH - (t.uniqueVisitors / maxVal) * innerH,
            data: t
        }));

        const pvLineD = pvPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
        const pvAreaD = `${pvLineD} L ${pvPoints[pvPoints.length - 1].x.toFixed(1)} ${(padTop + innerH).toFixed(1)} L ${pvPoints[0].x.toFixed(1)} ${(padTop + innerH).toFixed(1)} Z`;
        const uvLineD = uvPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

        return html`
            <svg class="analytics-svg" viewBox="0 0 ${chartWidth} ${chartHeight}" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="eiPvGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35" />
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.01" />
                    </linearGradient>
                </defs>

                <!-- Grid lines -->
                <line x1="${padX}" y1="${padTop}" x2="${chartWidth - padX}" y2="${padTop}" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="3 3"></line>
                <line x1="${padX}" y1="${padTop + innerH / 2}" x2="${chartWidth - padX}" y2="${padTop + innerH / 2}" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="3 3"></line>
                <line x1="${padX}" y1="${padTop + innerH}" x2="${chartWidth - padX}" y2="${padTop + innerH}" stroke="currentColor" stroke-opacity="0.15"></line>

                <!-- Pageviews Area & Curve -->
                <path d="${pvAreaD}" fill="url(#eiPvGrad)"></path>
                <path d="${pvLineD}" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>

                <!-- Unique Visitors Curve -->
                <path d="${uvLineD}" fill="none" stroke="#a855f7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 3"></path>

                <!-- Pageview Points -->
                ${pvPoints.map(p => html`
                    <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#3b82f6" stroke="var(--uui-color-surface, #1e293b)" stroke-width="2">
                        <title>${p.data.date}: ${p.data.pageviews} pageviews</title>
                    </circle>
                `)}

                <!-- Unique Visitor Points -->
                ${uvPoints.map(p => html`
                    <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#a855f7" stroke="var(--uui-color-surface, #1e293b)" stroke-width="1.5">
                        <title>${p.data.date}: ${p.data.uniqueVisitors} unique visitors</title>
                    </circle>
                `)}

                <!-- X Axis Labels -->
                ${traffic.map((t, idx) => {
                    const showLabel = traffic.length <= 8 || idx % Math.ceil(traffic.length / 7) === 0 || idx === traffic.length - 1;
                    if (!showLabel) return "";
                    const x = padX + idx * stepX;
                    return html`
                        <text class="axis-label" x="${x.toFixed(1)}" y="${chartHeight - 8}" text-anchor="middle">
                            ${t.date}
                        </text>
                    `;
                })}
            </svg>
        `;
    }

    static styles = css`
        :host {
            display: block;
            background: var(--uui-color-surface, #0f172a);
            min-height: 100vh;
            color: var(--uui-color-text, #f8fafc);
            font-family: var(--uui-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
            padding: 24px;
            box-sizing: border-box;
        }

        .dashboard-wrapper {
            max-width: 1280px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 16px;
        }

        .loading-text {
            font-size: 14px;
            color: var(--uui-color-text-alt, #94a3b8);
            font-weight: 500;
        }

        /* HERO HEADER */
        .hero-header {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.1));
            border-radius: 16px;
            padding: 30px;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(8px);
        }

        .hero-maintenance {
            border-color: rgba(245, 158, 11, 0.45);
            background: linear-gradient(135deg, rgba(45, 30, 15, 0.95) 0%, rgba(20, 15, 10, 0.95) 100%);
        }

        .hero-header::after {
            content: "";
            position: absolute;
            top: -50px;
            right: -50px;
            width: 250px;
            height: 250px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
            pointer-events: none;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.08);
            padding: 5px 14px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.02em;
            margin-bottom: 12px;
            backdrop-filter: blur(4px);
        }

        .badge-green-border {
            border: 1px solid rgba(34, 197, 94, 0.35);
        }

        .badge-warn-border {
            border: 1px solid rgba(245, 158, 11, 0.4);
            background: rgba(245, 158, 11, 0.12);
        }

        .badge-pulse {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        .pulse-green {
            background: #22c55e;
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35);
        }

        .pulse-warn {
            background: #f59e0b;
            box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.35);
        }

        .badge-sep {
            color: rgba(255, 255, 255, 0.35);
        }

        .badge-date {
            color: rgba(255, 255, 255, 0.85);
        }

        .badge-frozen {
            color: #93c5fd;
            font-weight: 700;
        }

        .hero-title {
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 8px 0;
            letter-spacing: -0.02em;
            color: #ffffff;
        }

        .hero-subtitle {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
            max-width: 620px;
            line-height: 1.5;
        }

        .hero-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
            z-index: 2;
        }

        .btn-primary-action {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #3b82f6;
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
            padding: 10px 18px;
            border-radius: 10px;
            text-decoration: none;
            transition: all 180ms ease;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
        }

        .btn-primary-action:hover {
            background: #2563eb;
            transform: translateY(-1px);
        }

        .btn-warn-action {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #d97706;
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
            padding: 10px 18px;
            border-radius: 10px;
            text-decoration: none;
            transition: all 180ms ease;
            box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
        }

        .btn-warn-action:hover {
            background: #b45309;
            transform: translateY(-1px);
        }

        .btn-secondary-action {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.08);
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
            padding: 10px 16px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.16);
            cursor: pointer;
            text-decoration: none;
            transition: all 180ms ease;
        }

        .btn-secondary-action:hover {
            background: rgba(255, 255, 255, 0.16);
        }

        /* KPI GRID */
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
        }

        .kpi-card {
            background: var(--uui-color-surface-alt, #1e293b);
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            border-radius: 14px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            gap: 12px;
            transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .kpi-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }

        .card-highlight {
            border-color: rgba(245, 158, 11, 0.5);
            background: rgba(245, 158, 11, 0.07);
        }

        .kpi-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .kpi-label {
            font-size: 12px;
            font-weight: 700;
            color: var(--uui-color-text-alt, #94a3b8);
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .kpi-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon-blue { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
        .icon-purple { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
        .icon-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        .icon-emerald { background: rgba(16, 185, 129, 0.15); color: #34d399; }

        .kpi-value-row {
            display: flex;
            align-items: baseline;
            gap: 10px;
        }

        .kpi-value {
            font-size: 32px;
            font-weight: 800;
            color: var(--uui-color-text, #f8fafc);
            letter-spacing: -0.02em;
        }

        .trend-badge {
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 6px;
        }

        .trend-up { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
        .trend-down { background: rgba(239, 68, 68, 0.15); color: #f87171; }
        .trend-warn { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
        .trend-ok { background: rgba(255, 255, 255, 0.08); color: var(--uui-color-text-alt, #94a3b8); }

        .badge-neutral {
            font-size: 11px;
            background: rgba(255, 255, 255, 0.08);
            color: var(--uui-color-text-alt, #94a3b8);
            padding: 3px 8px;
            border-radius: 6px;
            font-weight: 600;
        }

        .kpi-footer {
            margin-top: auto;
            padding-top: 8px;
            border-top: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.06));
            font-size: 12px;
            color: var(--uui-color-text-alt, #94a3b8);
        }

        .kpi-action-link {
            color: #60a5fa;
            font-weight: 600;
            text-decoration: none;
        }

        .kpi-action-link:hover {
            text-decoration: underline;
        }

        /* SECTION CONTAINER */
        .section-container {
            background: var(--uui-color-surface-alt, #1e293b);
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
        }

        .section-title {
            font-size: 18px;
            font-weight: 700;
            margin: 0 0 4px 0;
            color: var(--uui-color-text, #f8fafc);
        }

        .section-desc {
            font-size: 13px;
            color: var(--uui-color-text-alt, #94a3b8);
            margin: 0;
        }

        .analytics-toolbar {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .period-toggle {
            display: inline-flex;
            background: var(--uui-color-surface, rgba(0, 0, 0, 0.25));
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            padding: 3px;
            border-radius: 8px;
        }

        .period-btn {
            background: transparent;
            border: none;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            color: var(--uui-color-text-alt, #94a3b8);
            border-radius: 6px;
            cursor: pointer;
            transition: all 150ms ease;
        }

        .period-btn.active {
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.12));
            color: var(--uui-color-text, #ffffff);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .btn-accent {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(59, 130, 246, 0.15);
            color: #60a5fa;
            border: 1px solid rgba(59, 130, 246, 0.35);
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 150ms ease;
        }

        .btn-accent:hover {
            background: rgba(59, 130, 246, 0.25);
        }

        .btn-ghost {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            color: var(--uui-color-text, #cbd5e1);
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.12));
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 150ms ease;
        }

        .btn-ghost:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        /* ANALYTICS LAYOUT */
        .analytics-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
        }

        @media (max-width: 900px) {
            .analytics-layout {
                grid-template-columns: 1fr;
            }
        }

        .chart-card {
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            border-radius: 12px;
            padding: 20px;
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.03));
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .chart-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .chart-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--uui-color-text, #f8fafc);
        }

        .chart-legend {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 12px;
            color: var(--uui-color-text-alt, #94a3b8);
        }

        .legend-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .legend-color {
            width: 10px;
            height: 10px;
            border-radius: 3px;
        }

        .color-pv { background: #3b82f6; }
        .color-uv { background: #a855f7; border-radius: 50%; }

        .chart-container {
            width: 100%;
            height: 220px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .analytics-svg {
            width: 100%;
            height: 100%;
            overflow: visible;
        }

        .axis-label {
            font-size: 11px;
            fill: var(--uui-color-text-alt, #94a3b8);
            font-weight: 500;
        }

        .empty-chart-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 30px;
            gap: 8px;
        }

        .empty-chart-icon {
            color: var(--uui-color-text-alt, #64748b);
            opacity: 0.5;
        }

        .empty-chart-text {
            font-size: 14px;
            font-weight: 600;
            color: var(--uui-color-text, #e2e8f0);
            margin: 0;
        }

        .empty-chart-sub {
            font-size: 12px;
            color: var(--uui-color-text-alt, #94a3b8);
        }

        /* TOP PAGES */
        .top-pages-card {
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            border-radius: 12px;
            padding: 20px;
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.03));
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .card-subtitle {
            font-size: 14px;
            font-weight: 700;
            color: var(--uui-color-text, #f8fafc);
            margin: 0;
        }

        .pages-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .page-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            font-size: 13px;
        }

        .page-item-info {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            max-width: 65%;
        }

        .page-item-title {
            font-weight: 600;
            color: var(--uui-color-text, #f8fafc);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .page-item-path {
            font-size: 11px;
            color: var(--uui-color-text-alt, #94a3b8);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .page-item-metrics {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 4px;
            min-width: 70px;
        }

        .page-item-count {
            font-size: 12px;
            font-weight: 700;
            color: #60a5fa;
        }

        .progress-bar-bg {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 2px;
            overflow: hidden;
        }

        .progress-bar-fill {
            height: 100%;
            background: #3b82f6;
            border-radius: 2px;
        }

        .empty-state-box {
            text-align: center;
            padding: 24px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }

        .empty-state-title {
            font-size: 13px;
            font-weight: 600;
            color: var(--uui-color-text, #f8fafc);
            margin: 0;
        }

        .empty-state-desc {
            font-size: 11px;
            color: var(--uui-color-text-alt, #94a3b8);
            margin: 0;
            line-height: 1.4;
        }

        .btn-sm-action {
            margin-top: 6px;
            display: inline-block;
            font-size: 11px;
            font-weight: 600;
            color: #60a5fa;
            text-decoration: none;
            padding: 4px 10px;
            border-radius: 6px;
            background: rgba(59, 130, 246, 0.12);
        }

        .btn-sm-action:hover {
            background: rgba(59, 130, 246, 0.25);
        }

        /* BREAKDOWN GRID */
        .breakdown-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        @media (max-width: 768px) {
            .breakdown-grid {
                grid-template-columns: 1fr;
            }
        }

        .breakdown-card {
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            border-radius: 12px;
            padding: 20px;
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.03));
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .breakdown-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .breakdown-item {
            display: grid;
            grid-template-columns: 140px 1fr 90px;
            align-items: center;
            gap: 12px;
            font-size: 12px;
        }

        .breakdown-name {
            font-weight: 600;
            color: var(--uui-color-text, #f8fafc);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .breakdown-bar-wrap {
            height: 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 3px;
            overflow: hidden;
        }

        .breakdown-bar-fill {
            height: 100%;
            border-radius: 3px;
        }

        .fill-blue { background: #3b82f6; }
        .fill-emerald { background: #10b981; }

        .breakdown-pct {
            text-align: right;
            font-weight: 600;
            color: var(--uui-color-text-alt, #94a3b8);
        }

        /* ACTIVITY FEED */
        .activity-feed-card {
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            border-radius: 12px;
            padding: 20px;
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.03));
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .activity-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .live-stream-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            font-weight: 600;
            color: #4ade80;
            background: rgba(34, 197, 94, 0.12);
            padding: 3px 8px;
            border-radius: 9999px;
            border: 1px solid rgba(34, 197, 94, 0.25);
        }

        .dot-live {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.4);
        }

        .activity-table-wrapper {
            overflow-x: auto;
        }

        .hit-path {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-weight: 600;
            color: #60a5fa;
            display: block;
            font-size: 12px;
        }

        .hit-title {
            font-size: 11px;
            color: var(--uui-color-text-alt, #94a3b8);
            display: block;
        }

        .nowrap-col {
            white-space: nowrap;
        }

        /* FULL ANALYTICS PANEL */
        .full-analytics-panel {
            background: var(--uui-color-surface, rgba(0, 0, 0, 0.3));
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.1));
            border-radius: 12px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 10px;
        }

        .full-panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }

        .full-panel-title {
            font-size: 16px;
            font-weight: 700;
            margin: 0 0 4px 0;
            color: var(--uui-color-text, #f8fafc);
        }

        .full-panel-subtitle {
            font-size: 12px;
            color: var(--uui-color-text-alt, #94a3b8);
            margin: 0;
        }

        .full-panel-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .btn-external {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.08));
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.15));
            color: var(--uui-color-text, #ffffff);
            font-size: 12px;
            font-weight: 600;
            padding: 6px 14px;
            border-radius: 8px;
            text-decoration: none;
            transition: all 150ms ease;
        }

        .btn-external:hover {
            background: rgba(255, 255, 255, 0.14);
        }

        .report-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            background: var(--uui-color-surface, rgba(0, 0, 0, 0.2));
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
        }

        .report-table th, .report-table td {
            padding: 12px 16px;
            text-align: left;
        }

        .report-table th {
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.06));
            font-weight: 600;
            color: var(--uui-color-text, #ffffff);
            border-bottom: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
        }

        .report-table td {
            border-bottom: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.05));
            color: var(--uui-color-text, #e2e8f0);
        }

        /* USERS GRID */
        .users-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 16px;
        }

        .user-card {
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.03));
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            border-radius: 12px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            transition: transform 150ms ease, box-shadow 150ms ease;
        }

        .user-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            border-color: rgba(255, 255, 255, 0.16);
        }

        .user-card-top {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .user-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            color: #ffffff;
            font-weight: 700;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            flex-shrink: 0;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }

        .user-status-dot {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid var(--uui-color-surface-alt, #1e293b);
        }

        .dot-active { background: #22c55e; }
        .dot-inactive { background: #64748b; }

        .user-details {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .user-name {
            font-size: 14px;
            font-weight: 700;
            color: var(--uui-color-text, #f8fafc);
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .user-email {
            font-size: 12px;
            color: var(--uui-color-text-alt, #94a3b8);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .user-card-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 10px;
            border-top: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.06));
            font-size: 11px;
        }

        .user-roles {
            display: flex;
            gap: 4px;
            flex-wrap: wrap;
        }

        .role-badge {
            background: rgba(59, 130, 246, 0.15);
            color: #60a5fa;
            border: 1px solid rgba(59, 130, 246, 0.3);
            padding: 2px 8px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 11px;
        }

        .user-login-info {
            color: var(--uui-color-text-alt, #94a3b8);
        }

        .meta-label {
            margin-right: 2px;
        }

        .meta-value {
            font-weight: 600;
            color: var(--uui-color-text, #f8fafc);
        }

        /* INQUIRIES & SHORTCUTS */
        .inquiries-shortcuts-grid {
            display: grid;
            grid-template-columns: 3fr 2fr;
            gap: 20px;
        }

        @media (max-width: 850px) {
            .inquiries-shortcuts-grid {
                grid-template-columns: 1fr;
            }
        }

        .recent-inquiries-card, .quick-actions-card {
            background: var(--uui-color-surface-alt, #1e293b);
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .card-header-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .view-all-link {
            font-size: 12px;
            font-weight: 600;
            color: #60a5fa;
            text-decoration: none;
        }

        .view-all-link:hover {
            text-decoration: underline;
        }

        .inquiries-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .inquiry-item {
            padding: 12px;
            border-radius: 10px;
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.03));
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .inquiry-unread {
            background: rgba(245, 158, 11, 0.1);
            border-color: rgba(245, 158, 11, 0.4);
        }

        .inquiry-item-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
        }

        .inquiry-sender {
            color: var(--uui-color-text, #f8fafc);
        }

        .inquiry-company {
            color: var(--uui-color-text-alt, #94a3b8);
            margin-left: 4px;
        }

        .inquiry-date {
            color: var(--uui-color-text-alt, #64748b);
            font-size: 11px;
        }

        .inquiry-message {
            font-size: 12px;
            color: var(--uui-color-text-alt, #cbd5e1);
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.4;
        }

        .actions-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .action-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 12px;
            border-radius: 10px;
            background: var(--uui-color-surface-emphasis, rgba(255, 255, 255, 0.03));
            border: 1px solid var(--uui-color-border, rgba(255, 255, 255, 0.08));
            text-decoration: none;
            color: inherit;
            transition: all 150ms ease;
        }

        .action-item:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.18);
            transform: translateX(3px);
        }

        .action-icon {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .action-text {
            display: flex;
            flex-direction: column;
        }

        .action-text strong {
            font-size: 13px;
            color: var(--uui-color-text, #f8fafc);
        }

        .action-text span {
            font-size: 11px;
            color: var(--uui-color-text-alt, #94a3b8);
        }

        .empty-state-text {
            font-size: 13px;
            color: var(--uui-color-text-alt, #94a3b8);
            font-style: italic;
            text-align: center;
            padding: 16px 0;
            margin: 0;
        }
    `;
}

customElements.define("welcome-dashboard", WelcomeDashboard);
