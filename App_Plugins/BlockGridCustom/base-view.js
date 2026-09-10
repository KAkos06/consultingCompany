import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_BLOCK_ENTRY_CONTEXT } from "@umbraco-cms/backoffice/block";

export class BaseGridComponentBlockView extends UmbElementMixin(LitElement) {
    static properties = {
        contentKey: { type: String },
        content: { type: Object, attribute: false },
        settings: { type: Object, attribute: false },
        config: { type: Object, attribute: false },
        index: { type: Number },
        label: { type: String },
        contentTypeName: { type: String }
    };

    thumbnailUrl = '/thumbnails/hero.svg';
    defaultTitle = 'Component';

    constructor() {
        super();
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

    render() {
        const title = this.#getTitle();
        const subtitle = this.#getSubtitle();
        const imageUrl = this.thumbnailUrl;

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
            </div>
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
    `;
}
