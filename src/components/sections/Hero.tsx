const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Баннер — плотный, без пустого пространства */}
      <section id="hero" className="relative w-full overflow-hidden bg-[#0a1628]" style={{ paddingTop: 'var(--header-height, 120px)' }}>

        {/* Изображение машины — object-cover, без пустых полей */}
        <div className="relative w-full" style={{ aspectRatio: '16/7' }}>
          <img
            src="https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg"
            alt="Время рулить — автошкола Севастополь"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Градиент — текст читается поверх изображения */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 to-transparent" />

          {/* Заголовок поверх баннера — левая треть */}
          <div className="absolute inset-0 flex items-center" style={{ maxWidth: '40%', minWidth: 260, padding: '0 2.5rem' }}>
            <h1 className="font-heading font-bold text-white leading-[0.95]"
              style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.6rem)' }}>
              АВТОШКОЛА,<br />
              <span className="text-blue-400">КОТОРУЮ СОЗДАЛИ</span><br />
              ИНСТРУКТОРЫ,<br />
              <span className="text-blue-300" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.7rem)' }}>А НЕ МАРКЕТОЛОГИ</span>
            </h1>
          </div>
        </div>

        {/* Подзаголовок и кнопка — под баннером */}
        <div className="px-6 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <p className="text-gray-300 leading-relaxed font-body max-w-xl" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}>
            Хватит покупать обещания. Мы учим только тому, что работает. Выбирайте опыт, а не слова.
          </p>
          <button
            onClick={scrollToForm}
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 font-heading font-bold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(42,127,255,0.5)] text-sm whitespace-nowrap"
            style={{ borderRadius: 4 }}
          >
            НАЧАТЬ ДВИЖЕНИЕ
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
