import { Block } from 'payload';
import { thumbnails } from './thumbnails';

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  imageURL: thumbnails.testimonials,
  imageAltText: 'Testimonials Section',
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: ['cream', 'warm', 'dark'],
      defaultValue: 'dark',
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: '04 — Ügyfeleink mondták',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (Supports HTML like <span> for styling)',
      defaultValue: 'Valós kihívások,<br/><span class="italic font-medium text-[#FFF2EF]/80">valódi áttörések.</span>',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote Text',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          label: 'Author Name',
          required: true,
        },
        {
          name: 'authorTitle',
          type: 'text',
          label: 'Author Title / Company',
          required: true,
        },
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Value (e.g. 94%)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (e.g. ismételt megbízás)',
          required: true,
        },
      ],
    },
  ],
};
