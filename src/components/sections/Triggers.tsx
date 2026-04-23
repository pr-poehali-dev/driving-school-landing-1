const LOGO_URL = 'https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png';

const triggers = [
  {
    img: 'https://cdn.poehali.dev/files/7c7fed0d-f42b-46cf-8fa2-beb2d665c0ca.jpg',
    title: 'Инструктор-женщина',
    text: 'Стесняетесь ошибаться при мужчине? Просто скажите при записи — мы подберём инструктора. Спокойно, в вашем темпе, без критики.',
    accent: 'По запросу',
  },
  {
    img: 'https://cdn.poehali.dev/files/55659d71-f0a8-4683-a52d-5154aff83245.jpg',
    title: 'Скидка для участников СВО',
    text: 'Спасибо за службу. Поставьте галочку в форме записи — скидка 5 000 ₽ применится автоматически.',
    accent: '-5 000 ₽',
  },
];

/* Позиции логотипов-водяных знаков — симметричная сетка */
const WATERMARKS = [
  { top: '8%',  left: '5%'  }, { top: '8%',  left: '30%' }, { top: '8%',  left: '55%' }, { top: '8%',  left: '80%' },
  { top: '35%', left: '17%' }, { top: '35%', left: '42%' }, { top: '35%', left: '67%' }, { top: '35%', left: '92%' },
  { top: '62%', left: '5%'  }, { top: '62%', left: '30%' }, { top: '62%', left: '55%' }, { top: '62%', left: '80%' },
  { top: '88%', left: '17%' }, { top: '88%', left: '42%' }, { top: '88%', left: '67%' }, { top: '88%', left: '92%' },
];

const Triggers = () => {
  return (
    <section id="triggers" className="py-16 bg-white relative overflow-hidden">

      {/* Водяные знаки — логотипы */}
      {WATERMARKS.map((pos, i) => (
        <img
          key={i}
          src={LOGO_URL}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ top: pos.top, left: pos.left, width: 90, opacity: 0.08, transform: 'translate(-50%, -50%)' }}
        />
      ))}

      <div className="max-w-5xl mx-auto px-4 relative z-10">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-12 flex items-center justify-between gap-6">
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
          <img src={LOGO_URL} alt="Время Рулить" className="h-80 w-auto object-contain flex-shrink-0 hidden md:block" style={{ opacity: 0.85 }} />
        </div>

        {/* Карточки — 2 колонки, фото на всю высоту слева */}
        <div className="flex flex-col gap-6">
          {triggers.map((t, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} group relative bg-white rounded-2xl
                shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]
                transition-all duration-300 overflow-hidden flex flex-col md:flex-row`}
              style={{ minHeight: 260 }}
            >
              {/* Фото — слева, занимает ~45% ширины, полная высота */}
              <div className="relative md:w-5/12 h-56 md:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={t.img}
                  alt={t.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-heading font-bold px-3 py-1 rounded-full">
                  {t.accent}
                </div>
              </div>

              {/* Текст — справа, вертикально по центру */}
              <div className="flex-1 flex flex-col justify-center px-8 py-8">
                <h3 className="font-heading text-2xl font-bold text-[#1A2A3A] mb-3 leading-snug">
                  {t.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">{t.text}</p>
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