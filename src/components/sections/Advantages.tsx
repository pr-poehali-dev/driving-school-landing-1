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
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/2018_Lada_Vesta_1.6_%28facelift%2C_blue%29%2C_front_8.21.19.jpg/320px-2018_Lada_Vesta_1.6_%28facelift%2C_blue%29%2C_front_8.21.19.jpg',
  },
  {
    name: 'LADA GRANTA',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Lada_Granta_2019_%28cropped%29.jpg/320px-Lada_Granta_2019_%28cropped%29.jpg',
  },
  {
    name: 'Renault Logan',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Renault_Logan_II_01_China_2014-04-10.jpg/320px-Renault_Logan_II_01_China_2014-04-10.jpg',
  },
];

const carsAKPP = [
  {
    name: 'KIA CEED',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/2018_Kia_Ceed_1.4_T-GDi_GT-Line_S_%28facelift%2C_blue%29%2C_front_8.4.19.jpg/320px-2018_Kia_Ceed_1.4_T-GDi_GT-Line_S_%28facelift%2C_blue%29%2C_front_8.4.19.jpg',
  },
  {
    name: 'Chevrolet Aveo',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chevrolet_Aveo_sedan_%282006-2008%29.jpg/320px-Chevrolet_Aveo_sedan_%282006-2008%29.jpg',
  },
  {
    name: 'Hyundai Solaris',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2017_Hyundai_Solaris_%28Russia%29_01.jpg/320px-2017_Hyundai_Solaris_%28Russia%29_01.jpg',
  },
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
          <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
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
                        alt={car.name}
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
                        alt={car.name}
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