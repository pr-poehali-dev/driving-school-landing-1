import { useState, useEffect } from 'react';
import { useSection } from '@/hooks/useContent';

type FaqItem = { id: number; question: string; answer: string };

const DEFAULT_FAQS: FaqItem[] = [
  { id: 1, question: 'Сколько длится обучение?', answer: 'Стандартный курс — 2,5 месяца. Если занимаетесь интенсивно — можно быстрее.' },
  { id: 2, question: 'Нужна ли медкомиссия?', answer: 'Да, медицинскую справку нужно получить до начала вождения. Мы подскажем, где это сделать быстро.' },
  { id: 3, question: 'Что входит в стоимость 64 000 ₽?', answer: 'Всё: теория, вождение, топливо, подача документов в ГИБДД. Никаких скрытых платежей.' },
  { id: 4, question: 'Можно ли учиться на автомате?', answer: 'Да. У нас есть автомобили и на МКПП, и на АКПП — выбираете сами.' },
  { id: 5, question: 'Что если не сдам с первого раза?', answer: 'Вы всегда сможете приобрести дополнительные занятия по выгодной цене и спокойно подготовиться к пересдаче.' },
  { id: 6, question: 'Есть ли рассрочка?', answer: 'Да, без банков и переплат. Первый взнос — 15 000 ₽, остальное по договорённости.' },
  { id: 7, question: 'Можно выбрать инструктора?', answer: 'Конечно. Можно выбрать инструктора-женщину — по запросу.' },
  { id: 8, question: 'Где автодром?', answer: 'Автодром — ул. Стахановцев, 18. Никаких очередей с чужими.' },
  { id: 9, question: 'Есть ли бесплатные занятия?', answer: 'Да: первое занятие по теории — бесплатно, и первая неделя онлайн-теории тоже.' },
];

interface FAQProps {
  registerOpen?: (fn: (idx: number) => void) => void;
}

const FAQ = ({ registerOpen }: FAQProps) => {
  const data = useSection('faq', { items: DEFAULT_FAQS });
  const faqs = data.items as FaqItem[];
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
                className={`rounded-2xl border transition-all duration-300 ${
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
                      {faq.question}
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
                      <p className="text-gray-600 leading-relaxed text-[0.95rem]">{faq.answer}</p>
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