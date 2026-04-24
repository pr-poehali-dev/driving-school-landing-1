import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface FormData {
  name: string;
  phone: string;
  isSVO: boolean;
  consent: boolean;
}

const ContactForm = () => {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', isSVO: false, consent: false });
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

          <div className="mb-5 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <input
              type="checkbox"
              id="svo"
              checked={form.isSVO}
              onChange={(e) => setForm({ ...form, isSVO: e.target.checked })}
              className="mt-1 w-4 h-4 accent-brand-blue flex-shrink-0"
            />
            <label htmlFor="svo" className="text-sm text-gray-700 cursor-pointer">
              <span className="font-semibold">Я участник СВО</span>
              <span className="text-yellow-700 ml-1">— применим скидку 5 000 ₽</span>
            </label>
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
              <a href="/privacy" target="_blank" className="text-brand-blue underline">Политикой конфиденциальности</a>
              {' '}и{' '}
              <a href="/agreement" target="_blank" className="text-brand-blue underline">Согласием на обработку ПД</a>
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
      </div>
    </section>
  );
};

export default ContactForm;