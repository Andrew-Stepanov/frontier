import type { Metadata } from 'next';
import { SitePage } from '@/components/SitePage';
import { loadPageContent } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { getHomePage, getPagePath } from '@/lib/site';

const home = getHomePage();

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadPageContent(home.contentFile);
  return buildPageMetadata(content, getPagePath(home.slug));
}

export default function HomePage() {
  return <SitePage page={home} />;
}
