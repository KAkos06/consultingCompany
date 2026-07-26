import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentAlignmentPicker extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: String }
    };

    constructor() {
        super();
        this.value = "Left";
    }

    #onChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        return html`
            <div class="picker">
                <label>
                    <input type="radio" name="alignment" value="Left" .checked=${this.value === 'Left'} @change=${this.#onChange}>
                    <div class="box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 10H3M21 6H3M21 14H3M17 18H3"/></svg>
                    </div>
                    <span>Left</span>
                </label>
                <label>
                    <input type="radio" name="alignment" value="Center" .checked=${this.value === 'Center'} @change=${this.#onChange}>
                    <div class="box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10H6M21 6H3M21 14H3M18 18H6"/></svg>
                    </div>
                    <span>Center</span>
                </label>
                <label>
                    <input type="radio" name="alignment" value="Right" .checked=${this.value === 'Right'} @change=${this.#onChange}>
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

customElements.define('component-alignment-picker', ComponentAlignmentPicker);
