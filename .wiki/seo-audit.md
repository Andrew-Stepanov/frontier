# SEO — чеклист и статус

Аудит технического SEO для frontier-site.

## Что уже есть ✅

| Элемент | Где |
|---------|-----|
| `metadataBase`, title template | `app/layout.tsx` |
| Title, description, keywords | `content/frontier.json` + `buildPageMetadata` |
| Canonical (из `siteConfig.url`) | `lib/seo.ts`, `lib/seo-article.ts` |
| Open Graph + Twitter Card | Главная, блог, статьи |
| `robots` + `googleBot` hints | `buildPageMetadata`, статьи, список блога |
| `lang="ru"` | `app/layout.tsx` |
| `/sitemap.xml` | `app/sitemap.ts` — главная, `/blog`, все slug |
| `/robots.txt` | `app/robots.ts` — allow `/`, disallow `/_next/`, `api/` |
| Web App Manifest | `app/manifest.ts` |
| JSON-LD главная | WebSite, Organization, WebPage, FAQPage |
| JSON-LD блог | Blog, BreadcrumbList |
| JSON-LD статья | BlogPosting, BreadcrumbList |
| SSG статей | `generateStaticParams` |
| Один H1 на главной | `Hero.tsx` |
| H1 на блоге и в статье | `blog/page.tsx`, `[slug]/page.tsx` |
| Breadcrumbs (семантика) | `Breadcrumbs.tsx` — `nav` + `ol` |
| `rel="noopener noreferrer"` на внешних ссылках | FAQ, pricing |
| Preload Bebas Neue | `app/layout.tsx` |
| Hero image `priority` + alt | `Hero.tsx` |

## Env

`NEXT_PUBLIC_SITE_URL` — canonical, sitemap, OG URL. На проде: `https://frontier-global.club`.

## Рекомендации (не блокеры)

| Тема | Статус | Действие |
|------|--------|----------|
| Оферта `href="#"` | ⚠️ | Заменить на реальный URL документа |
| OG image главной | ⚠️ | Сейчас avatars webp; лучше отдельный 1200×630 |
| `meta.description` главной | ✅ расширено | `content/frontier.json` |
| Декоративные `alt=""` в canvas | OK | Декор; контент в тексте рядом |
| hreflang | — | Не нужен (один язык) |
| Manifest icons 512px | ⚠️ | Добавить при PWA-фокусе |
| Sitemap `lastModified` статики | ⚠️ | Сейчас `new Date()`; можно из контента |
| RSS | — | Опционально для блога |

## Проверка вручную

```bash
npm run build && npm start
curl -s $URL/robots.txt
curl -s $URL/sitemap.xml
# View Page Source: application/ld+json на / и /blog
# Google Rich Results Test / Search Console
```

## Файлы

- `lib/seo.ts` — главная
- `lib/seo-article.ts` — блог и статьи
- `lib/site.ts` — `siteConfig`, реестр страниц
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- `app/not-found.tsx` — `robots: noindex`
