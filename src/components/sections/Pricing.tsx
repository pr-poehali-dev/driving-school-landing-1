const features = [
  { icon: '⛽', text: 'Бензин включён — ни копейки сверху' },
  { icon: '🔄', text: 'Рассрочка без банков — первый взнос 15 000 ₽' },
  { icon: '➕', text: 'Дополнительные часы по желанию' },
  { icon: '🎖️', text: 'Скидка 5 000 ₽ для участников СВО' },
];

const Pricing = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-28 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Стоимость</span>
            <div className="w-8 h-px bg-blue-500" />
          </div>
          <h2 className="font-heading font-bold text-[#1E2A3E] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Одна цена —<br />
            <span className="text-blue-500">никаких сюрпризов</span>
          </h2>
        </div>

        {/* Карточка цены */}
        <div className="animate-on-scroll max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_60px_rgba(59,130,246,0.15)] transition-shadow duration-300">

            {/* Шапка карточки */}
            <div className="bg-gradient-to-r from-[#0a1628] to-[#1a3356] px-8 py-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}/>
              <div className="relative flex items-end gap-4">
                <div>
                  <p className="text-blue-300 text-sm font-body mb-1 uppercase tracking-widest">Полный курс</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-bold text-white" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1 }}>
                      64 000
                    </span>
                    <span className="font-heading font-bold text-blue-300 text-3xl">₽</span>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-white/60 text-xs font-body line-through mb-1">от 75 000 ₽</div>
                  <div className="bg-blue-500 text-white text-xs font-heading font-bold px-3 py-1 rounded-full">
                    -11 000 ₽
                  </div>
                </div>
              </div>
              <p className="relative text-blue-200/70 text-sm font-body mt-3">
                Теория + практика + бензин + сдача экзамена
              </p>
            </div>

            {/* Список включённого */}
            <div className="px-8 py-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{f.icon}</span>
                    <span className="text-gray-600 text-sm leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollToForm}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 font-heading font-bold text-lg tracking-wide transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)]"
                style={{ borderRadius: 10 }}
              >
                ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
              </button>
              <p className="mt-3 text-gray-400 text-xs text-center font-body">
                Цена, которую видите — цена, которую платите. Без доплат.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
