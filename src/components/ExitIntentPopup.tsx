import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const STORAGE_KEY = 'exit_hint_shown';

const ExitIntentPopup = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const show = () => {
      if (shown.current) return;
      shown.current = true;
      sessionStorage.setItem(STORAGE_KEY, '1');
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) show();
    };

    const timer = setTimeout(show, 60000);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => setMounted(false), 600);
  };

  const scrollToPricing = () => {
    close();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="exit-hint-title"
      className={`fixed bottom-6 left-6 z-[90] w-[min(400px,calc(100vw-48px))] rounded-card border border-paper-line bg-white p-7 shadow-[0_32px_64px_-24px_rgba(10,22,40,0.4)] transition-[opacity,transform] duration-[600ms] ease-quint motion-reduce:transform-none ${
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <button
        onClick={close}
        aria-label="Закрыть"
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-mute transition-colors duration-300 hover:bg-paper hover:text-ink"
      >
        <Icon name="X" size={18} strokeWidth={1.75} />
      </button>

      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A7FFF]/25 text-blue-700">
        <Icon name="AlertCircle" size={20} strokeWidth={1.5} />
      </span>

      <h3 id="exit-hint-title" className="mt-5 font-heading text-2xl font-semibold tracking-[-0.02em] text-ink">
        Уходишь?
      </h3>
      <p className="mt-2 font-body text-[15px] leading-[1.6] text-ink-soft">
        В других школах ты <strong className="font-semibold text-alert">переплатишь</strong> за бензин и пересдачи.
        Останься — узнай реальные цены.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={close}
          className="btn-ghost flex-1 !px-4 !py-3 border-paper-line text-sm text-ink-soft hover:border-ink/30 hover:text-ink"
        >
          Остаюсь
        </button>
        <button onClick={scrollToPricing} className="btn-primary flex-1 !px-4 !py-3 text-sm">
          Показать цены
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
