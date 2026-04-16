const instructors = [
  {
    name: 'Сергей',
    experience: 'За рулём 15 лет, преподаёт 8 лет',
    quote: 'Я работал в «Профессионале». Там инструктору всё равно, сдал ты или нет. Главное — чтобы ты купил побольше часов. У нас так не принято. Я отвечаю за результат, потому что это моя школа.',
    emoji: '👨‍🏫',
  },
  {
    name: 'Анастасия',
    experience: 'За рулём 10 лет, преподаёт 6 лет',
    quote: 'Я специально работаю с теми, кто боится. Особенно с женщинами. Никаких криков, никакого давления. Учимся в вашем темпе. Я знаю, как важно чувствовать себя уверенно за рулём.',
    emoji: '👩‍🏫',
  },
  {
    name: 'Дмитрий',
    experience: 'За рулём 12 лет, преподаёт 5 лет',
    quote: 'В других школах я видел, как людей гонят конвейером. Сдал-не сдал — неважно, главное план. Я открыл эту школу, чтобы каждый ученик действительно умел водить, а не просто получил корочку.',
    emoji: '🧑‍🔧',
  },
  {
    name: 'Алексей',
    experience: 'За рулём 18 лет, преподаёт 9 лет',
    quote: 'Меня бесило, когда ученики доплачивали за пересдачи. Это нечестно. В нашей школе всё включено в цену. Если не сдал — значит, я плохо научил. Работаем до результата.',
    emoji: '👨‍💼',
  },
  {
    name: 'Михаил',
    experience: 'За рулём 14 лет, преподаёт 7 лет',
    quote: 'Свой автодром — это другой уровень. Не нужно ждать, нет очередей. Занятие начинается вовремя, заканчивается вовремя. Ценю своё время и время учеников.',
    emoji: '🧑‍🏭',
  },
];

const Instructors = () => {
  return (
    <section id="instructors" className="py-20 bg-brand-sky">
      <div className="max-w-5xl mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-3">
            Время рулить создали не маркетологи, а инструкторы
          </h2>
          <p className="text-gray-500 text-lg">Потому что знают, как лучше</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((inst, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
            >
              <div className="text-5xl mb-4 text-center">{inst.emoji}</div>
              <h3 className="font-heading text-xl font-bold text-brand-dark mb-1 text-center">{inst.name}</h3>
              <p className="text-brand-blue text-sm font-medium text-center mb-4">{inst.experience}</p>
              <blockquote className="text-gray-600 text-sm leading-relaxed border-l-2 border-brand-blue pl-3 italic">
                «{inst.quote}»
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
