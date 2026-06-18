import { CollectionConfig } from 'payload';
import { HeroBlock } from '../blocks/HeroBlock';
import { QuoteSliderBlock } from '../blocks/QuoteSliderBlock';
import { ServicesBlock } from '../blocks/ServicesBlock';
import { AboutBlock } from '../blocks/AboutBlock';
import { MethodologyBlock } from '../blocks/MethodologyBlock';
import { TestimonialsBlock } from '../blocks/TestimonialsBlock';
import { ContactBlock } from '../blocks/ContactBlock';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' ? data.slug.trim() : ''

        if (!slug || slug === 'fooldal' || slug === 'home') {
          return 'http://localhost/'
        }

        return `http://localhost/${slug}`
      },
    },
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        QuoteSliderBlock,
        ServicesBlock,
        AboutBlock,
        MethodologyBlock,
        TestimonialsBlock,
        ContactBlock,
      ],
      required: true,
    },
  ],
};
