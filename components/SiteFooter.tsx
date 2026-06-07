import Link from 'next/link';

const footerLinks = [
  { label: 'Блог', href: '/blog' },
  { label: 'Публичная оферта', href: '#', underline: true },
];

export function SiteFooter() {
  return (
    <footer className="site-footer site-footer--global" id="footer">
      <div className="site-footer__inner">
        <p className="site-footer__copyright">© FRONTIER, 2026</p>
        <nav className="site-footer__links" aria-label="Ссылки в подвале">
          {footerLinks.map((item) => (
            <Link
              key={item.href + item.label}
              className={
                item.underline
                  ? 'site-footer__link site-footer__link--offer'
                  : 'site-footer__link'
              }
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
