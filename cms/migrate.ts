import { getPayload } from 'payload';
import configPromise from './src/payload.config';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({ collection: 'pages', limit: 100 });
  
  for (const page of pages.docs) {
    if (!page.layout || page.layout.length === 0) continue;
    
    const newLayout = page.layout.map((block: any) => {
      if (['oneColumn', 'twoColumn', 'threeColumn'].includes(block.blockType)) {
        return block;
      }
      
      // Migrate old block by wrapping it in a oneColumn
      return {
        blockType: 'oneColumn',
        background: 'bg-transparent',
        column: [
          {
            ...block,
            id: undefined, // remove old block ID to avoid conflicts
          }
        ]
      };
    });

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        layout: newLayout,
      }
    });
    console.log(`Migrated page: ${page.slug}`);
  }
  
  console.log("Migration complete!");
  process.exit(0);
}
run().catch(console.error);