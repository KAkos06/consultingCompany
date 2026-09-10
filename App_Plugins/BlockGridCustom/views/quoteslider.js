import { BaseGridComponentBlockView } from '../base-view.js';

export default class QuotesliderBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/quoteslider.svg';
    defaultTitle = 'QuoteSlider Component';
}
customElements.define('grid-quoteslider-view', QuotesliderBlockView);
