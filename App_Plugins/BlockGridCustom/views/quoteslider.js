import { BaseGridComponentBlockView } from '../base-view.js';

export default class QuotesliderBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/quoteslider.svg';
    defaultTitle = 'QuoteSlider Component';

    variants = [
        {
            name: 'Executive Quotes & Values Carousel',
            description: 'Interactive carousel displaying large-format leadership quotes, core company principles, and testimonial highlights.',
            image: '/thumbnails/quoteslider.jpg'
        }
    ];
}
customElements.define('grid-quoteslider-view', QuotesliderBlockView);
