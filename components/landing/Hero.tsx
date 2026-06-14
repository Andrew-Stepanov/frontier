import Image from 'next/image';
import Link from 'next/link';

const tags = ['AI', 'SaaS', 'Blockchain', 'EdTech', 'MedTech', 'Biotech'];

export function Hero() {
  return (
    <section className="hero landing__section" id="hero">
      <div className="landing__shell">
        <div className="hero__inner">
          <h1 className="hero__title">
            <span className="hero__title-accent">FRONTIER.</span>{' '}
            <span className="hero__title-rest">ЗАКРЫТЫЙ КЛУБ ФАУНДЕРОВ И C-LEVEL ЛИДЕРОВ</span>
          </h1>
          <p className="hero__subtitle">Для тех, кто выходит на глобальные рынки</p>
          <div className="hero__tags">
            {tags.map((tag) => (
              <span key={tag} className="hero__tag">{tag}</span>
            ))}
          </div>
          <p className="hero__description">
            Помогаем масштабировать действующий бизнес через обмен опытом, честный нетворкинг и разбор ошибок
          </p>
          <div className="hero__row">
            <Link className="hero__cta" href="#pricing">Присоединиться</Link>
            <div className="hero__proof">
              <Image
                className="hero__avatars"
                src="/assets/optim_tildacdn_com/Group_1321316021.png_f25ef650a1de.webp"
                alt="Участники клуба Frontier"
                width={283}
                height={60}
                priority
              />
              <p className="hero__social">
                250+ действующих фаундеров и C-level уже присоединились к закрытому клубу
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
