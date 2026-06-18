import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    components: {
      Icon: '/components/Icons/index#UsersIcon',
    },
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'Keresztnév',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Vezetéknév',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Profilkép',
    },
  ],
  versions: false,
}
