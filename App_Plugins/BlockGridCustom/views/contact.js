import { BaseGridComponentBlockView } from '../base-view.js';

export default class ContactBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/contact.svg';
    defaultTitle = 'Contact Component';

    variants = [
        {
            name: 'Contact Information & Inquiry Form',
            description: 'Direct communication cards (email, phone, corporate headquarters) alongside an embedded consultation form.',
            image: '/thumbnails/contact.jpg'
        }
    ];
}
customElements.define('grid-contact-view', ContactBlockView);
