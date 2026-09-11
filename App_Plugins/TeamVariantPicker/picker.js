import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class TeamVariantPicker extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: String }
    };

    constructor() {
        super();
        this._value = "classic";
    }

    get value() {
        return this._value || "classic";
    }

    set value(v) {
        const oldVal = this._value;
        this._value = (v === "portrait") ? "portrait" : "classic";
        this.requestUpdate('value', oldVal);
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this._value || (this._value !== "classic" && this._value !== "portrait")) {
            this._value = "classic";
            this.dispatchEvent(new UmbPropertyValueChangeEvent());
        }
    }

    #onChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        const currentVal = (this.value === 'portrait') ? 'portrait' : 'classic';

        return html`
            <div class="picker-container">
                <!-- Variant 1: Classic Avatar -->
                <label class="variant-option">
                    <input 
                        type="radio" 
                        name="teamVariant" 
                        value="classic" 
                        .checked=${currentVal === 'classic'} 
                        @change=${this.#onChange} 
                    />
                    <div class="card-box">
                        <svg class="preview-svg" width="70" height="84" viewBox="0 0 70 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Card Container -->
                            <rect x="1" y="1" width="68" height="82" rx="7" class="svg-card-bg" stroke="currentColor" stroke-width="1.5" />
                            <!-- Circular Avatar -->
                            <circle cx="35" cy="27" r="14" class="svg-avatar" />
                            <circle cx="35" cy="24" r="5.5" class="svg-avatar-inner" />
                            <path d="M26 38 C26 32, 44 32, 44 38" class="svg-avatar-inner" />
                            <!-- Name line -->
                            <rect x="17" y="49" width="36" height="4.5" rx="2" class="svg-text-primary" />
                            <!-- Role line -->
                            <rect x="23" y="58" width="24" height="3" rx="1.5" class="svg-text-accent" />
                            <!-- Bio lines -->
                            <rect x="13" y="66" width="44" height="2.5" rx="1" class="svg-text-muted" />
                            <rect x="18" y="71" width="34" height="2.5" rx="1" class="svg-text-muted" />
                        </svg>
                        <div class="selected-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div class="label-info">
                        <span class="title">Classic Avatar</span>
                        <span class="subtitle">Round photo, centered layout</span>
                    </div>
                </label>

                <!-- Variant 2: Portrait Card -->
                <label class="variant-option">
                    <input 
                        type="radio" 
                        name="teamVariant" 
                        value="portrait" 
                        .checked=${currentVal === 'portrait'} 
                        @change=${this.#onChange} 
                    />
                    <div class="card-box">
                        <svg class="preview-svg" width="70" height="84" viewBox="0 0 70 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Card Container -->
                            <rect x="1" y="1" width="68" height="82" rx="7" class="svg-card-bg" stroke="currentColor" stroke-width="1.5" />
                            <!-- Top Rectangular Photo -->
                            <path d="M1 8 C1 4.13 4.13 1 8 1 H62 C65.87 1 69 4.13 69 8 V45 H1 Z" class="svg-image-block" />
                            <!-- Photo icon indicator inside top photo -->
                            <circle cx="35" cy="20" r="5" class="svg-avatar-inner" />
                            <path d="M25 35 C25 29, 45 29, 45 35" class="svg-avatar-inner" />
                            <!-- Role line -->
                            <rect x="8" y="51" width="22" height="3" rx="1.5" class="svg-text-accent" />
                            <!-- Name line -->
                            <rect x="8" y="58" width="38" height="4.5" rx="2" class="svg-text-primary" />
                            <!-- Bio lines -->
                            <rect x="8" y="67" width="54" height="2.5" rx="1" class="svg-text-muted" />
                            <rect x="8" y="72" width="42" height="2.5" rx="1" class="svg-text-muted" />
                        </svg>
                        <div class="selected-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div class="label-info">
                        <span class="title">Portrait Card</span>
                        <span class="subtitle">Large top photo, elongated card</span>
                    </div>
                </label>
            </div>
        `;
    }

    static styles = css`
        .picker-container {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            align-items: flex-start;
            padding: 4px 0;
        }

        .variant-option {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 170px;
            gap: 0.65rem;
            text-align: center;
            user-select: none;
        }

        input {
            display: none;
        }

        .card-box {
            position: relative;
            width: 100%;
            height: 120px;
            background: var(--uui-color-surface-alt, #2d333b);
            border: 2px solid var(--uui-color-border, #434c56);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            transition: all 180ms ease;
            color: var(--uui-color-text-alt, #8c8c8e);
        }

        .variant-option:hover .card-box {
            border-color: var(--uui-color-border-emphasis, #626e7b);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        /* Checked / Selected styling */
        input:checked + .card-box {
            border-color: var(--uui-color-selected, #316dca);
            background: rgba(49, 109, 202, 0.08);
            box-shadow: 0 0 0 1px var(--uui-color-selected, #316dca), 0 4px 14px rgba(49, 109, 202, 0.18);
            color: var(--uui-color-selected, #316dca);
        }

        /* SVG internal element styles */
        .preview-svg {
            transition: transform 180ms ease;
        }

        .variant-option:hover .preview-svg {
            transform: scale(1.03);
        }

        .svg-card-bg {
            fill: var(--uui-color-surface, #1e293b);
        }

        .svg-avatar {
            fill: rgba(49, 109, 202, 0.25);
            stroke: var(--uui-color-selected, #316dca);
            stroke-width: 1;
        }

        .svg-avatar-inner {
            fill: var(--uui-color-selected, #316dca);
            opacity: 0.8;
        }

        .svg-image-block {
            fill: rgba(49, 109, 202, 0.25);
        }

        .svg-text-primary {
            fill: var(--uui-color-text, #eeeeef);
            opacity: 0.85;
        }

        .svg-text-accent {
            fill: var(--uui-color-selected, #316dca);
            opacity: 0.9;
        }

        .svg-text-muted {
            fill: var(--uui-color-text-alt, #8c8c8e);
            opacity: 0.45;
        }

        /* Selected Badge Indicator */
        .selected-badge {
            position: absolute;
            top: -7px;
            right: -7px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--uui-color-selected, #316dca);
            color: var(--uui-color-selected-contrast, #ffffff);
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        input:checked + .card-box .selected-badge {
            display: flex;
        }

        /* Label Information */
        .label-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
            align-items: center;
            width: 100%;
        }

        .title {
            font-size: 12px;
            font-weight: 600;
            color: var(--uui-color-text, #eeeeef);
            transition: color 180ms ease;
            letter-spacing: 0.2px;
        }

        input:checked ~ .label-info .title {
            color: var(--uui-color-selected, #316dca);
            font-weight: 700;
        }

        .subtitle {
            font-size: 10.5px;
            font-weight: 400;
            color: var(--uui-color-text-alt, #8c8c8e);
            line-height: 1.25;
            opacity: 0.8;
        }
    `;
}

customElements.define('team-variant-picker', TeamVariantPicker);
