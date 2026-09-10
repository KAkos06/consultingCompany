import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentAlignmentPicker extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: String }
    };

    constructor() {
        super();
        this._value = "Left";
    }

    get value() {
        return this._value || "Left";
    }

    set value(v) {
        const oldVal = this._value;
        if (v === "Center" || v === "Right") {
            this._value = v;
        } else {
            this._value = "Left";
        }
        this.requestUpdate('value', oldVal);
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this._value || (this._value !== "Left" && this._value !== "Center" && this._value !== "Right")) {
            this._value = "Left";
            this.dispatchEvent(new UmbPropertyValueChangeEvent());
        }
    }

    #onChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        const currentVal = (this.value === "Center" || this.value === "Right") ? this.value : "Left";
        return html`
            <div class="picker">
                <label>
                    <input type="radio" name="alignment" value="Left" .checked=${currentVal === 'Left'} @change=${this.#onChange}>
                    <div class="box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 10H3M21 6H3M21 14H3M17 18H3"/></svg>
                    </div>
                    <span>Left</span>
                </label>
                <label>
                    <input type="radio" name="alignment" value="Center" .checked=${currentVal === 'Center'} @change=${this.#onChange}>
                    <div class="box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10H6M21 6H3M21 14H3M18 18H6"/></svg>
                    </div>
                    <span>Center</span>
                </label>
                <label>
                    <input type="radio" name="alignment" value="Right" .checked=${currentVal === 'Right'} @change=${this.#onChange}>
                    <div class="box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10H7M21 6H3M21 14H3M21 18H7"/></svg>
                    </div>
                    <span>Right</span>
                </label>
            </div>
        `;
    }

    static styles = css`
        .picker { display: flex; gap: 1rem; flex-wrap: wrap; }
        label {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        input { display: none; }
        .box {
            width: 48px;
            height: 32px;
            background: var(--uui-color-surface-alt, #2d333b);
            border: 2px solid var(--uui-color-border, #434c56);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 150ms ease;
            color: var(--uui-color-text, #eeeeef);
            opacity: 0.75;
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
        .box svg {
            stroke: currentColor;
        }
        span {
            font-size: 11px;
            font-weight: 600;
            color: var(--uui-color-text-alt, var(--uui-color-text, #888));
            text-transform: uppercase;
            transition: color 150ms ease;
        }
        input:checked ~ span {
            color: var(--uui-color-selected, #316dca);
            font-weight: 700;
        }
    `;
}

customElements.define('component-alignment-picker', ComponentAlignmentPicker);
