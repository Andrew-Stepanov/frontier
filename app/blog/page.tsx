import type { Metadata } from 'next';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { getPublishedArticles } from '@/lib/blog';
import { buildBlogListJsonLd } from '@/lib/seo-article';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Блог',
  description:
    'Статьи Frontier о выходе на глобальные рынки, масштабировании бизнеса и опыте фаундеров.',
  alternates: {
    canonical: new URL('/blog', siteConfig.url).toString(),
  },
  openGraph: {
    type: 'website',
    title: `Блог | ${siteConfig.name}`,
    description:
      'Статьи о выходе на глобальные рынки, масштабировании и опыте фаундеров.',
    url: new URL('/blog', siteConfig.url).toString(),
  },
};

export default function BlogPage() {
  const articles = getPublishedArticles();

  return (
    <main className="blog-page">
      <JsonLd data={buildBlogListJsonLd()} />
      <div className="blog-page__container">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Блог', href: '/blog' },
          ]}
        />

        <header className="blog-section-head blog-section-head--list">
          <h1 className="blog-page__title">
            <span className="blog-page__title--accent">Блог</span> Frontier
          </h1>
          <p className="blog-page__lead">
            Практика выхода на глобальные рынки — кейсы, ошибки и выводы от
            фаундеров и резидентов клуба
          </p>
        </header>

        <div className="blog-list">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}
