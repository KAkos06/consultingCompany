import { CollectionConfig } from 'payload';
import { OneColumnBlock } from '../blocks/OneColumnBlock';
import { TwoColumnBlock } from '../blocks/TwoColumnBlock';
import { ThreeColumnBlock } from '../blocks/ThreeColumnBlock';
import { contentBlocks } from '../blocks/contentBlocks';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Tartalom',
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
        OneColumnBlock,
        TwoColumnBlock,
        ThreeColumnBlock,
      ],
      required: true,
    },
  ],
};
