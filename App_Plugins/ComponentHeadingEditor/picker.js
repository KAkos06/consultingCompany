import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { UmbFormControlMixin } from "@umbraco-cms/backoffice/validation";
import { UMB_PROPERTY_DATASET_CONTEXT } from "@umbraco-cms/backoffice/property";

const VALID_STYLES = ["H1", "H2", "H3", "H4", "H5", "H6", "S", "M", "L"];

export default class ComponentHeadingEditor extends UmbFormControlMixin(UmbElementMixin(LitElement)) {
    static properties = {
        value: { type: Object },
        isHeaderEnabled: { state: true }
    };

    constructor() {
        super();
        this._value = { text: "", style: "H2" };
        this.isHeaderEnabled = false;
    }

    get value() {
        return this._value;
    }

    set value(v) {
        const oldVal = this._value;
        let parsed = null;
        if (typeof v === 'string' && v.trim() !== '') {
            try {
                parsed = JSON.parse(v);
            } catch (e) {
                parsed = { text: v, style: "H2" };
            }
        } else if (v && typeof v === 'object') {
            parsed = v;
        }

        const text = parsed?.text || "";
        let style = parsed?.style || "H2";
        if (!VALID_STYLES.includes(style)) {
            style = "H2";
        }
        this._value = { text, style };
        this.requestUpdate('value', oldVal);
    }

    firstUpdated() {
        const input = this.shadowRoot?.querySelector("uui-input");
        if (input) {
            this.addFormControlElement(input);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this._value || typeof this._value !== 'object') {
            this._value = { text: "", style: "H2" };
        } else if (!VALID_STYLES.includes(this._value.style)) {
            this._value = { ...this._value, style: "H2" };
        }

        this.consumeContext(UMB_PROPERTY_DATASET_CONTEXT, async (dataset) => {
            if (!dataset) return;
            const obs = await dataset.propertyValueByAlias('showHeaderOptions');
            if (obs) {
                this.observe(obs, (val) => {
                    const enabled = val === true || val === '1' || val === 'true';
                    this.isHeaderEnabled = enabled;
                    this.#updateHostMandatory(enabled);
                    this.requestUpdate();
                }, 'observeShowHeaderForHeading');
            }
        });
    }

    #updateHostMandatory(isMandatory) {
        let current = this;
        while (current) {
            if (current.tagName && current.tagName.toLowerCase() === 'umb-property') {
                current.mandatory = isMandatory;
                const layout = current.shadowRoot?.querySelector('umb-property-layout') || current.querySelector('umb-property-layout');
                if (layout) layout.mandatory = isMandatory;
                break;
            }
            current = current.parentElement || (current.getRootNode && current.getRootNode().host);
        }
    }

    #onTextInput(e) {
        const style = VALID_STYLES.includes(this._value?.style) ? this._value.style : "H2";
        this.value = { text: e.target.value, style };
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    #onStyleChange(e) {
        const text = this._value?.text || "";
        this.value = { text, style: e.target.value };
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        const currentStyle = VALID_STYLES.includes(this.value?.style) ? this.value.style : "H2";
        const currentText = this.value?.text || "";

        return html`
            <div class="editor">
                <uui-input 
                    type="text" 
                    .value=${currentText} 
                    @input=${this.#onTextInput} 
                    placeholder="Enter heading text..." 
                    class="text-input"
                    ?required=${this.isHeaderEnabled}
                    required-message="Heading text is required when Show Header is enabled"
                ></uui-input>
                <div class="picker">
                    ${VALID_STYLES.map(style => html`
                        <label>
                            <input type="radio" name="headingStyle" value=${style} .checked=${currentStyle === style} @change=${this.#onStyleChange}>
                            <div class="box">${style}</div>
                        </label>
                    `)}
                </div>
            </div>
        `;
    }

    static styles = css`
        .editor { display: flex; flex-direction: column; gap: 0.75rem; }
        .text-input { width: 100%; max-width: 600px; }
        .picker { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        label { cursor: pointer; }
        input { display: none; }
        .box {
            min-width: 28px;
            height: 24px;
            padding: 0 4px;
            background: var(--uui-color-surface-alt, #2d333b);
            border: 1px solid var(--uui-color-border, #434c56);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 150ms ease;
            font-size: 11px;
            font-weight: 700;
            color: var(--uui-color-text, #eeeeef);
            opacity: 0.8;
        }
        label:hover .box {
            opacity: 1;
            border-color: var(--uui-color-border-emphasis, #626e7b);
        }
        input:checked + .box {
            background: var(--uui-color-selected, #316dca);
            border-color: var(--uui-color-selected, #316dca);
            color: var(--uui-color-selected-contrast, #ffffff);
            opacity: 1;
        }
    `;
}

customElements.define('component-heading-editor', ComponentHeadingEditor);
