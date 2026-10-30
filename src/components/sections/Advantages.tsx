import { useState } from 'react';
import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import Icon from '@/components/ui/icon';

const CHECK_ICONS = ['Gauge', 'Cog', 'Route', 'Wallet', 'UserRound', 'ShieldCheck'];

const carsMKPP = [
  {
    name: 'LADA VESTA²',
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/116e8640-51ae-4802-8907-e93b4d70cba4.jpg',
    alt: 'Обучение вождению на LADA VESTA механика МКПП в автошколе Севастополь',
  },
  {
    name: 'LADA GRANTA',
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/1e0d12e5-aaf8-444c-87d7-c96f3aea4fc3.jpg',
    alt: 'Обучение вождению на LADA GRANTA механика МКПП — автошкола Время рулить',
  },
  {
    name: 'Renault Logan',
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/63055ac1-7b33-40d9-9ab9-d076ac2e396f.jpg',
    alt: 'Обучение вождению на Renault Logan механика МКПП в автошколе Севастополь',
  },
];

const carsAKPP = [
  {
    name: 'KIA CEED',
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/ae817658-f736-4e06-bf94-3ef1a79e03fb.jpg',
    alt: 'Обучение на автомате KIA CEED АКПП в автошколе Севастополь Время рулить',
  },
  {
    name: 'Chevrolet Aveo',
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/25492f91-f4d4-41e1-b1d8-f22cfd5daabc.jpg',
    alt: 'Обучение на автомате Chevrolet Aveo АКПП — автошкола Севастополь',
  },
  {
    name: 'Hyundai Solaris',
    img: 'https://cdn.poehali.dev/projects/63786bc4-a02f-4910-930c-7ef75df753fd/files/8c78e4fc-e0d5-40ed-a11e-02cba5f866f8.jpg',
    alt: 'Обучение на автомате Hyundai Solaris АКПП в автошколе Время рулить Севастополь',
  },
];

const Advantages = () => {
  const data = useSection('advantages', {
    checklist: [
      '58 часов практики с топливом в стоимости',
      'МКПП или АКПП — выбираете сами',
      'Автодром без очередей',
      'Рассрочка без банков — первый взнос 15 000 ₽',
      'Инструктор-женщина — по запросу',
      'Никаких скрытых платежей и липовых пересдач',
    ] as string[],
    cars_manual: 'LADA VESTA, LADA GRANTA, Renault Logan',
    cars_auto: 'KIA CEED, Chevrolet Aveo, Hyundai Solaris',
    stats: [
      { value: '58', label: 'часов практики с топливом' },
      { value: '5', label: 'инструкторов-основателей' },
      { value: '64 000', label: '₽ полный курс, всё включено' },
      { value: '10', label: 'минут до автодрома' },
    ] as Array<{ value: string; label: string }>,
  });
  const checkList = data.checklist as string[];
  const stats = data.stats as Array<{ value: string; label: string }>;

  return (
    <section id="advantages" className="section bg-paper-alt">
      <div className="wrap">
        <Reveal className="relative">
          <span className="eyebrow text-blue-700">Что вы получаете</span>
          <div className="mt-5 flex items-end justify-between gap-8">
            <h2 className="h-section text-ink">
              Всё, что нужно,<br />
              <span className="text-blue-700">уже включено в цену</span>
            </h2>
            <img
              src="https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png"
              alt="Время Рулить"
              className="hidden w-48 flex-shrink-0 object-contain md:block lg:w-56"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 border-y border-paper-line md:mt-20 lg:grid-cols-4">
          {stats.map((m, i) => {
            const labelParts = m.label.split(' ');
            const unit = labelParts[0] || '';
            const desc = labelParts.slice(1).join(' ');
            return (
              <Reveal
                key={i}
                index={i}
                className={`min-w-0 px-1 py-8 [--stat-max:48px] md:px-6 md:py-12 md:[--stat-max:72px] ${i % 2 === 1 ? 'border-l border-paper-line pl-5 md:pl-6' : ''} ${
                  i >= 2 ? 'border-t border-paper-line lg:border-t-0' : ''
                } ${i === 2 ? 'lg:border-l' : ''} ${i === 0 ? 'md:pl-0' : ''}`}
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 [container-type:inline-size]">
                  <CountUp
                    value={m.value}
                    className="whitespace-nowrap text-ink"
                    style={{ fontSize: `min(var(--stat-max), ${Math.floor(96 / (m.value.length * 0.62 + 0.1))}cqi)` }}
                  />
                  <span className="min-w-0 break-words font-heading text-lg font-semibold text-blue-700 md:text-xl">{unit}</span>
                </div>
                <p className="mt-3 max-w-[200px] font-body text-sm leading-snug text-ink-soft">{desc}</p>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-3">
          {checkList.map((item, i) => (
            <Reveal key={i} index={i}>
              <div className="card-lift group flex h-full flex-col rounded-card border border-paper-line bg-white p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2A7FFF]/25 text-blue-700 transition-colors duration-500 ease-quint group-hover:border-[#2A7FFF]/60">
                    <Icon name={CHECK_ICONS[i] || 'Check'} size={22} strokeWidth={1.4} />
                  </span>
                  <span className="num text-[15px] font-medium text-[#B4C0CC]" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-8 font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-ink md:text-xl">
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <CarPicker />
      </div>
    </section>
  );
};

const CarPicker = () => {
  const [mode, setMode] = useState<'mkpp' | 'akpp'>('mkpp');
  const cars = mode === 'mkpp' ? carsMKPP : carsAKPP;
  const tabs = [
    { id: 'mkpp' as const, label: 'МКПП', hint: 'Механическая коробка передач' },
    { id: 'akpp' as const, label: 'АКПП', hint: 'Автоматическая коробка передач' },
  ];
  const active = tabs.find(t => t.id === mode)!;

  return (
    <Reveal className="mt-24 md:mt-32">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="eyebrow text-ink-mute">Автопарк</span>
          <h3 className="mt-5 font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink md:text-[36px]">
            Автомобили для обучения
          </h3>

          <div role="tablist" aria-label="Тип коробки передач" className="relative mt-8 inline-grid grid-cols-2 rounded-full border border-paper-line bg-white p-1">
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-night transition-transform duration-500 ease-quint"
              style={{ transform: mode === 'akpp' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            {tabs.map(t => (
              <button
                key={t.id}
                role="tab"
                aria-selected={mode === t.id}
                onClick={() => setMode(t.id)}
                className={`relative z-10 rounded-full px-7 py-2.5 font-heading text-[15px] font-semibold transition-colors duration-500 ease-quint ${
                  mode === t.id ? 'text-white' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="mt-4 font-body text-sm text-ink-mute">{active.hint}</p>

          <div className="mt-10 flex items-center gap-4 rounded-card border border-paper-line bg-white p-5">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#2A7FFF]/25 text-blue-700">
              <Icon name="Award" size={22} strokeWidth={1.4} />
            </span>
            <div>
              <div className="font-heading text-base font-semibold text-ink">Лицензия ГИБДД</div>
              <div className="mt-0.5 font-body text-sm text-ink-mute">Официальная автошкола</div>
            </div>
          </div>
        </div>

        <div key={mode} className="grid gap-4 sm:grid-cols-3 md:col-span-8 md:gap-5">
          {cars.map((car, i) => (
            <figure
              key={car.name}
              className="group animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-500"
              style={{ animationDelay: `${i * 70}ms`, animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-card bg-white">
                <img
                  src={car.img}
                  alt={car.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-quint group-hover:scale-[1.025]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between font-heading text-base font-semibold text-ink">
                {car.name}
                <span className="rounded-full border border-paper-line px-2.5 py-0.5 font-body text-[11px] font-medium text-ink-mute">
                  {active.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default Advantages;
