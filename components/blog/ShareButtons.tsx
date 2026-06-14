'use client';

import { useCallback, useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

function buildShareLinks(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return [
    {
      id: 'telegram',
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      id: 'vk',
      label: 'ВКонтакте',
      href: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      id: 'x',
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const links = buildShareLinks(url, title);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('copyLink: clipboard write failed', e);
      setCopied(false);
    }
  }, [url]);

  return (
    <div className="blog-share" aria-label="Поделиться статьёй">
      <p className="blog-share__label">Поделиться</p>
      <div className="blog-share__actions">
        {links.map((link) => (
          <a
            key={link.id}
            className="blog-share__btn"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
        <button type="button" className="blog-share__btn blog-share__btn--copy" onClick={copyLink}>
          {copied ? 'Скопировано' : 'Ссылка'}
        </button>
      </div>
    </div>
  );
}
