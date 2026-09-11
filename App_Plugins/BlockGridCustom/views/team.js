import { BaseGridComponentBlockView } from '../base-view.js';

export default class TeamBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/team.svg';
    defaultTitle = 'Team Component';

    variants = [
        {
            name: '1. Portrait Cards (Modern Editorial)',
            description: 'Magazine-style rectangular portraits with clean lower information blocks, roles, bios, and social links.',
            image: '/thumbnails/team-portrait.jpg'
        },
        {
            name: '2. Classic Avatars (Centered)',
            description: 'Centered round portrait avatars with executive names, job titles, concise bios, and social links.',
            image: '/thumbnails/team-classic.jpg'
        }
    ];
}
customElements.define('grid-team-view', TeamBlockView);
