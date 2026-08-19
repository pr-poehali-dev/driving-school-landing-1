import { useState } from 'react';
import Icon from '@/components/ui/icon';

const DOCS = [
  {
    id: 1,
    title: 'Программа подготовки водителей категории «В»',
    preview: '/docs/programma-kategoriya-b.jpg',
    url: '/docs/programma-kategoriya-b.pdf',
  },
  {
    id: 2,
    title: 'Программа повышения квалификации — АКПП',
    preview: '/docs/programma-akpp.jpg',
    url: '/docs/programma-akpp.pdf',
  },
  {
    id: 3,
    title: 'Программа переподготовки с «А» на «В»',
    preview: '/docs/programma-a-na-b.jpg',
    url: '/docs/programma-a-na-b.pdf',
  },
];

interface FormData {
  name: string;
  phone: string;
  consent: boolean;
}

const ContactForm = () => {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getUTM = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setError('Пожалуйста, дайте согласие на обработку данных');
      return;
    }
    if (!form.phone || form.phone.replace(/\D/g, '').length < 11) {
      setError('Введите корректный номер телефона');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://functions.poehali.dev/32e10a88-c877-41ab-b1b9-6dd5613ba30b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...getUTM() }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Что-то пошло не так. Попробуйте ещё раз или позвоните нам.');
      }
    } catch {
      setError('Не удалось отправить форму. Позвоните нам: +7 978 502 11 13');
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    let result = '+7 ';
    if (digits.length > 1) result += digits.slice(1, 4);
    if (digits.length > 4) result += ' ' + digits.slice(4, 7);
    if (digits.length > 7) result += ' ' + digits.slice(7, 9);
    if (digits.length > 9) result += ' ' + digits.slice(9, 11);
    return result;
  };

  if (submitted) {
    return (
      <section id="contact-form" className="py-16 md:py-24 bg-brand-sky">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-10 shadow-md">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-green-600" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-brand-dark mb-2">Спасибо!</h3>
            <p className="text-gray-600">
              Мы перезвоним вам в ближайшее время. Обычно это занимает не больше 15 минут.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-16 md:py-24 bg-brand-sky">
      <div className="max-w-lg mx-auto px-4">
        <div className="animate-on-scroll text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-3">
            Оставьте телефон — мы перезвоним через 20 минут
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="animate-on-scroll bg-white rounded-2xl p-8 shadow-md"
        >
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Как к вам обращаться?
            </label>
            <input
              type="text"
              placeholder="Ваше имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <input
              type="tel"
              placeholder="+7 ___ ___ __ __"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
            />
          </div>

          <div className="mb-6 flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              required
              className="mt-1 w-4 h-4 accent-brand-blue flex-shrink-0"
            />
            <label htmlFor="consent" className="text-xs text-gray-500 cursor-pointer leading-relaxed">
              Я согласен на обработку персональных данных в соответствии с{' '}
              <a href="#/privacy" target="_blank" className="text-brand-blue underline">Политикой конфиденциальности</a>
              {' '}и{' '}
              <a href="#/agreement" target="_blank" className="text-brand-blue underline">Согласием на обработку ПД</a>
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue text-white py-4 rounded-xl font-heading font-bold text-lg hover:bg-blue-600 hover:scale-[1.02] transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Отправляем...' : 'Записаться на бесплатную консультацию'}
          </button>
          <p className="mt-3 text-gray-400 text-xs text-center">
            Никакого спама. Только один звонок, чтобы ответить на вопросы и подобрать удобное время
          </p>
        </form>

        <div className="animate-on-scroll mt-6 text-center">
          <a
            href="https://vk.ru/timedrivesev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#0077FF] text-white py-4 rounded-xl font-heading font-bold text-lg hover:bg-[#0066DD] hover:scale-[1.02] transition-all duration-200 shadow-md"
          >
            <Icon name="MessageCircle" size={22} />
            Хочу бесплатное занятие
          </a>
          <p className="mt-3 text-gray-500 text-sm">
            Первое занятие по теории — бесплатно
          </p>
        </div>
      </div>

      {/* Документы */}
      <div className="max-w-4xl mx-auto px-4 mt-14">
        <div className="animate-on-scroll text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-dark mb-2">
            Документы
          </h2>
          <p className="text-gray-500 text-sm">Нажмите на документ, чтобы открыть его</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DOCS.map((doc) => (
            <a
              key={doc.id}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-on-scroll group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <img
                  src={doc.preview}
                  alt={doc.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <Icon name="ZoomIn" size={18} className="text-brand-blue" />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-start gap-2">
                <Icon name="FileText" size={14} className="text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600 font-medium leading-snug">{doc.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;