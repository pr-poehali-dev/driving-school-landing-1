const checkList = [
  '58 часов практики — бензин уже включён',
  'Обучение на МКПП или АКПП — на выбор',
  'Свой автодром — никаких очередей',
  'Рассрочка без банков — первый взнос 15 000 ₽',
  'Инструктор-женщина по запросу',
  'Никаких «левых» пересдач и скрытых доплат',
];

const cars = [
  { name: 'Лада Гранта', type: 'МКПП', emoji: '🚗' },
  { name: 'Hyundai Solaris', type: 'АКПП / МКПП', emoji: '🚙' },
  { name: 'Renault Logan', type: 'МКПП', emoji: '🚘' },
];

const Advantages = () => {
  return (
    <section id="advantages" className="py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Что вы получаете</span>
          </div>
          <h2 className="font-heading font-bold text-[#1E2A3E] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Всё, что нужно,<br />
            <span className="text-blue-500">уже включено в цену</span>
          </h2>
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
                    <span className="text-[#1E2A3E] font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Автомобили */}
          <div className="lg:col-span-2 animate-on-scroll stagger-2">
            <p className="font-heading font-bold text-[#1E2A3E] text-lg mb-4 uppercase tracking-wide">
              Автомобили для обучения
            </p>
            <div className="space-y-3">
              {cars.map((car, i) => (
                <div key={i}
                  className="group flex items-center gap-4 bg-[#F5F7FA] rounded-xl px-5 py-4 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] transition-all duration-250 cursor-default">
                  <span className="text-3xl">{car.emoji}</span>
                  <div>
                    <div className="font-heading font-bold text-[#1E2A3E] text-base">{car.name}</div>
                    <div className="text-blue-500 text-xs font-medium mt-0.5">{car.type}</div>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 20 20" fill="none" stroke="#3b82f6" strokeWidth="1.5" width="18" height="18">
                      <path d="M7 10h6M10 7l3 3-3 3"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Лицензия */}
            <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎓</span>
                <div>
                  <div className="font-heading font-bold text-[#1E2A3E] text-sm">Лицензия ГИБДД</div>
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
