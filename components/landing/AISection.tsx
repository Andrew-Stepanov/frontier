const examples = [
  {
    text: 'Найди мне того, кто запускался в Испании и настраивал контент-маркетинг',
    variant: 'query' as const,
  },
  {
    text: 'Тебе нужен Алекс (SaaS), вот его контакты и запись выступления про маркетинг в Европе',
    variant: 'answer' as const,
  },
];

export function AISection() {
  return (
    <section className="ai-section landing__section" id="club-ai">
      <div className="landing__shell">
        <h2 className="ai-section__heading">
          ai-помощник
          <br />
          <span className="ai-section__subheading">оцифрованный опыт</span>
        </h2>
        <p className="ai-section__desc">
          У нас есть AI-бот по имени Maiia, она мгновенно находит нужных людей, знания и компетенции
          внутри закрытой базы клуба
        </p>
        <div className="ai-section__examples">
          {examples.map((item) => (
            <div
              key={item.text}
              className={`ai-section__bubble ai-section__bubble--${item.variant}`}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
