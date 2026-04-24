const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#0a1628]" style={{ paddingTop: 'var(--header-height, 80px)' }}>

      {/* Баннер */}
      <div className="relative w-full" style={{ aspectRatio: '16/7', minHeight: 300 }}>
        <img
          src="https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg"
          alt="Время рулить — автошкола Севастополь"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Градиент десктоп — слева направо */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/92 via-[#0a1628]/55 to-transparent hidden md:block" />
        {/* Градиент мобильный — сверху вниз, плавный */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/60 to-transparent md:hidden" />

        {/* Заголовок — всегда по центру вертикали */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-5 md:px-12" style={{ maxWidth: '680px' }}>
            <h1 className="font-heading font-bold leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              <span className="block text-white">АВТОШКОЛА,</span>
              <span className="block text-blue-400">КОТОРУЮ СОЗДАЛИ</span>
              <span className="block text-white">ИНСТРУКТОРЫ,</span>
              <span className="block text-blue-400">А НЕ МАРКЕТОЛОГИ</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Подзаголовок и кнопка */}
      <div className="px-5 md:px-12 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        <p className="text-gray-300 leading-relaxed text-base md:text-lg" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400, letterSpacing: '0.02em', maxWidth: 480 }}>
          Хватит покупать обещания. Мы учим только тому, что работает.{' '}
          <span className="text-blue-300">Выбирайте опыт, а не слова.</span>
        </p>
        <button
          onClick={scrollToForm}
          className="w-full md:w-auto flex-shrink-0 bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 font-heading font-bold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(42,127,255,0.5)] text-sm"
          style={{ borderRadius: 4 }}
        >
          НАЧАТЬ ДВИЖЕНИЕ
        </button>
      </div>
    </section>
  );
};

export default Hero;