import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const quoteSliderBlock = {
  blockType: 'quoteSlider',
  items: [
    {
      icon: 'Award',
      tag: 'Elismerés',
      title: 'Top 10 Executive Coaching firm Közép-Európában - 2024',
      desc: 'Független szakmai díj a Coaching at Work magazintól.',
    },
    {
      icon: 'TrendingUp',
      tag: 'Adat',
      title: 'Vezetői NPS +78 az ügyfeleinknél',
      desc: '240+ kísért vezető válasza alapján - 2024 évzáró felmérés.',
    },
    {
      icon: 'Users',
      tag: 'Esemény',
      title: 'Leadership Insights Forum - 2025. március 14.',
      desc: 'Egynapos zártkörű esemény C-szintű vezetőknek Budapesten.',
    },
  ],
}

async function main() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'fooldal',
      },
    },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    throw new Error('A fooldal oldal nem talalhato.')
  }

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  const filteredLayout = layout.filter((block) => block?.blockType !== 'quoteSlider')
  const heroIndex = filteredLayout.findIndex((block) => block?.blockType === 'hero')
  const insertIndex = heroIndex >= 0 ? heroIndex + 1 : 0

  filteredLayout.splice(insertIndex, 0, quoteSliderBlock)

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: {
      layout: filteredLayout,
    },
  })

  console.log('A quoteSlider blokk bekerult a fooldal Hero ala.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
