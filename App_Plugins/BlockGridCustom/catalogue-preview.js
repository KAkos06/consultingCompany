/**
 * Block Catalogue Visual Preview Injector for Umbraco 17
 * Injects an Eye preview icon into the top-right corner of each card in the Block Catalogue modal.
 * Stops click propagation to prevent selecting/inserting the block when opening the preview.
 */

import { getComponentMetadata } from './components-registry.js';
import { openBlockPreview } from './preview-modal.js';

const EYE_ICON_SVG = `
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
</svg>
`;

function createPreviewEyeButton(card) {
    const btn = document.createElement('button');
    btn.className = 'catalogue-preview-eye-btn';
    btn.type = 'button';
    btn.setAttribute('tabindex', '0');
    btn.innerHTML = EYE_ICON_SVG;

    const updateTitle = () => {
        const name = card.name || card.getAttribute('name') || 'Component';
        btn.title = `View ${name} preview`;
        btn.setAttribute('aria-label', `View ${name} preview`);
    };
    updateTitle();

    // High quality styling matching Umbraco 17 Dark / Accent Theme
    btn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(18, 26, 44, 0.88);
        border: 1px solid rgba(46, 160, 67, 0.55);
        color: #2ea043;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 100;
        padding: 0;
        outline: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
        transition: all 180ms cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
    `;

    btn.addEventListener('mouseenter', () => {
        btn.style.background = '#2ea043';
        btn.style.color = '#ffffff';
        btn.style.transform = 'scale(1.14)';
        btn.style.boxShadow = '0 3px 12px rgba(46, 160, 67, 0.5)';
        btn.style.borderColor = '#2ea043';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.background = 'rgba(18, 26, 44, 0.88)';
        btn.style.color = '#2ea043';
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.35)';
        btn.style.borderColor = 'rgba(46, 160, 67, 0.55)';
    });

    btn.addEventListener('focus', () => {
        btn.style.borderColor = '#2ea043';
        btn.style.boxShadow = '0 0 0 2px rgba(46, 160, 67, 0.4)';
    });

    btn.addEventListener('blur', () => {
        btn.style.borderColor = 'rgba(46, 160, 67, 0.55)';
        btn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.35)';
    });

    const stopPropagationAndHandle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    };

    // Capture phase intercepts prevent the card's #open-part button from ever triggering selection
    btn.addEventListener('pointerdown', stopPropagationAndHandle, { capture: true });
    btn.addEventListener('mousedown', stopPropagationAndHandle, { capture: true });
    btn.addEventListener('mouseup', stopPropagationAndHandle, { capture: true });
    btn.addEventListener('touchstart', stopPropagationAndHandle, { capture: true });
    btn.addEventListener('touchend', stopPropagationAndHandle, { capture: true });

    const triggerPreview = (e) => {
        stopPropagationAndHandle(e);
        const name = card.name || card.getAttribute('name') || '';
        const meta = getComponentMetadata(name);
        openBlockPreview(meta.title || name, meta.variants, 0);
    };

    btn.addEventListener('click', triggerPreview, { capture: true });
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            triggerPreview(e);
        }
    }, { capture: true });

    return btn;
}

function attachButtonToCard(card) {
    if (!card) return;

    // Must have a shadowRoot
    if (!card.shadowRoot) {
        if (card.updateComplete) {
            card.updateComplete.then(() => attachButtonToCard(card));
        }
        return;
    }

    // Don't re-add if already exists
    if (card.shadowRoot.querySelector('.catalogue-preview-eye-btn')) {
        return;
    }

    // Ensure parent card has positioning context
    card.style.position = 'relative';

    const btn = createPreviewEyeButton(card);
    card.shadowRoot.appendChild(btn);
}

function scanAndAttachInRoot(root) {
    if (!root) return;

    try {
        if (root.tagName && root.tagName.toLowerCase() === 'uui-card-block-type') {
            attachButtonToCard(root);
        }

        if (root.shadowRoot) {
            scanAndAttachInRoot(root.shadowRoot);
        }

        const cards = root.querySelectorAll ? root.querySelectorAll('uui-card-block-type') : [];
        for (const card of cards) {
            attachButtonToCard(card);
        }

        // Also inspect any modals
        const modals = root.querySelectorAll ? root.querySelectorAll('umb-block-catalogue-modal, [element-name="umb-block-catalogue-modal"]') : [];
        for (const modal of modals) {
            if (modal.shadowRoot) {
                scanAndAttachInRoot(modal.shadowRoot);
                observeModalShadow(modal);
            }
        }
    } catch (e) {
        // Safe fail
    }
}

const observedModals = new WeakSet();

function observeModalShadow(modal) {
    if (!modal || !modal.shadowRoot || observedModals.has(modal)) return;
    observedModals.add(modal);

    const observer = new MutationObserver(() => {
        scanAndAttachInRoot(modal.shadowRoot);
    });

    observer.observe(modal.shadowRoot, {
        childList: true,
        subtree: true
    });
}

function hookWebComponents() {
    // 1. Hook uui-card-block-type prototype
    const hookCard = (cls) => {
        if (!cls || cls._cataloguePreviewHooked) return;
        cls._cataloguePreviewHooked = true;

        const origUpdated = cls.prototype.updated;
        cls.prototype.updated = function(changedProps) {
            if (origUpdated) origUpdated.call(this, changedProps);
            attachButtonToCard(this);
        };

        const origFirstUpdated = cls.prototype.firstUpdated;
        cls.prototype.firstUpdated = function(props) {
            if (origFirstUpdated) origFirstUpdated.call(this, props);
            attachButtonToCard(this);
        };
    };

    const cardCls = customElements.get('uui-card-block-type');
    if (cardCls) {
        hookCard(cardCls);
    } else {
        customElements.whenDefined('uui-card-block-type').then(hookCard);
    }

    // 2. Hook umb-block-catalogue-modal prototype
    const hookModal = (cls) => {
        if (!cls || cls._cataloguePreviewHooked) return;
        cls._cataloguePreviewHooked = true;

        const origUpdated = cls.prototype.updated;
        cls.prototype.updated = function(changedProps) {
            if (origUpdated) origUpdated.call(this, changedProps);
            if (this.shadowRoot) {
                scanAndAttachInRoot(this.shadowRoot);
                observeModalShadow(this);
            }
        };
    };

    const modalCls = customElements.get('umb-block-catalogue-modal');
    if (modalCls) {
        hookModal(modalCls);
    } else {
        customElements.whenDefined('umb-block-catalogue-modal').then(hookModal);
    }
}

// 3. Global document MutationObserver to detect modal mountings
function startGlobalObserver() {
    const observer = new MutationObserver((mutations) => {
        for (const mut of mutations) {
            for (const node of mut.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    scanAndAttachInRoot(node);
                }
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial pass
    scanAndAttachInRoot(document.body);
}

// Initialize immediately
hookWebComponents();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startGlobalObserver);
} else {
    startGlobalObserver();
}

console.log('✓ BlockGridCustom: Catalogue Preview Eye Buttons initialized.');
