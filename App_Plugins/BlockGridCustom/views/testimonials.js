import { BaseGridComponentBlockView } from '../base-view.js';

export default class TestimonialsBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/testimonials.svg';
    defaultTitle = 'Testimonials Component';

    variants = [
        {
            name: 'Client Testimonials & Endorsements',
            description: 'Featured executive and enterprise partner reviews in cards, including reviewer names, positions, and star ratings.',
            image: '/thumbnails/testimonials.jpg'
        }
    ];
}
customElements.define('grid-testimonials-view', TestimonialsBlockView);
