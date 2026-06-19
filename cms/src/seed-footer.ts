import { getPayload } from 'payload'
import configPromise from './payload.config'

const seed = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding footer...')

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
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
