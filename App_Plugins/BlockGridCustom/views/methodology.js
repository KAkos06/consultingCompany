import { BaseGridComponentBlockView } from '../base-view.js';

export default class MethodologyBlockView extends BaseGridComponentBlockView {
    thumbnailUrl = '/thumbnails/methodology.svg';
    defaultTitle = 'Methodology Component';

    variants = [
        {
            name: 'Four-Step Methodology',
            description: '4 structured sequential steps (Diagnostics, Alignment, Coaching, Measurement) with an action banner.',
            image: '/thumbnails/methodology.jpg'
        }
    ];
}
customElements.define('grid-methodology-view', MethodologyBlockView);
