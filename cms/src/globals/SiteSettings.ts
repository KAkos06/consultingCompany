import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Oldal Beállítások',
  admin: {
    group: 'Globális',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Weboldal neve',
      required: true,
      defaultValue: 'Executive Insights',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Fő Logó',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
  ],
}
