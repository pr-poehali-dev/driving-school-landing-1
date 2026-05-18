import { useSection } from '@/hooks/useContent';

const PAIN_IMAGES = [
  'https://cdn.poehali.dev/files/2254a910-cbe2-40a3-b49f-08ffa9072e54.jpg',
  'https://cdn.poehali.dev/files/98f35bf2-647d-4d1a-9a77-61708bdabfc3.jpg',
  'https://cdn.poehali.dev/files/3d69c23d-a388-4287-be95-4afc27877e61.jpg',
  'https://cdn.poehali.dev/files/8ff1414d-95a2-4447-977f-8bae1a1f47a3.png',
];

const PainPoints = () => {
  const data = useSection('pain_points', {
    items: [
      { title: 'Инструктор орёт и нервничает', description: 'У нас спокойное обучение. Никаких криков — только терпение и чёткие объяснения.' },
      { title: 'Разводят на доплаты', description: 'Фиксированная цена 64 000 ₽ с топливом. Всё включено с первого дня.' },
      { title: 'Автодром на другом конце города', description: 'Наш автодром — ул. Стахановцев, 18. Удобно и без очередей.' },
      { title: 'Стесняюсь инструктора-мужчины', description: 'У нас есть инструктор-женщина. Выберите комфортный вариант.' },
    ] as Array<{ title: string; description: string }>,
  });
  const pains = (data.items as Array<{ title: string; description: string }>).map((p, i) => ({
    img: PAIN_IMAGES[i] || PAIN_IMAGES[0],
    num: String(i + 1).padStart(2, '0'),
    title: p.title,
    text: p.description,
  }));

  return (
    <section id="pain-points" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок секции */}
        <div className="animate-on-scroll mb-12">
          <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.2rem)' }}>
            Почему в других школах<br />
            <span className="text-blue-500">теряют время и деньги</span>
          </h2>
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