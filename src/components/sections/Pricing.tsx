import Icon from '@/components/ui/icon';
import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import { useLeadModal } from '@/components/lead/LeadModal';


const Pricing = () => {
  const data = useSection('pricing', {
    price: '64 000',
    old_price: '75 000',
    discount: '-11 000',
    includes: '+5 000 ТОПЛИВНЫЙ СБОР',
    fuel_note: 'В связи с ростом цен на топливо, с 13.07.2026 ко всем программам обучения добавляется временный топливный сбор в размере 5 000 ₽. Мера действует до стабилизации цен. Средства направлены на бесперебойное проведение практических занятий.',
    installment_first: '15 000',
    features: [
      { icon: 'Fuel', text: 'Топливо включено' },
      { icon: 'CreditCard', text: 'Рассрочка без банков — первый взнос 15 000 ₽' },
      { icon: 'Clock', text: 'Дополнительные часы по необходимости' },
    ] as Array<{ icon: string; text: string }>,
  });
  const features = data.features as Array<{ icon: string; text: string }>;

  const openLead = useLeadModal();
  const scrollToForm = () => openLead({ source: 'цена: консультация', subtitle: 'Расскажем, что входит в 64 000 ₽, и подберём удобное время первого занятия.' });

  return (
    <section
      id="pricing"
      className="section relative isolate overflow-hidden bg-[linear-gradient(180deg,#EFEDE7_0px,#0A1628_140px,#0A1628_calc(100%-120px),#16263B_100%)] text-white !pt-48 md:!pt-56"
    >
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow -right-32 top-1/3 -z-10 h-[460px] w-[560px] bg-[#2A7FFF]/20" aria-hidden="true" />

      <div className="wrap">
        <Reveal className="text-center">
          <span className="eyebrow justify-center text-[#4DA8FF]">Стоимость</span>
          <h2 className="h-section mt-5">
            Одна цена —<br />
            <span className="text-[#4DA8FF]">никаких сюрпризов</span>
          </h2>
        </Reveal>

        <Reveal index={1} className="mx-auto mt-14 max-w-[880px] md:mt-20">
          <div className="overflow-hidden rounded-card border border-white/10 bg-white/[0.035] backdrop-blur-sm">
            <div className="grid gap-10 p-7 md:grid-cols-12 md:p-12">
              <div className="md:col-span-7">
                <p className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-night-mute">Полный курс</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <CountUp value={data.price as string} className="text-[64px] text-white md:text-[112px]" />
                  <span className="num text-4xl text-[#4DA8FF] md:text-5xl">₽</span>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="font-body text-sm text-night-mute line-through decoration-white/40">
                    от {data.old_price as string} ₽
                  </span>
                  <span className="rounded-full border border-[#4DA8FF]/40 px-3 py-1 font-heading text-sm font-semibold text-[#4DA8FF]">
                    {data.discount as string} ₽
                  </span>
                </div>
              </div>

              <ul className="flex flex-col justify-end gap-5 md:col-span-5 md:border-l md:border-white/10 md:pl-10">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-[#4DA8FF]">
                      <Icon name={f.icon} size={18} strokeWidth={1.5} />
                    </span>
                    <span className="pt-2 font-body text-[15px] leading-snug text-night-text">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-7 border-l-2 border-alert-night bg-white/[0.03] py-5 pl-5 pr-4 md:mx-12">
              <p className="font-heading text-base font-semibold tracking-[0.01em] text-white sm:text-lg">
                {data.includes as string}
              </p>
              <p className="mt-2 font-body text-sm leading-[1.6] text-night-mute">
                {data.fuel_note as string}
              </p>
            </div>

            <div className="p-7 md:p-12">
              <button onClick={scrollToForm} className="btn-primary w-full !py-5 text-base">
                ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
                <Icon name="ArrowRight" size={18} strokeWidth={1.75} />
              </button>
              <p className="mt-4 text-center font-body text-sm text-night-mute">
                Цена, которую видите — цена, которую платите. Без доплат.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;
