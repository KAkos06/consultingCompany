/**
 * Standalone Block Preview Modal Controller and Custom Element
 * Provides a unified visual preview modal using native <dialog> and .showModal()
 * to properly promote into the browser's Top Layer above Umbraco modals.
 */

class BlockPreviewModalElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
        this._title = '';
        this._variants = [];
        this._currentIndex = 0;
        this._built = false;
    }

    connectedCallback() {
        this.#ensureDOMElements();
        window.addEventListener('keydown', this.#handleGlobalKeyDown);
    }

    disconnectedCallback() {
        window.removeEventListener('keydown', this.#handleGlobalKeyDown);
    }

    #handleGlobalKeyDown = (e) => {
        if (!this._isOpen) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            this.close();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.prev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.next();
        }
    };

    #ensureDOMElements() {
        if (this._built) return;
        this._built = true;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    all: initial;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                }

                dialog.preview-dialog {
                    position: fixed;
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    max-width: 100vw;
                    max-height: 100vh;
                    margin: 0;
                    padding: 32px;
                    border: none;
                    background: transparent;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    overflow: hidden;
                    outline: none;
                    z-index: 2147483647;
                }

                dialog.preview-dialog[open] {
                    display: flex;
                }

                dialog.preview-dialog::backdrop {
                    background: rgba(8, 14, 26, 0.85);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    animation: fadeIn 160ms cubic-bezier(0.16, 1, 0.3, 1);
                }

                .dialog-content {
                    background: #141c2e;
                    border: 1px solid rgba(255, 255, 255, 0.14);
                    border-radius: 16px;
                    box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.06);
                    max-width: 1060px;
                    width: 100%;
                    max-height: 92vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    animation: scaleIn 180ms cubic-bezier(0.16, 1, 0.3, 1);
                }

                .modal-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 20px;
                    padding: 20px 26px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    background: #192338;
                }

                .header-left {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 0;
                    flex: 1;
                }

                .variant-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 3px;
                }

                .variant-badge {
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                    color: #2ea043;
                    background: rgba(46, 160, 67, 0.15);
                    padding: 2px 8px;
                    border-radius: 12px;
                    border: 1px solid rgba(46, 160, 67, 0.35);
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

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 10px;
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
                    padding: 0 5px;
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

                .modal-body {
                    padding: 20px 24px;
                    overflow-y: auto;
                    background: #0d1424;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 280px;
                    max-height: calc(92vh - 130px);
                    box-sizing: border-box;
                }

                .image-container {
                    width: 100%;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
                    background: #162035;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image-container img {
                    width: 100%;
                    height: auto;
                    max-height: 68vh;
                    object-fit: contain;
                    display: block;
                }

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
            </style>

            <dialog id="previewDialog" class="preview-dialog" aria-modal="true">
                <div class="dialog-content" id="dialogContent">
                    <div class="modal-header">
                        <div class="header-left">
                            <div class="variant-meta">
                                <span class="variant-badge">Preview</span>
                                <span class="variant-index" id="variantIndexBadge"></span>
                            </div>
                            <h3 class="variant-title" id="variantTitle"></h3>
                            <p class="variant-description" id="variantDescription"></p>
                        </div>

                        <div class="header-right">
                            <div class="pagination-group" id="paginationGroup" style="display: none;">
                                <button
                                    class="nav-btn"
                                    id="prevBtn"
                                    type="button"
                                    title="Previous variant (Left arrow)"
                                    aria-label="Previous variant">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <span class="nav-counter" id="navCounter"></span>
                                <button
                                    class="nav-btn"
                                    id="nextBtn"
                                    type="button"
                                    title="Next variant (Right arrow)"
                                    aria-label="Next variant">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </div>

                            <button
                                class="close-btn"
                                id="closeBtn"
                                type="button"
                                title="Close (Esc)"
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
                            <img id="previewImage" src="" alt="Preview" loading="eager" />
                        </div>
                    </div>
                </div>
            </dialog>
        `;

        const dialog = this.shadowRoot.getElementById('previewDialog');
        const dialogContent = this.shadowRoot.getElementById('dialogContent');
        const closeBtn = this.shadowRoot.getElementById('closeBtn');
        const prevBtn = this.shadowRoot.getElementById('prevBtn');
        const nextBtn = this.shadowRoot.getElementById('nextBtn');

        // Backdrop click handler
        dialog.addEventListener('click', (e) => {
            if (dialogContent && !dialogContent.contains(e.target)) {
                this.close();
            }
        });

        // Cancel event (fired by browser on Esc key)
        dialog.addEventListener('cancel', (e) => {
            e.preventDefault();
            this.close();
        });

        // Arrow keys and Escape within the dialog
        dialog.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                e.stopPropagation();
                this.prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                e.stopPropagation();
                this.next();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                this.close();
            }
        });

        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.close();
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.prev();
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.next();
        });
    }

    #updateContent() {
        this.#ensureDOMElements();

        const activeVariant = this._variants[this._currentIndex] || this._variants[0] || {
            name: this._title,
            description: 'Component visual preview.',
            image: '/thumbnails/hero.jpg'
        };

        const hasMultiple = this._variants.length > 1;

        const titleEl = this.shadowRoot.getElementById('variantTitle');
        const descEl = this.shadowRoot.getElementById('variantDescription');
        const badgeEl = this.shadowRoot.getElementById('variantIndexBadge');
        const paginationGroup = this.shadowRoot.getElementById('paginationGroup');
        const navCounter = this.shadowRoot.getElementById('navCounter');
        const previewImage = this.shadowRoot.getElementById('previewImage');

        if (titleEl) titleEl.textContent = activeVariant.name || this._title;
        if (descEl) descEl.textContent = activeVariant.description || '';
        if (badgeEl) {
            badgeEl.textContent = hasMultiple ? `${this._currentIndex + 1} / ${this._variants.length} variants` : '';
            badgeEl.style.display = hasMultiple ? 'inline' : 'none';
        }

        if (paginationGroup) {
            paginationGroup.style.display = hasMultiple ? 'flex' : 'none';
        }
        if (navCounter) {
            navCounter.textContent = `${this._currentIndex + 1} / ${this._variants.length}`;
        }
        if (previewImage) {
            previewImage.src = activeVariant.image || '';
            previewImage.alt = activeVariant.name || this._title;
        }
    }

    open(title, variants = [], initialIndex = 0) {
        this.#ensureDOMElements();
        this._title = title || 'Component Preview';
        this._variants = Array.isArray(variants) && variants.length > 0 ? variants : [
            {
                name: this._title,
                description: 'Component visual preview.',
                image: '/thumbnails/hero.jpg'
            }
        ];
        this._currentIndex = Math.max(0, Math.min(initialIndex, this._variants.length - 1));
        this._isOpen = true;

        this.#updateContent();

        const dialog = this.shadowRoot.getElementById('previewDialog');
        if (dialog && !dialog.open) {
            try {
                dialog.showModal();
            } catch (err) {
                // Fallback for environments where showModal might throw
                dialog.setAttribute('open', '');
            }
        }
    }

    close() {
        this._isOpen = false;
        const dialog = this.shadowRoot ? this.shadowRoot.getElementById('previewDialog') : null;
        if (dialog && dialog.open) {
            try {
                dialog.close();
            } catch (err) {
                dialog.removeAttribute('open');
            }
        }
    }

    next() {
        if (this._variants.length <= 1) return;
        this._currentIndex = (this._currentIndex + 1) % this._variants.length;
        this.#updateContent();
    }

    prev() {
        if (this._variants.length <= 1) return;
        this._currentIndex = (this._currentIndex - 1 + this._variants.length) % this._variants.length;
        this.#updateContent();
    }
}

if (!customElements.get('block-preview-modal')) {
    customElements.define('block-preview-modal', BlockPreviewModalElement);
}

let modalInstance = null;

function getOrCreateModal() {
    if (!modalInstance || !document.body.contains(modalInstance)) {
        modalInstance = document.querySelector('block-preview-modal');
        if (!modalInstance) {
            modalInstance = document.createElement('block-preview-modal');
            document.body.appendChild(modalInstance);
        }
    }
    return modalInstance;
}

/**
 * Opens the component visual preview modal.
 * @param {string} title - Component title
 * @param {Array<{name: string, description: string, image: string}>} variants - Variant list
 * @param {number} initialIndex - Starting variant index
 */
export function openBlockPreview(title, variants = [], initialIndex = 0) {
    const modal = getOrCreateModal();
    modal.open(title, variants, initialIndex);
}

/**
 * Closes the component preview modal.
 */
export function closeBlockPreview() {
    if (modalInstance) {
        modalInstance.close();
    }
}
