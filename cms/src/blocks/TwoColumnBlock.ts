import { Block } from 'payload';
import { contentBlocks } from './contentBlocks';
import { thumbnails } from './thumbnails';

export const TwoColumnBlock: Block = {
  slug: 'twoColumn',
  labels: {
    singular: '2 Hasábos Wrapper',
    plural: '2 Hasábos Wrapperek',
  },
  imageURL: thumbnails.twoColumn,
  imageAltText: '2 Hasábos Layout',
  fields: [
    {
      name: 'background',
      type: 'select',
      label: 'Háttérszín',
      defaultValue: 'cream',
      options: [
        { label: 'Világos (Krém / Pöttyös)', value: 'cream' },
        { label: 'Meleg (Barack / Csíkos)', value: 'warm' },
        { label: 'Sötétkék (Szemcsés)', value: 'dark' },
        { label: 'Sötétkék (Sima / Díszítés nélkül)', value: 'solidDark' },
      ],
      required: true,
    },
    {
      name: 'padding',
      type: 'select',
      label: 'Belső térköz (Padding)',
      defaultValue: 'normal',
      options: [
        { label: 'Nincs térköz', value: 'none' },
        { label: 'Kicsi térköz', value: 'small' },
        { label: 'Normál térköz', value: 'normal' },
      ],
      required: true,
    },
    {
      name: 'ratio',
      type: 'select',
      label: 'Hasábok aránya',
      defaultValue: '1/2-1/2',
      options: [
        { label: '50% - 50%', value: '1/2-1/2' },
        { label: '33% - 66%', value: '1/3-2/3' },
        { label: '66% - 33%', value: '2/3-1/3' },
        { label: '25% - 75%', value: '1/4-3/4' },
        { label: '75% - 25%', value: '3/4-1/4' },
      ],
      required: true,
    },
    {
      name: 'leftColumn',
      type: 'blocks',
      label: 'Bal Hasáb (Tartalom)',
      labels: {
        singular: 'Layout',
        plural: 'Layoutok',
      },
      blocks: contentBlocks,
    },
    {
      name: 'rightColumn',
      type: 'blocks',
      label: 'Jobb Hasáb (Tartalom)',
      labels: {
        singular: 'Layout',
        plural: 'Layoutok',
      },
      blocks: contentBlocks,
    },
  ],
};
