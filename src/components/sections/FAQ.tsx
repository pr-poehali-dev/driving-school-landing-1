import { useState } from 'react';

const faqs = [
  {
    q: 'Сколько длится обучение?',
    a: 'Стандартный курс — около 3 месяцев. Зависит от вашей занятости и расписания. Мы гибко подстраиваемся: можно учиться 2–3 раза в неделю или интенсивно каждый день.',
  },
  {
    q: 'Нужно ли проходить медкомиссию самостоятельно?',
    a: 'Да, медицинская справка нужна до начала обучения. Подскажем, где пройти быстро и без очередей.',
  },
  {
    q: 'Что входит в 64 000 ₽?',
    a: 'Всё: теория, 58 часов практики с бензином, сдача экзаменов в ГИБДД. Никаких доплат за пересдачи или топливо.',
  },
  {
    q: 'Можно ли учиться на автомате (АКПП)?',
    a: 'Да! Мы работаем с обоими типами КПП. При записи просто уточните — подберём машину.',
  },
  {
    q: 'А если не сдам экзамен с первого раза?',
    a: 'Работаем до результата. Дополнительные занятия проводим бесплатно — у нас нет конвейера.',
  },
  {
    q: 'Есть ли рассрочка?',
    a: 'Да, без банков. Первый взнос — 15 000 ₽. Остаток разбиваем удобным образом.',
  },
  {
    q: 'Могу ли я выбрать инструктора?',
    a: 'Конечно. У нас есть инструктор-женщина для тех, кто стесняется. Просто скажите при записи.',
  },
  {
    q: 'Где находится автодром?',
    a: 'Стахановцев, 18 — это наш собственный автодром. Для Балаклавы и Инкермана — 10 минут.',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">FAQ</span>
          </div>
          <h2 className="font-heading font-bold text-[#1E2A3E] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Часто задаваемые<br />
            <span className="text-blue-500">вопросы</span>
          </h2>
        </div>

        {/* Аккордеон */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${Math.min(i + 1, 5)} rounded-2xl border overflow-hidden transition-all duration-200 ${
                open === i ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-[#F5F7FA]'
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-500 font-heading font-bold text-lg flex-shrink-0">?</span>
                  <span className="font-heading font-bold text-[#1E2A3E] text-base group-hover:text-blue-500 transition-colors">
                    {faq.q}
                  </span>
                </div>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  open === i ? 'border-blue-500 bg-blue-500 rotate-45' : 'border-gray-300'
                }`}>
                  <svg viewBox="0 0 16 16" width="10" height="10" fill={open === i ? 'white' : '#9ca3af'}>
                    <path d="M8 2v12M2 8h12"/>
                  </svg>
                </div>
              </button>

              <div style={{
                maxHeight: open === i ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.35s cubic-bezier(0.22,1,0.36,1)',
              }}>
                <p className="px-6 pb-5 pt-0 text-gray-600 leading-relaxed text-[0.95rem] border-t border-blue-100 pt-4 ml-6">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
