import { Block } from 'payload';
import { thumbnails } from './thumbnails';

export const HeroBlock: Block = {
  slug: 'hero',
  imageURL: thumbnails.hero,
  imageAltText: 'Hero Section',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text (e.g. Vezetői coaching...)',
      defaultValue: 'Vezetői coaching, ami valódi változást hoz',
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title (You can use HTML tags like <span> or <br/> for styling)',
      defaultValue: 'Vezetői döntések<br/><span class="text-[#F7A5A5] italic font-medium">tisztábban</span>,<br/>stratégia <span class="underline decoration-[#FFDBB6] decoration-[6px] underline-offset-8">bátrabban</span>.',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'Az Executive Insights tapasztalt mentorok hálózata...',
    },
    {
      name: 'primaryCtaText',
      type: 'text',
      label: 'Primary CTA Text',
      defaultValue: 'Foglalj diagnosztikát',
    },
    {
      name: 'primaryCtaLink',
      type: 'text',
      label: 'Primary CTA Link',
      defaultValue: '#contact',
    },
    {
      name: 'secondaryCtaText',
      type: 'text',
      label: 'Secondary CTA Text',
      defaultValue: 'Hogyan dolgozunk?',
    },
    {
      name: 'secondaryCtaLink',
      type: 'text',
      label: 'Secondary CTA Link',
      defaultValue: '#methodology',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image (Right side)',
      required: false,
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
          label: 'Value (e.g. 12+)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (e.g. év tapasztalat)',
          required: true,
        },
      ],
    },
  ],
};
