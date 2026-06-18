import { Block } from 'payload'
import { thumbnails } from './thumbnails'

export const QuoteSliderBlock: Block = {
  slug: 'quoteSlider',
  imageURL: thumbnails.quoteSlider,
  imageAltText: 'Quote Slider Section',
  labels: {
    singular: 'Quote Slider Section',
    plural: 'Quote Slider Sections',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Slider elemek',
      minRows: 1,
      maxRows: 8,
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'Award',
          options: ['Quote', 'Award', 'TrendingUp', 'Users'],
          required: true,
        },
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'desc',
          type: 'text',
          label: 'Description',
          required: true,
        },
      ],
    },
  ],
}
