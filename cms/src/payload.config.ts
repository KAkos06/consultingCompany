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
})
