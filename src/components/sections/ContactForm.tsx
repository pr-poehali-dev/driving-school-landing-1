import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Reveal from '@/components/motion/Reveal';

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
      const res = await fetch('https://functions.poehali.dev/f1ccaad1-6209-4d21-8db3-d6403dc105f8', {
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

  const inputCls =
    'peer w-full rounded-ctl border border-white/12 bg-white/[0.05] px-5 py-4 font-body text-[17px] text-white placeholder:text-night-mute/70 transition-[border-color,background-color,box-shadow] duration-300 ease-quint hover:border-white/25 focus:border-[#4DA8FF] focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(77,168,255,0.18)] focus:outline-none';

  return (
    <section
      id="contact-form"
      className="section relative isolate overflow-hidden bg-[linear-gradient(180deg,#F6F5F1_0px,#0A1628_140px)] text-white !pt-48 md:!pt-56"
    >
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow -left-40 top-1/2 -z-10 h-[460px] w-[560px] bg-[#2A7FFF]/20" aria-hidden="true" />

      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <span className="eyebrow text-[#4DA8FF]">Заявка</span>
          <h2 className="h-section mt-5">
            Оставьте телефон — мы перезвоним через 20 минут
          </h2>
          <a
            href="https://vk.ru/timedrivesev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-10 w-full border-white/20 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/10 sm:w-auto"
          >
            <Icon name="MessageCircle" size={20} strokeWidth={1.5} />
            Хочу бесплатное занятие
          </a>
          <p className="mt-3 font-body text-sm text-night-mute">
            Первое занятие по теории — бесплатно
          </p>
        </Reveal>

        <Reveal index={1} className="md:col-span-7 md:pl-6 lg:pl-12">
          <div className="rounded-card border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm sm:p-8 md:p-10">
            {submitted ? (
              <div className="animate-in fade-in-0 slide-in-from-bottom-3 py-10 text-center duration-700" role="status">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#4DA8FF]/40 text-[#4DA8FF]">
                  <Icon name="Check" size={28} strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-heading text-3xl font-semibold tracking-[-0.02em]">Спасибо!</h3>
                <p className="lead mx-auto mt-3 max-w-[380px] text-night-text">
                  Мы перезвоним вам в ближайшее время. Обычно это занимает не больше 15 минут.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className="mb-2 block font-body text-sm font-medium text-night-text">
                      Как к вам обращаться?
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ваше имя"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-phone" className="mb-2 block font-body text-sm font-medium text-night-text">
                      Телефон
                    </label>
                    <input
                      id="cf-phone"
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

                <label htmlFor="consent" className="mt-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={form.consent}
                    onChange={(e) => { setForm({ ...form, consent: e.target.checked }); if (error) setError(''); }}
                    required
                    className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded accent-[#1A6FEF]"
                  />
                  <span className="font-body text-[13px] leading-relaxed text-night-mute">
                    Я согласен на обработку персональных данных в соответствии с{' '}
                    <a href="/privacy" target="_blank" className="text-[#4DA8FF] underline decoration-[#4DA8FF]/40 underline-offset-2 hover:decoration-[#4DA8FF]">Политикой конфиденциальности</a>
                    {' '}и{' '}
                    <a href="/agreement" target="_blank" className="text-[#4DA8FF] underline decoration-[#4DA8FF]/40 underline-offset-2 hover:decoration-[#4DA8FF]">Согласием на обработку ПД</a>
                  </span>
                </label>

                <div
                  className="grid transition-[grid-template-rows,opacity] duration-[350ms] ease-quint"
                  style={{ gridTemplateRows: error ? '1fr' : '0fr', opacity: error ? 1 : 0 }}
                  aria-live="polite"
                >
                  <div className="overflow-hidden">
                    {error && (
                      <p role="alert" className="mt-6 flex items-start gap-2.5 border-l-2 border-alert-night bg-alert-night/10 px-4 py-3 font-body text-sm text-[#FCA5A5]">
                        <Icon name="CircleAlert" size={16} strokeWidth={1.75} className="mt-0.5 flex-shrink-0" />
                        {error}
                      </p>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary mt-8 w-full !py-5 text-base disabled:cursor-not-allowed disabled:opacity-70">
                  {loading ? 'Отправляем...' : 'Записаться на бесплатную консультацию'}
                  {!loading && <Icon name="ArrowRight" size={18} strokeWidth={1.75} />}
                </button>
                <p className="mt-4 text-center font-body text-[13px] text-night-mute">
                  Никакого спама. Только один звонок, чтобы ответить на вопросы и подобрать удобное время
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <div className="wrap mt-24 md:mt-32">
        <Reveal className="flex flex-col gap-2 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading text-[28px] font-semibold tracking-[-0.025em] md:text-[36px]">
            Документы
          </h2>
          <p className="font-body text-sm text-night-mute">Нажмите на документ, чтобы открыть его</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {DOCS.map((doc, i) => (
            <Reveal key={doc.id} index={i}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group block overflow-hidden rounded-card border border-white/10 bg-white/[0.04]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <img
                    src={doc.preview}
                    alt={doc.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-quint group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start gap-2.5 p-4">
                  <Icon name="FileText" size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-[#4DA8FF]" />
                  <span className="font-body text-[13px] font-medium leading-snug text-night-text">{doc.title}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
