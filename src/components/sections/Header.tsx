import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { useSection } from '@/hooks/useContent';
import { useLeadModal } from '@/components/lead/LeadModal';

const NAV = [
  { label: 'О нас',        id: 'instructors' },
  { label: 'Преимущества', id: 'advantages'  },
  { label: 'Стоимость',    id: 'pricing'     },
  { label: 'Отзывы',       id: 'reviews'     },
  { label: 'Контакты',     id: 'map'         },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const data = useSection('header', {
    phone: '+7 978 502 11 13',
    address: 'Севастополь · ул. Хрусталева, 177А',
    logo_url: 'https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png',
  });
  const phone = data.phone as string;
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    document.documentElement.style.setProperty(
      '--header-height',
      scrolled ? (isMobile ? '64px' : '76px') : (isMobile ? '76px' : '112px')
    );
  }, [scrolled]);

  const openLead = useLeadModal();
  const openForm = () => {
    setMenuOpen(false);
    openLead({ source: 'шапка: записаться' });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-quint border-b ${
        scrolled || menuOpen
          ? 'bg-[#F6F5F1]/80 backdrop-blur-xl backdrop-saturate-150 border-paper-line shadow-[0_8px_32px_-20px_rgba(10,22,40,0.35)]'
          : 'bg-[#F6F5F1] border-transparent'
      }`}
    >
      <div
        className={`wrap flex items-center justify-between transition-[height] duration-500 ease-quint ${
          scrolled ? 'h-16 md:h-[76px]' : 'h-[76px] md:h-28'
        }`}
      >
        <a href="/" className="flex-shrink-0" aria-label="Время Рулить — на главную">
          <img
            src={data.logo_url as string}
            alt="Автошкола Время Рулить"
            className={`w-auto object-contain transition-[height] duration-500 ease-quint ${
              scrolled ? 'h-11 md:h-14' : 'h-14 md:h-24'
            }`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Основная навигация">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="link-underline pb-0.5 font-body text-[15px] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col items-end gap-0.5">
            <span className="flex items-center gap-1.5 font-body text-xs text-ink-mute">
              <Icon name="MapPin" size={12} strokeWidth={1.5} className="text-brand-blue" />
              {data.address as string}
            </span>
            <a
              href={phoneHref}
              className="flex items-center gap-2 font-heading text-[17px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 hover:text-blue-700"
            >
              {phone}
            </a>
          </div>
          <button onClick={openForm} className="btn-primary !px-6 !py-3 text-sm">
            <span>Записаться</span>
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <a
            href={phoneHref}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-paper-line bg-white/70 px-4 font-heading text-sm font-semibold text-ink"
          >
            <Icon name="Phone" size={15} strokeWidth={1.75} className="text-blue-700" />
            <span className="hidden sm:inline">{phone}</span>
            <span className="sm:hidden">Позвонить</span>
          </a>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-500 ease-quint ${
          menuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <div className="wrap flex flex-col pb-6 pt-2">
            {NAV.map(n => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="border-b border-paper-line py-4 text-left font-heading text-xl font-semibold tracking-[-0.02em] text-ink"
              >
                {n.label}
              </button>
            ))}
            <span className="mt-5 flex items-center gap-1.5 font-body text-sm text-ink-mute">
              <Icon name="MapPin" size={14} strokeWidth={1.5} className="text-brand-blue" />
              {data.address as string}
            </span>
            <button onClick={openForm} className="btn-primary mt-5 w-full">
              <span>Записаться</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
