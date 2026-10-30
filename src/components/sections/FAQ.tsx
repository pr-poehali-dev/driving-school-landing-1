import { useState, useEffect } from 'react';
import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';

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
    <section id="faq" className="section bg-paper-alt">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <span className="eyebrow text-blue-700">FAQ</span>
            <h2 className="h-section mt-5 text-ink">
              Часто задаваемые{' '}
              <span className="text-blue-700">вопросы</span>
            </h2>
          </div>
        </Reveal>

        <div className="border-t border-[#D6D3CA] md:col-span-8">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <Reveal key={i} index={Math.min(i, 5)}>
                <div id={`faq-item-${i}`} className="border-b border-[#D6D3CA]">
                  <h3>
                    <button
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span
                        className={`font-heading text-lg font-semibold leading-snug tracking-[-0.015em] transition-colors duration-300 ease-quint md:text-[22px] ${
                          isOpen ? 'text-blue-700' : 'text-ink group-hover:text-blue-700'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`relative mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-[420ms] ease-quint ${
                          isOpen ? 'rotate-45 border-[#1A6FEF] bg-[#1A6FEF]' : 'border-[#C9C5BA] group-hover:border-[#1A6FEF]'
                        }`}
                      >
                        <span className={`absolute h-px w-3 ${isOpen ? 'bg-white' : 'bg-ink'}`} />
                        <span className={`absolute h-3 w-px ${isOpen ? 'bg-white' : 'bg-ink'}`} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    className="grid transition-[grid-template-rows,opacity] duration-[420ms] ease-quint"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <p className="lead max-w-[620px] pb-7 pr-12 text-ink-soft">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
