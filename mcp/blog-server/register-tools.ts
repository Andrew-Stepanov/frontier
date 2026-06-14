import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
  createArticle,
  deleteArticle,
  getArticleBySlugAdmin,
  listArticleSummaries,
  updateArticle,
} from '../../lib/blog-admin.js';
import {
  articlePublicUrl,
  siteBaseUrl,
  verifyMcpToken,
} from './auth.js';

const tokenSchema = z
  .string()
  .min(24)
  .describe('Токен FRONTIER_MCP_TOKEN (тот же, что в env сервера)');

function jsonText(data: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

function afterWriteNote(slug: string) {
  return {
    slug,
    url: articlePublicUrl(slug),
    sitemap: `${siteBaseUrl()}/sitemap.xml`,
    note:
      'Статья в SQLite. На проде: npm run build (или пересборка) для статического HTML; sitemap обновится при следующем запросе.',
  };
}

const keywordsSchema = z.array(z.string()).optional();

export function registerBlogTools(server: McpServer) {
  server.registerTool(
    'blog_list_articles',
    {
      description: 'Список опубликованных статей блога (slug, title, даты).',
      inputSchema: {
        mcp_token: tokenSchema,
      },
      annotations: { readOnlyHint: true },
    },
    async ({ mcp_token }) => {
      verifyMcpToken(mcp_token);
      const articles = listArticleSummaries();
      return jsonText({ count: articles.length, articles });
    },
  );

  server.registerTool(
    'blog_get_article',
    {
      description: 'Полная статья по slug (включая content_md).',
      inputSchema: {
        mcp_token: tokenSchema,
        slug: z.string().describe('URL slug, например vyhod-na-globalnyj-rynok-oshibki-faunders'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ mcp_token, slug }) => {
      verifyMcpToken(mcp_token);
      const article = getArticleBySlugAdmin(slug);
      if (!article) {
        return jsonText({ error: `Статья "${slug}" не найдена` });
      }
      return jsonText({
        article,
        url: articlePublicUrl(slug),
      });
    },
  );

  server.registerTool(
    'blog_article_template',
    {
      description:
        'Пример полей для создания статьи и шаблон Markdown (без записи в БД).',
      inputSchema: {
        mcp_token: tokenSchema,
      },
      annotations: { readOnlyHint: true },
    },
    async ({ mcp_token }) => {
      verifyMcpToken(mcp_token);
      return jsonText({
        slug: 'latin-slug-with-hyphens',
        title: 'Заголовок статьи',
        description: 'Краткое описание для SEO и карточки (1–2 предложения).',
        content_md: '# Введение\n\nТекст в **Markdown** (GFM): списки, ссылки, `код`, изображения.\n\n## Подзаголовок\n\nПродолжение текста.',
        author_name: 'Владимир Корнигор',
        author_role: 'Основатель Frontier',
        author_image: '/assets/optim_tildacdn_com/image_20240748.png_612125f6af94.webp',
        cover_image: 'https://images.unsplash.com/...',
        og_image: 'https://images.unsplash.com/...',
        keywords: ['глобальный рынок', 'фаундер', 'Frontier'],
        reading_time_min: 'авто из content_md, если не указано',
      });
    },
  );

  server.registerTool(
    'blog_create_article',
    {
      description: 'Создать новую статью в SQLite. Slug — латиница и дефисы.',
      inputSchema: {
        mcp_token: tokenSchema,
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        content_md: z.string(),
        author_name: z.string(),
        author_role: z.string().optional(),
        author_image: z.string().optional(),
        cover_image: z.string().optional(),
        og_image: z.string().optional(),
        keywords: keywordsSchema,
        published_at: z.string().optional().describe('ISO 8601, по умолчанию сейчас'),
        reading_time_min: z.number().int().positive().optional(),
      },
      annotations: { destructiveHint: false },
    },
    async (input) => {
      verifyMcpToken(input.mcp_token);
      const article = createArticle({
        slug: input.slug,
        title: input.title,
        description: input.description,
        contentMd: input.content_md,
        authorName: input.author_name,
        authorRole: input.author_role,
        authorImage: input.author_image,
        coverImage: input.cover_image,
        ogImage: input.og_image,
        keywords: input.keywords,
        publishedAt: input.published_at,
        readingTimeMin: input.reading_time_min,
      });
      return jsonText({
        ok: true,
        article,
        ...afterWriteNote(article.slug),
      });
    },
  );

  server.registerTool(
    'blog_update_article',
    {
      description: 'Обновить существующую статью (передайте только изменённые поля).',
      inputSchema: {
        mcp_token: tokenSchema,
        slug: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        content_md: z.string().optional(),
        author_name: z.string().optional(),
        author_role: z.string().optional().nullable(),
        author_image: z.string().optional().nullable(),
        cover_image: z.string().optional().nullable(),
        og_image: z.string().optional().nullable(),
        keywords: keywordsSchema,
        published_at: z.string().optional(),
        reading_time_min: z.number().int().positive().optional(),
      },
    },
    async (input) => {
      verifyMcpToken(input.mcp_token);
      const article = updateArticle(input.slug, {
        title: input.title,
        description: input.description,
        contentMd: input.content_md,
        authorName: input.author_name,
        authorRole: input.author_role,
        authorImage: input.author_image,
        coverImage: input.cover_image,
        ogImage: input.og_image,
        keywords: input.keywords,
        publishedAt: input.published_at,
        readingTimeMin: input.reading_time_min,
      });
      return jsonText({
        ok: true,
        article,
        ...afterWriteNote(article.slug),
      });
    },
  );

  server.registerTool(
    'blog_delete_article',
    {
      description: 'Удалить статью по slug.',
      inputSchema: {
        mcp_token: tokenSchema,
        slug: z.string(),
      },
      annotations: { destructiveHint: true },
    },
    async ({ mcp_token, slug }) => {
      verifyMcpToken(mcp_token);
      const result = deleteArticle(slug);
      return jsonText({ ok: true, ...result });
    },
  );
}
