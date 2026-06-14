const items = [
  { num: '1', name: 'Форум-группы', desc: 'Твой личный совет директоров' },
  { num: '2', name: 'AI-помощник', desc: 'Удобное поиск опыта всех людей' },
  { num: '3', name: 'Офлайн встречи', desc: 'Глубокие связи с сильными людьми' },
];

export function ClubOverview() {
  return (
    <section className="club-overview landing__section" id="club-overview">
      <div className="landing__shell">
        <h2 className="club-overview__heading">Три составляющих клуба</h2>
        <div className="club-overview__grid">
          {items.map((item) => (
            <article key={item.num} className="club-overview__item">
              <p className="club-overview__number">{item.num}</p>
              <p className="club-overview__name">{item.name}</p>
              <p className="club-overview__desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
