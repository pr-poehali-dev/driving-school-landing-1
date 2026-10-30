import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';
import Icon from '@/components/ui/icon';
import { useLeadModal } from '@/components/lead/LeadModal';

const LOGO_URL = 'https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png';


const Triggers = () => {
  const data = useSection('triggers', {
    items: [
      {
        badge: 'По запросу',
        title: 'Инструктор-женщина. 8 лет опыта.',
        description: 'Почему некоторым важно, чтобы за рулём рядом была женщина?\n\nПотому что с ней проще. Нет давления, нет резких замечаний, нет ощущения, что тебя оценивают. Только спокойное объяснение, только ваш темп, только поддержка.\n\nИрина Дарчич — инструктор с 8-летним стажем. Она знает, как объяснить сложное простыми словами. Как помочь поверить в себя. Как научить так, чтобы вы перестали бояться дороги.\n\nПервое занятие к Ирине — бесплатно.\n\nПопробуйте. Вам понравится.',
        cta: 'Записаться к Ирине',
        image: 'https://cdn.poehali.dev/files/2937ba8a-51cb-4747-bf73-be0fcc7f1c6a.jpg',
      },
    ] as Array<{ badge: string; title: string; description: string; cta?: string; image: string }>,
  });
  const triggers = data.items as Array<{ badge: string; title: string; description: string; cta?: string; image: string }>;

  const openLead = useLeadModal();
  const scrollToForm = () => openLead({ source: 'запись к Ирине', title: 'Записаться к Ирине', subtitle: 'Первое занятие к Ирине — бесплатно. Оставьте телефон, и мы подберём удобное время.' });

  return (
    <section id="triggers" className="section relative overflow-hidden bg-paper">
      <div className="wrap relative">
        <Reveal className="relative mb-14 md:mb-20">
          <span className="eyebrow text-blue-700">Персональный подход</span>
          <div className="mt-5 flex items-end justify-between gap-8">
            <h2 className="h-section text-ink">
              Школу создали инструкторы,<br />
              <span className="text-blue-700">а не маркетологи</span>
            </h2>
            <img src={LOGO_URL} alt="Время Рулить" className="hidden w-48 flex-shrink-0 object-contain md:block lg:w-56" />
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          {triggers.map((t, i) => {
            const paragraphs = t.description.split('\n').filter((p) => p.trim());
            return (
              <div key={i} className="grid items-stretch gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
                <Reveal className="md:col-span-5">
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-card bg-night md:sticky md:top-28">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-quint group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1A3356,#0A1628)]" />
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-body text-xs font-medium text-ink backdrop-blur">
                      {t.badge}
                    </span>
                  </div>
                </Reveal>

                <div className="flex flex-col justify-center md:col-span-7">
                  <Reveal>
                    <h3 className="font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink md:text-[40px]">
                      {t.title}
                    </h3>
                  </Reveal>
                  <div className="mt-8 space-y-5">
                    {paragraphs.map((p, pi) => {
                      const short = p.length < 60;
                      return (
                        <Reveal key={pi} index={pi}>
                          <p
                            className={
                              short
                                ? 'font-heading text-xl font-semibold tracking-[-0.015em] text-ink md:text-[22px]'
                                : 'lead max-w-[580px] text-ink-soft'
                            }
                          >
                            {p}
                          </p>
                        </Reveal>
                      );
                    })}
                  </div>
                  {t.cta && (
                    <Reveal index={paragraphs.length}>
                      <button onClick={scrollToForm} className="btn-primary mt-10">
                        {t.cta}
                        <Icon name="ArrowRight" size={18} strokeWidth={1.75} />
                      </button>
                    </Reveal>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Triggers;
