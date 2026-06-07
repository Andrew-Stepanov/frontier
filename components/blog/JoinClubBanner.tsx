import Link from 'next/link';

export function JoinClubBanner() {
  return (
    <aside className="blog-cta-banner" aria-label="Вступить в клуб">
      <p className="blog-cta-banner__eyebrow">Frontier</p>
      <h2 className="blog-cta-banner__title">Закрытый клуб фаундеров</h2>
      <p className="blog-cta-banner__text">
        Обмен опытом, форум-группы и честный нетворкинг для тех, кто выходит на
        глобальные рынки
      </p>
      <Link className="blog-cta-banner__button" href="/#pricing">
        Вступить в клуб
      </Link>
    </aside>
  );
}
