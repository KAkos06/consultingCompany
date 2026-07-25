import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentSecondaryHeadingEditor extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: Object }
    };

    constructor() {
        super();
        this.value = { text: "", style: "M" };
    }

    connectedCallback() {
        super.connectedCallback();
        // Parse if it comes as a string, though Umbraco.JSON usually passes an object
        if (typeof this.value === 'string' && this.value.trim() !== '') {
            try {
                this.value = JSON.parse(this.value);
            } catch (e) {
                this.value = { text: this.value, style: "M" };
            }
        }
        if (!this.value || typeof this.value !== 'object') {
            this.value = { text: "", style: "M" };
        }
    }

    #onTextInput(e) {
        this.value = { ...this.value, text: e.target.value };
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    #onStyleChange(e) {
        this.value = { ...this.value, style: e.target.value };
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        const styles = ["S", "M", "L"];
        const currentStyle = this.value?.style || "M";
        const currentText = this.value?.text || "";

        return html`
            <div class="editor">
                <uui-input type="text" .value=${currentText} @input=${this.#onTextInput} placeholder="Enter secondary heading text..." class="text-input"></uui-input>
                <div class="picker">
                    ${styles.map(style => html`
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
            background: var(--uui-color-surface-alt, #f9f9fc);
            border: 2px solid transparent;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 150ms ease;
            font-size: 11px;
            font-weight: 700;
            color: var(--uui-color-text, #666);
        }
        input:checked + .box {
            background: var(--uui-color-surface-alt-hover, #f0f0f5);
            border-color: var(--uui-color-interactive, #1a2a4f);
            color: var(--uui-color-interactive, #1a2a4f);
        }
    `;
}

customElements.define('component-secondaryheading-editor', ComponentSecondaryHeadingEditor);
