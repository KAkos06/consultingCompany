import { BaseGridComponentBlockView } from '../base-view.js';

export default class AboutBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/about.svg';
    defaultTitle = 'About Component';
}
customElements.define('grid-about-view', AboutBlockView);
