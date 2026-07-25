import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentLayoutPicker extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: String }
    };

    constructor() {
        super();
        this.value = "Stacked";
    }

    #onChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        return html`
            <div class="picker">
                <label>
                    <input type="radio" name="layout" value="Stacked" .checked=${this.value === 'Stacked' || !this.value} @change=${this.#onChange}>
                    <div class="box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="4" y="4" width="16" height="6" rx="1"></rect>
                            <rect x="4" y="14" width="16" height="6" rx="1"></rect>
                        </svg>
                    </div>
                    <span>Stacked</span>
                </label>
                <label>
                    <input type="radio" name="layout" value="SideBySide" .checked=${this.value === 'SideBySide'} @change=${this.#onChange}>
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
            background: var(--uui-color-surface-alt, #f9f9fc);
            border: 2px solid transparent;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 150ms ease;
            color: var(--uui-color-interactive, #1a2a4f);
            opacity: 0.6;
        }
        input:checked + .box {
            background: var(--uui-color-surface-alt-hover, #f0f0f5);
            border-color: var(--uui-color-interactive, #1a2a4f);
            opacity: 1;
        }
        span {
            font-size: 11px;
            font-weight: 600;
            color: var(--uui-color-text, #666);
            text-transform: uppercase;
        }
        input:checked ~ span {
            color: var(--uui-color-interactive, #1a2a4f);
        }
    `;
}

customElements.define('component-layout-picker', ComponentLayoutPicker);
