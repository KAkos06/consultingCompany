import { fetchPage } from '@/lib/payload';
import RenderBlocks from '@/components/RenderBlocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage('fooldal');
  if (!page) return { title: 'Not Found' };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || '',
  };
}

export default async function Home() {
  const page = await fetchPage('fooldal');

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Még nincs Főoldal létrehozva a CMS-ben (slug: fooldal).</h1>
      </main>
    );
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout} />
    </main>
  );
}
