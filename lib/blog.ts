import 'server-only';

import { desc, eq } from 'drizzle-orm';
import { getDb } from './db';
import { articles, type Article } from './db/schema';

export function getPublishedArticles(): Article[] {
  return getDb()
    .select()
    .from(articles)
    .orderBy(desc(articles.publishedAt))
    .all();
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getDb()
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .get();
}

export function getAllArticleSlugs(): string[] {
  return getPublishedArticles().map((a) => a.slug);
}

export function parseKeywords(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((k) => typeof k === 'string') : [];
  } catch (e) {
    console.warn('parseKeywords: failed to parse', raw, e);
    return [];
  }
}
