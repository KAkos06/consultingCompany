import { LitElement, html, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";

export default class ComponentHeaderToggleEditor extends UmbElementMixin(LitElement) {
    static properties = {
        value: { type: Boolean }
    };

    constructor() {
        super();
        this.value = false;
    }

    connectedCallback() {
        super.connectedCallback();
        
        // Umbraco.TrueFalse usually sends "1" or "0" in older versions, or true/false
        if (typeof this.value === 'string') {
            this.value = this.value === '1' || this.value.toLowerCase() === 'true';
        } else if (this.value === undefined || this.value === null) {
            this.value = false;
        }

        // Wait for DOM to render the sibling properties
        setTimeout(() => this.#updateVisibility(), 150);
        setTimeout(() => this.#updateVisibility(), 500); // secondary check
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('value')) {
            this.#updateVisibility();
        }
    }

    #onChange(e) {
        this.value = e.target.checked;
        // Depending on Umbraco 14's strictness with TrueFalse schema, we might need to cast to "1"/"0", but usually boolean works.
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
        this.#updateVisibility();
    }

    #updateVisibility() {
        const hostProperty = this.#getHostProperty(this);
        if (!hostProperty) return;
        
        const parentContainer = hostProperty.parentElement;
        if (!parentContainer) return;
        
        // Iterate through all children of the parent container
        const children = Array.from(parentContainer.children);
        children.forEach(child => {
            if (child.tagName && (child.tagName.toLowerCase() === 'umb-property' || child.tagName.toLowerCase() === 'umb-property-layout')) {
                if (child !== hostProperty) {
                    // Hide or show
                    child.style.display = this.value ? '' : 'none';
                }
            }
        });
    }

    #getHostProperty(element) {
        let current = element;
        while (current) {
            if (current.tagName && (current.tagName.toLowerCase() === 'umb-property' || current.tagName.toLowerCase() === 'umb-property-layout')) {
                return current;
            }
            current = current.parentElement || (current.getRootNode && current.getRootNode().host);
        }
        return null;
    }

    render() {
        return html`
            <uui-toggle .checked=${this.value} @change=${this.#onChange} label="Show Header Options"></uui-toggle>
        `;
    }
}

customElements.define('component-header-toggle-editor', ComponentHeaderToggleEditor);
