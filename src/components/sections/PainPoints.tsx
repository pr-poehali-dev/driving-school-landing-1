const pains = [
  {
    icon: '😤',
    title: 'Инструктор орёт и нервничает',
    text: 'Знаете это чувство, когда боишься ошибиться, потому что на тебя накричат? У нас такого нет. Наши инструкторы сами выбрали спокойный подход. Они не орут, а объясняют. Даже если вы впервые сели за руль.',
  },
  {
    icon: '💸',
    title: 'Разводят на доплаты',
    text: 'За бензин, за пересдачу, за «особое» авто на экзамене. В «Время рулить» цена одна — 64 000 рублей с ГСМ. Всё. Ни копейкой больше.',
  },
  {
    icon: '🗺️',
    title: 'Автодром на другом конце города',
    text: 'Вы пришли с работы уставший, а вам ещё ехать 40 минут на занятия. У нас свой автодром на Стахановцева, 18. Для жителей Балаклавы и Инкермана — 10 минут на машине.',
  },
  {
    icon: '😳',
    title: 'Стесняюсь инструктора-мужчины',
    text: 'Многие женщины чувствуют себя неловко, когда мужчина сидит рядом и комментирует каждое движение. У нас есть инструктор-женщина. Спокойно, без криков, в вашем темпе.',
  },
];

const PainPoints = () => {
  return (
    <section id="pain-points" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="animate-on-scroll">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark text-center mb-3">
            Почему в других автошколах теряют время и деньги?
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">И как мы это исправили</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pains.map((pain, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} bg-brand-sky rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default`}
            >
              <div className="text-4xl mb-3">{pain.icon}</div>
              <h3 className="font-heading text-xl font-bold text-brand-dark mb-2">{pain.title}</h3>
              <p className="text-gray-600 leading-relaxed">{pain.text}</p>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll mt-10 text-center">
          <p className="text-brand-dark font-heading text-xl font-bold inline-block bg-blue-50 border-l-4 border-brand-blue px-6 py-4 rounded-xl">
            Мы работали в других школах и знаем все эти проблемы изнутри.<br className="hidden md:block" /> Поэтому в нашей школе их нет.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
