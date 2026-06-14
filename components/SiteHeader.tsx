import Link from 'next/link';

const nav = [
  { label: 'Что это', href: '/#benefits' },
  { label: 'Кто мы', href: '/#founders' },
  { label: 'Сколько стоит', href: '/#pricing' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__logo" href="/">
          FRONTIER
        </Link>
        <nav className="site-header__nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link key={item.href} className="site-header__nav-link" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <Link className="site-header__button" href="/#pricing">
            Вступить
          </Link>
          <button
            className="site-header__burger"
            type="button"
            aria-label="Открыть меню"
            aria-expanded="false"
          >
            <span className="site-header__burger-icon" />
          </button>
        </div>
      </div>
      <div className="site-header__mobile">
        <nav className="site-header__mobile-nav" aria-label="Мобильная навигация">
          {nav.map((item) => (
            <Link key={item.href} className="site-header__nav-link" href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="site-header__button" href="/#pricing">
            Вступить
          </Link>
        </nav>
      </div>
    </header>
  );
}
