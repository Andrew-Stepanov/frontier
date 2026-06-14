import Image from 'next/image';

const founders = [
  {
    photo: '/assets/optim_tildacdn_com/image_20240748.png_612125f6af94.webp',
    name: 'Владимир Корнигор',
    role: 'Основатель международной школы Rocket Tech School и закрытого клуба EdTech Founders',
    bio: [
      'В 2025 году выручка — $3,1 млн. Работаем в 50 странах на 5 языках. 12 000 детей прошли через нашу школу.',
      'Управляет командой из 200 человек. Строит глобальную логистику в образовании — не на словах, а в цифрах.',
      'Создал сообщества EdTech Founders на 240 предпринимателей с выручками компаний от $100к до $50 млн.',
      'И да, это тот самый фаундер, который потерял $350 000 в Латаме, чтобы купить опыт, который не преподают ни в одной бизнес-школе.',
    ],
  },
  {
    photo: '/assets/optim_tildacdn_com/image_20240747.png_61b80fea562c.webp',
    name: 'Дарья Рыжкова',
    role: 'Основательница Smart Ranking — аналитического агентства, которое исследует рынки технологий и IT',
    bio: [
      'Составляет главные ежеквартальные рейтинги компаний в сферах EdTech, HRtech, FinTech и MedTech.',
      'Выпускает списки быстрорастущих стартапов (Smart 500) и крупнейших техно-гигантов (BigTech 100).',
      'Помогает крупным корпорациям анализировать рынки и внедрять искусственный интеллект в бизнес-процессы.',
      'Проводит премии и присуждает номинации в рамках проекта Smart Verified',
    ],
  },
  {
    photo: '/assets/optim_tildacdn_com/photo_2025-09-29_14-.png_153ccd0cb8b0.webp',
    name: 'Алексей Семенов',
    role: 'Предприниматель. 8 лет развивает IT и EdTech-проекты: от запуска до масштабирования и продажи',
    bio: [
      'Основал детскую онлайн-школу. С нуля построил проект: 130+ сотрудников, 700+ учеников из 17 стран, рост выручки +700% YoY, привлечение инвестиций и подготовка к продаже, 90% лидов привлекались из офлайна.',
      'За год вырос в 8 раз — плюс $2,5 млн к выручке. Без магии. Только продукт, маркетинг и дисциплина.',
      'Сделал успешную школу cash-out: рост выручки с 300 тыс. ₽ до 30 млн ₽/мес, команда с 3 до 50 человек',
      'Спикер профильных мероприятий в РФ и США: Белая конфа, Аномалия, Networking Club, Нейропрокачка, Фонд предпринимательства и др.',
      'Эдвайзер в 30+ кейсах.',
    ],
  },
];

export function Founders() {
  return (
    <section className="founders landing__section" id="founders">
      <div className="landing__shell">
        <h2 className="founders__heading">
          <span className="founders__accent">Основатели клуба — </span>
          выводят проекты за рубеж, масштабируют бизнес и анализируют рынки
        </h2>
        <div className="founders__list">
          {founders.map((f) => (
            <article key={f.name} className="founders__row">
              <Image
                className="founders__photo"
                src={f.photo}
                alt={f.name}
                width={225}
                height={225}
              />
              <div className="founders__meta">
                <h3 className="founders__name">{f.name}</h3>
                <p className="founders__role">{f.role}</p>
              </div>
              <ul className="founders__bio">
                {f.bio.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
