/**
 * Central Component Registry for Umbraco 17 Block Grid Previews and Variants
 */
export const COMPONENT_VARIANTS_REGISTRY = {
    heroComponent: {
        title: 'Hero Component',
        aliases: ['hero', 'herocomponent', 'hero component', 'hero slider'],
        thumbnailUrl: '/thumbnails/hero.svg',
        variants: [
            {
                name: 'Hero Slider (Featured Opening Section)',
                description: 'High-impact headline, subheadline, primary CTA buttons, and 3 key fast-statistic metrics for the top of the page.',
                image: '/thumbnails/hero.jpg'
            }
        ]
    },
    aboutComponent: {
        title: 'About Component',
        aliases: ['about', 'aboutcomponent', 'about component'],
        thumbnailUrl: '/thumbnails/about.svg',
        variants: [
            {
                name: 'About Showcase & Floating Stat Card',
                description: 'Large feature image with a floating statistical highlight card on the left, value propositions and CTA button on the right.',
                image: '/thumbnails/about.jpg'
            }
        ]
    },
    servicesComponent: {
        title: 'Services Component',
        aliases: ['services', 'servicescomponent', 'services component'],
        thumbnailUrl: '/thumbnails/services.svg',
        variants: [
            {
                name: 'Services Grid (3-Column)',
                description: '3-column service cards featuring custom iconography, category tags, concise descriptions, and direct navigation links.',
                image: '/thumbnails/services.jpg'
            }
        ]
    },
    quoteSliderComponent: {
        title: 'QuoteSlider Component',
        aliases: ['quoteslider', 'quoteslidercomponent', 'quoteslider component'],
        thumbnailUrl: '/thumbnails/quoteslider.svg',
        variants: [
            {
                name: 'Executive Quotes & Values Carousel',
                description: 'Interactive carousel displaying large-format leadership quotes, core company principles, and testimonial highlights.',
                image: '/thumbnails/quoteslider.jpg'
            }
        ]
    },
    methodologyComponent: {
        title: 'Methodology Component',
        aliases: ['methodology', 'methodologycomponent', 'methodology component'],
        thumbnailUrl: '/thumbnails/methodology.svg',
        variants: [
            {
                name: 'Four-Step Methodology',
                description: '4 structured sequential steps (Diagnostics, Alignment, Coaching, Measurement) with an action banner.',
                image: '/thumbnails/methodology.jpg'
            }
        ]
    },
    testimonialsComponent: {
        title: 'Testimonials Component',
        aliases: ['testimonials', 'testimonialscomponent', 'testimonials component'],
        thumbnailUrl: '/thumbnails/testimonials.svg',
        variants: [
            {
                name: 'Client Testimonials & Endorsements',
                description: 'Featured executive and enterprise partner reviews in cards, including reviewer names, positions, and star ratings.',
                image: '/thumbnails/testimonials.jpg'
            }
        ]
    },
    statsComponent: {
        title: 'Stats Component',
        aliases: ['stats', 'statscomponent', 'stats component'],
        thumbnailUrl: '/thumbnails/stats.svg',
        variants: [
            {
                name: 'Key Statistics Strip',
                description: '4 prominent metric counters with concise explanations demonstrating measurable business results.',
                image: '/thumbnails/stats.jpg'
            }
        ]
    },
    contactComponent: {
        title: 'Contact Component',
        aliases: ['contact', 'contactcomponent', 'contact component'],
        thumbnailUrl: '/thumbnails/contact.svg',
        variants: [
            {
                name: 'Contact Information & Inquiry Form',
                description: 'Direct communication cards (email, phone, corporate headquarters) alongside an embedded consultation form.',
                image: '/thumbnails/contact.jpg'
            }
        ]
    },
    ctaBandComponent: {
        title: 'CtaBand Component',
        aliases: ['ctaband', 'ctabandcomponent', 'ctaband component', 'cta band'],
        thumbnailUrl: '/thumbnails/ctaband.svg',
        variants: [
            {
                name: 'High-Impact Call to Action Band',
                description: 'Full-width or framed conversion banner featuring strong headline copy and primary/secondary action buttons.',
                image: '/thumbnails/ctaband.jpg'
            }
        ]
    },
    storyComponent: {
        title: 'Story Component',
        aliases: ['story', 'storycomponent', 'story component'],
        thumbnailUrl: '/thumbnails/story.svg',
        variants: [
            {
                name: 'Brand Story & Mission Statement',
                description: 'Thoughtfully structured narrative section presenting the organization\'s origin, mission statement, and core philosophy.',
                image: '/thumbnails/story.jpg'
            }
        ]
    },
    teamComponent: {
        title: 'Team Component',
        aliases: ['team', 'teamcomponent', 'team component'],
        thumbnailUrl: '/thumbnails/team.svg',
        variants: [
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
        ]
    },
    timelineComponent: {
        title: 'Timeline Component',
        aliases: ['timeline', 'timelinecomponent', 'timeline component'],
        thumbnailUrl: '/thumbnails/timeline.svg',
        variants: [
            {
                name: 'Milestones & Evolution Timeline',
                description: 'Strategic growth timeline connecting chronological milestones along an interactive pathway.',
                image: '/thumbnails/timeline.jpg'
            }
        ]
    }
};

/**
 * Resolves component variants by name or alias.
 * @param {string} nameOrAlias
 * @returns {{ title: string, variants: Array<{ name: string, description: string, image: string }> }}
 */
export function getComponentMetadata(nameOrAlias) {
    if (!nameOrAlias) {
        return {
            title: 'Component',
            variants: [{ name: 'Component Preview', description: 'Component visual preview.', image: '/thumbnails/hero.jpg' }]
        };
    }

    const clean = String(nameOrAlias).trim().toLowerCase().replace(/[^a-z0-9]/g, '');

    for (const key of Object.keys(COMPONENT_VARIANTS_REGISTRY)) {
        const item = COMPONENT_VARIANTS_REGISTRY[key];
        const keyClean = key.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (keyClean === clean) return item;

        for (const alias of item.aliases) {
            const aliasClean = alias.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (aliasClean === clean || clean.includes(aliasClean) || aliasClean.includes(clean)) {
                return item;
            }
        }
    }

    // Default fallback
    return {
        title: String(nameOrAlias),
        variants: [
            {
                name: String(nameOrAlias),
                description: 'Component visual preview.',
                image: `/thumbnails/${clean.replace('component', '') || 'hero'}.jpg`
            }
        ]
    };
}
