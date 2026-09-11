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
                    <div class="box pad-none">
                        <div class="inner">Content</div>
                    </div>
                    <span>None</span>
                </label>
                <label>
                    <input type="radio" name="padding" value="small" .checked=${this.value === 'small'} @change=${this.#onChange}>
                    <div class="box pad-small">
                        <div class="inner">Content</div>
                    </div>
                    <span>Small</span>
                </label>
                <label>
                    <input type="radio" name="padding" value="medium" .checked=${this.value === 'medium'} @change=${this.#onChange}>
                    <div class="box pad-medium">
                        <div class="inner">Content</div>
                    </div>
                    <span>Medium</span>
                </label>
                <label>
                    <input type="radio" name="padding" value="large" .checked=${this.value === 'large'} @change=${this.#onChange}>
                    <div class="box pad-large">
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
            background: var(--uui-color-surface-alt, #2d333b);
            border: 2px solid var(--uui-color-border, #434c56);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            position: relative;
            box-sizing: border-box;
            transition: all 150ms ease;
            overflow: hidden;
        }
        label:hover .box {
            border-color: var(--uui-color-border-emphasis, #626e7b);
        }
        input:checked + .box {
            background: var(--uui-color-surface-alt, #2d333b);
            border-color: var(--uui-color-selected, #316dca);
        }
        .inner {
            background: var(--uui-color-text-alt, #8c8c8e);
            color: var(--uui-color-text, #eeeeef);
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 150ms ease;
            opacity: 0.4;
            width: 100%;
        }
        input:checked + .box .inner {
            background: var(--uui-color-selected, #316dca);
            color: var(--uui-color-selected-contrast, #ffffff);
            opacity: 1;
            font-weight: 600;
        }
        
        /* Padding variations */
        .pad-none { justify-content: stretch; }
        .pad-none .inner { height: 100%; border-radius: 0; }
        
        .pad-small { justify-content: center; padding: 10px 0; }
        .pad-small .inner { height: 76px; }
        
        .pad-medium { justify-content: center; padding: 25px 0; }
        .pad-medium .inner { height: 46px; }
        
        .pad-large { justify-content: center; padding: 40px 0; }
        .pad-large .inner { height: 20px; line-height: 1; }

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

customElements.define('component-padding-picker', ComponentPaddingPicker);
