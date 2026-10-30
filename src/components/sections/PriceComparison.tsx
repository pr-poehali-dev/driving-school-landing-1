import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import Icon from '@/components/ui/icon';
import { useLeadModal } from '@/components/lead/LeadModal';

type ComparisonItem = { feature: string; competitor: string; ours: string };

const DEFAULT_ITEMS: ComparisonItem[] = [
  { feature: 'Базовая цена курса', competitor: '39 900 ₽', ours: '64 000 ₽' },
  { feature: 'Практические занятия', competitor: '+12 000 ₽', ours: '0 ₽' },
  { feature: 'Своё расписание', competitor: '+6 000 ₽', ours: '0 ₽' },
  { feature: 'Выбор инструктора', competitor: '+4 500 ₽', ours: '0 ₽' },
  { feature: 'Дополнительные часы вождения', competitor: '+9 600 ₽', ours: '0 ₽' },
];

const PriceComparison = () => {
  const data = useSection('price_comparison', { items: DEFAULT_ITEMS });
  const rows = (data.items as ComparisonItem[]).map((it, i) => ({
    label: it.feature,
    competitor: it.competitor,
    ours: it.ours,
    oursGood: i !== 0 && it.ours.trim() === '0 ₽',
  }));

  const openLead = useLeadModal();
  const scrollToForm = () => openLead({ source: 'сравнение: фиксированная цена', subtitle: 'Цена фиксируется в договоре — без доплат и сюрпризов.' });

  return (
    <section id="price-comparison" className="section bg-[linear-gradient(180deg,#16263B_0px,#EFEDE7_120px,#F6F5F1_300px)] !pt-40 md:!pt-48">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <span className="eyebrow text-blue-700">Честный расчёт</span>
            <h2 className="h-section mt-5 text-ink">
              Почему 64 000 ₽ —<br />
              <span className="text-blue-700">дешевле, чем 39 900 ₽?</span>
            </h2>
          </Reveal>
          <Reveal index={1} className="md:col-span-5">
            <p className="border-l-2 border-[#2A7FFF]/50 pl-5 font-body text-lg italic leading-[1.6] text-ink-soft md:ml-auto md:max-w-[420px]">
              «Дешёвая школа экономит на всём. А потом вы платите за каждую мелочь. Посчитаем?»
            </p>
          </Reveal>
        </div>

        <Reveal index={1} className="mt-14 md:mt-20">
          <div className="overflow-hidden rounded-card border border-paper-line bg-white">
            <div className="grid grid-cols-[1.3fr_1fr_1fr] items-end gap-2 border-b border-paper-line px-4 py-5 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr] md:py-7">
              <span className="font-body text-xs font-medium uppercase tracking-[0.08em] text-ink-mute">Статья расходов</span>
              <span className="text-right font-heading text-[13px] font-semibold leading-tight text-ink-soft sm:text-[15px]">Школа за 39 900 ₽</span>
              <span className="text-right font-heading text-[13px] font-semibold leading-tight text-blue-700 sm:text-[15px]">Время рулить (64 000 ₽)</span>
            </div>

            {rows.map((row, i) => (
              <div
                key={i}
                className="group grid grid-cols-[1.3fr_1fr_1fr] items-center gap-2 border-b border-paper-line px-4 py-4 transition-colors duration-300 ease-quint hover:bg-[#2A7FFF]/[0.045] sm:px-8 md:grid-cols-[1.6fr_1fr_1fr] md:py-5"
              >
                <span className={`font-body text-sm text-ink sm:text-base ${i === 0 ? 'font-semibold' : ''}`}>{row.label}</span>
                <span className={`num text-right text-[15px] font-semibold sm:text-lg ${i === 0 ? 'text-ink' : 'text-alert'}`}>
                  {row.competitor}
                </span>
                <span className="flex items-center justify-end gap-2 text-right">
                  {row.oursGood && (
                    <Icon name="Check" size={16} strokeWidth={2} className="hidden text-green-700 sm:block" />
                  )}
                  <span className={`num text-[15px] font-semibold sm:text-lg ${row.oursGood ? 'text-green-700' : 'text-ink'}`}>
                    {row.ours}
                  </span>
                </span>
              </div>
            ))}

            <div className="grid grid-cols-[1.3fr_1fr_1fr] items-end gap-2 bg-night px-4 py-7 text-white sm:px-8 md:grid-cols-[1.6fr_1fr_1fr] md:py-10">
              <span className="font-heading text-base font-semibold sm:text-xl">Итоговая цена</span>
              <span className="text-right">
                <span className="num text-xl text-alert-night line-through decoration-alert-night/60 decoration-2 sm:text-3xl md:text-4xl">
                  ≈ 72 000 ₽
                </span>
              </span>
              <span className="text-right">
                <CountUp value="64 000" className="text-2xl text-white sm:text-4xl md:text-[56px]" />
                <span className="num ml-1 text-xl text-[#4DA8FF] sm:text-3xl md:text-4xl"> ₽</span>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <p className="lead text-ink-soft md:col-span-8">
              Вас заманивают ценой 39 900 ₽, а по факту вылетаете на <strong className="font-semibold text-alert">72 000 ₽</strong>?
              В договорах других школ часто «забывают» упомянуть дополнительные поборы. Мы так не работаем.{' '}
              <strong className="font-semibold text-ink">У нас цена фиксированная, а пересдача — 3 000 ₽.</strong>{' '}
              Никаких «бесплатных» бонусов, которых нет в реале, — только голые факты и честный договор.
            </p>
            <div className="md:col-span-4 md:text-right">
              <button onClick={scrollToForm} className="btn-primary w-full md:w-auto">
                ЗАПИСАТЬСЯ ПО ФИКСИРОВАННОЙ ЦЕНЕ
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PriceComparison;
