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
  onInit: async (payload) => {
    try {
      console.log('Seeding footer on startup...')
      await payload.updateGlobal({
        slug: 'footer',
        data: {
          columns: [
            {
              blockType: 'textBlock',
              width: 5,
              showLogo: true,
              content: 'Vezetői coaching és stratégiai mentorálás C-szintű vezetőknek és vezetői csapatoknak, Budapesten és online.',
              socialLinks: [
                { platform: 'LinkedIn', url: '#' },
                { platform: 'Twitter', url: '#' },
                { platform: 'Instagram', url: '#' },
              ]
            },
            {
              blockType: 'linkBlock',
              width: 2,
              title: 'Cég',
              links: [
                { label: 'Rólunk' },
                { label: 'Módszertan' },
                { label: 'Esettanulmányok' },
                { label: 'Karrier' },
              ]
            },
            {
              blockType: 'linkBlock',
              width: 2,
              title: 'Szolgáltatások',
              links: [
                { label: 'Executive Coaching' },
                { label: 'Team Coaching' },
                { label: 'Leadership Akadémia' },
                { label: 'Stratégiai Műhely' },
              ]
            },
            {
              blockType: 'newsletterBlock',
              width: 3,
              title: 'Iratkozz fel',
              description: 'Havi egy mély insight a vezetésről. Spam nélkül.',
              placeholderText: 'te@email.hu',
            }
          ],
          bottomBar: {
            copyright: '© 2025 Executive Insights Kft. Minden jog fenntartva.',
            legalLinks: [
              { label: 'Adatvédelem' },
              { label: 'ÁSZF' },
              { label: 'Cookie' },
            ]
          }
        }
      })
      console.log('Footer seeded successfully!')
    } catch (e) {
      console.error('Failed to seed footer:', e)
    }
  },
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
