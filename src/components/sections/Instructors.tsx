const instructors = [
  {
    name: 'Сергей',
    years: '15',
    spec: 'Городское вождение',
    quote: 'У нас так не принято. Я отвечаю за результат, потому что это моя школа.',
    emoji: '👨‍🏫',
  },
  {
    name: 'Анастасия',
    years: '10',
    spec: 'Работа с новичками',
    quote: 'Никаких криков, никакого давления. Учимся в вашем темпе — особенно с теми, кто боится.',
    emoji: '👩‍🏫',
  },
  {
    name: 'Дмитрий',
    years: '12',
    spec: 'Сложные манёвры',
    quote: 'Открыл эту школу, чтобы каждый ученик действительно умел водить, а не просто получил корочку.',
    emoji: '🧑‍🔧',
  },
  {
    name: 'Алексей',
    years: '18',
    spec: 'Подготовка к экзамену',
    quote: 'Если не сдал — значит, я плохо научил. Работаем до результата. Всё включено в цену.',
    emoji: '👨‍💼',
  },
  {
    name: 'Михаил',
    years: '14',
    spec: 'Автодром и площадка',
    quote: 'Свой автодром — это другой уровень. Никаких очередей, занятие начинается и заканчивается вовремя.',
    emoji: '🧑‍🏭',
  },
];

const Instructors = () => {
  return (
    <section id="instructors" className="py-28 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Команда</span>
          </div>
          <h2 className="font-heading font-bold text-[#1E2A3E] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Школу создали инструкторы,<br />
            <span className="text-blue-500">а не маркетологи</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {instructors.map((inst, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} group bg-white rounded-2xl p-7 
                hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] 
                transition-all duration-300 cursor-default relative overflow-hidden`}
            >
              {/* Декоративный фон-круг */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300" />

              <div className="relative">
                <div className="text-4xl mb-4">{inst.emoji}</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-heading text-xl font-bold text-[#1E2A3E]">{inst.name}</h3>
                  <span className="text-blue-500 font-heading font-bold text-sm">{inst.years} лет</span>
                </div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-4">{inst.spec}</p>
                <blockquote className="text-gray-500 text-sm leading-relaxed border-l-2 border-blue-200 group-hover:border-blue-500 pl-3 italic transition-colors duration-300">
                  «{inst.quote}»
                </blockquote>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
