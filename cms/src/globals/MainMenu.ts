import type { GlobalConfig } from 'payload'
import { IconSelectField } from '../fields/IconSelectField'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  label: 'Főmenü',
  admin: {
    group: 'Globális',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      label: 'Menüpontok',
      fields: [
        {
          name: 'type',
          type: 'radio',
          label: 'Menü Típusa',
          options: [
            { label: 'Egyszerű Link', value: 'link' },
            { label: 'Mega Menü', value: 'mega' },
          ],
          defaultValue: 'link',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Menü Felirat',
          required: true,
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Hivatkozott oldal',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'link',
          },
        },
        {
          name: 'megaItems',
          type: 'array',
          label: 'Mega Menü Elemek',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'mega',
          },
          fields: [
            IconSelectField,
            {
              name: 'title',
              type: 'text',
              label: 'Cím',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Leírás',
            },
            {
              name: 'link',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Hivatkozott oldal',
            },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Kapcsolat Gomb (CTA)',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Gomb felirata',
          defaultValue: 'Kapcsolat',
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Hivatkozott oldal',
        },
        IconSelectField,
      ],
    },
  ],
}
