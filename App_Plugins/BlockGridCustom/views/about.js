import { BaseGridComponentBlockView } from '../base-view.js';

export default class AboutBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/about.svg';
    defaultTitle = 'About Component';

    variants = [
        {
            name: 'About Showcase & Floating Stat Card',
            description: 'Large feature image with a floating statistical highlight card on the left, value propositions and CTA button on the right.',
            image: '/thumbnails/about.jpg'
        }
    ];
}
customElements.define('grid-about-view', AboutBlockView);
