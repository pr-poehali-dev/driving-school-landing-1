import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CONTACT_API = 'https://functions.poehali.dev/f1ccaad1-6209-4d21-8db3-d6403dc105f8';

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

type Props = {
  source?: string;
  submitLabel?: string;
  idPrefix?: string;
  onDone?: () => void;
  tone?: 'dark' | 'light';
};

const LeadForm = ({
  source = '',
  submitLabel = 'Записаться на бесплатную консультацию',
  idPrefix = 'lf',
  tone = 'dark',
}: Props) => {
  const [form, setForm] = useState({ name: '', phone: '', consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dark = tone === 'dark';

  const getUTM = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || source,
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Подскажите, как к вам обращаться');
      return;
    }
    if (!form.phone || form.phone.replace(/\D/g, '').length < 11) {
      setError('Введите корректный номер телефона');
      return;
    }
    if (!form.consent) {
      setError('Пожалуйста, дайте согласие на обработку данных');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...getUTM() }),
      });
      if (res.ok) setSubmitted(true);
      else setError('Что-то пошло не так. Попробуйте ещё раз или позвоните нам.');
    } catch {
      setError('Не удалось отправить форму. Позвоните нам: +7 978 502 11 13');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = dark
    ? 'w-full rounded-ctl border border-white/12 bg-white/[0.05] px-5 py-4 font-body text-[17px] text-white placeholder:text-night-mute/70 transition-[border-color,background-color,box-shadow] duration-300 ease-quint hover:border-white/25 focus:border-[#4DA8FF] focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(77,168,255,0.18)] focus:outline-none'
    : 'w-full rounded-ctl border border-paper-line bg-paper px-5 py-4 font-body text-[17px] text-ink placeholder:text-ink-mute/70 transition-[border-color,background-color,box-shadow] duration-300 ease-quint hover:border-[#C9C5BA] focus:border-[#1A6FEF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(42,127,255,0.15)] focus:outline-none';
  const labelCls = `mb-2 block font-body text-sm font-medium ${dark ? 'text-night-text' : 'text-ink-soft'}`;
  const mutedCls = dark ? 'text-night-mute' : 'text-ink-mute';
  const linkCls = dark
    ? 'text-[#4DA8FF] underline decoration-[#4DA8FF]/40 underline-offset-2 hover:decoration-[#4DA8FF]'
    : 'text-blue-700 underline decoration-blue-700/40 underline-offset-2 hover:decoration-blue-700';

  if (submitted) {
    return (
      <div className="animate-in fade-in-0 slide-in-from-bottom-3 py-8 text-center duration-700" role="status">
        <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border ${dark ? 'border-[#4DA8FF]/40 text-[#4DA8FF]' : 'border-[#2A7FFF]/30 text-blue-700'}`}>
          <Icon name="Check" size={28} strokeWidth={1.5} />
        </span>
        <h3 className={`mt-6 font-heading text-3xl font-semibold tracking-[-0.02em] ${dark ? 'text-white' : 'text-ink'}`}>Спасибо!</h3>
        <p className={`lead mx-auto mt-3 max-w-[380px] ${dark ? 'text-night-text' : 'text-ink-soft'}`}>
          Мы перезвоним вам в ближайшее время. Обычно это занимает не больше 15 минут.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelCls}>Как к вам обращаться?</label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            autoComplete="name"
            placeholder="Ваше имя"
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }); if (error) setError(''); }}
            required
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className={labelCls}>Телефон</label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 ___ ___ __ __"
            value={form.phone}
            onChange={(e) => { setForm({ ...form, phone: formatPhone(e.target.value) }); if (error) setError(''); }}
            required
            aria-invalid={!!error && error.includes('телефон')}
            className={inputCls}
          />
        </div>
      </div>

      <label htmlFor={`${idPrefix}-consent`} className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          id={`${idPrefix}-consent`}
          checked={form.consent}
          onChange={(e) => { setForm({ ...form, consent: e.target.checked }); if (error) setError(''); }}
          required
          className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded accent-[#1A6FEF]"
        />
        <span className={`font-body text-[13px] leading-relaxed ${mutedCls}`}>
          Я согласен на обработку персональных данных в соответствии с{' '}
          <a href="/privacy" target="_blank" className={linkCls}>Политикой конфиденциальности</a>
          {' '}и{' '}
          <a href="/agreement" target="_blank" className={linkCls}>Согласием на обработку ПД</a>
        </span>
      </label>

      <div
        className="grid transition-[grid-template-rows,opacity] duration-[350ms] ease-quint"
        style={{ gridTemplateRows: error ? '1fr' : '0fr', opacity: error ? 1 : 0 }}
        aria-live="polite"
      >
        <div className="overflow-hidden">
          {error && (
            <p
              role="alert"
              className={`mt-6 flex items-start gap-2.5 border-l-2 px-4 py-3 font-body text-sm ${
                dark ? 'border-alert-night bg-alert-night/10 text-[#FCA5A5]' : 'border-alert bg-red-50 text-alert'
              }`}
            >
              <Icon name="CircleAlert" size={16} strokeWidth={1.75} className="mt-0.5 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary mt-8 w-full !py-5 text-base disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? 'Отправляем...' : submitLabel}
        {!loading && <Icon name="ArrowRight" size={18} strokeWidth={1.75} />}
      </button>
      <p className={`mt-4 text-center font-body text-[13px] ${mutedCls}`}>
        Никакого спама. Только один звонок, чтобы ответить на вопросы и подобрать удобное время
      </p>
    </form>
  );
};

export default LeadForm;
