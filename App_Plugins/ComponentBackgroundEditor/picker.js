import { LitElement, html, css, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL, UmbMediaUrlRepository } from "@umbraco-cms/backoffice/media";

export default class ComponentBackgroundEditor extends UmbElementMixin(LitElement) {
    
    static properties = {
        value: { type: String },
        data: { state: true },
        imageUrl: { state: true }
    };

    constructor() {
        super();
        this._value = "";
        this.data = { image: "", opacity: 100, parallax: false };
        this.imageUrl = "";
        this._lastImageKey = null;
    }
    
    get value() {
        return this._value;
    }

    set value(v) {
        const oldVal = this._value;
        this._value = v;
        
        if (v && typeof v === 'string') {
            try {
                const parsed = JSON.parse(v);
                if (parsed) this.data = { ...this.data, ...parsed };
            } catch (e) {}
        } else if (v && typeof v === 'object') {
            this.data = { ...this.data, ...v };
        }
        
        if (this.data.image && this.data.image !== this._lastImageKey) {
            this._lastImageKey = this.data.image;
            this.#fetchImageUrl(this.data.image);
        } else if (!this.data.image) {
            this.imageUrl = "";
            this._lastImageKey = null;
        }
        
        this.requestUpdate('value', oldVal);
    }

    connectedCallback() {
        super.connectedCallback();
        
        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this._modalManager = instance;
        });
    }

    async #fetchImageUrl(key) {
        try {
            if (!this._mediaUrlRepository) {
                this._mediaUrlRepository = new UmbMediaUrlRepository(this);
            }
            const { data } = await this._mediaUrlRepository.requestItems([key]);
            if (data && data.length > 0) {
                this.imageUrl = data[0].url;
            } else {
                this.imageUrl = "";
            }
        } catch (e) {
            console.error("Error fetching media URL", e);
            this.imageUrl = "";
        }
    }

    #updateValue() {
        this._value = JSON.stringify(this.data);
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
        this.requestUpdate();
        
        if (this.data.image && this.data.image !== this._lastImageKey) {
            this._lastImageKey = this.data.image;
            this.#fetchImageUrl(this.data.image);
        } else if (!this.data.image) {
            this.imageUrl = "";
            this._lastImageKey = null;
        }
    }

    async #onSelectImage() {
        try {
            if (!this._modalManager) {
                console.error("Modal manager not initialized");
                return;
            }

            const modalContext = this._modalManager.open(this, UMB_MEDIA_PICKER_MODAL, {
                data: {
                    multiple: false
                },
                value: {
                    selection: this.data.image ? [{ key: this.data.image }] : []
                }
            });

            const result = await modalContext.onSubmit().catch(() => undefined);
            if (result && result.selection && result.selection.length > 0) {
                this.data.image = result.selection[0].key || result.selection[0];
                this.#updateValue();
            }
        } catch (error) {
            console.error("Error opening media picker", error);
        }
    }

    #onRemoveImage() {
        this.data.image = "";
        this.#updateValue();
    }

    #onOpacityChange(e) {
        this.data.opacity = parseInt(e.target.value, 10);
        this.#updateValue();
    }

    #onParallaxChange(e) {
        this.data.parallax = e.target.checked;
        this.#updateValue();
    }

    render() {
        return html`
            <div class="background-settings">
                <div class="field">
                    <label>Background Image</label>
                    <div class="image-picker">
                        ${this.data.image 
                            ? html`
                                <div class="selected-media">
                                    ${this.imageUrl 
                                        ? html`<img src="${this.imageUrl}" alt="Selected background" class="preview-img" />` 
                                        : html`<span class="media-id">Loading...</span>`
                                    }
                                    <div class="media-actions">
                                        <uui-button look="danger" @click=${this.#onRemoveImage}>Remove</uui-button>
                                    </div>
                                </div>
                              ` 
                            : html`
                                <uui-button look="placeholder" @click=${this.#onSelectImage}>Select Image</uui-button>
                              `
                        }
                    </div>
                </div>

                <div class="field">
                    <label>Overlay Opacity (${this.data.opacity}%)</label>
                    <uui-slider 
                        min="0" 
                        max="100" 
                        step="5" 
                        .value=${this.data.opacity} 
                        @input=${this.#onOpacityChange}
                        hide-step-values
                    ></uui-slider>
                </div>

                <div class="field toggle-field">
                    <label>Parallax Effect</label>
                    <uui-toggle 
                        .checked=${this.data.parallax} 
                        @change=${this.#onParallaxChange}
                        label="Enable parallax scrolling effect"
                    ></uui-toggle>
                </div>
            </div>
        `;
    }

    static styles = css`
        .background-settings {
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding: 16px;
            border: 1px solid var(--uui-color-border);
            border-radius: var(--uui-border-radius);
            background-color: var(--uui-color-surface);
        }
        .field {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .field label {
            font-weight: 600;
        }
        .toggle-field {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        .toggle-field label {
            margin-bottom: 0;
        }
        .selected-media {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 12px;
            background: var(--uui-color-surface-alt);
            border-radius: var(--uui-border-radius);
            border: 1px dashed var(--uui-color-border);
        }
        .preview-img {
            max-height: 80px;
            border-radius: 4px;
            border: 1px solid var(--uui-color-border);
        }
        .media-actions {
            margin-left: auto;
        }
    `;
}

customElements.define("my-background-editor", ComponentBackgroundEditor);
