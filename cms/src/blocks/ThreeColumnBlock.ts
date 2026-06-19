import { Block } from 'payload';
import { contentBlocks } from './contentBlocks';
import { thumbnails } from './thumbnails';

export const ThreeColumnBlock: Block = {
  slug: 'threeColumn',
  labels: {
    singular: '3 Hasábos Wrapper',
    plural: '3 Hasábos Wrapperek',
  },
  imageURL: thumbnails.threeColumn,
  imageAltText: '3 Hasábos Layout',
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
      name: 'middleColumn',
      type: 'blocks',
      label: 'Középső Hasáb (Tartalom)',
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
