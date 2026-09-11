import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_BLOCK_ENTRY_CONTEXT } from "@umbraco-cms/backoffice/block";
import { openBlockPreview } from "./preview-modal.js";

export class BaseGridComponentBlockView extends UmbElementMixin(LitElement) {
    static properties = {
        contentKey: { type: String },
        content: { type: Object, attribute: false },
        settings: { type: Object, attribute: false },
        config: { type: Object, attribute: false },
        index: { type: Number },
        label: { type: String },
        contentTypeName: { type: String },
        _isModalOpen: { type: Boolean, state: true },
        _activeVariantIndex: { type: Number, state: true }
    };

    thumbnailUrl = '/thumbnails/hero.svg';
    defaultTitle = 'Component';
    variants = [];

    constructor() {
        super();
        this._isModalOpen = false;
        this._activeVariantIndex = 0;

        this.consumeContext(UMB_BLOCK_ENTRY_CONTEXT, (context) => {
            this._blockContext = context;
            if (context?.label) {
                this.observe(context.label, (val) => {
                    this.label = val;
                });
            }
            if (context?.content) {
                this.observe(context.content, (val) => {
                    this.content = val;
                });
            }
            if (context?.contentTypeName) {
                this.observe(context.contentTypeName, (val) => {
                    this.contentTypeName = val;
                });
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('keydown', this.#handleGlobalKeyDown);
    }

    #handleGlobalKeyDown = (e) => {
        if (!this._isModalOpen) return;
        if (e.key === 'Escape') {
            this.#closeModal(e);
        } else if (e.key === 'ArrowLeft') {
            this.#prevVariant(e);
        } else if (e.key === 'ArrowRight') {
            this.#nextVariant(e);
        }
    };

    #getTitle() {
        return this.label || this.contentTypeName || this.defaultTitle;
    }

    #getSubtitle() {
        if (!this.content) return '';
        const raw = this.content.heading || this.content.title || this.content.blockName || '';
        if (typeof raw === 'object' && raw?.text) return raw.text;
        if (typeof raw === 'string') return raw;
        return '';
    }

    #getVariants() {
        if (Array.isArray(this.variants) && this.variants.length > 0) {
            return this.variants;
        }
        const imgName = this.thumbnailUrl ? this.thumbnailUrl.replace('.svg', '.jpg') : '/thumbnails/hero.jpg';
        return [
            {
                name: this.#getTitle(),
                description: 'Component visual preview.',
                image: imgName
            }
        ];
    }

    #onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this._blockContext?.edit) {
            this._blockContext.edit();
        } else if (this.config?.editContentPath) {
            window.location.hash = this.config.editContentPath;
        }
    }

    #onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.#onClick(e);
        }
    }

    #onImgError(e) {
        e.target.style.display = 'none';
        const fallback = e.target.parentElement?.querySelector('.thumb-fallback');
        if (fallback) fallback.style.display = 'flex';
    }

    #openModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        openBlockPreview(this.#getTitle(), this.#getVariants(), 0);
    }

    #closeModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this._isModalOpen = false;
        window.removeEventListener('keydown', this.#handleGlobalKeyDown);
    }

    #prevVariant(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const vars = this.#getVariants();
        this._activeVariantIndex = (this._activeVariantIndex - 1 + vars.length) % vars.length;
    }

    #nextVariant(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const vars = this.#getVariants();
        this._activeVariantIndex = (this._activeVariantIndex + 1) % vars.length;
    }

    render() {
        const title = this.#getTitle();
        const subtitle = this.#getSubtitle();
        const imageUrl = this.thumbnailUrl;
        const variants = this.#getVariants();
        const activeVariant = variants[this._activeVariantIndex] || variants[0];

        return html`
            <div
                class="component-card"
                role="button"
                tabindex="0"
                @click=${this.#onClick}
                @keydown=${this.#onKeyDown}
                title="Click to edit ${title}">
                <div class="thumb-box">
                    <img src=${imageUrl} alt=${title} loading="lazy" @error=${this.#onImgError} />
                    <div class="thumb-fallback" style="display:none;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="info-box">
                    <div class="tag-row">
                        <span class="type-tag">Component</span>
                    </div>
                    <div class="title">${title}</div>
                    ${subtitle && subtitle !== title ? html`<div class="subtitle">${subtitle}</div>` : ''}
                </div>
                <button
                    class="preview-btn help-btn"
                    type="button"
                    @click=${this.#openModal}
                    title="View preview and variants"
                    aria-label="View preview and variants">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            </div>

            ${this._isModalOpen ? html`
                <div class="modal-backdrop" @click=${this.#closeModal}>
                    <div class="modal-dialog" @click=${(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <div class="modal-header">
                            <div class="header-left">
                                <div class="variant-meta">
                                    <span class="variant-badge">Előnézet</span>
                                    ${variants.length > 1 ? html`<span class="variant-index">${this._activeVariantIndex + 1} / ${variants.length}</span>` : ''}
                                </div>
                                <h3 class="variant-title">${activeVariant.name}</h3>
                                <p class="variant-description">${activeVariant.description}</p>
                            </div>

                            <div class="header-right">
                                ${variants.length > 1 ? html`
                                    <div class="pagination-group">
                                        <button
                                            class="nav-btn"
                                            type="button"
                                            @click=${this.#prevVariant}
                                            title="Előző variáns (Bal nyíl)"
                                            aria-label="Previous variant">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="15 18 9 12 15 6"></polyline>
                                            </svg>
                                        </button>
                                        <span class="nav-counter">${this._activeVariantIndex + 1} / ${variants.length}</span>
                                        <button
                                            class="nav-btn"
                                            type="button"
                                            @click=${this.#nextVariant}
                                            title="Következő variáns (Jobb nyíl)"
                                            aria-label="Next variant">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="9 18 15 12 9 6"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                ` : ''}

                                <button
                                    class="close-btn"
                                    type="button"
                                    @click=${this.#closeModal}
                                    title="Bezárás (Esc)"
                                    aria-label="Close preview">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="modal-body">
                            <div class="image-container">
                                <img src=${activeVariant.image} alt=${activeVariant.name} loading="eager" />
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            min-height: 72px;
            box-sizing: border-box;
        }
        .component-card {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 8px 12px;
            background: rgba(46, 160, 67, 0.08);
            border: 1px solid rgba(46, 160, 67, 0.28);
            border-radius: 8px;
            color: inherit;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            min-height: 72px;
            transition: all 160ms cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            user-select: none;
            outline: none;
        }
        :host(:hover) .component-card,
        .component-card:hover {
            background: rgba(46, 160, 67, 0.14);
            border-color: rgba(46, 160, 67, 0.55);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .component-card:focus-visible {
            border-color: #2ea043;
            box-shadow: 0 0 0 2px rgba(46, 160, 67, 0.35);
        }
        .thumb-box {
            width: 96px;
            height: 72px;
            flex-shrink: 0;
            border-radius: 6px;
            overflow: hidden;
            background: #1b253b;
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .thumb-box img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            pointer-events: none;
            -webkit-user-drag: none;
            transition: transform 220ms ease;
        }
        .component-card:hover .thumb-box img {
            transform: scale(1.05);
        }
        .thumb-fallback {
            color: var(--uui-color-text-alt, #888);
            align-items: center;
            justify-content: center;
        }
        .info-box {
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
            flex: 1;
            overflow: hidden;
        }
        .tag-row {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .type-tag {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: #2ea043;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .type-tag::before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #2ea043;
        }
        .title {
            font-size: 13px;
            font-weight: 600;
            color: var(--uui-color-text, #eeeeef);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.3;
        }
        .subtitle {
            font-size: 11px;
            color: var(--uui-color-text-alt, #888);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
            opacity: 0.85;
        }

        /* Eye Preview Button (Bottom Right) */
        .preview-btn,
        .help-btn {
            position: absolute;
            bottom: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(46, 160, 67, 0.16);
            border: 1px solid rgba(46, 160, 67, 0.45);
            color: #2ea043;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 180ms cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 2;
            padding: 0;
            outline: none;
        }
        .preview-btn:hover,
        .help-btn:hover {
            background: #2ea043;
            color: #ffffff;
            transform: scale(1.15);
            box-shadow: 0 2px 8px rgba(46, 160, 67, 0.45);
            border-color: #2ea043;
        }
        .preview-btn:focus-visible,
        .help-btn:focus-visible {
            box-shadow: 0 0 0 2px #2ea043;
        }

        /* Modal Overlay Backdrop */
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999999;
            background: rgba(8, 14, 26, 0.85);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;
            box-sizing: border-box;
            cursor: default;
            animation: fadeIn 160ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Modal Dialog Box */
        .modal-dialog {
            background: #141c2e;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 16px;
            box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06);
            max-width: 1040px;
            width: 100%;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            animation: scaleIn 180ms cubic-bezier(0.16, 1, 0.3, 1);
            cursor: auto;
        }

        /* Modal Header */
        .modal-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            padding: 20px 26px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            background: #192338;
        }
        .header-left {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
        }
        .variant-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 2px;
        }
        .variant-badge {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #2ea043;
            background: rgba(46, 160, 67, 0.15);
            padding: 2px 7px;
            border-radius: 12px;
            border: 1px solid rgba(46, 160, 67, 0.3);
        }
        .variant-index {
            font-size: 11px;
            font-weight: 600;
            color: #94a3b8;
        }
        .variant-title {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            color: #f8fafc;
            line-height: 1.3;
            letter-spacing: -0.2px;
        }
        .variant-description {
            margin: 0;
            font-size: 13px;
            color: #94a3b8;
            line-height: 1.45;
            max-width: 640px;
        }

        /* Header Right Controls */
        .header-right {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
            margin-top: 2px;
        }
        .pagination-group {
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 3px 6px;
            border-radius: 10px;
        }
        .nav-btn {
            background: transparent;
            border: none;
            color: #cbd5e1;
            width: 30px;
            height: 30px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 140ms ease;
            padding: 0;
        }
        .nav-btn:hover {
            background: rgba(255, 255, 255, 0.14);
            color: #ffffff;
            transform: scale(1.05);
        }
        .nav-counter {
            font-size: 12px;
            font-weight: 600;
            color: #94a3b8;
            padding: 0 4px;
            font-variant-numeric: tabular-nums;
            user-select: none;
        }
        .close-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #94a3b8;
            width: 34px;
            height: 34px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 140ms ease;
            padding: 0;
        }
        .close-btn:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.4);
            color: #ef4444;
        }

        /* Modal Body & Image Container */
        .modal-body {
            padding: 20px 24px;
            overflow-y: auto;
            background: #0d1424;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 260px;
            max-height: calc(90vh - 120px);
            box-sizing: border-box;
        }
        .image-container {
            width: 100%;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            background: #162035;
        }
        .image-container img {
            width: 100%;
            height: auto;
            max-height: 65vh;
            object-fit: contain;
            display: block;
        }

        /* Keyframe Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.96) translateY(6px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
}
