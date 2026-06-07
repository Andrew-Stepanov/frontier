import Link from 'next/link';

const nav = [
  { label: 'Что это', href: '/#benefits' },
  { label: 'Кто мы', href: '/#founders' },
  { label: 'Сколько стоит', href: '/#pricing' },
];

/** Единая шапка сайта (мобильная + desktop canvas как на главной) */
export function SiteHeader() {
  return (
    <>
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

      <section className="site-header-desktop" id="site-header-desktop">
        <div
          className="site-header-desktop__canvas"
          data-canvas-screens="320,1200"
          data-canvas-height="70"
          data-canvas-valign="center"
          data-canvas-upscale="window"
          data-canvas-pos="fixed"
          data-canvas-height-res-320="77"
        >
          <Link className="site-header-desktop__logo" href="/">
            FRONTIER
          </Link>
          <Link className="site-header-desktop__cta" href="/#pricing">
            <div className="site-header-desktop__button-content">
              <span className="site-header-desktop__button-text">Вступить</span>
            </div>
            <span className="site-header-desktop__button-border" />
          </Link>
          <Link
            className="site-header-desktop__nav-link site-header-desktop__nav-link--pricing"
            href="/#pricing"
          >
            <div className="site-header-desktop__button-content">
              <span className="site-header-desktop__button-text">Сколько стоит</span>
            </div>
            <span className="site-header-desktop__button-border" />
          </Link>
          <Link
            className="site-header-desktop__nav-link site-header-desktop__nav-link--founders"
            href="/#founders"
          >
            <div className="site-header-desktop__button-content">
              <span className="site-header-desktop__button-text">Кто мы</span>
            </div>
            <span className="site-header-desktop__button-border" />
          </Link>
          <Link
            className="site-header-desktop__nav-link site-header-desktop__nav-link--benefits"
            href="/#benefits"
          >
            <div className="site-header-desktop__button-content">
              <span className="site-header-desktop__button-text">Что это</span>
            </div>
            <span className="site-header-desktop__button-border" />
          </Link>
        </div>
      </section>
    </>
  );
}
