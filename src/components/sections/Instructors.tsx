import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';

const CONTACT_API = 'https://functions.poehali.dev/f1ccaad1-6209-4d21-8db3-d6403dc105f8';

const yearsLabel = (y: string) => {
  const n = parseInt(y, 10);
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return 'год';
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'года';
  return 'лет';
};

type InstructorItem = {
  id: number;
  name: string;
  years: string;
  spec: string;
  quote: string;
  photo: string;
  photo_position: string;
  advantage: string;
};

const DEFAULT_INSTRUCTORS: InstructorItem[] = [
  { id: 1, name: 'Ридван Шамсудинов', years: '15', spec: 'Основатель · Городское вождение', quote: 'Я сам инструктор. Я знаю, как учат в других школах — и знаю, как надо. Поэтому открыл свою.', photo: 'https://cdn.poehali.dev/files/c97d13a4-dac4-46df-b994-94a251935c4d.jpg', photo_position: 'center top', advantage: '' },
  { id: 2, name: 'Ирина Дарчич', years: '8', spec: 'Инструктор-женщина · Новички', quote: 'Со мной не страшно. Спокойно, без спешки, без оценок — просто учимся ехать.', photo: 'https://cdn.poehali.dev/files/2937ba8a-51cb-4747-bf73-be0fcc7f1c6a.jpg', photo_position: 'center top', advantage: '' },
  { id: 3, name: 'Дмитрий Дарчич', years: '18', spec: 'Сложные манёвры · МКПП', quote: 'Механика — не страшно, если объяснить правильно. За 18 лет я научил этому сотни людей.', photo: 'https://cdn.poehali.dev/files/3a58eaf4-a04b-4f47-8af1-15c4eaed2862.jpg', photo_position: 'center top', advantage: '' },
  { id: 4, name: 'Эльдар Музафаров', years: '10', spec: 'Подготовка к экзамену', quote: 'Экзамен в ГИБДД — это не лотерея, если готовиться правильно. Я знаю маршруты и знаю систему.', photo: 'https://cdn.poehali.dev/files/50cf5106-21c3-4232-993a-1ad028250a52.jpg', photo_position: 'center top', advantage: '' },
  { id: 5, name: 'Ферат Аблялимов', years: '9', spec: 'Высшее · Техник-механик · с 2016 г.', quote: 'Мне нравится видеть эмоции людей, когда у них получается управлять автомобилем. И особенно — когда они получают права.', photo: 'https://cdn.poehali.dev/files/763fb878-ad01-4aed-b0de-312d528df7a0.jpg', photo_position: '75% top', advantage: 'Создаёт доверительную приятную обстановку, поддерживает как друга' },
];

const Instructors = () => {
  const data = useSection('instructors', { items: DEFAULT_INSTRUCTORS });
  const instructors = data.items as InstructorItem[];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [form, setForm] = useState({ name: '', phone: '' });
  const [sent, setSent] = useState(false);

  const openModal = (instructorName: string) => {
    setSelectedInstructor(instructorName);
    setModalOpen(true);
    setSent(false);
  };

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.name} (инструктор: ${selectedInstructor})`,
          phone: form.phone,
          consent: true,
          utm_source: 'выбор инструктора',
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Не удалось отправить. Позвоните нам: +7 978 502 11 13');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="instructors" className="section bg-paper-alt">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <span className="eyebrow text-ink-mute">Команда</span>
            <h2 className="h-section mt-5 text-ink">
              Школу создали инструкторы,<br />
              <span className="text-blue-700">а не маркетологи</span>
            </h2>
          </Reveal>
          <Reveal index={1} className="md:col-span-5">
            <p className="lead max-w-[440px] text-ink-soft md:ml-auto">
              Каждый из нас сначала сам сел за руль как ученик. Мы знаем страхи изнутри.
            </p>
          </Reveal>
        </div>

        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 md:mt-20 lg:grid-cols-3 2xl:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {instructors.map((inst, i) => (
            <Reveal key={inst.id ?? i} index={i} className="w-[78%] flex-shrink-0 snap-start sm:w-auto">
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-card border border-paper-line bg-white">
                <div className="relative aspect-[4/5] overflow-hidden bg-night">
                  {inst.photo ? (
                    <img
                      src={inst.photo}
                      alt={`Инструктор по вождению ${inst.name} — автошкола Время рулить Севастополь`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-quint group-hover:scale-[1.025]"
                      style={{ objectPosition: (inst.photo_position || 'center top') as string }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#1A3356,#0A1628)]">
                      <span className="num text-6xl text-[#4DA8FF]">
                        {inst.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/70 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-baseline gap-1.5 text-white">
                    <CountUp value={inst.years} className="text-[44px]" />
                    <span className="font-body text-sm text-white/85">{yearsLabel(inst.years)} опыта</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="font-heading text-xl font-semibold leading-tight tracking-[-0.015em] text-ink">
                    {inst.name}
                  </h3>
                  <p className="mt-3 self-start rounded-full border border-paper-line px-3 py-1 font-body text-xs text-ink-soft">
                    {inst.spec}
                  </p>

                  <blockquote className="mt-5 flex-1 border-l-2 border-[#2A7FFF]/50 pl-4 font-body text-[15px] italic leading-[1.6] text-ink-soft">
                    «{inst.quote}»
                  </blockquote>

                  {inst.advantage && (
                    <p className="mt-4 font-body text-[13px] leading-snug text-blue-700">
                      {inst.advantage}
                    </p>
                  )}

                  <button
                    onClick={() => openModal(inst.name)}
                    className="group/btn mt-6 inline-flex items-center justify-between border-t border-paper-line pt-4 font-heading text-[15px] font-semibold text-ink transition-colors duration-300 hover:text-blue-700"
                  >
                    Выбрать инструктора
                    <Icon name="ArrowRight" size={18} strokeWidth={1.75} className="transition-transform duration-500 ease-quint group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Поп-ап */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-night/60 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-card shadow-2xl max-w-md w-full p-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {sent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={26} strokeWidth={1.5} className="text-green-700" />
                </div>
                <h3 className="font-heading font-bold text-ink text-xl mb-2">Заявка принята!</h3>
                <p className="text-ink-soft text-sm">Мы свяжемся с вами в течение 15 минут и подберём удобное время.</p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="btn-primary mt-5"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                  <Icon name="UserCheck" size={26} strokeWidth={1.5} className="text-blue-700" />
                </div>
                <h3 className="font-heading font-bold text-ink text-xl mb-1">
                  Выбрать инструктора
                </h3>
                {selectedInstructor && (
                  <p className="text-blue-700 text-sm font-medium mb-4">Инструктор: {selectedInstructor}</p>
                )}
                <p className="text-ink-soft text-sm mb-5">Оставьте контакты — мы свяжемся и подберём удобное время для первого занятия.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-paper-line bg-paper rounded-ctl px-4 py-3.5 text-base focus:outline-none focus:ring-4 focus:ring-[#2A7FFF]/15 focus:border-blue-600 focus:bg-white transition-all duration-300 ease-quint"
                  />
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    required
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-paper-line bg-paper rounded-ctl px-4 py-3.5 text-base focus:outline-none focus:ring-4 focus:ring-[#2A7FFF]/15 focus:border-blue-600 focus:bg-white transition-all duration-300 ease-quint"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full mt-1 disabled:opacity-70"
                  >
                    {sending ? 'Отправляем…' : 'Отправить заявку'}
                  </button>
                  {error && (
                    <p role="alert" className="animate-in fade-in-0 slide-in-from-top-1 duration-300 rounded-ctl bg-red-50 px-4 py-3 text-sm text-alert">
                      {error}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Instructors;