import { BaseGridComponentBlockView } from '../base-view.js';

export default class TeamBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/team.svg';
    defaultTitle = 'Team Component';
}
customElements.define('grid-team-view', TeamBlockView);
