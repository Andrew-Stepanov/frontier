/**
 * CRUD статей блога (SQLite). Используется MCP-сервером и будущим API.
 * Не импортирует server-only — можно вызывать из отдельного Node-процесса.
 */

import { desc, eq } from 'drizzle-orm';
import { getDb } from './db';
import { articles, type Article, type NewArticle } from './db/schema';
import { estimateReadingTimeMin } from './blog-reading-time';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface ArticleSummary {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMin: number;
}

export interface CreateArticleInput {
  slug: string;
  title: string;
  description: string;
  contentMd: string;
  authorName: string;
  authorRole?: string | null;
  authorImage?: string | null;
  coverImage?: string | null;
  ogImage?: string | null;
  keywords?: string[];
  publishedAt?: string;
  updatedAt?: string;
  readingTimeMin?: number;
}

export type UpdateArticleInput = Partial<
  Omit<CreateArticleInput, 'slug'>
>;

function assertValidSlug(slug: string): void {
  if (!SLUG_RE.test(slug)) {
    throw new Error(
      `Некорректный slug "${slug}". Используйте латиницу, цифры и дефис: my-article-slug`,
    );
  }
}

function normalizeKeywords(keywords?: string[]): string | null {
  if (!keywords?.length) return null;
  return JSON.stringify(keywords);
}

export function listArticleSummaries(): ArticleSummary[] {
  return getDb()
    .select({
      slug: articles.slug,
      title: articles.title,
      description: articles.description,
      publishedAt: articles.publishedAt,
      updatedAt: articles.updatedAt,
      readingTimeMin: articles.readingTimeMin,
    })
    .from(articles)
    .orderBy(desc(articles.publishedAt))
    .all();
}

export function getArticleBySlugAdmin(slug: string): Article | undefined {
  return getDb()
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .get();
}

export function createArticle(input: CreateArticleInput): Article {
  assertValidSlug(input.slug);

  const existing = getArticleBySlugAdmin(input.slug);
  if (existing) {
    throw new Error(`Статья с slug "${input.slug}" уже существует`);
  }

  const now = new Date().toISOString();
  const publishedAt = input.publishedAt ?? now;
  const updatedAt = input.updatedAt ?? publishedAt;
  const readingTimeMin =
    input.readingTimeMin ?? estimateReadingTimeMin(input.contentMd);

  const row: NewArticle = {
    slug: input.slug,
    title: input.title.trim(),
    description: input.description.trim(),
    contentMd: input.contentMd,
    contentHtml: null,
    authorName: input.authorName.trim(),
    authorRole: input.authorRole?.trim() ?? null,
    authorImage: input.authorImage ?? null,
    coverImage: input.coverImage ?? null,
    ogImage: input.ogImage ?? null,
    keywords: normalizeKeywords(input.keywords),
    publishedAt,
    updatedAt,
    readingTimeMin,
  };

  getDb().insert(articles).values(row).run();
  return getArticleBySlugAdmin(input.slug)!;
}

export function updateArticle(
  slug: string,
  patch: UpdateArticleInput,
): Article {
  const current = getArticleBySlugAdmin(slug);
  if (!current) {
    throw new Error(`Статья "${slug}" не найдена`);
  }

  const contentMd = patch.contentMd ?? current.contentMd;
  const updatedAt = patch.updatedAt ?? new Date().toISOString();
  const readingTimeMin =
    patch.readingTimeMin ??
    (patch.contentMd
      ? estimateReadingTimeMin(contentMd)
      : current.readingTimeMin);

  getDb()
    .update(articles)
    .set({
      title: patch.title?.trim() ?? current.title,
      description: patch.description?.trim() ?? current.description,
      contentMd,
      contentHtml: patch.contentMd ? null : current.contentHtml,
      authorName: patch.authorName?.trim() ?? current.authorName,
      authorRole:
        patch.authorRole !== undefined
          ? patch.authorRole?.trim() ?? null
          : current.authorRole,
      authorImage:
        patch.authorImage !== undefined ? patch.authorImage : current.authorImage,
      coverImage:
        patch.coverImage !== undefined ? patch.coverImage : current.coverImage,
      ogImage: patch.ogImage !== undefined ? patch.ogImage : current.ogImage,
      keywords:
        patch.keywords !== undefined
          ? normalizeKeywords(patch.keywords)
          : current.keywords,
      publishedAt: patch.publishedAt ?? current.publishedAt,
      updatedAt,
      readingTimeMin,
    })
    .where(eq(articles.slug, slug))
    .run();

  return getArticleBySlugAdmin(slug)!;
}

export function deleteArticle(slug: string): { deleted: true; slug: string } {
  const current = getArticleBySlugAdmin(slug);
  if (!current) {
    throw new Error(`Статья "${slug}" не найдена`);
  }
  getDb().delete(articles).where(eq(articles.slug, slug)).run();
  return { deleted: true, slug };
}
