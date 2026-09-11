import { BaseGridComponentBlockView } from '../base-view.js';

export default class HeroBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/hero.svg';
    defaultTitle = 'Hero Component';

    variants = [
        {
            name: 'Hero Slider (Featured Opening Section)',
            description: 'High-impact headline, subheadline, primary CTA buttons, and 3 key fast-statistic metrics for the top of the page.',
            image: '/thumbnails/hero.jpg'
        }
    ];
}
customElements.define('grid-hero-view', HeroBlockView);
