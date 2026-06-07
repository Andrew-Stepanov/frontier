import type { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/blog';
import { getArticlePath } from '@/lib/seo-article';
import { extraRoutes, pages, siteConfig, getPagePath } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    ...pages.map((page) => ({
      url: new URL(getPagePath(page.slug), siteConfig.url).toString(),
      lastModified: new Date(),
      changeFrequency: page.changefreq,
      priority: page.priority,
    })),
    ...extraRoutes.map((route) => ({
      url: new URL(route.path, siteConfig.url).toString(),
      lastModified: new Date(),
      changeFrequency: route.changefreq,
      priority: route.priority,
    })),
  ];

  const articlePages = getPublishedArticles().map((article) => ({
    url: new URL(getArticlePath(article.slug), siteConfig.url).toString(),
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
