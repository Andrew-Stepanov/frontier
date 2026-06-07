import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  contentMd: text('content_md').notNull().default(''),
  contentHtml: text('content_html'),
  authorName: text('author_name').notNull(),
  authorRole: text('author_role'),
  authorImage: text('author_image'),
  ogImage: text('og_image'),
  coverImage: text('cover_image'),
  keywords: text('keywords'),
  publishedAt: text('published_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  readingTimeMin: integer('reading_time_min').notNull().default(5),
});

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
