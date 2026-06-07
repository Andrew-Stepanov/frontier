import 'server-only';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { count } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';
import { articles } from './schema';
import { seedArticles } from './seed-data';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'blog.sqlite');

let dbInstance: ReturnType<typeof drizzle> | null = null;

function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const sqlite = new Database(DB_PATH);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      content_md TEXT NOT NULL DEFAULT '',
      content_html TEXT,
      author_name TEXT NOT NULL,
      author_role TEXT,
      author_image TEXT,
      og_image TEXT,
      cover_image TEXT,
      keywords TEXT,
      published_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      reading_time_min INTEGER NOT NULL DEFAULT 5
    )
  `);

  const columns = sqlite
    .prepare(`PRAGMA table_info(articles)`)
    .all() as Array<{ name: string }>;
  const colNames = new Set(columns.map((c) => c.name));

  if (!colNames.has('cover_image')) {
    sqlite.exec(`ALTER TABLE articles ADD COLUMN cover_image TEXT`);
  }
  if (!colNames.has('content_md')) {
    sqlite.exec(`ALTER TABLE articles ADD COLUMN content_md TEXT NOT NULL DEFAULT ''`);
  }

  const db = drizzle(sqlite);

  const row = db.select({ value: count() }).from(articles).get();
  if (!row?.value) {
    for (const article of seedArticles) {
      db.insert(articles).values(article).run();
    }
  } else {
    for (const article of seedArticles) {
      sqlite
        .prepare(
          `UPDATE articles SET
            content_md = ?,
            cover_image = ?,
            og_image = ?,
            author_image = ?,
            content_html = NULL
          WHERE slug = ?`,
        )
        .run(
          article.contentMd,
          article.coverImage,
          article.ogImage,
          article.authorImage,
          article.slug,
        );
    }
  }

  return db;
}

export function getDb() {
  if (!dbInstance) {
    dbInstance = ensureDatabase();
  }
  return dbInstance;
}
