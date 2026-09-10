import { BaseGridComponentBlockView } from '../base-view.js';

export default class ContactBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/contact.svg';
    defaultTitle = 'Contact Component';
}
customElements.define('grid-contact-view', ContactBlockView);
