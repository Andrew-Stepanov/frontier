# Блог

## Маршруты

- `/blog` — список (`getPublishedArticles()`)
- `/blog/[slug]` — статья, SSG через `generateStaticParams`

Layout блога: `app/blog/layout.tsx` — только импорт `blog.css`.

## Данные

- SQLite: `data/blog.sqlite` (создаётся при первом запуске, в `.gitignore`)
- Схема: `lib/db/schema.ts` → таблица `articles`
- Seed: `lib/db/seed-data.ts`

Поля статей: slug, title, description, `content_md`, author, cover, og, keywords (JSON string), dates, `reading_time_min`.

## Добавление статьи

1. **MCP** (рекомендуется): `npm run mcp:blog`, см. [mcp-blog.md](mcp-blog.md).
2. Или INSERT в `articles` вручную / через seed.
3. Slug уникальный; контент — **Markdown** в `content_md`.
4. После добавления — `npm run build` для SSG на проде.

## Компоненты (`components/blog/`)

| Компонент | Назначение |
|-----------|------------|
| `ArticleCard` | Карточка в списке |
| `Breadcrumbs` | Хлебные крошки |
| `MarkdownContent` | Рендер Markdown (react-markdown) |
| `ArticleSidebar` | Оглавление + баннер |
| `ArticleToc` | TOC из headings |
| `JoinClubBanner` | CTA «Вступить» |
| `ShareButtons` | Шаринг |
| `ArticleAuthor` | Блок автора |

## Markdown

- `lib/markdown.ts` — `extractToc`, загрузка текста
- `rehype-slug`, `remark-gfm` для якорей и GFM
- SEO: `lib/seo-article.ts` — metadata, breadcrumbs, JSON-LD Article

## Стили

`styles/blog.css` — отдельно от лендинга.

- Контейнер: `max-width: var(--content)` (800px), центрирование
- Отступ сверху: `var(--header-h)` (фиксированная шапка)
- ≥1200px: боковые inset как на лендинге

## Миграция на Postgres

Схема Drizzle позволяет сменить драйвер; точка входа — `lib/db/index.ts`.
