# Wiki — Frontier Site

Документация проекта **frontier-site** (Next.js). Для AI-агентов и разработчиков.

## Быстрые ссылки

| Страница | О чём |
|----------|--------|
| [architecture.md](architecture.md) | Структура app, layout, маршруты |
| [landing.md](landing.md) | Главная: секции, ScaledCanvas, координаты |
| [blog.md](blog.md) | Блог, SQLite, Markdown, компоненты |
| [mcp-blog.md](mcp-blog.md) | MCP: защищённое добавление статей |
| [styling.md](styling.md) | CSS, tokens, брейкпоинты, шапка |
| [seo-and-content.md](seo-and-content.md) | SEO, JSON-LD, content JSON |
| [seo-audit.md](seo-audit.md) | Чеклист SEO и статус |
| [dev.md](dev.md) | Запуск, build, env, команды |
| [contributing-for-agents.md](contributing-for-agents.md) | Как работать + CHANGES.md |
| [log.md](log.md) | Журнал изменений |

## Вне wiki

- [README.md](../README.md) — быстрый старт
- [CHANGES.md](../CHANGES.md) — append-only лог правок
- [AGENTS.md](../AGENTS.md) — единые инструкции для Cursor / Claude Code / Codex

## Продукт

**Frontier** — закрытый клуб фаундеров и C-level для выхода на глобальные рынки.

Публичный сайт: лендинг + блог. Миграция с Tilda; визуальный эталон — artboard **1200px**, контентная колонка **800px** (inset 200px на desktop).

## Карта репозитория

```
app/                 # Next.js App Router
components/
  landing/           # Секции главной
  blog/              # Блог
  SiteHeader.tsx     # Глобальная шапка
  SiteFooter.tsx     # Глобальный футер
  MobileMenuEnhancer.tsx
lib/                 # site, seo, blog, db, markdown
styles/              # tokens, landing, blog, site-overrides
content/             # frontier.json (SEO главной)
data/                # blog.sqlite (не в git)
public/assets/       # Медиа с Tilda
```

## Когда обновлять wiki

- Новая секция лендинга или тип layout (canvas vs flow).
- Новый маршрут или источник данных.
- Смена брейкпоинтов, tokens или глобального layout.
- Новый процесс (деплой, контент, CI).

Обновления wiki — отдельная строка в [CHANGES.md](../CHANGES.md).
