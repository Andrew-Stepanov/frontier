import GithubSlugger from 'github-slugger';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Оглавление из Markdown (h2, h3) — id совпадают с rehype-slug */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const line of markdown.split('\n')) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length;
    const text = match[2]
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[(.+?)\]\(.*?\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim();

    if (!text) continue;

    items.push({
      id: slugger.slug(text),
      text,
      level,
    });
  }

  return items;
}

export function getArticleMarkdown(article: {
  contentMd: string | null;
  contentHtml: string | null;
}): string {
  if (article.contentMd?.trim()) return article.contentMd;
  if (article.contentHtml?.trim()) return article.contentHtml;
  return '';
}
