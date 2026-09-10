import { BaseGridComponentBlockView } from '../base-view.js';

export default class HeroBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/hero.svg';
    defaultTitle = 'Hero Component';
}
customElements.define('grid-hero-view', HeroBlockView);
