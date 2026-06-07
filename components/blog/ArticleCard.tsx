import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/db/schema';
import { getArticlePath } from '@/lib/seo-article';

interface ArticleCardProps {
  article: Article;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

const fallbackCover =
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80&auto=format&fit=crop';

export function ArticleCard({ article }: ArticleCardProps) {
  const image = article.coverImage || article.ogImage || fallbackCover;

  return (
    <article className="blog-card">
      <Link href={getArticlePath(article.slug)} className="blog-card__media">
        <Image
          src={image}
          alt=""
          width={640}
          height={400}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>
      <div className="blog-card__body">
        <time className="blog-card__date" dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
        <h2 className="blog-card__title">
          <Link href={getArticlePath(article.slug)}>{article.title}</Link>
        </h2>
        <p className="blog-card__desc">{article.description}</p>
        <div className="blog-card__meta">
          <span>{article.authorName}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMin} мин чтения</span>
        </div>
        <Link className="blog-card__more" href={getArticlePath(article.slug)}>
          Читать
        </Link>
      </div>
    </article>
  );
}
