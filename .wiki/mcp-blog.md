# MCP — управление блогом

Защищённый MCP-сервер для добавления и редактирования статей через Cursor, Claude Code, Codex и другие MCP-клиенты.

## Безопасность

- Токен **`FRONTIER_MCP_TOKEN`** (минимум 24 символа) — общий секрет клиента и сервера.
- Каждый tool требует параметр **`mcp_token`** с тем же значением.
- HTTP-режим: заголовок `Authorization: Bearer <токен>`.
- **Не коммитьте** токен в git. Используйте `.env.local` и env в настройках MCP.

Сгенерировать токен:

```bash
openssl rand -hex 32
```

## Установка (Cursor)

1. Скопируйте `.cursor/mcp.json.example` → `.cursor/mcp.json` (или добавьте в User MCP settings).
2. Замените `cwd` на абсолютный путь к `frontier-site`.
3. Задайте `FRONTIER_MCP_TOKEN` в `env` (тот же в `.env.local` для HTTP).
4. Перезапустите Cursor / Reload MCP.

## Claude Code / Codex

Добавьте сервер в конфиг MCP клиента — тот же `command` / `args` / `env`, что в `.cursor/mcp.json.example`.

## Запуск вручную

```bash
# Stdio (для IDE)
export FRONTIER_MCP_TOKEN="ваш-токен"
npm run mcp:blog

# HTTP (для удалённых клиентов)
npm run mcp:blog:http
# POST http://127.0.0.1:3847/mcp  +  Authorization: Bearer <токен>
```

## Tools

| Tool | Описание |
|------|----------|
| `blog_list_articles` | Список статей |
| `blog_get_article` | Статья по slug |
| `blog_article_template` | Пример полей и Markdown |
| `blog_create_article` | Создать статью |
| `blog_update_article` | Обновить статью |
| `blog_delete_article` | Удалить статью |

Данные пишутся в `data/blog.sqlite`. Sitemap подхватывает новые slug автоматически; для статического HTML на проде — `npm run build` после добавления.

## Код

- `mcp/blog-server/` — MCP-сервер
- `lib/blog-admin.ts` — CRUD SQLite (общий с MCP)
