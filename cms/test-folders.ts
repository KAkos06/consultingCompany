import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  try {
    const payload = await getPayload({ config })
    
    const folders = await payload.find({
      collection: 'payload-folders',
      depth: 1,
    })
    
    console.log('Folders collection exists and contains:', JSON.stringify(folders.docs, null, 2))
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
