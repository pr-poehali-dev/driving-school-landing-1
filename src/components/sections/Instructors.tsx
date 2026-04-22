const instructors = [
  {
    name: 'Ридван',
    years: '15',
    spec: 'Городское вождение',
    quote: 'У нас так не принято. Я отвечаю за результат, потому что это моя школа.',
    photo: 'https://cdn.poehali.dev/files/bb1556a9-c5ee-4644-ac8e-39ed19f23beb.jpg',
  },
  {
    name: 'Анастасия',
    years: '10',
    spec: 'Работа с новичками',
    quote: 'Никаких криков, никакого давления. Учимся в вашем темпе — особенно с теми, кто боится.',
    photo: 'https://cdn.poehali.dev/files/345fb399-d0e9-42a0-bb74-03b63cc0e886.jpg',
  },
  {
    name: 'Команда инструкторов',
    years: '12',
    spec: 'Сложные манёвры',
    quote: 'Открыли эту школу, чтобы каждый ученик действительно умел водить, а не просто получил корочку.',
    photo: 'https://cdn.poehali.dev/files/7bda0146-f100-4d7e-b66b-6b6d6d832db5.jpg',
  },
  {
    name: 'Весь состав',
    years: '18',
    spec: 'Подготовка к экзамену',
    quote: 'Если не сдал — значит, плохо научили. Работаем до результата. Всё включено в цену.',
    photo: 'https://cdn.poehali.dev/files/eb2aba46-8162-489a-a94c-00afcf082a11.jpg',
  },
  {
    name: 'Наш флот',
    years: '14',
    spec: 'Автодром и площадка',
    quote: 'Свой автодром — это другой уровень. Никаких очередей, занятие начинается и заканчивается вовремя.',
    photo: 'https://cdn.poehali.dev/files/03979abc-414b-4a56-9427-c9964f707339.jpg',
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
          <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Школу создали инструкторы,<br />
            <span className="text-blue-500">а не маркетологи</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {instructors.map((inst, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} group bg-white rounded-2xl 
                hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] 
                transition-all duration-300 cursor-default relative overflow-hidden`}
            >
              {/* Фото */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={inst.photo}
                  alt={inst.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-heading text-xl font-bold text-white">{inst.name}</h3>
                    <span className="text-blue-300 font-heading font-bold text-sm">{inst.years} лет</span>
                  </div>
                  <p className="text-gray-300 text-xs uppercase tracking-wider">{inst.spec}</p>
                </div>
              </div>

              {/* Цитата */}
              <div className="p-5">
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