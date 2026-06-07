import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import type { Components } from 'react-markdown';

const components: Components = {
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;
    const isExternal = src.startsWith('http');
    return (
      <figure className="blog-md-figure">
        {isExternal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || ''} loading="lazy" />
        ) : (
          <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={450}
            className="blog-md-figure__img"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        )}
        {alt ? <figcaption>{alt}</figcaption> : null}
      </figure>
    );
  },
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
};

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="blog-article__content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
