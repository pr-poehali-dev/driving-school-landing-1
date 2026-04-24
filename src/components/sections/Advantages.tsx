const checkList = [
  '58 часов практики — бензин уже включён',
  'Обучение на МКПП или АКПП — на выбор',
  'Свой автодром — никаких очередей',
  'Рассрочка без банков — первый взнос 15 000 ₽',
  'Инструктор-женщина по запросу',
  'Никаких «левых» пересдач и скрытых доплат',
];

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
  return (
    <section id="advantages" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Что вы получаете</span>
          </div>
          <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Всё, что нужно,<br />
            <span className="text-blue-500">уже включено в цену</span>
          </h2>
          <img
            src="https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png"
            alt="Время Рулить"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-56 object-contain hidden md:block pointer-events-none"
            style={{ opacity: 0.85 }}
          />
        </div>

        {/* Метрики */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-blue-100 rounded-2xl overflow-hidden mb-10 animate-on-scroll">
          {[
            { value: '58', unit: 'часов', desc: 'практики с ГСМ' },
            { value: '5', unit: 'инструкторов', desc: 'сооснователей' },
            { value: '64 000', unit: '₽', desc: 'полный курс, всё включено' },
            { value: '10', unit: 'минут', desc: 'до нашего автодрома' },
          ].map((m, i) => (
            <div key={i} className="bg-white px-6 py-5 hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-heading font-bold text-[#1A2A3A] group-hover:text-blue-600 transition-colors"
                  style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}>{m.value}</span>
                <span className="text-blue-500 font-heading font-semibold text-base">{m.unit}</span>
              </div>
              <p className="text-gray-500 text-xs font-body leading-tight">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Список преимуществ — 3 колонки */}
          <div className="lg:col-span-3 animate-on-scroll">
            <div className="bg-[#F5F7FA] rounded-2xl p-8">
              <ul className="space-y-5">
                {checkList.map((item, i) => (
                  <li key={i} className={`stagger-${i + 1} flex items-start gap-4 group`}>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                      <svg viewBox="0 0 20 20" fill="white" width="12" height="12">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-[#1A2A3A] font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Автомобили */}
          <div className="lg:col-span-2 animate-on-scroll stagger-2">
            <p className="font-heading font-bold text-[#1A2A3A] text-lg mb-6 uppercase tracking-wide">
              Автомобили для обучения
            </p>

            {/* МКПП */}
            <div className="mb-6">
              <p className="font-heading font-bold text-[#1A2A3A] text-base mb-1">МКПП</p>
              <p className="text-gray-400 text-xs mb-4">Механическая коробка передач</p>
              <div className="flex gap-4 flex-wrap">
                {carsMKPP.map((car, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-[80px]">
                    <div className="w-20 h-20 rounded-full bg-[#E6F4FF] overflow-hidden flex items-center justify-center">
                      <img
                        src={car.img}
                        alt={car.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <span className="text-[#1A2A3A] font-semibold text-xs text-center leading-tight">{car.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* АКПП */}
            <div className="mb-6">
              <p className="font-heading font-bold text-[#1A2A3A] text-base mb-1">АКПП</p>
              <p className="text-gray-400 text-xs mb-4">Автоматическая коробка передач</p>
              <div className="flex gap-4 flex-wrap">
                {carsAKPP.map((car, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-[80px]">
                    <div className="w-20 h-20 rounded-full bg-[#E6F4FF] overflow-hidden flex items-center justify-center">
                      <img
                        src={car.img}
                        alt={car.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <span className="text-[#1A2A3A] font-semibold text-xs text-center leading-tight">{car.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Лицензия */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎓</span>
                <div>
                  <div className="font-heading font-bold text-[#1A2A3A] text-sm">Лицензия ГИБДД</div>
                  <div className="text-gray-500 text-xs mt-0.5">Официальная автошкола</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;