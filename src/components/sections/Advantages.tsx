const leftList = [
  '58 часов практики (бензин уже включён)',
  'Можно учиться на МКПП или АКПП',
  'Свой автодром — не нужно ждать в очереди',
];

const rightList = [
  'Рассрочка без банков — первый взнос 15 000 ₽',
  'Инструктор-женщина по запросу',
  'Никаких «левых» пересдач',
];

const CheckIcon = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-0.5">
    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  </span>
);

const Advantages = () => {
  return (
    <section id="advantages" className="py-20 bg-brand-sky">
      <div className="max-w-5xl mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-3">
            Что вы получаете, когда выбираете «Время рулить»
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-4">
              {leftList.map((item, i) => (
                <li key={i} className={`animate-on-scroll stagger-${i + 1} flex items-start gap-3`}>
                  <CheckIcon />
                  <span className="text-brand-dark font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {rightList.map((item, i) => (
                <li key={i} className={`animate-on-scroll stagger-${i + 1} flex items-start gap-3`}>
                  <CheckIcon />
                  <span className="text-brand-dark font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
