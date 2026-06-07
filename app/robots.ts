import type { MetadataRoute } from 'next';
import { extraRoutes, pages, siteConfig, getPagePath } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const allowPaths = [
    ...pages.map((p) => getPagePath(p.slug)),
    ...extraRoutes.map((r) => r.path),
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: allowPaths.length === 1 && allowPaths[0] === '/' ? '/' : allowPaths,
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
