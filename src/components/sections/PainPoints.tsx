const pains = [
  {
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/07bf5536-f106-4f0c-a0c6-a3a485012d3e.jpg',
    num: '01',
    title: 'Инструктор орёт и нервничает',
    text: 'У нас такого нет. Наши инструкторы сами выбрали спокойный подход — не орут, а объясняют. Даже если вы впервые сели за руль.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/07f98e70-d37a-4ce2-999f-151703665b0e.jpg',
    num: '02',
    title: 'Разводят на доплаты',
    text: 'За бензин, за пересдачу, за «особое» авто. В «Время рулить» цена одна — 64 000 ₽ с ГСМ. Ни копейкой больше.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/da0f3298-5820-4859-879b-3dfb55f844b5.jpg',
    num: '03',
    title: 'Автодром на другом конце города',
    text: 'Наш автодром на Стахановцева, 18. Для жителей Балаклавы и Инкермана — 10 минут на машине.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/507f07ca-148b-49d5-9015-af3f9f3c17f1.jpg',
    num: '04',
    title: 'Стесняюсь инструктора-мужчины',
    text: 'У нас есть инструктор-женщина. Спокойно, без критики, в вашем темпе. Просто скажите при записи.',
  },
];

const PainPoints = () => {
  return (
    <section id="pain-points" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок секции */}
        <div className="animate-on-scroll mb-12 flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-blue-500" />
              <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Почему мы</span>
            </div>
            <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Почему в других школах<br />
              <span className="text-blue-500">теряют время и деньги</span>
            </h2>
          </div>
          <img
            src="https://cdn.poehali.dev/files/64d381d9-3aff-47f8-b787-c99612c38c64.png"
            alt="Время Рулить"
            className="h-16 w-auto object-contain opacity-20 flex-shrink-0 hidden md:block"
          />
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pains.map((pain, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} group relative bg-[#F5F7FA] rounded-2xl
                hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]
                transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Фото */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={pain.img}
                  alt={pain.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A]/60 via-transparent to-transparent" />
                <span className="absolute top-3 right-4 font-heading font-bold text-4xl text-white/20 select-none">
                  {pain.num}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-[#1A2A3A] mb-2 leading-snug">
                  {pain.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[0.95rem]">{pain.text}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Вывод */}
        <div className="animate-on-scroll mt-10">
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <p className="font-heading text-xl font-bold text-[#1A2A3A] leading-snug">
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
