const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#1a2d4a] to-[#0f1f35]">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          src="https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-country-road-44261-large.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="animate-on-scroll visible">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Автошкола, которую создали инструкторы
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
            Мы сами сидим за рулём и принимаем экзамены. Нам надоело, как учат в других школах — и мы сделали свою. Без скрытых доплат, без очередей, без «левых» пересдач
          </p>
          <button
            onClick={scrollToForm}
            className="bg-brand-blue text-white px-8 py-4 rounded-xl font-heading font-bold text-xl hover:bg-blue-500 hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
          >
            Начать движение
          </button>
          <p className="mt-4 text-gray-400 text-sm">
            ООО «ВРЕМЯ РУЛИТЬ» • Лицензия • Свой автодром • 5 инструкторов-сооснователей
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white opacity-60 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 7l5 5 5-5"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
