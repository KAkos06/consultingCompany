import { BaseGridComponentBlockView } from '../base-view.js';

export default class StatsBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/stats.svg';
    defaultTitle = 'Stats Component';
}
customElements.define('grid-stats-view', StatsBlockView);
