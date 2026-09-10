import { BaseGridComponentBlockView } from '../base-view.js';

export default class StoryBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/story.svg';
    defaultTitle = 'Story Component';
}
customElements.define('grid-story-view', StoryBlockView);
