# Работа агентов и журнал изменений

Единые правила для **Cursor**, **Claude Code**, **Codex** и людей.

## Точки входа по инструменту

| Инструмент | Читает |
|------------|--------|
| Cursor | `.cursor/rules/project-workflow.mdc` → `AGENTS.md` |
| Claude Code | `CLAUDE.md` → `AGENTS.md` |
| Codex | `CODEX.md` → `AGENTS.md` |
| Все | `.wiki/index.md` |

Не создавать отдельные длинные инструкции в каждом инструменте — только ссылки на `AGENTS.md` и wiki.

## Workflow

### 1. Перед задачей

1. `.wiki/index.md`
2. Релевантные страницы wiki
3. Существующий код в затронутых файлах

### 2. Во время работы

- Минимальный diff
- Паттерны проекта (ScaledCanvas, site-overrides, lib/blog)
- Без коммита без запроса пользователя

### 3. После правок

**CHANGES.md** — append в конец, шаблон в [CHANGES.md](../CHANGES.md).

Запись нужна, если менялись:

- `app/`, `components/`, `lib/`, `styles/`, `content/`, `public/`
- `package.json`, конфиги Next/ESLint/TS
- Wiki или `AGENTS.md` при смене процессов

**Wiki** — обновить страницы, если изменилась архитектура, брейкпоинты, процессы.

**Проверка** — `npm run build` для нетривиальных изменений.

### 4. Перед «готово»

- [ ] CHANGES.md дополнен (если были правки кода)
- [ ] Wiki актуальна (если менялась система)
- [ ] Build проходит (если менялся код)

## Поле Agent в CHANGES.md

Указывай реальное имя инструмента:

- `Cursor`
- `Claude Code`
- `Codex`
- `Human`

## Исключения

- Только чтение / ответ без правок — CHANGES не нужен
- Правки только в CHANGES или `.wiki` — одна запись про документацию

## log.md

Краткий указатель: [log.md](log.md) → `CHANGES.md`.
