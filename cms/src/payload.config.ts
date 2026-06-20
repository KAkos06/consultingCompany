import { postgresAdapter } from '@payloadcms/db-postgres'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { hu } from '@payloadcms/translations/languages/hu'
import { en } from '@payloadcms/translations/languages/en'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { SiteSettings } from './globals/SiteSettings'
import { MainMenu } from './globals/MainMenu'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      Nav: '/components/Nav/index#CustomNav',
      graphics: {
        Logo: '/components/Logo/index#CustomLogo',
      },
      views: {
        dashboard: {
          Component: '/components/Dashboard/index#CustomDashboard',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages],
  globals: [SiteSettings, MainMenu, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  sharp,
  localization: {
    locales: ['hu', 'en'],
    fallback: true,
    defaultLocale: 'hu',
  },
  i18n: {
    supportedLanguages: { hu, en },
  },
  onInit: async (payload) => {
    try {
      // 1. Check and create "system" folder
      let systemFolderRes = await payload.find({
        collection: 'payload-folders',
        where: { name: { equals: 'system' } },
        depth: 0,
      })
      let systemFolderId = systemFolderRes.docs[0]?.id
      if (!systemFolderId) {
        const systemFolder = await payload.create({
          collection: 'payload-folders',
          data: { name: 'system', folderType: ['media'] },
        })
        systemFolderId = systemFolder.id
        payload.logger.info('Created system folder')
      } else if (!systemFolderRes.docs[0]?.folderType?.includes('media')) {
        await payload.update({
          collection: 'payload-folders',
          id: systemFolderId,
          data: { folderType: ['media'] },
        })
      }

      // 2. Check and create "avatars" folder under "system"
      let avatarsFolderRes = await payload.find({
        collection: 'payload-folders',
        where: { name: { equals: 'avatars' } },
        depth: 0,
      })
      let avatarsFolderId = avatarsFolderRes.docs.find(d => d.folder === systemFolderId || (typeof d.folder === 'object' && d.folder?.id === systemFolderId))?.id
      if (!avatarsFolderId) {
        await payload.create({
          collection: 'payload-folders',
          data: { name: 'avatars', folder: systemFolderId, folderType: ['media'] },
        })
        payload.logger.info('Created avatars folder under system')
      } else if (!avatarsFolderRes.docs.find(d => d.id === avatarsFolderId)?.folderType?.includes('media')) {
        await payload.update({
          collection: 'payload-folders',
          id: avatarsFolderId,
          data: { folderType: ['media'] },
        })
      }

      // 3. Check and create "content" folder
      let contentFolderRes = await payload.find({
        collection: 'payload-folders',
        where: { name: { equals: 'content' } },
        depth: 0,
      })
      let contentFolderId = contentFolderRes.docs[0]?.id
      if (!contentFolderId) {
        await payload.create({
          collection: 'payload-folders',
          data: { name: 'content', folderType: ['media'] },
        })
        payload.logger.info('Created content folder')
      } else if (!contentFolderRes.docs[0]?.folderType?.includes('media')) {
        await payload.update({
          collection: 'payload-folders',
          id: contentFolderId,
          data: { folderType: ['media'] },
        })
      }
    } catch (err) {
      payload.logger.error(`Error creating folders onInit: ${err}`)
    }
  },
})
