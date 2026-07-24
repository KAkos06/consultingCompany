import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentColorPicker extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: String }
    };

    constructor() {
        super();
        this.value = "";
    }

    #onChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        return html`
            <div class="picker">
                <label>
                    <input type="radio" name="color" value="cream" .checked=${this.value === 'cream' || !this.value} @change=${this.#onChange}>
                    <div class="box cream"></div>
                    <span>Cream</span>
                </label>
                <label>
                    <input type="radio" name="color" value="warm" .checked=${this.value === 'warm'} @change=${this.#onChange}>
                    <div class="box warm"></div>
                    <span>Warm</span>
                </label>
                <label>
                    <input type="radio" name="color" value="dark" .checked=${this.value === 'dark'} @change=${this.#onChange}>
                    <div class="box dark"></div>
                    <span>Dark</span>
                </label>
                <label>
                    <input type="radio" name="color" value="solidDark" .checked=${this.value === 'solidDark'} @change=${this.#onChange}>
                    <div class="box solidDark"></div>
                    <span>Solid Dark</span>
                </label>
            </div>
        `;
    }

    static styles = css`
        .picker { display: flex; gap: 1.5rem; flex-wrap: wrap; padding: 5px; }
        label {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        input { display: none; }
        .box {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            border: 2px solid transparent;
            box-sizing: border-box;
            transition: all 150ms ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        input:checked + .box {
            border-color: var(--uui-color-interactive, #1a2a4f);
            box-shadow: 0 0 0 2px white, 0 0 0 4px var(--uui-color-interactive, #1a2a4f);
        }
        .cream { 
            background-color: #FFF2EF; 
            border: 1px solid #e5e7eb;
        }
        .warm { 
            background: linear-gradient(to bottom right, rgba(255,219,182,0.8), #FFF2EF, rgba(247,165,165,0.6)); 
            border: 1px solid #e5e7eb;
        }
        .dark { 
            background-color: #1A2A4F; 
            background-image: radial-gradient(ellipse at 15% 10%, rgba(247,165,165,0.25) 0%, transparent 55%);
        }
        .solidDark { 
            background-color: #1A2A4F; 
        }

        span {
            font-size: 12px;
            font-weight: 600;
            color: var(--uui-color-text, #666);
            text-transform: uppercase;
            margin-top: 4px;
        }
        input:checked ~ span {
            color: var(--uui-color-interactive, #1a2a4f);
        }
    `;
}

customElements.define('component-color-picker', ComponentColorPicker);
