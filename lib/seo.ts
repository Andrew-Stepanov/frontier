import type { Metadata } from 'next';
import { siteConfig } from './site';
import type { FaqBlock, PageContent } from './types';

function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return new URL(path, siteConfig.url).toString();
}

export function buildPageMetadata(
  content: PageContent,
  pagePath: string,
): Metadata {
  const canonical = content.meta.canonical || absoluteUrl(pagePath);
  const ogImage = content.meta.ogImage || siteConfig.defaultOgImage;
  const ogImageUrl = absoluteUrl(ogImage);

  return {
    title: content.meta.title,
    description: content.meta.description,
    keywords: content.meta.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: content.meta.title,
      description: content.meta.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: content.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta.title,
      description: content.meta.description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: siteConfig.favicon,
      shortcut: siteConfig.favicon,
      apple: siteConfig.favicon,
    },
    other: {
      'theme-color': siteConfig.themeColor,
    },
  };
}

export function buildJsonLd(content: PageContent, pagePath: string) {
  const pageUrl = absoluteUrl(pagePath);
  const faqBlock = content.blocks.find((b) => b.type === 'faq') as
    | FaqBlock
    | undefined;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${pageUrl}#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.favicon),
      description: siteConfig.description,
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: content.meta.title,
      description: content.meta.description,
      isPartOf: { '@id': `${pageUrl}#website` },
      inLanguage: siteConfig.language,
    },
  ];

  if (faqBlock?.items?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqBlock.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: stripHtml(item.answerHtml),
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}
