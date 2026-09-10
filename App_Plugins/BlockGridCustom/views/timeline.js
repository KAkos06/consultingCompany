import { BaseGridComponentBlockView } from '../base-view.js';

export default class TimelineBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/timeline.svg';
    defaultTitle = 'Timeline Component';
}
customElements.define('grid-timeline-view', TimelineBlockView);
