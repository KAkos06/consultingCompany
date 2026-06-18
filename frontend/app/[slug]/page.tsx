import { fetchPage } from '@/lib/payload';
import RenderBlocks from '@/components/RenderBlocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await fetchPage(params.slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || '',
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await fetchPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
        </div>
      </header>
      <RenderBlocks blocks={page.layout} />
    </main>
  );
}
