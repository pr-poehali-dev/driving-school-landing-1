import { useSection } from '@/hooks/useContent';

type ComparisonItem = { feature: string; competitor: string; ours: string };

const DEFAULT_ITEMS: ComparisonItem[] = [
  { feature: 'Базовая цена курса', competitor: '39 900 ₽', ours: '64 000 ₽' },
  { feature: 'Топливо / износ авто', competitor: '+12 000 ₽', ours: '0 ₽' },
  { feature: 'Пересдача теории', competitor: '+3 000 ₽', ours: '3 000 ₽' },
  { feature: 'Вождение (3 пересдачи)', competitor: '+15 000 ₽', ours: '3 000 ₽' },
  { feature: 'Своё расписание', competitor: '+6 000 ₽', ours: '0 ₽' },
  { feature: 'Подготовка документов', competitor: '+4 500 ₽', ours: '0 ₽' },
];

const PriceComparison = () => {
  const data = useSection('price_comparison', { items: DEFAULT_ITEMS });
  const rows = (data.items as ComparisonItem[]).map((it, i) => ({
    label: it.feature,
    competitor: it.competitor,
    ours: it.ours,
    oursGood: i !== 0 && it.ours.trim() === '0 ₽',
  }));

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="price-comparison" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        <div className="animate-on-scroll mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Честный расчёт</span>
          </div>
          <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Почему 64 000 ₽ —<br />
            <span className="text-blue-500">дешевле, чем 39 900 ₽?</span>
          </h2>
          <div className="mt-5 border-l-4 border-blue-500 pl-5 py-1">
            <p className="text-gray-500 italic text-base leading-relaxed">
              «Дешёвая школа экономит на всём. А потом вы платите за каждую мелочь. Посчитаем?»
            </p>
          </div>
        </div>

        {/* Таблица */}
        <div className="animate-on-scroll rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.08)]">
          {/* Шапка */}
          <div className="grid grid-cols-3 bg-[#0a1628] text-white px-6 py-4">
            <div className="font-heading font-bold text-sm">Статья расходов</div>
            <div className="font-heading font-bold text-sm text-center">Школа за 39 900 ₽</div>
            <div className="font-heading font-bold text-sm text-center text-blue-300">Время рулить (64 000 ₽)</div>
          </div>

          {/* Строки */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-6 py-4 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFF]'} ${i === 0 ? 'font-semibold' : ''}`}
            >
              <div className="text-[#1A2A3A] text-sm pr-4">{row.label}</div>
              <div className={`text-center text-sm font-medium ${i === 0 ? 'text-[#1A2A3A]' : 'text-red-500'}`}>
                {row.competitor}
              </div>
              <div className={`text-center text-sm font-bold ${row.oursGood ? 'text-green-600' : 'text-[#1A2A3A]'}`}>
                {row.ours}
              </div>
            </div>
          ))}

          {/* Итог */}
          <div className="grid grid-cols-3 px-6 py-5 bg-[#0a1628]">
            <div className="font-heading font-bold text-white text-base">Итоговая цена</div>
            <div className="text-center font-heading font-bold text-red-400 text-base">≈ 80 400 ₽</div>
            <div className="text-center font-heading font-bold text-blue-300 text-base">64 000 ₽</div>
          </div>
        </div>

        {/* Вывод */}
        <div className="animate-on-scroll mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <p className="text-[#1A2A3A] leading-relaxed text-base">
            Вас заманивают ценой 39 900 ₽, а по факту вылетаете на <strong className="text-red-500">80 000 ₽</strong>?
            В договорах других школ часто «забывают» упомянуть дополнительные поборы. Мы так не работаем.{' '}
            <strong className="text-blue-600">У нас цена фиксированная, а пересдача — 3 000 ₽.</strong>{' '}
            Никаких «бесплатных» бонусов, которых нет в реале, — только голые факты и честный договор.
          </p>
          <button
            onClick={scrollToForm}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 font-heading font-bold text-sm tracking-wide rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(42,127,255,0.4)]"
          >
            ЗАПИСАТЬСЯ ПО ФИКСИРОВАННОЙ ЦЕНЕ
          </button>
        </div>
      </div>
    </section>
  );
};

export default PriceComparison;