import type { TocItem } from '@/lib/markdown';
import { ArticleToc } from './ArticleToc';
import { JoinClubBanner } from './JoinClubBanner';

interface ArticleSidebarProps {
  toc: TocItem[];
}

export function ArticleSidebar({ toc }: ArticleSidebarProps) {
  return (
    <div className="blog-article-sidebar">
      <ArticleToc items={toc} />
      <JoinClubBanner />
    </div>
  );
}
