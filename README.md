# Frontier Site (Next.js 16)

Полноценный SEO-оптимизированный сайт на **Next.js 16** App Router, собранный из `output/frontier-global-ds` (BEM HTML, CSS, JS, assets).

## Быстрый старт

```bash
cd frontier-site
cp .env.example .env.local   # при необходимости смените URL
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

| Путь | Назначение |
|------|------------|
| `content/frontier.json` | Мета и контент для SEO |
| `content/frontier-body.html` | BEM-разметка страницы (из DS) |
| `styles/style.css` | Стили из `frontier-global-ds` |
| `public/js/` | `canvas-scale.js`, `faq.js`, `main.js` |
| `public/assets/` | Изображения и шрифты |
| `lib/site.ts` | **Реестр страниц** — sitemap и маршруты |
| `lib/seo.ts` | Metadata API + JSON-LD |

## SEO

- `app/sitemap.ts` — автогенерация `/sitemap.xml` из `lib/site.ts`
- `app/robots.ts` — `/robots.txt` со всеми страницами из реестра
- `app/manifest.ts` — Web App Manifest
- На каждой странице: title, description, canonical, Open Graph, Twitter Card, robots, JSON-LD (WebSite, Organization, WebPage, FAQPage)

## Новая страница

1. Добавьте `content/my-page.json` и `content/my-page-body.html` (через `generate-design-system.js` или вручную).
2. Зарегистрируйте в `lib/site.ts`:

```ts
{
  slug: 'about',
  contentFile: 'about.json',
  bodyFile: 'about-body.html',
  changefreq: 'monthly',
  priority: 0.8,
},
```

3. Sitemap, robots и маршрут `/about` подхватятся автоматически.

## Обновление контента с pipeline

```bash
# из корня tilda-mirror
npm run generate-ds
cp output/frontier-global-ds/css/style.css frontier-site/styles/
cp output/frontier-global-ds/js/*.js frontier-site/public/js/
cp output/frontier-global-ds/content/frontier.json frontier-site/content/
# пересоздать body HTML:
node -e "const fs=require('fs');const h=fs.readFileSync('output/frontier-global-ds/index.html','utf8');const m=h.match(/<body[^>]*>([\\s\\S]*?)<script/);fs.writeFileSync('frontier-site/content/frontier-body.html',m[1].trim())"
```

## Продакшен

```bash
npm run build
npm start
```

Переменная `NEXT_PUBLIC_SITE_URL` должна указывать на боевой домен для корректных canonical и sitemap.
# frontier
