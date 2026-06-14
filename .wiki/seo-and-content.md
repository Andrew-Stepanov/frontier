# SEO и контент

## siteConfig

`lib/site.ts` — `siteConfig`:

- `url` из `NEXT_PUBLIC_SITE_URL` или `https://frontier-global.club`
- `name`, `description`, `locale`, `defaultOgImage`, `themeColor`

## Реестр страниц

`pages[]` — статические HTML-страницы для sitemap:

```ts
{ slug: '', contentFile: 'frontier.json', changefreq: 'weekly', priority: 1 }
```

`extraRoutes` — `/blog` и др. без JSON-контента.

Новая статическая страница:

1. JSON в `content/`
2. Запись в `pages`
3. React page в `app/`

## Главная — контент JSON

`content/frontier.json` — мета для SEO (`loadPageContent` + `buildPageMetadata`).

## Metadata API

- Главная: `generateMetadata` в `app/page.tsx`
- Блог список: `app/blog/page.tsx`
- Статья: `lib/seo-article.ts` → `buildArticleMetadata`

Каждая страница: title, description, canonical, Open Graph, Twitter.

## JSON-LD

- `components/JsonLd.tsx`
- Главная: FAQ и др. через `lib/seo.ts`
- Статьи: `buildArticleJsonLd`
- Список блога: `buildBlogListJsonLd`

## Sitemap / robots

- `app/sitemap.ts` — `pages` + `extraRoutes` + статические slug блога
- `app/robots.ts` — allow + sitemap URL

## Продакшен

`NEXT_PUBLIC_SITE_URL` должен совпадать с боевым доменом для canonical и sitemap.
