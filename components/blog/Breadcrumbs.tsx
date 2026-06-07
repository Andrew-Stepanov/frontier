import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/seo-article';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="blog-breadcrumbs" aria-label="Хлебные крошки">
      <ol className="blog-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="blog-breadcrumbs__item">
              {isLast ? (
                <span className="blog-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link className="blog-breadcrumbs__link" href={item.href}>
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span className="blog-breadcrumbs__sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
