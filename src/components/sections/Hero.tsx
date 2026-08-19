import { useSection } from '@/hooks/useContent';

const Hero = () => {
  const data = useSection('hero', {
    subheading: 'Хватит покупать обещания. Мы учим только тому, что работает. Выбирайте опыт, а не слова.',
    banner_image: 'https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg',
    cta_button: 'НАЧАТЬ ДВИЖЕНИЕ',
  });
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#0a1628]" style={{ paddingTop: 'var(--header-height, 80px)' }}>

      {/* Баннер */}
      <div className="relative w-full" style={{ aspectRatio: '16/7', minHeight: 300 }}>
        <img
          src={data.banner_image as string}
          alt="Время рулить — автошкола Севастополь"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Градиент десктоп — сверху вниз, плавный */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/85 via-[#0a1628]/55 to-transparent hidden md:block" />
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
          {data.subheading as string}
        </p>
        <div className="w-full md:w-auto flex-shrink-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 font-heading font-bold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(42,127,255,0.5)] text-sm"
            style={{ borderRadius: 4 }}
          >
            {data.cta_button as string}
          </button>
          <a
            href="https://vk.ru/timedrivesev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 font-heading font-bold tracking-wide transition-all duration-200 hover:scale-105 text-sm"
            style={{ borderRadius: 4 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="flex-shrink-0">
              <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.05 14.29h-1.48c-.56 0-.73-.46-1.72-1.47-.87-.84-1.25-.95-1.46-.95-.3 0-.38.08-.38.49v1.34c0 .35-.11.56-1.02.56-1.5 0-3.17-.91-4.35-2.6-1.76-2.48-2.25-4.33-2.25-4.71 0-.22.08-.42.49-.42h1.48c.37 0 .51.17.65.57.72 2.07 1.92 3.88 2.41 3.88.18 0 .27-.08.27-.54V9.98c-.06-1-.58-1.08-.58-1.43 0-.17.14-.35.36-.35h2.33c.31 0 .42.17.42.54v2.9c0 .31.14.42.22.42.18 0 .34-.11.68-.45 1.05-1.18 1.8-3 1.8-3 .1-.22.27-.42.65-.42h1.48c.44 0 .54.23.44.54-.18.86-1.96 3.35-1.96 3.35-.15.26-.21.37 0 .65.15.21.65.65.98 1.04.61.7 1.07 1.28 1.19 1.68.12.4-.09.6-.5.6z"/>
            </svg>
            ХОЧУ БЕСПЛАТНОЕ ЗАНЯТИЕ
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;