import { useState } from 'react';
import Icon from '@/components/ui/icon';

const instructors = [
  {
    name: 'Ридван Шамсудинов',
    years: '15',
    spec: 'Основатель · Городское вождение',
    quote: 'Я сам инструктор. Я знаю, как учат в других школах — и знаю, как надо. Поэтому открыл свою.',
    photo: 'https://cdn.poehali.dev/files/c97d13a4-dac4-46df-b994-94a251935c4d.jpg',
    alt: 'Инструктор по вождению Ридван Шамсудинов — основатель автошколы Время рулить в Севастополе',
  },
  {
    name: 'Ирина Дарчич',
    years: '8',
    spec: 'Инструктор-женщина · Новички',
    quote: 'Со мной не страшно. Спокойно, без спешки, без оценок — просто учимся ехать.',
    photo: 'https://cdn.poehali.dev/files/2937ba8a-51cb-4747-bf73-be0fcc7f1c6a.jpg',
    alt: 'Инструктор-женщина по вождению в Севастополе Ирина Дарчич — обучение для новичков',
  },
  {
    name: 'Дмитрий Дарчич',
    years: '12',
    spec: 'Сложные манёвры · МКПП',
    quote: 'Механика — не страшно, если объяснить правильно. За 12 лет я научил этому сотни людей.',
    photo: 'https://cdn.poehali.dev/files/3a58eaf4-a04b-4f47-8af1-15c4eaed2862.jpg',
    alt: 'Инструктор по вождению на механике МКПП Дмитрий Дарчич — автошкола Севастополь',
  },
  {
    name: 'Эльдар Музафаров',
    years: '10',
    spec: 'Подготовка к экзамену',
    quote: 'Экзамен в ГИБДД — это не лотерея, если готовиться правильно. Я знаю маршруты и знаю систему.',
    photo: 'https://cdn.poehali.dev/files/50cf5106-21c3-4232-993a-1ad028250a52.jpg',
    alt: 'Инструктор по подготовке к экзамену ГИБДД Эльдар Музафаров — автошкола Время рулить Севастополь',
  },
];

const Instructors = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [form, setForm] = useState({ name: '', phone: '' });
  const [sent, setSent] = useState(false);

  const openModal = (instructorName: string) => {
    setSelectedInstructor(instructorName);
    setModalOpen(true);
    setSent(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="instructors" className="py-16 md:py-24 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.2rem)' }}>
            Школу создали инструкторы,<br />
            <span className="text-blue-500">а не маркетологи</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed" style={{ maxWidth: 520 }}>
            Каждый из нас сначала сам сел за руль как ученик. Мы знаем страхи изнутри.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {instructors.map((inst, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} group bg-white rounded-2xl
                hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]
                transition-all duration-300 cursor-default relative overflow-hidden flex flex-col`}
            >
              {/* Фото */}
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img
                  src={inst.photo}
                  alt={inst.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A]/70 via-transparent to-transparent" />
              </div>

              {/* Контент */}
              <div className="p-5 flex flex-col flex-1">
                {/* Имя + опыт */}
                <div className="mb-1">
                  <h3 className="font-heading text-lg font-bold text-[#1A2A3A] leading-snug">{inst.name}</h3>
                  <span className="text-blue-500 font-heading font-bold text-sm">{inst.years} лет опыта</span>
                </div>

                {/* Специализация */}
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">{inst.spec}</p>

                {/* Цитата */}
                <blockquote className="text-gray-500 text-sm leading-relaxed italic border-l-2 border-blue-200 pl-3 mb-5 flex-1">
                  «{inst.quote}»
                </blockquote>

                {/* Одна кнопка */}
                <button
                  onClick={() => openModal(inst.name)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 font-heading font-bold text-xs tracking-wide rounded-lg transition-all duration-200 hover:shadow-[0_4px_16px_rgba(59,130,246,0.35)]"
                >
                  Выбрать инструктора
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Поп-ап */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {sent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={28} className="text-green-500" />
                </div>
                <h3 className="font-heading font-bold text-[#1A2A3A] text-xl mb-2">Заявка принята!</h3>
                <p className="text-gray-500 text-sm">Мы свяжемся с вами в течение 15 минут и подберём удобное время.</p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-5 bg-blue-500 text-white px-6 py-2.5 rounded-xl font-heading font-bold text-sm"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                  <Icon name="UserCheck" size={28} className="text-blue-500" />
                </div>
                <h3 className="font-heading font-bold text-[#1A2A3A] text-xl mb-1">
                  Выбрать инструктора
                </h3>
                {selectedInstructor && (
                  <p className="text-blue-500 text-sm font-medium mb-4">Инструктор: {selectedInstructor}</p>
                )}
                <p className="text-gray-500 text-sm mb-5">Оставьте контакты — мы свяжемся и подберём удобное время для первого занятия.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    required
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-heading font-bold text-sm tracking-wide transition-all duration-200 mt-1"
                  >
                    Отправить заявку
                  </button>
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