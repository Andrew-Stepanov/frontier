# Frontier Site (Next.js 16)

SEO-оптимизированный сайт на **Next.js 16** App Router.

## Документация

| Ресурс | Описание |
|--------|----------|
| [.wiki/index.md](.wiki/index.md) | Wiki проекта (архитектура, лендинг, блог, стили) |
| [CHANGES.md](CHANGES.md) | Журнал изменений (append-only) |
| [AGENTS.md](AGENTS.md) | Инструкции для AI: Cursor, Claude Code, Codex |

## Быстрый старт

```bash
cd frontier-site
cp .env.example .env.local   # при необходимости смените URL
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

| Путь | Назначение |
|------|------------|
| `content/frontier.json` | Мета и контент для SEO |
| `components/landing/` | React-секции главной (1:1 с эталоном) |
| `styles/landing.css` | Стили лендинга (поток + absolute canvas для market) |
| `styles/site-overrides.css` | Шапка блога, футер, мобильное меню |
| `public/assets/` | Изображения и шрифты |
| `lib/site.ts` | **Реестр страниц** — sitemap |
| `lib/seo.ts` | Metadata API + JSON-LD |
| `lib/db/` | SQLite (статьи блога), контент в **Markdown** |
| `app/blog/` | Список статей и страница статьи |

## SEO

- `app/sitemap.ts` — автогенерация `/sitemap.xml` из `lib/site.ts`
- `app/robots.ts` — `/robots.txt` со всеми страницами из реестра
- `app/manifest.ts` — Web App Manifest
- На каждой странице: title, description, canonical, Open Graph, Twitter Card, robots, JSON-LD (WebSite, Organization, WebPage, FAQPage)

## Новая страница

1. Добавьте React-компонент в `app/` или `components/`.
2. Зарегистрируйте в `lib/site.ts` для sitemap:

```ts
{
  slug: 'about',
  contentFile: 'about.json',
  changefreq: 'monthly',
  priority: 0.8,
},
```

3. Sitemap, robots и маршрут `/about` подхватятся автоматически.

## Блог

- `/blog` — список статей из SQLite (`data/blog.sqlite`)
- `/blog/[slug]` — статья (Markdown), оглавление, CTA «Вступить в клуб», SEO
- При первом запуске БД создаётся автоматически с демо-статьёй

Статьи добавляются в таблицу `articles` (см. `lib/db/schema.ts`). Позже можно подключить Postgres без смены схемы Drizzle.

## Продакшен

```bash
npm run build
npm start
```

Переменная `NEXT_PUBLIC_SITE_URL` должна указывать на боевой домен для корректных canonical и sitemap.
