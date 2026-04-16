const triggers = [
  {
    icon: '👩',
    title: 'Инструктор-женщина',
    text: 'Стесняетесь ошибаться при мужчине? Учитесь у женщины. Спокойно, без криков, в вашем темпе. Просто скажите при записи, что хотите заниматься с женщиной.',
  },
  {
    icon: '🏠',
    title: 'Свой автодром рядом',
    text: 'Автодром на Стахановцева, 18 — это наш, не арендованный. Никаких очередей, никаких поездок через весь город. Для Балаклавы и Инкермана — 10 минут.',
  },
  {
    icon: '🎖️',
    title: 'Скидка 5 000 ₽ для участников СВО',
    text: 'Спасибо за службу. Это не рекламный ход, а человеческое спасибо. Просто поставьте галочку в форме — и мы применим скидку автоматически.',
  },
];

const Triggers = () => {
  return (
    <section id="triggers" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-3">
            Мы подстроимся под вас
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {triggers.map((t, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} bg-brand-sky rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
            >
              <div className="text-5xl mb-4">{t.icon}</div>
              <h3 className="font-heading text-xl font-bold text-brand-dark mb-3">{t.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Triggers;
