const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#0a1628]" style={{ paddingTop: 'var(--header-height, 80px)' }}>

      {/* Баннер */}
      <div className="relative w-full" style={{ aspectRatio: '16/7', minHeight: 260 }}>
        <img
          src="https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg"
          alt="Время рулить — автошкола Севастополь"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Градиент: на десктопе слева, на мобильном снизу */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#0a1628]/40 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/95 via-[#0a1628]/60 to-transparent md:hidden" />
        <div className="absolute inset-0 bg-[#0a1628]/20 md:hidden" />

        {/* Заголовок — на десктопе поверх слева, на мобильном снизу */}
        <div className="absolute inset-0 flex md:items-center items-end">
          <div className="px-5 md:px-10 pb-5 md:pb-0" style={{ maxWidth: '100%' }}>
            <h1 className="font-heading font-bold text-white leading-[1]"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 5rem)' }}>
              АВТОШКОЛА,<br />
              <span className="text-blue-400">КОТОРУЮ СОЗДАЛИ</span><br />
              ИНСТРУКТОРЫ,<br />
              <span className="text-blue-300" style={{ fontSize: 'clamp(1.1rem, 3.5vw, 3.2rem)' }}>А НЕ МАРКЕТОЛОГИ</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Подзаголовок и кнопка */}
      <div className="px-5 md:px-12 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
        <p className="text-gray-300 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)', fontFamily: "'Oswald', sans-serif", fontWeight: 400, letterSpacing: '0.02em' }}>
          Хватит покупать обещания. Мы учим только тому, что работает.<br />
          <span className="text-blue-300">Выбирайте опыт, а не слова.</span>
        </p>
        <button
          onClick={scrollToForm}
          className="w-full md:w-auto flex-shrink-0 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 font-heading font-bold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(42,127,255,0.5)] text-sm"
          style={{ borderRadius: 4 }}
        >
          НАЧАТЬ ДВИЖЕНИЕ
        </button>
      </div>
    </section>
  );
};

export default Hero;
