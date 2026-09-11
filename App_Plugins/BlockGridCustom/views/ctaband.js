import { BaseGridComponentBlockView } from '../base-view.js';

export default class CtabandBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/ctaband.svg';
    defaultTitle = 'CtaBand Component';

    variants = [
        {
            name: 'High-Impact Call to Action Band',
            description: 'Full-width or framed conversion banner featuring strong headline copy and primary/secondary action buttons.',
            image: '/thumbnails/ctaband.jpg'
        }
    ];
}
customElements.define('grid-ctaband-view', CtabandBlockView);
