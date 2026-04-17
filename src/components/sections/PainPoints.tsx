const pains = [
  {
    icon: '😤',
    num: '01',
    title: 'Инструктор орёт и нервничает',
    text: 'У нас такого нет. Наши инструкторы сами выбрали спокойный подход — не орут, а объясняют. Даже если вы впервые сели за руль.',
  },
  {
    icon: '💸',
    num: '02',
    title: 'Разводят на доплаты',
    text: 'За бензин, за пересдачу, за «особое» авто. В «Время рулить» цена одна — 64 000 ₽ с ГСМ. Ни копейкой больше.',
  },
  {
    icon: '🗺️',
    num: '03',
    title: 'Автодром на другом конце города',
    text: 'Наш автодром на Стахановцева, 18. Для жителей Балаклавы и Инкермана — 10 минут на машине.',
  },
  {
    icon: '👩',
    num: '04',
    title: 'Стесняюсь инструктора-мужчины',
    text: 'У нас есть инструктор-женщина. Спокойно, без критики, в вашем темпе. Просто скажите при записи.',
  },
];

const PainPoints = () => {
  return (
    <section id="pain-points" className="py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок секции */}
        <div className="animate-on-scroll mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Почему мы</span>
          </div>
          <h2 className="font-heading font-bold text-[#1E2A3E] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Почему в других школах<br />
            <span className="text-blue-500">теряют время и деньги</span>
          </h2>
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pains.map((pain, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} group relative bg-[#F5F7FA] rounded-2xl p-8 
                hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)] 
                transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Номер — декоративный */}
              <span className="absolute top-5 right-6 font-heading font-bold text-5xl text-gray-100 group-hover:text-blue-50 transition-colors select-none">
                {pain.num}
              </span>

              <div className="text-4xl mb-4">{pain.icon}</div>
              <h3 className="font-heading text-xl font-bold text-[#1E2A3E] mb-3 leading-snug">
                {pain.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-[0.95rem]">{pain.text}</p>

              {/* Тонкая линия-акцент снизу */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Вывод */}
        <div className="animate-on-scroll mt-12">
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <p className="font-heading text-xl font-bold text-[#1E2A3E] leading-snug">
              Мы работали в других школах и знаем все эти проблемы изнутри.
              <span className="text-blue-500"> Поэтому в нашей школе их нет.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
