import { Block } from 'payload';
import { thumbnails } from './thumbnails';
import { IconSelectField } from '../fields/IconSelectField';

export const ServicesBlock: Block = {
  slug: 'services',
  imageURL: thumbnails.services,
  imageAltText: 'Services Section',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: ['cream', 'warm', 'dark'],
      defaultValue: 'cream',
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: '01 — Szolgáltatások',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (Supports HTML like <span> for styling)',
      defaultValue: 'Programok, amik<br/><span class="italic font-medium text-[#1A2A4F]/70">a vezetődet építik.</span>',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'Hat különböző formátum — egy közös cél: tisztább gondolkodás...',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      fields: [
        IconSelectField,
        {
          name: 'tag',
          type: 'text',
          label: 'Tag (e.g. 1:1, Csapat)',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'desc',
          type: 'textarea',
          label: 'Card Description',
          required: true,
        },
      ],
    },
  ],
};
