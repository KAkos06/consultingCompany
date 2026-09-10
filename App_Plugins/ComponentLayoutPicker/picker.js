import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentLayoutPicker extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: String }
    };

    constructor() {
        super();
        this._value = "Stacked";
    }

    get value() {
        return this._value || "Stacked";
    }

    set value(v) {
        const oldVal = this._value;
        this._value = (v === "SideBySide") ? "SideBySide" : "Stacked";
        this.requestUpdate('value', oldVal);
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this._value || (this._value !== "Stacked" && this._value !== "SideBySide")) {
            this._value = "Stacked";
            this.dispatchEvent(new UmbPropertyValueChangeEvent());
        }
    }

    #onChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        const currentVal = (this.value === 'SideBySide') ? 'SideBySide' : 'Stacked';
        return html`
            <div class="picker">
                <label>
                    <input type="radio" name="layout" value="Stacked" .checked=${currentVal === 'Stacked'} @change=${this.#onChange}>
                    <div class="box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="4" y="4" width="16" height="6" rx="1"></rect>
                            <rect x="4" y="14" width="16" height="6" rx="1"></rect>
                        </svg>
                    </div>
                    <span>Stacked</span>
                </label>
                <label>
                    <input type="radio" name="layout" value="SideBySide" .checked=${currentVal === 'SideBySide'} @change=${this.#onChange}>
                    <div class="box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="4" y="4" width="7" height="16" rx="1"></rect>
                            <rect x="13" y="4" width="7" height="16" rx="1"></rect>
                        </svg>
                    </div>
                    <span>Side-by-side</span>
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
            height: 48px;
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

customElements.define('component-layout-picker', ComponentLayoutPicker);
