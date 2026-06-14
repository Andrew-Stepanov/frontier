import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/blog.css';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="blog-page">
      <div className="blog-page__container">
        <h1 className="blog-page__title">404</h1>
        <p className="blog-page__lead">Страница не найдена.</p>
        <p>
          <Link className="blog-breadcrumbs__link" href="/">
            На главную
          </Link>
          {' · '}
          <Link className="blog-breadcrumbs__link" href="/blog">
            Блог
          </Link>
        </p>
      </div>
    </main>
  );
}
