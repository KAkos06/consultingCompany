import { BaseGridComponentBlockView } from '../base-view.js';

export default class TestimonialsBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/testimonials.svg';
    defaultTitle = 'Testimonials Component';
}
customElements.define('grid-testimonials-view', TestimonialsBlockView);
