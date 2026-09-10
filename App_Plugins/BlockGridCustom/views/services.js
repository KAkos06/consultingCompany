import { BaseGridComponentBlockView } from '../base-view.js';

export default class ServicesBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/services.svg';
    defaultTitle = 'Services Component';
}
customElements.define('grid-services-view', ServicesBlockView);
