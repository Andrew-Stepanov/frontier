# CHANGES.md

Журнал изменений **frontier-site**. Формат общий для людей и AI (Cursor, Claude Code, Codex).

## Правила

- **Только append** — новые записи в конец файла, старые не удалять.
- Запись **после каждого логического чекпоинта** с правками кода, стилей, конфига или контента.
- Перед ответом «готово» агент должен убедиться, что записи добавлены (см. [.wiki/contributing-for-agents.md](.wiki/contributing-for-agents.md)).
- Поле **Agent**: `Cursor` | `Claude Code` | `Codex` | `Human` | другое имя инструмента.
- Время: ISO 8601, например `2026-06-14T18:00:00+03:00`.
- Ветка: `git branch --show-current`.

## Шаблон

```markdown
---

## [YYYY-MM-DDTHH:MM:SS+03:00] <Agent> | branch: <ветка>

### Files changed:
- path/to/file.ts
- CHANGES.md

### What changed:
**file.ts** — что сделано. При смене логики: было / стало.

### Reason:
Зачем (бизнес или техника).

---
```

---

## [2026-06-14T18:00:00+03:00] Cursor | branch: main

### Files changed:
- .wiki/** (новые страницы wiki)
- AGENTS.md, CLAUDE.md, CODEX.md
- CHANGES.md
- .cursor/rules/project-workflow.mdc
- README.md

### What changed:
Добавлена wiki проекта, журнал изменений и единые точки входа для AI-агентов (AGENTS.md + CLAUDE.md + CODEX.md + Cursor rule). README дополнен ссылками на документацию.

### Reason:
Упростить онбординг и согласованную работу в Cursor, Claude Code и Codex.

---

## [2026-06-14T18:30:00+03:00] Cursor | branch: main

### Files changed:
- app/page.tsx, app/blog/page.tsx, app/not-found.tsx, app/robots.ts
- lib/seo.ts, lib/seo-article.ts
- content/frontier.json
- components/blog/ArticleCard.tsx, app/blog/[slug]/page.tsx
- .wiki/seo-audit.md, .wiki/index.md
- CHANGES.md

### What changed:
SEO-аудит и правки: JSON-LD на главной, полные meta для `/blog`, 404 с `noindex`, canonical из `siteConfig`, alt на обложках, расширенное description главной.

### Reason:
Закрыть пробелы в техническом SEO после аудита.

---
