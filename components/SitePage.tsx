import { FrontierBody } from './FrontierBody';
import { ClientScripts } from './ClientScripts';
import { JsonLd } from './JsonLd';
import { loadPageBody, loadPageContent } from '@/lib/content';
import { buildJsonLd } from '@/lib/seo';
import type { PageDefinition } from '@/lib/site';
import { getPagePath } from '@/lib/site';

interface SitePageProps {
  page: PageDefinition;
}

export async function SitePage({ page }: SitePageProps) {
  const [content, bodyHtml] = await Promise.all([
    loadPageContent(page.contentFile),
    loadPageBody(page.bodyFile),
  ]);

  const jsonLd = buildJsonLd(content, getPagePath(page.slug));

  return (
    <>
      <JsonLd data={jsonLd} />
      <FrontierBody html={bodyHtml} />
      <ClientScripts />
    </>
  );
}
