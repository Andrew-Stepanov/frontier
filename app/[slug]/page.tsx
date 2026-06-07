import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SitePage } from '@/components/SitePage';
import { loadPageContent } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { getAllSlugs, getPageBySlug, getPagePath } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};

  const content = await loadPageContent(page.contentFile);
  return buildPageMetadata(content, getPagePath(page.slug));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  return <SitePage page={page} />;
}
