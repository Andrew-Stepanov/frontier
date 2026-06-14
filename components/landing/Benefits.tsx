import Image from 'next/image';

const cards = [
  {
    icon: '/assets/optim_tildacdn_com/Component_1.png_10efd68e4f30.webp',
    title: 'Окружить себя сильными фаундерами',
    text: 'В закрытых чатах клуба — только основатели бизнеса и лидеры направлений: никаких случайных людей. Раз в месяц мы встречаемся на форум-группах, чтобы предметно разобрать задачи каждого.',
  },
  {
    icon: '/assets/optim_tildacdn_com/Component_2.png_ab0d91b5a086.webp',
    title: 'Быстро решать проблемы',
    text: 'Вместо того чтобы тестировать гипотезы с нуля и оплачивать ошибки из своего кармана, вы берете готовый опыт коллег. В клубе всегда есть тот, кто уже решил вашу задачу: будь то настройка международных платежей или локализация продукта.',
  },
  {
    icon: '/assets/optim_tildacdn_com/Component_3.png_582bbd75a060.webp',
    title: 'Безопасная среда для сложных тем',
    text: 'В клубе можно честно обсуждать то, о чем не пишут в соцсетях: кассовые разрывы, кадровые проблемы, потерю денег и выгорание. Здесь безопасно называть реальные цифры, делиться изнанкой бизнеса и просить совета.',
  },
];

export function Benefits() {
  return (
    <section className="benefits landing__section" id="benefits">
      <div className="landing__shell">
        <h2 className="benefits__heading">
          Frontier — это лучшее окружение для тех, кто прямо сейчас выводит бизнес за рубеж
        </h2>
        <p className="benefits__subtext">
          Мы делимся реальными кейсами — с цифрами, провалами и выводами. Это помогает не терять деньги и расти быстрее.
        </p>
        <div className="benefits__grid">
          {cards.map((card) => (
            <article key={card.title} className="benefits__card">
              <Image
                className="benefits__icon"
                src={card.icon}
                alt=""
                width={90}
                height={90}
              />
              <div>
                <h3 className="benefits__card-title">{card.title}</h3>
                <p className="benefits__card-text">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
