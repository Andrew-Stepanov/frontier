'use client';

import { useState } from 'react';

const items = [
  {
    q: 'Что делать, если мой продукт еще на стадии идеи или запуска?',
    a: (
      <>
        <a href="https://t.me/vladimir_kornigor" target="_blank" rel="noopener noreferrer">
          Оставьте заявку
        </a>
        {' '}— мы добавим вас в лист ожидания. Сейчас мы проектируем отдельный формат специально для проектов на ранней стадии. Когда он будет готов, мы свяжемся с вами.
        <br /><br />
        Если у вас уже есть успешный предпринимательский опыт, но текущий проект только стартует — напишите об этом в заявке. В этом случае мы сможем рассмотреть вашу анкету для участия в основном составе.
      </>
    ),
  },
  {
    q: 'Могут ли вступить в клуб агентства и профильные эксперты?',
    a: (
      <>
        Стать резидентами клуба — нет. Мы сохраняем форум-группы как среду для общения только между основателями бизнеса и C-Level руководителями.
        <br /><br />
        Но сильные специалисты (в маркетинге, аналитике, локализации продукта) могут участвовать в жизни сообщества в других ролях. Вы можете присоединиться как:
        <br />— приглашенный спикер или автор воркшопа;
        <br />— эксперт для разбора конкретных запросов от резидентов;
        <br />— фасилитатор форум-групп.
      </>
    ),
  },
];

const TriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.59 15.50" aria-hidden="true">
    <path fill="currentColor" d="M8.79 14.5L0.9958 1H16.5842Z" />
  </svg>
);

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="faq landing__section" id="faq">
      <div className="landing__shell">
        <h2 className="faq__heading">Отвечаем на вопросы</h2>
        <div className="faq__list">
          {items.map((item, i) => (
            <div key={item.q} className={`faq__item${open === i ? ' faq__item--open' : ''}`}>
              <button
                type="button"
                className="faq__question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="faq__icon">
                  <TriangleIcon />
                </span>
                {item.q}
              </button>
              <div className="faq__answer">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
