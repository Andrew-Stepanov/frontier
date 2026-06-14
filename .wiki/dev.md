# Разработка

## Требования

- Node.js 20+
- npm

## Команды

```bash
npm run dev      # http://localhost:3000, Turbopack
npm run build    # production build
npm run start    # после build
npm run lint     # eslint
```

## Env

Скопировать `.env.example` → `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://frontier-global.club
```

Локально можно оставить default или `http://localhost:3000`.

## Первый запуск

1. `npm install`
2. `npm run dev`
3. SQLite `data/blog.sqlite` создаётся автоматически с демо-статьёй

## Структура git

Репозиторий: `Andrew-Stepanov/frontier` (корень = frontier-site).

Не коммитить: `node_modules`, `.next`, `.env*`, `data/*.sqlite*`.

## Проверка перед PR

1. `npm run build` без ошибок
2. Визуально: `/`, `/blog`, `/blog/[slug]` на ~390px и ≥1200px
3. Запись в `CHANGES.md`

## Деплой

Стандартный Next.js: `npm run build && npm start` или Vercel.

Убедиться, что `NEXT_PUBLIC_SITE_URL` задан на хостинге.

## Troubleshooting

| Проблема | Проверить |
|----------|-----------|
| Белые полосы по краям | `tokens.css` html/body margin и background |
| Шапка кривая на 980–1100px | inset 200px только при ≥1200px (`site-overrides.css`) |
| Canvas не масштабируется | `ScaledCanvas`, breakpoint 1200px |
| Статья 404 | slug в DB, `generateStaticParams` |
