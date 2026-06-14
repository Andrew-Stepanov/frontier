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

## [2026-06-14T20:00:00+03:00] Cursor | branch: main

### Files changed:
- lib/db/index.ts
- lib/blog-admin.ts, lib/blog-reading-time.ts
- mcp/blog-server/** (stdio + HTTP MCP)
- package.json, .env.example
- .cursor/mcp.json.example
- tsconfig.json (exclude mcp)
- AGENTS.md, .wiki/blog.md, .wiki/mcp-blog.md
- CHANGES.md

### What changed:
**MCP блог** — защищённый сервер для CRUD статей (`blog_create_article`, `blog_update_article`, …) с токеном `FRONTIER_MCP_TOKEN` в каждом tool и Bearer на HTTP. Stdio: `npm run mcp:blog`; HTTP: `npm run mcp:blog:http`.

**lib/db/index.ts** — убран `import 'server-only'`: MCP запускается отдельным Node-процессом через `tsx` и не может загрузить этот пакет. Было: `server-only` на уровне DB. Стало: `server-only` только в `lib/blog.ts` (чтение для Next routes).

### Reason:
Упростить добавление статей из Cursor/Claude/Codex без ручного INSERT в SQLite.

---

## [2026-06-14T21:10:00+03:00] Cursor | branch: main

### Files changed:
- .env.local (на сервере, не в git)
- package.json (`start:prod`)
- deploy/nginx-frontier-ip.conf, deploy/frontier-site.service
- .wiki/dev.md
- /etc/nginx/sites-available/frontier-site, ads-factory
- /etc/systemd/system/frontier-site.service
- CHANGES.md

### What changed:
Сайт доступен по IP `http://95.181.162.126`: nginx default `:80` → Next.js на `127.0.0.1:3010`, systemd `frontier-site`. `NEXT_PUBLIC_SITE_URL=http://95.181.162.126` + rebuild для canonical/sitemap.

### Reason:
Временный публичный доступ до подключения домена frontier-global.club.

---

## [2026-06-14T21:15:00+03:00] Cursor | branch: main

### Files changed:
- deploy/nginx-frontier-ip.conf
- .wiki/dev.md
- /etc/nginx/sites-available/frontier-site, ads-factory
- /etc/nginx/ssl/frontier-ip/
- CHANGES.md

### What changed:
HTTPS по IP отдавал ads-factory (Creative Factory) — убран `server_name _` с 443 в ads-factory. Frontier стал `default_server` на `:443` с self-signed сертификатом для IP.

### Reason:
Браузеры открывают `https://IP` по умолчанию; пользователь видел не Frontier.

---

## [2026-06-14T21:20:00+03:00] Cursor | branch: main

### Files changed:
- deploy/nginx-frontier-ip.conf
- next.config.ts
- /etc/nginx/sites-available/frontier-site, ads-factory
- CHANGES.md

### What changed:
Редирект `/login`, `/register`, `/dashboard` → `/` с `Clear-Site-Data: cache` (сброс кэша Creative Factory). У ads-factory убран `listen [::]:80` — меньше конфликтов с default Frontier.

### Reason:
В браузере остался кэш ads-factory SPA по IP; пользователь открывал `/login` и видел Creative Factory.

---

## [2026-06-14T21:25:00+03:00] Cursor | branch: main

### Files changed:
- .env.local
- deploy/nginx-frontier-ip.conf
- next.config.ts
- .wiki/dev.md
- /etc/nginx/sites-available/frontier-site
- CHANGES.md

### What changed:
Устранён цикл редиректов: `NEXT_PUBLIC_SITE_URL` → `https://95.181.162.126`, HTTP → один редирект на HTTPS, убран `Clear-Site-Data` с `/login`.

### Reason:
Браузер открывал HTTPS, canonical был HTTP — ERR_TOO_MANY_REDIRECTS.

---

## [2026-06-14T21:35:00+03:00] Cursor | branch: main

### Files changed:
- /etc/nginx/sites-enabled/ads-factory (удалён symlink)
- /root/ads-factory (supabase stop)
- .wiki/dev.md
- CHANGES.md

### What changed:
ads-factory отключён: nginx vhost `ads.activeloop.online` выключен, Supabase Docker stack остановлен (`supabase stop`).

### Reason:
Освободить сервер для Frontier; убрать Creative Factory с IP/домена ads.

---
