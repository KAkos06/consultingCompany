import { Block } from 'payload';
import { thumbnails } from './thumbnails';

export const AboutBlock: Block = {
  slug: 'about',
  imageURL: thumbnails.about,
  imageAltText: 'About Section',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: ['cream', 'warm', 'dark'],
      defaultValue: 'warm',
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: '02 — Rólunk',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (Supports HTML like <span> for styling)',
      defaultValue: '12 év, 240+ vezető,<br/><span class="italic font-medium">egyetlen küldetés.</span>',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
      required: false,
    },
    {
      name: 'floatingCardTitle',
      type: 'text',
      label: 'Floating Card Title (e.g. Vezetői NPS 2024)',
    },
    {
      name: 'floatingCardValue',
      type: 'text',
      label: 'Floating Card Value (e.g. +78)',
    },
    {
      name: 'bullets',
      type: 'array',
      label: 'Bullet Points',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Bullet Text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Link',
    },
  ],
};
