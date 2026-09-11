import { BaseGridComponentBlockView } from '../base-view.js';

export default class ServicesBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/services.svg';
    defaultTitle = 'Services Component';

    variants = [
        {
            name: 'Services Grid (3-Column)',
            description: '3-column service cards featuring custom iconography, category tags, concise descriptions, and direct navigation links.',
            image: '/thumbnails/services.jpg'
        }
    ];
}
customElements.define('grid-services-view', ServicesBlockView);
