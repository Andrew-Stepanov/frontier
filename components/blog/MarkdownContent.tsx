import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import type { Components } from 'react-markdown';
import type { Element } from 'hast';

function isImageOnlyParagraph(node: unknown): boolean {
  if (!node || typeof node !== 'object' || !('children' in node)) return false;
  const children = (node as Element).children;
  if (children?.length !== 1 || children[0].type !== 'element') return false;

  const el = children[0] as Element;
  if (el.tagName === 'img') return true;

  if (el.tagName === 'a' && el.children?.length === 1) {
    const inner = el.children[0];
    return inner.type === 'element' && (inner as Element).tagName === 'img';
  }

  return false;
}

function getImageAlt(node: Element): string {
  for (const child of node.children ?? []) {
    if (child.type !== 'element') continue;
    const el = child as Element;
    if (el.tagName === 'img') {
      return String(el.properties?.alt ?? '');
    }
    if (el.tagName === 'a') {
      const img = el.children?.find(
        (c) => c.type === 'element' && (c as Element).tagName === 'img',
      ) as Element | undefined;
      if (img) return String(img.properties?.alt ?? '');
    }
  }
  return '';
}

function MarkdownImage({ src, alt }: { src: string; alt?: string }) {
  const isExternal = src.startsWith('http');
  if (isExternal) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt || ''} loading="lazy" />
    );
  }
  return (
    <Image
      src={src}
      alt={alt || ''}
      width={800}
      height={450}
      className="blog-md-figure__img"
      sizes="(max-width: 768px) 100vw, 640px"
    />
  );
}

const components: Components = {
  p: ({ node, children, ...props }) => {
    if (node && isImageOnlyParagraph(node)) {
      const alt = getImageAlt(node);
      return (
        <figure className="blog-md-figure">
          {children}
          {alt ? <figcaption>{alt}</figcaption> : null}
        </figure>
      );
    }
    return <p {...props}>{children}</p>;
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;
    return <MarkdownImage src={src} alt={alt} />;
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
};
