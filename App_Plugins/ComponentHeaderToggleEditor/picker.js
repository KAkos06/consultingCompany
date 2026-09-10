import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { UmbChangeEvent } from "@umbraco-cms/backoffice/event";

export default class ComponentHeaderToggleEditor extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: Boolean }
    };

    constructor() {
        super();
        this._value = false;
        this._observer = null;
        this._observerContainer = null;
    }

    get value() {
        return this._value;
    }

    set value(v) {
        const oldVal = this._value;
        if (typeof v === 'string') {
            this._value = v === '1' || v.toLowerCase() === 'true';
        } else if (typeof v === 'boolean') {
            this._value = v;
        } else if (typeof v === 'number') {
            this._value = v === 1;
        } else {
            this._value = false;
        }
        this.requestUpdate('value', oldVal);
        this.#updateVisibility();
    }

    connectedCallback() {
        super.connectedCallback();
        
        if (typeof this.value === 'string') {
            this._value = this.value === '1' || this.value.toLowerCase() === 'true';
        } else if (typeof this.value === 'boolean') {
            this._value = this.value;
        } else if (typeof this.value === 'number') {
            this._value = this.value === 1;
        } else {
            this._value = false;
        }

        const runUpdate = () => this.#updateVisibility();
        runUpdate();
        requestAnimationFrame(runUpdate);
        setTimeout(runUpdate, 50);
        setTimeout(runUpdate, 150);
        setTimeout(runUpdate, 300);
        setTimeout(runUpdate, 600);
        setTimeout(runUpdate, 1200);
    }

    firstUpdated() {
        this.#updateVisibility();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
            this._observerContainer = null;
        }
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('value')) {
            this.#updateVisibility();
        }
    }

    #onChange(e) {
        this.value = e.target.checked;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
        this.dispatchEvent(new UmbChangeEvent());
        this.#updateVisibility();
    }

    #findRowAndSiblings() {
        let current = this;

        while (current && current !== document.body && current !== document.documentElement) {
            const parent = current.parentNode || (current.getRootNode && typeof current.getRootNode === 'function' ? current.getRootNode() : null);
            if (parent) {
                const children = Array.from(parent.children || []);
                const propSiblings = children.filter(child => {
                    const tag = (child.tagName || '').toLowerCase();
                    return tag === 'umb-block-workspace-view-edit-property' ||
                           tag === 'umb-property-type-based-property' ||
                           tag === 'umb-property' ||
                           child.classList?.contains('property');
                });

                if (propSiblings.length > 1 && propSiblings.includes(current)) {
                    return { row: current, container: parent, siblings: propSiblings };
                }
            }

            if (current.parentElement) {
                current = current.parentElement;
            } else if (current.parentNode && current.parentNode.host) {
                current = current.parentNode.host;
            } else if (current.getRootNode && current.getRootNode().host) {
                current = current.getRootNode().host;
            } else {
                current = current.parentNode;
            }
        }

        return null;
    }

    #updateVisibility() {
        const info = this.#findRowAndSiblings();
        if (!info) {
            return;
        }

        const { row, container, siblings } = info;

        if (this._observerContainer !== container && container) {
            if (this._observer) {
                this._observer.disconnect();
            }
            this._observerContainer = container;
            this._observer = new MutationObserver(() => {
                const refreshed = this.#findRowAndSiblings();
                if (refreshed) {
                    this.#applyVisibility(refreshed.row, refreshed.siblings);
                }
            });
            this._observer.observe(container, { childList: true });
        }

        this.#applyVisibility(row, siblings);
    }

    #applyVisibility(row, siblings) {
        const isVisible = Boolean(this._value);
        siblings.forEach(child => {
            if (child !== row) {
                if (isVisible) {
                    child.style.removeProperty('display');
                    child.removeAttribute('inert');
                    child.style.removeProperty('pointer-events');
                    child.style.removeProperty('opacity');
                } else {
                    child.style.setProperty('display', 'none', 'important');
                    child.setAttribute('inert', '');
                    child.style.setProperty('pointer-events', 'none');
                    child.style.setProperty('opacity', '0');
                }
            }
        });
    }

    render() {
        return html`
            <uui-toggle ?checked=${this._value} @change=${this.#onChange} label="Show Header Options"></uui-toggle>
        `;
    }
}

customElements.define('component-header-toggle-editor', ComponentHeaderToggleEditor);
