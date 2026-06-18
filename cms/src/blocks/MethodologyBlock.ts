import { Block } from 'payload';
import { thumbnails } from './thumbnails';

export const MethodologyBlock: Block = {
  slug: 'methodology',
  imageURL: thumbnails.methodology,
  imageAltText: 'Methodology Section',
  labels: {
    singular: 'Methodology Section',
    plural: 'Methodology Sections',
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
      defaultValue: '03 — Módszertan',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (Supports HTML like <span> for styling)',
      defaultValue: 'Négy lépés. Nincs trükk,<br/><span class="italic font-medium text-[#1A2A4F]/70">csak rendszer.</span>',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 1,
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Step Number (e.g. 01)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          required: true,
        },
        {
          name: 'desc',
          type: 'textarea',
          label: 'Step Description',
          required: true,
        },
      ],
    },
    {
      name: 'bottomStripTitle',
      type: 'text',
      label: 'Bottom Strip Title',
      defaultValue: 'Készen állsz egy 30 perces beszélgetésre?',
    },
    {
      name: 'bottomStripDesc',
      type: 'text',
      label: 'Bottom Strip Description',
      defaultValue: 'Díjmentes diagnosztikai konzultáció — kötelezettség nélkül.',
    },
    {
      name: 'bottomStripCtaText',
      type: 'text',
      label: 'Bottom Strip CTA Text',
      defaultValue: 'Időpont foglalása',
    },
    {
      name: 'bottomStripCtaLink',
      type: 'text',
      label: 'Bottom Strip CTA Link',
      defaultValue: '#contact',
    },
  ],
};
