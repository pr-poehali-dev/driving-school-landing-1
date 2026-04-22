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
    <section id="hero" className="relative w-full overflow-hidden bg-[#0a1628]" style={{ minHeight: '100svh' }}>

      {/* Баннер — машина видна целиком, выровнена по правому краю */}
      <div className="absolute inset-0 flex items-center justify-end">
        <img
          src="https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg"
          alt="Время рулить — автошкола Севастополь"
          className="h-full w-auto object-contain object-right"
          style={{ maxWidth: '75%' }}
        />
        {/* Градиент — затемняет слева, чтобы текст читался */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/85 to-transparent" style={{ width: '55%' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 to-transparent" />
      </div>

      {/* Контент — левая треть */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-12 py-28" style={{ maxWidth: '38%', minWidth: 280 }}>

        {/* Надзаголовок */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-6 h-px bg-blue-400 flex-shrink-0" />
          <span className="text-blue-300 font-body text-xs uppercase tracking-[0.15em] font-medium leading-tight">
            Севастополь · ул. Хрусталева, 177А
          </span>
        </div>

        {/* Главный заголовок */}
        <h1 className="font-heading font-bold text-white leading-[0.95] mb-5"
          style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3rem)' }}>
          АВТОШКОЛА,<br />
          <span className="text-blue-400">КОТОРУЮ СОЗДАЛИ</span><br />
          ИНСТРУКТОРЫ,<br />
          <span className="text-blue-300" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)' }}>А НЕ МАРКЕТОЛОГИ</span>
        </h1>

        {/* Подзаголовок */}
        <p className="text-gray-300 leading-relaxed mb-8 font-body" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>
          Хватит покупать обещания. Мы учим только тому, что работает. Выбирайте опыт, а не обещания.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
          <button
            onClick={scrollToForm}
            className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 font-heading font-bold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(42,127,255,0.5)] text-sm"
            style={{ borderRadius: 4 }}
          >
            НАЧАТЬ ДВИЖЕНИЕ
          </button>
          <button
            onClick={() => document.getElementById('instructors')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white/30 text-white hover:border-blue-400 hover:text-blue-300 px-6 py-3 font-heading font-bold tracking-wide transition-all duration-200 text-sm"
            style={{ borderRadius: 4 }}
          >
            ОБ ИНСТРУКТОРАХ
          </button>
        </div>

        {/* Метрики */}
        <div className="grid grid-cols-2 gap-px bg-white/10" style={{ borderRadius: 2 }}>
          {metrics.map((m, i) => (
            <div key={i} className="bg-[#0a1628]/70 backdrop-blur-sm px-4 py-3 hover:bg-blue-900/40 transition-colors duration-300 group">
              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="font-heading font-bold text-white group-hover:text-blue-300 transition-colors"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}>
                  {m.value}
                </span>
                <span className="text-blue-400 font-heading font-semibold text-sm">{m.unit}</span>
              </div>
              <p className="text-gray-400 text-xs font-body leading-tight">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Стрелка вниз */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce z-10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 13l5 5 5-5M7 7l5 5 5-5"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;