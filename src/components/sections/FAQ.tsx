import { useState, useEffect } from 'react';

const faqs = [
  { q: 'Сколько длится обучение?',             a: 'Стандартный курс — около 3 месяцев. Мы гибко подстраиваемся: можно учиться 2–3 раза в неделю или интенсивно каждый день.' },
  { q: 'Нужно ли проходить медкомиссию?',      a: 'Да, медицинская справка нужна до начала обучения. Подскажем, где пройти быстро и без очередей.' },
  { q: 'Что входит в 64 000 ₽?',              a: 'Всё: теория, 58 часов практики с бензином, сдача экзаменов в ГИБДД. Никаких доплат за пересдачи или топливо.' },
  { q: 'Можно ли учиться на автомате (АКПП)?', a: 'Да! Мы работаем с обоими типами КПП. При записи просто уточните — подберём машину.' },
  { q: 'А если не сдам экзамен с первого раза?', a: 'Работаем до результата. Дополнительные занятия проводим бесплатно — у нас нет конвейера.' },
  { q: 'Есть ли рассрочка?',                   a: 'Да, без банков. Первый взнос — 15 000 ₽. Остаток разбиваем удобным образом.' },
  { q: 'Могу ли я выбрать инструктора?',       a: 'Конечно. У нас есть инструктор-женщина для тех, кто стесняется. Просто скажите при записи.' },
  { q: 'Где находится автодром?',              a: 'Стахановцев, 18 — это наш собственный автодром. Для Балаклавы и Инкермана — 10 минут.' },
];

interface FAQProps {
  registerOpen?: (fn: (idx: number) => void) => void;
}

const FAQ = ({ registerOpen }: FAQProps) => {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    registerOpen?.((idx: number) => {
      setOpen(idx);
      setTimeout(() => {
        document.getElementById(`faq-item-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  }, [registerOpen]);

  const toggle = (i: number) => {
    setOpen(prev => (prev === i ? null : i));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-10 md:mb-14">
          <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            Часто задаваемые{' '}
            <span className="text-blue-500">вопросы</span>
          </h2>
        </div>

        {/* Аккордеон */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                id={`faq-item-${i}`}
                className={`animate-on-scroll stagger-${Math.min(i + 1, 5)} rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-blue-300 bg-blue-50/60 shadow-[0_4px_20px_rgba(59,130,246,0.1)]'
                    : 'border-gray-100 bg-[#F5F7FA] hover:border-blue-100'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  onClick={() => toggle(i)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-heading font-bold text-lg flex-shrink-0 transition-colors ${isOpen ? 'text-blue-500' : 'text-gray-300'}`}>?</span>
                    <span className={`font-heading font-bold text-base transition-colors ${isOpen ? 'text-blue-600' : 'text-[#1A2A3A] group-hover:text-blue-500'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'border-blue-500 bg-blue-500 rotate-45' : 'border-gray-300 group-hover:border-blue-300'
                  }`}>
                    <svg viewBox="0 0 16 16" width="10" height="10">
                      <path d="M8 2v12M2 8h12" stroke={isOpen ? 'white' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                </button>

                {/* Ответ — всегда в DOM, высота анимируется через grid */}
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-1 border-t border-blue-100 ml-6">
                      <p className="text-gray-600 leading-relaxed text-[0.95rem]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;