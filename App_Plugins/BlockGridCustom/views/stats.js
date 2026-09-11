import { BaseGridComponentBlockView } from '../base-view.js';

export default class StatsBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/stats.svg';
    defaultTitle = 'Stats Component';

    variants = [
        {
            name: 'Key Statistics Strip',
            description: '4 prominent metric counters with concise explanations demonstrating measurable business results.',
            image: '/thumbnails/stats.jpg'
        }
    ];
}
customElements.define('grid-stats-view', StatsBlockView);
