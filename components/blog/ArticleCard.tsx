import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/db/schema';
import { FALLBACK_COVER } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import { getArticlePath } from '@/lib/seo-article';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const image = article.coverImage || article.ogImage || FALLBACK_COVER;

  return (
    <article className="blog-card">
      <Link href={getArticlePath(article.slug)} className="blog-card__media">
        <Image
          src={image}
          alt={article.title}
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
