const triggers = [
  {
    icon: '👩',
    title: 'Инструктор-женщина',
    text: 'Стесняетесь ошибаться при мужчине? Просто скажите при записи — мы подберём инструктора. Спокойно, в вашем темпе, без критики.',
    accent: 'По запросу',
  },
  {
    icon: '🏠',
    title: 'Свой автодром рядом',
    text: 'Автодром на Стахановцева, 18 — наш, не арендованный. Никаких очередей. Для Балаклавы и Инкермана — 10 минут на машине.',
    accent: '10 минут',
  },
  {
    icon: '🎖️',
    title: 'Скидка для участников СВО',
    text: 'Спасибо за службу. Поставьте галочку в форме записи — скидка 5 000 ₽ применится автоматически.',
    accent: '-5 000 ₽',
  },
];

const Triggers = () => {
  return (
    <section id="triggers" className="py-28 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-16 flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-blue-500" />
              <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Персональный подход</span>
            </div>
            <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Школу создали инструкторы,<br />
              <span className="text-blue-500">а не маркетологи</span>
            </h2>
          </div>
          <img
            src="https://cdn.poehali.dev/files/64d381d9-3aff-47f8-b787-c99612c38c64.png"
            alt="Время Рулить"
            className="h-16 w-auto object-contain opacity-20 flex-shrink-0 hidden md:block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {triggers.map((t, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} group relative bg-white rounded-2xl p-8
                hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]
                transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Акцент-бейдж */}
              <div className="absolute top-5 right-5 bg-blue-50 text-blue-500 text-xs font-heading font-bold px-3 py-1 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                {t.accent}
              </div>

              <div className="text-5xl mb-5">{t.icon}</div>
              <h3 className="font-heading text-xl font-bold text-[#1A2A3A] mb-3 leading-snug pr-16">
                {t.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t.text}</p>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Triggers;