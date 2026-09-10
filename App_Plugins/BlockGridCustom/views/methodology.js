import { BaseGridComponentBlockView } from '../base-view.js';

export default class MethodologyBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/methodology.svg';
    defaultTitle = 'Methodology Component';
}
customElements.define('grid-methodology-view', MethodologyBlockView);
