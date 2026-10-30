import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Icon from '@/components/ui/icon';
import LeadForm from './LeadForm';

type LeadOptions = { title?: string; subtitle?: string; source?: string };

const LeadCtx = createContext<(opts?: LeadOptions) => void>(() => {});

export const useLeadModal = () => useContext(LeadCtx);

const DEFAULT_TITLE = 'Оставьте телефон — мы перезвоним через 20 минут';

export const LeadModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<LeadOptions>({});
  const [formKey, setFormKey] = useState(0);

  const openLead = useCallback((o: LeadOptions = {}) => {
    setOpts(o);
    setFormKey((k) => k + 1);
    setOpen(true);
  }, []);

  return (
    <LeadCtx.Provider value={openLead}>
      {children}
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-night/55 backdrop-blur-[6px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:duration-500 data-[state=closed]:duration-300" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              const el = (e.currentTarget as HTMLElement | null)?.querySelector<HTMLInputElement>('input[type="text"]');
              if (el && window.matchMedia('(hover: hover)').matches) el.focus();
            }}
            className="fixed inset-x-0 bottom-0 z-[101] max-h-[92svh] overflow-y-auto rounded-t-[24px] border border-white/10 bg-night p-6 pb-[max(24px,env(safe-area-inset-bottom))] text-white shadow-[0_-24px_64px_-24px_rgba(0,0,0,0.6)] outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(640px,calc(100vw-48px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-card sm:p-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-8 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:duration-500 data-[state=closed]:duration-300 sm:data-[state=open]:slide-in-from-bottom-4"
            style={{ animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]" aria-hidden="true">
              <div className="grid-lines absolute inset-0" />
              <div className="glow -right-24 -top-24 h-[280px] w-[360px] bg-[#2A7FFF]/25" />
            </div>

            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/20 sm:hidden" aria-hidden="true" />

            <DialogPrimitive.Close
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-night-mute transition-colors duration-300 hover:bg-white/10 hover:text-white sm:right-5 sm:top-5"
              aria-label="Закрыть"
            >
              <Icon name="X" size={20} strokeWidth={1.75} />
            </DialogPrimitive.Close>

            <span className="eyebrow text-[#4DA8FF]">Заявка</span>
            <DialogPrimitive.Title className="mt-4 pr-10 font-heading text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[34px]">
              {opts.title || DEFAULT_TITLE}
            </DialogPrimitive.Title>
            {opts.subtitle && (
              <p className="mt-3 font-body text-[15px] leading-[1.6] text-night-text">{opts.subtitle}</p>
            )}

            <div className="mt-8">
              <LeadForm key={formKey} source={opts.source} idPrefix="lm" />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </LeadCtx.Provider>
  );
};
