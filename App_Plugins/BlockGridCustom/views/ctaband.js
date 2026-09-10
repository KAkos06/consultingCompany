import { BaseGridComponentBlockView } from '../base-view.js';

export default class CtabandBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/ctaband.svg';
    defaultTitle = 'CtaBand Component';
}
customElements.define('grid-ctaband-view', CtabandBlockView);
