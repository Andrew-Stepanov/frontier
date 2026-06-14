export const siteConfig = {
  name: 'Frontier',
  shortName: 'FRONTIER',
  description: 'Закрытый клуб фаундеров и C-level лидеров для выхода на глобальные рынки',
  locale: 'ru_RU',
  language: 'ru',
  /** Базовый URL продакшена; переопределяется через NEXT_PUBLIC_SITE_URL */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://frontier-global.club',
  defaultOgImage:
    '/assets/optim_tildacdn_com/Group_1321316021.png_f25ef650a1de.webp',
  favicon: '/assets/static_tildacdn_com/_3_b76d8ea2aea1.png',
  themeColor: '#000000',
} as const;

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

/** Реестр страниц: добавьте запись — sitemap подхватит автоматически */
export interface PageDefinition {
  /** Пустая строка = главная (`/`) */
  slug: string;
  contentFile: string;
  changefreq: ChangeFrequency;
  priority: number;
}

export const pages: PageDefinition[] = [
  {
    slug: '',
    contentFile: 'frontier.json',
    changefreq: 'weekly',
    priority: 1,
  },
];

/** Статические маршруты вне реестра HTML-страниц (блог, и т.д.) */
export const extraRoutes: Array<{
  path: string;
  changefreq: ChangeFrequency;
  priority: number;
}> = [
  { path: '/blog', changefreq: 'daily', priority: 0.9 },
];

export function getPagePath(slug: string): string {
  return slug === '' ? '/' : `/${slug}`;
}

export function getHomePage(): PageDefinition {
  return pages.find((p) => p.slug === '')!;
}
