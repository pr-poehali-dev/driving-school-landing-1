import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';

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
    <section
      id="pain-points"
      className="section relative bg-[linear-gradient(180deg,#0A1628_0px,#16263B_80px,#EFEDE7_220px,#F6F5F1_420px)] !pt-28 md:!pt-36"
    >
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <span className="eyebrow text-ink-mute">Знакомо?</span>
            <h2 className="h-section mt-5 text-ink">
              Почему в других школах<br />
              <span className="text-blue-700">теряют время и деньги</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          {pains.map((pain, i) => (
            <Reveal key={i} index={i} className="h-full">
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-card border border-paper-line bg-white sm:flex-row">
                <div className="relative h-48 overflow-hidden sm:h-auto sm:w-[42%] sm:flex-shrink-0">
                  <img
                    src={pain.img}
                    alt={pain.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-quint group-hover:scale-[1.025]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <span className="num text-[44px] font-light text-[#C9D3DE] md:text-[56px]" aria-hidden="true">
                    {pain.num}
                  </span>
                  <div className="mt-5 h-0.5 w-10 bg-alert transition-[width] duration-500 ease-quint group-hover:w-16" />
                  <h3 className="mt-4 font-heading text-xl font-semibold leading-tight tracking-[-0.015em] text-ink md:text-[22px]">
                    {pain.title}
                  </h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.6] text-ink-soft md:text-base">
                    {pain.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 md:mt-20">
          <div className="grid gap-6 border-t border-paper-line pt-10 md:grid-cols-12">
            <p className="font-heading text-2xl font-semibold leading-[1.25] tracking-[-0.02em] text-ink md:col-span-9 md:text-[32px]">
              Мы работали в других школах и знаем все эти проблемы изнутри.
              <span className="text-blue-700"> Поэтому в нашей школе их нет.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PainPoints;
