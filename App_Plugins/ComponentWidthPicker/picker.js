import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentWidthPicker extends UmbElementMixin(LitElement) {
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
                    <input type="radio" name="width" value="center" .checked=${this.value === 'center'} @change=${this.#onChange}>
                    <div class="box center">
                        <div class="inner"></div>
                    </div>
                    <span>Center</span>
                </label>
                <label>
                    <input type="radio" name="width" value="wide" .checked=${this.value === 'wide' || !this.value} @change=${this.#onChange}>
                    <div class="box wide">
                        <div class="inner"></div>
                    </div>
                    <span>Wide</span>
                </label>
                <label>
                    <input type="radio" name="width" value="full" .checked=${this.value === 'full'} @change=${this.#onChange}>
                    <div class="box full">
                        <div class="inner"></div>
                    </div>
                    <span>Full</span>
                </label>
            </div>
        `;
    }

    static styles = css`
        .picker { display: flex; gap: 1rem; }
        label {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        input { display: none; }
        .box {
            width: 100px;
            height: 60px;
            background: var(--uui-color-surface-alt, #f9f9fc);
            border: 2px solid transparent;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-sizing: border-box;
            transition: all 150ms ease;
        }
        input:checked + .box {
            background: var(--uui-color-surface-alt-hover, #f0f0f5);
            border-color: var(--uui-color-interactive, #1a2a4f);
        }
        .inner {
            border: 1px solid var(--uui-color-interactive, #1a2a4f);
            border-radius: 2px;
            height: 30px;
            box-sizing: border-box;
            transition: all 150ms ease;
            opacity: 0.4;
        }
        input:checked + .box .inner {
            opacity: 1;
            border-width: 2px;
        }
        .center .inner { width: 30px; }
        .wide .inner { width: 60px; }
        .full .inner { 
            width: 100px; 
            border-radius: 0; 
            border-left: none; 
            border-right: none; 
        }
        .full::before, .full::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 1px;
            background: var(--uui-color-interactive, #1a2a4f);
            opacity: 0.4;
            transition: all 150ms ease;
        }
        input:checked + .box.full::before,
        input:checked + .box.full::after {
            opacity: 1;
            height: 2px;
        }
        .full::before { top: 6px; }
        .full::after { bottom: 6px; }

        span {
            font-size: 12px;
            font-weight: 600;
            color: var(--uui-color-text, #666);
            text-transform: uppercase;
        }
        input:checked ~ span {
            color: var(--uui-color-interactive, #1a2a4f);
        }
    `;
}

customElements.define('component-width-picker', ComponentWidthPicker);
