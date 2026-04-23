const triggers = [
  {
    img: 'https://cdn.poehali.dev/files/7c7fed0d-f42b-46cf-8fa2-beb2d665c0ca.jpg',
    title: 'Инструктор-женщина',
    text: 'Стесняетесь ошибаться при мужчине? Просто скажите при записи — мы подберём инструктора. Спокойно, в вашем темпе, без критики.',
    accent: 'По запросу',
  },
  {
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/81aa91c6-2b22-4ff0-b8a7-4dd739156694.jpg',
    title: 'Свой автодром рядом',
    text: 'Автодром на Стахановцева, 18 — наш, не арендованный. Никаких очередей. Для Балаклавы и Инкермана — 10 минут на машине.',
    accent: '10 минут',
  },
  {
    img: 'https://cdn.poehali.dev/files/55659d71-f0a8-4683-a52d-5154aff83245.jpg',
    title: 'Скидка для участников СВО',
    text: 'Спасибо за службу. Поставьте галочку в форме записи — скидка 5 000 ₽ применится автоматически.',
    accent: '-5 000 ₽',
  },
];

const Triggers = () => {
  return (
    <section id="triggers" className="py-16 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-12 flex items-start justify-between gap-6">
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
            src="https://cdn.poehali.dev/files/4af8ab18-4ed7-491a-9440-4303da095ec7.jpg"
            alt="Время Рулить"
            className="h-16 w-auto object-contain opacity-20 flex-shrink-0 hidden md:block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {triggers.map((t, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} group relative bg-white rounded-2xl
                hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]
                transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Фото */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={t.img}
                  alt={t.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A]/50 via-transparent to-transparent" />
                {/* Акцент-бейдж */}
                <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-heading font-bold px-3 py-1 rounded-full">
                  {t.accent}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-heading text-xl font-bold text-[#1A2A3A] mb-2 leading-snug">
                  {t.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t.text}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Triggers;