import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Lábléc (Footer)',
  admin: {
    group: 'Globális',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'blocks',
      label: 'Footer Blokkok (Oszlopok)',
      maxRows: 4,
      blocks: [
        {
          slug: 'textBlock',
          labels: { singular: 'Szöveges Blokk', plural: 'Szöveges Blokkok' },
          fields: [
            {
              name: 'width',
              type: 'number',
              label: 'Oszlop szélessége (1-12)',
              min: 1,
              max: 12,
              defaultValue: 5,
            },
            {
              name: 'showLogo',
              type: 'checkbox',
              label: 'Logó megjelenítése',
              defaultValue: true,
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Leírás',
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Közösségi Média Linkek',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: ['LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'YouTube'],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'linkBlock',
          labels: { singular: 'Link Blokk', plural: 'Link Blokkok' },
          fields: [
            {
              name: 'width',
              type: 'number',
              label: 'Oszlop szélessége (1-12)',
              min: 1,
              max: 12,
              defaultValue: 2,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Cím',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              label: 'Linkek',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Felirat',
                  required: true,
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Hivatkozott oldal',
                },
              ],
            },
          ],
        },
        {
          slug: 'newsletterBlock',
          labels: { singular: 'Hírlevél Blokk', plural: 'Hírlevél Blokkok' },
          fields: [
            {
              name: 'width',
              type: 'number',
              label: 'Oszlop szélessége (1-12)',
              min: 1,
              max: 12,
              defaultValue: 3,
            },
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
              name: 'placeholderText',
              type: 'text',
              label: 'Input placeholder (pl. te@email.hu)',
            },
          ],
        },
      ],
    },
    {
      name: 'bottomBar',
      type: 'group',
      label: 'Alsó Sáv (Bottom Bar)',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          label: 'Copyright szöveg',
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Jogi Linkek',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Felirat',
              required: true,
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Hivatkozott oldal',
            },
          ],
        },
      ],
    },
  ],
}
