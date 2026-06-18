import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function init() {
  console.log("Initializing Payload to push DB schema...");
  try {
    const payload = await getPayload({ config })
    console.log("DB Schema Pushed successfully!");
  } catch (err) {
    console.error("Failed:", err);
  }
  process.exit(0)
}
init()
