import type { Metadata } from 'next';
import { siteConfig } from './site';
import type { Article } from './db/schema';
import { parseKeywords } from './blog';

function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return new URL(path, siteConfig.url).toString();
}

export function getArticlePath(slug: string): string {
  return `/blog/${slug}`;
}

export function buildArticleMetadata(article: Article): Metadata {
  const path = getArticlePath(article.slug);
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(
    article.ogImage || article.coverImage || siteConfig.defaultOgImage,
  );
  const keywords = parseKeywords(article.keywords);

  return {
    title: article.title,
    description: article.description,
    keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    authors: [{ name: article.authorName, url: siteConfig.url }],
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.authorName],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImage],
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
  };
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function getArticleBreadcrumbs(article: Article): BreadcrumbItem[] {
  return [
    { label: 'Главная', href: '/' },
    { label: 'Блог', href: '/blog' },
    { label: article.title, href: getArticlePath(article.slug) },
  ];
}

export function buildArticleJsonLd(article: Article) {
  const pageUrl = absoluteUrl(getArticlePath(article.slug));
  const imageUrl = absoluteUrl(
    article.ogImage || article.coverImage || siteConfig.defaultOgImage,
  );
  const breadcrumbs = getArticleBreadcrumbs(article);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          item: absoluteUrl(item.href),
        })),
      },
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        headline: article.title,
        description: article.description,
        image: [imageUrl],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: {
          '@type': 'Person',
          name: article.authorName,
          ...(article.authorImage
            ? { image: absoluteUrl(article.authorImage) }
            : {}),
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl(siteConfig.favicon),
          },
        },
        inLanguage: siteConfig.language,
        keywords: parseKeywords(article.keywords).join(', '),
        timeRequired: `PT${article.readingTimeMin}M`,
      },
    ],
  };
}

export function buildBlogListMetadata(): Metadata {
  const canonical = absoluteUrl('/blog');
  const ogImageUrl = absoluteUrl(siteConfig.defaultOgImage);
  const title = 'Блог';
  const description =
    'Статьи Frontier о выходе на глобальные рынки, масштабировании бизнеса и опыте фаундеров.';

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: `Блог | ${siteConfig.name}`,
      description:
        'Статьи о выходе на глобальные рынки, масштабировании и опыте фаундеров.',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Блог ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Блог | ${siteConfig.name}`,
      description:
        'Статьи о выходе на глобальные рынки, масштабировании и опыте фаундеров.',
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
  };
}

export function buildBlogListJsonLd() {
  const pageUrl = absoluteUrl('/blog');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Главная',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Блог',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'Blog',
        '@id': `${pageUrl}#blog`,
        url: pageUrl,
        name: `Блог ${siteConfig.name}`,
        description: 'Статьи о выходе на глобальные рынки, масштабировании и опыте фаундеров',
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        inLanguage: siteConfig.language,
      },
    ],
  };
}
