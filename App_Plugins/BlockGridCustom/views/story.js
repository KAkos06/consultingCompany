import { BaseGridComponentBlockView } from '../base-view.js';

export default class StoryBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/story.svg';
    defaultTitle = 'Story Component';

    variants = [
        {
            name: 'Brand Story & Mission Statement',
            description: 'Thoughtfully structured narrative section presenting the organization\'s origin, mission statement, and core philosophy.',
            image: '/thumbnails/story.jpg'
        }
    ];
}
customElements.define('grid-story-view', StoryBlockView);
