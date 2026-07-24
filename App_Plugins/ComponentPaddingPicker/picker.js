import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentPaddingPicker extends UmbElementMixin(LitElement) {
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
                    <input type="radio" name="padding" value="none" .checked=${this.value === 'none'} @change=${this.#onChange}>
                    <div class="box none">
                        <div class="inner">Content</div>
                    </div>
                    <span>None</span>
                </label>
                <label>
                    <input type="radio" name="padding" value="small" .checked=${this.value === 'small'} @change=${this.#onChange}>
                    <div class="box small">
                        <div class="inner">Content</div>
                    </div>
                    <span>Small</span>
                </label>
                <label>
                    <input type="radio" name="padding" value="medium" .checked=${this.value === 'medium' || !this.value} @change=${this.#onChange}>
                    <div class="box medium">
                        <div class="inner">Content</div>
                    </div>
                    <span>Medium</span>
                </label>
                <label>
                    <input type="radio" name="padding" value="large" .checked=${this.value === 'large'} @change=${this.#onChange}>
                    <div class="box large">
                        <div class="inner">Content</div>
                    </div>
                    <span>Large</span>
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
            width: 80px;
            height: 100px;
            background: var(--uui-color-surface-alt, #f9f9fc);
            border: 2px solid transparent;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            position: relative;
            box-sizing: border-box;
            transition: all 150ms ease;
            overflow: hidden;
        }
        input:checked + .box {
            background: var(--uui-color-surface-alt-hover, #f0f0f5);
            border-color: var(--uui-color-interactive, #1a2a4f);
        }
        .inner {
            background: var(--uui-color-interactive, #1a2a4f);
            color: white;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 150ms ease;
            opacity: 0.5;
            width: 100%;
        }
        input:checked + .box .inner {
            opacity: 1;
        }
        
        /* Padding variations */
        .none { justify-content: stretch; }
        .none .inner { height: 100%; border-radius: 0; }
        
        .small { justify-content: center; padding: 10px 0; }
        .small .inner { height: 76px; }
        
        .medium { justify-content: center; padding: 25px 0; }
        .medium .inner { height: 46px; }
        
        .large { justify-content: center; padding: 40px 0; }
        .large .inner { height: 16px; color: transparent; }

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

customElements.define('component-padding-picker', ComponentPaddingPicker);
