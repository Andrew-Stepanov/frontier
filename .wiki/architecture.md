# Архитектура

## Next.js App Router

| Маршрут | Файл | Описание |
|---------|------|----------|
| `/` | `app/page.tsx` | Главная (лендинг) |
| `/blog` | `app/blog/page.tsx` | Список статей |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Статья (SSG) |
| `/sitemap.xml` | `app/sitemap.ts` | Sitemap |
| `/robots.txt` | `app/robots.ts` | Robots |
| `manifest` | `app/manifest.ts` | PWA manifest |

## Root layout

`app/layout.tsx`:

- Глобальные стили: `tokens.css`, `site-overrides.css`
- Шрифт Roboto (next/font)
- **SiteHeader** + **MobileMenuEnhancer** + **children** + **SiteFooter** на всех страницах

Блог подключает только `blog.css` через `app/blog/layout.tsx`.

## Главная (`app/page.tsx`)

Обёртка `.landing`, импорт `landing.css`, секции в `<main>`:

1. Hero, Market, Benefits, ClubOverview — flow / hybrid
2. Forum, Offline, Pricing — **ScaledCanvas** (absolute координаты)
3. AISection, Founders, FAQ — flow

## Два режима вёрстки лендинга

### Flow-секции

Обычный поток + CSS в `landing.css`. Контейнер `.landing__shell` с отступами artboard на wide desktop.

### Canvas-секции

`ScaledCanvas` + абсолютные позиции внутри artboard:

- Desktop artboard: **1200×H** px
- Mobile artboard: **320×H** px
- Breakpoint переключения: **1200px** (`MOBILE_LAYOUT_BREAKPOINT`)
- Масштаб: `scale = viewportWidth / designWidth` (zoom, без cap)

Компоненты: `Market`, `Forum`, `Offline`, `Pricing`. Высоты в `components/landing/canvasPresets.ts`.

Изображения в canvas: `CanvasImg` (нативный `<img>`, не `next/image`).

## Библиотеки (`lib/`)

| Модуль | Роль |
|--------|------|
| `site.ts` | `siteConfig`, реестр `pages`, `extraRoutes` |
| `seo.ts` | Metadata главной |
| `seo-article.ts` | Metadata и JSON-LD статей |
| `content.ts` | Загрузка `content/*.json` |
| `blog.ts` | CRUD-чтение статей из SQLite |
| `markdown.ts` | TOC, загрузка Markdown |
| `db/` | Drizzle + better-sqlite3, seed при первом запуске |

## Типы страниц

- **Реестр HTML-страниц**: `lib/site.ts` → `pages[]` (сейчас только главная).
- **Доп. маршруты**: `extraRoutes` (блог).
- **Блог**: slug из SQLite, `generateStaticParams` в `[slug]/page.tsx`.

## Зависимости между слоями

```
app/page.tsx → components/landing/*
app/blog/*   → components/blog/*, lib/blog, lib/markdown
layout.tsx   → SiteHeader, SiteFooter, MobileMenuEnhancer
```

Не тянуть landing-компоненты в блог без необходимости; общий UI — шапка/футер в `site-overrides.css`.
