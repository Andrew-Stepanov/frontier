# Лендинг

Главная страница — визуальный перенос с Tilda без Tilda runtime.

## Секции

| Компонент | Файл | Layout |
|-----------|------|--------|
| Hero | `Hero.tsx` | Flow |
| Market | `Market.tsx` | ScaledCanvas |
| Benefits | `Benefits.tsx` | Flow |
| ClubOverview | `ClubOverview.tsx` | Flow |
| Forum | `Forum.tsx` | ScaledCanvas |
| AISection | `AISection.tsx` | Flow |
| Offline | `Offline.tsx` | ScaledCanvas |
| Founders | `Founders.tsx` | Flow |
| Pricing | `Pricing.tsx` | ScaledCanvas |
| FAQ | `FAQ.tsx` | Flow |

## ScaledCanvas

`components/landing/ScaledCanvas.tsx`:

- Client component (`'use client'`) — измеряет `document.documentElement.clientWidth`
- Пропсы: `desktopH`, `mobileH`, опционально `desktopW` / `mobileW`, `canvasClassName`
- Внутри: viewport с `zoom: scale` и canvas с фиксированными `width/height` в px

Высоты artboard — `canvasPresets.ts`:

```ts
MARKET_CANVAS   { desktopH: 2365, mobileH: 1231 }
FORUM_CANVAS    { desktopH: 620,  mobileH: 720 }
OFFLINE_CANVAS  { desktopH: 630,  mobileH: 650 }
PRICING_CANVAS  { desktopH: 1278, mobileH: 1068 }
```

## Добавление canvas-секции

1. Скопировать паттерн из `Forum.tsx` / `Pricing.tsx`.
2. Координаты элементов — absolute `top/left/width` в px от artboard.
3. Стили позиционирования — в `landing.css` (префикс секции, desktop + mobile media).
4. Добавить preset в `canvasPresets.ts` если новая высота.
5. Подключить в `app/page.tsx`.

## Добавление flow-секции

1. Компонент + BEM-подобные классы в `landing.css`.
2. Использовать CSS variables из `tokens.css` (`--content`, `--gutter`, `--artboard`).
3. Wide desktop (≥1200px): fluid padding `calc(200 * 100vw / 1200)` в блоке polish в конце `landing.css`.

## Якоря навигации

Шапка (`SiteHeader.tsx`):

- `/#benefits` — «Что это»
- `/#founders` — «Кто мы»
- `/#pricing` — «Сколько стоит» / «Вступить»

При добавлении секций синхронизировать id в компонентах и `SiteHeader`.

## Изображения

- Canvas: `CanvasImg` → `public/assets/...`
- Flow: при необходимости `next/image` с `sizes`

Ассеты в `public/assets/` (optim_tildacdn_com, static_tildacdn_com).

## Стили

Всё лендинга — `styles/landing.css`. Не дублировать стили шапки (они в `site-overrides.css`).
