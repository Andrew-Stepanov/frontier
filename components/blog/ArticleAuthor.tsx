import Image from 'next/image';
import type { Article } from '@/lib/db/schema';

interface ArticleAuthorProps {
  article: Article;
}

export function ArticleAuthor({ article }: ArticleAuthorProps) {
  return (
    <div className="blog-author">
      {article.authorImage && (
        <Image
          className="blog-author__photo"
          src={article.authorImage}
          alt={article.authorName}
          width={56}
          height={56}
        />
      )}
      <div className="blog-author__meta">
        <p className="blog-author__name">{article.authorName}</p>
        {article.authorRole && (
          <p className="blog-author__role">{article.authorRole}</p>
        )}
      </div>
    </div>
  );
}
