# Стили и design tokens

## Файлы

| Файл | Область |
|------|---------|
| `styles/tokens.css` | CSS variables, `html/body`, scroll-padding |
| `styles/site-overrides.css` | Шапка, футер, мобильное меню, Bebas @font-face |
| `styles/landing.css` | Только лендинг (`.landing …`) |
| `styles/blog.css` | Блог (`.blog-page …`) |

Порядок в layout: `tokens` → `site-overrides`. Лендинг и блог подключают свои файлы на страницах/layout.

## Tokens (`:root`)

| Token | Значение | Назначение |
|-------|----------|------------|
| `--artboard` | 1200px | Ширина artboard Tilda |
| `--content` | 800px | Контентная колонка |
| `--gutter` | 20px | Боковой отступ mobile |
| `--header-h` | 87px / 77px | Высота шапки (desktop / ≤1199px) |
| `--color-accent` | #beff3d | Лайм |
| `--font-display` | Bebas Neue | Заголовки |
| `--font-body` | Roboto | Текст |

Типографика блога: `--text-h1`, `--text-h2`, `--text-body`, … в `tokens.css`.

## Брейкпоинты (важно)

| px | Что происходит |
|----|----------------|
| ≤979 | Мобильное меню (burger), desktop nav скрыта |
| ≥980 | Desktop nav в шапке |
| ≥1200 | Artboard inset `calc(200 * 100vw / 1200)` в шапке/футере; ScaledCanvas → desktop artboard 1200 |
| <1200 | ScaledCanvas → mobile artboard 320 |

**Не** применять inset 200px при ширине <1200px — ломает шапку.

## Шапка

- Grid/flex + **абсолютное центрирование** nav (`left: 50%`, `transform`)
- Logo и actions с `z-index: 2`
- `MobileMenuEnhancer` — client JS для burger, backdrop, `--site-header-height`

## Лендинг wide desktop

В конце `landing.css` блок `@media (min-width: 1200px)` — fluid размеры через `calc(N * 100vw / 1200)` для flow-секций.

## Правки

- Глобальные UI (header/footer) → `site-overrides.css`
- Секция лендинга → `landing.css` с префиксом секции
- Блог → `blog.css`
- Новые цвета/размеры → сначала `tokens.css`
