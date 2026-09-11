import { BaseGridComponentBlockView } from '../base-view.js';

export default class TimelineBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/timeline.svg';
    defaultTitle = 'Timeline Component';

    variants = [
        {
            name: 'Milestones & Evolution Timeline',
            description: 'Strategic growth timeline connecting chronological milestones along an interactive pathway.',
            image: '/thumbnails/timeline.jpg'
        }
    ];
}
customElements.define('grid-timeline-view', TimelineBlockView);
