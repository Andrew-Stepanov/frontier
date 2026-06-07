'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/markdown';

interface ArticleTocProps {
  items: TocItem[];
}

export function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="blog-toc" aria-label="Оглавление">
      <p className="blog-toc__label">Оглавление</p>
      <ol className="blog-toc__list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`blog-toc__item blog-toc__item--level-${item.level}${
              activeId === item.id ? ' blog-toc__item--active' : ''
            }`}
          >
            <a className="blog-toc__link" href={`#${item.id}`}>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
