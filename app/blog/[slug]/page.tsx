import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArticleAuthor } from '@/components/blog/ArticleAuthor';
import { ArticleSidebar } from '@/components/blog/ArticleSidebar';
import { JoinClubBanner } from '@/components/blog/JoinClubBanner';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { MarkdownContent } from '@/components/blog/MarkdownContent';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { JsonLd } from '@/components/JsonLd';
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/blog';
import { FALLBACK_COVER } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import { extractToc, getArticleMarkdown } from '@/lib/markdown';
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  getArticleBreadcrumbs,
  getArticlePath,
} from '@/lib/seo-article';
import { siteConfig } from '@/lib/site';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildArticleMetadata(article);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const markdown = getArticleMarkdown(article);
  const toc = extractToc(markdown);
  const shareUrl = new URL(getArticlePath(article.slug), siteConfig.url).toString();
  const breadcrumbs = getArticleBreadcrumbs(article);
  const cover =
    article.coverImage ||
    article.ogImage ||
    FALLBACK_COVER;

  return (
    <main className="blog-page">
      <JsonLd data={buildArticleJsonLd(article)} />
      <div className="blog-page__container">
        <Breadcrumbs items={breadcrumbs} />

        <header className="blog-article-head">
          <div className="blog-article__meta">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMin} мин чтения</span>
            {article.updatedAt !== article.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>Обновлено {formatDate(article.updatedAt)}</span>
              </>
            )}
          </div>
          <h1 className="blog-article__heading">{article.title}</h1>
        </header>

        <figure className="blog-article__cover">
          <Image
            src={cover}
            alt={article.title}
            width={1200}
            height={675}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="blog-article__cover-img"
          />
        </figure>

        <div className="blog-article-layout">
          <div className="blog-article-main">
            <MarkdownContent content={markdown} />
            <footer className="blog-article__footer">
              <ArticleAuthor article={article} />
              <ShareButtons url={shareUrl} title={article.title} />
            </footer>
          </div>
          <ArticleSidebar toc={toc} />
        </div>

        <div className="blog-mobile-cta">
          <JoinClubBanner />
        </div>
      </div>
    </main>
  );
}
