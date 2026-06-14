# Инструкции для AI-агентов (Cursor, Claude Code, Codex)

**Единый источник правил** для всех инструментов. Не дублируйте длинные инструкции в других файлах — только ссылки сюда.

## Перед работой

1. Прочитай [.wiki/index.md](.wiki/index.md).
2. Открой страницы wiki по теме задачи (лендинг, блог, стили, SEO).
3. Следуй [.wiki/contributing-for-agents.md](.wiki/contributing-for-agents.md).

## После правок кода

1. Допиши запись в конец [CHANGES.md](CHANGES.md) (шаблон внутри файла).
2. Обнови затронутые страницы `.wiki/`, если изменилась архитектура или процессы.
3. Убедись, что `npm run build` проходит.

## Стек

Next.js 16 (App Router, Turbopack), React 19, TypeScript, SQLite + Drizzle (блог), CSS без Tailwind.

## Ключевые пути

| Путь | Назначение |
|------|------------|
| `app/` | Маршруты и layout |
| `components/landing/` | Секции главной |
| `components/blog/` | Компоненты блога |
| `components/SiteHeader.tsx`, `SiteFooter.tsx` | Глобальная шапка и футер |
| `styles/tokens.css` | Design tokens |
| `styles/site-overrides.css` | Шапка, футер, мобильное меню |
| `styles/landing.css` | Стили лендинга |
| `styles/blog.css` | Стили блога |
| `lib/site.ts` | Реестр страниц, `siteConfig` |
| `lib/db/` | SQLite, схема статей |
| `mcp/blog-server/` | MCP: защищённое добавление статей |
| `content/frontier.json` | SEO-мета главной |
| `public/assets/` | Изображения и шрифты с Tilda |

## Принципы кода

- Минимальный diff, без рефакторинга «заодно».
- Следовать существующим паттернам (ScaledCanvas для canvas-секций, flow + CSS для остальных).
- Не коммитить без явного запроса пользователя.
- Не коммитить `.env`, `data/*.sqlite*`.

## Язык

Ответы пользователю — русский. Wiki и CHANGES — русский.

## Точки входа по инструментам

| Инструмент | Файл |
|------------|------|
| **Cursor** | `.cursor/rules/project-workflow.mdc` → этот файл |
| **Claude Code** | `CLAUDE.md` → этот файл |
| **Codex** | `CODEX.md` → этот файл |
