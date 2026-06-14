import { readFile } from 'fs/promises';
import path from 'path';
import type { PageContent } from './types';

const contentDir = path.join(process.cwd(), 'content');

export async function loadPageContent(contentFile: string): Promise<PageContent> {
  const raw = await readFile(path.join(contentDir, contentFile), 'utf-8');
  return JSON.parse(raw) as PageContent;
}
