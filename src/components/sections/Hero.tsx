const metrics = [
  { value: '58',       unit: 'часов',   desc: 'практики с ГСМ'        },
  { value: '5',        unit: 'инструкторов', desc: 'сооснователей'    },
  { value: '64 000',   unit: '₽',       desc: 'полный курс, всё включено' },
  { value: '10',       unit: 'минут',   desc: 'до нашего автодрома'   },
];

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Фонофон — фото машины */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/bucket/08ec7878-06c6-47ce-a53f-77259c26600a.jpeg"
          alt="Время рулить — автошкола Севастополь"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Оверлей — тёмный слева (для читаемости текста), светлее справа */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/60 to-[#0a1628]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/50 via-transparent to-[#0a1628]/80" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      </div>

      {/* Контент */}
      <div className="relative z-10 px-4 max-w-5xl mx-auto w-full pt-24 pb-16">

        {/* Надзаголовок */}
        <div className="flex items-center gap-3 mb-6 animate-on-scroll visible">
          <div className="w-8 h-px bg-blue-400" />
          <span className="text-blue-300 font-body text-sm uppercase tracking-[0.2em] font-medium">
            Севастополь · ООО «Время рулить»
          </span>
        </div>

        {/* Главный заголовок */}
        <h1 className="font-heading font-bold text-white leading-[0.95] mb-8 animate-on-scroll visible"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
          АВТОШКОЛА,<br />
          <span className="text-blue-400">КОТОРУЮ СОЗДАЛИ</span><br />
          ИНСТРУКТОРЫ
        </h1>

        {/* Подзаголовок */}
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mb-10 animate-on-scroll visible font-body">
          Мы сами сидим за рулём. Нам надоело, как учат в других школах —
          и мы открыли свою. Без скрытых доплат, без криков, без «левых» пересдач.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 mb-20 animate-on-scroll visible">
          <button
            onClick={scrollToForm}
            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 font-heading font-bold text-lg tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_rgba(42,127,255,0.5)]"
            style={{ borderRadius: 4 }}
          >
            НАЧАТЬ ДВИЖЕНИЕ
          </button>
          <button
            onClick={() => document.getElementById('instructors')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white/30 text-white hover:border-blue-400 hover:text-blue-300 px-8 py-4 font-heading font-bold text-lg tracking-wide transition-all duration-200"
            style={{ borderRadius: 4 }}
          >
            ОБ ИНСТРУКТОРАХ
          </button>
        </div>

        {/* Метрики — карточки с цифрами */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 animate-on-scroll visible"
          style={{ borderRadius: 2 }}>
          {metrics.map((m, i) => (
            <div key={i}
              className="bg-[#0a1628]/60 backdrop-blur-sm px-6 py-5 hover:bg-blue-900/40 transition-colors duration-300 group">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-heading font-bold text-white group-hover:text-blue-300 transition-colors"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  {m.value}
                </span>
                <span className="text-blue-400 font-heading font-semibold text-lg">{m.unit}</span>
              </div>
              <p className="text-gray-400 text-xs font-body leading-tight">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Стрелка вниз */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce z-10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 13l5 5 5-5M7 7l5 5 5-5"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;