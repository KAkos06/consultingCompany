import { Block } from 'payload';
import { thumbnails } from './thumbnails';

export const ContactBlock: Block = {
  slug: 'contact',
  imageURL: thumbnails.contact,
  imageAltText: 'Contact Section',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
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
      defaultValue: '05 — Kapcsolat',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (Supports HTML)',
      defaultValue: 'Beszéljünk.<br/><span class="italic font-medium text-[#1A2A4F]/70">Diszkréten.</span>',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Egy 30 perces, kötelezettség nélküli konzultáció...',
    },
    {
      name: 'contactInfo',
      type: 'array',
      label: 'Contact Info Items',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name (lucide-react e.g. Mail, Phone, MapPin)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (e.g. E-mail)',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value (e.g. hello@...)',
          required: true,
        },
      ],
    },
  ],
};
