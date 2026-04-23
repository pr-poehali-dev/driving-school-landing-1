import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--header-height', scrolled ? '80px' : '120px');
  }, [scrolled]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)] border-b border-gray-100'
        : 'bg-[#0a1628]/70 backdrop-blur-sm'
    }`}>
      <div className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-20' : 'h-28'}`}>

        {/* Логотип — большой */}
        <a href="/" className="flex-shrink-0">
          <img
            src="https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png"
            alt="Автошкола Время Рулить"
            className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-14' : 'h-24'}`}
            style={{ maxWidth: scrolled ? '180px' : '280px' }}
          />
        </a>

        {/* Навигация */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className={`font-body text-sm font-medium transition-colors duration-200 hover:text-blue-400 ${
                scrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Адрес + телефон + CTA */}
        <div className="hidden md:flex items-end gap-5">
          <div className="flex flex-col items-end gap-1">
            {/* Адрес над телефоном */}
            {!scrolled && (
              <span className="text-blue-300 text-xs font-body flex items-center gap-1.5">
                <Icon name="MapPin" size={12} className="text-blue-400" />
                Севастополь · ул. Хрусталева, 177А
              </span>
            )}
            <a
              href="tel:+79785021113"
              className={`font-heading font-bold text-base transition-colors duration-200 hover:text-blue-400 flex items-center gap-2 ${
                scrolled ? 'text-[#1A2A3A]' : 'text-white'
              }`}
            >
              <Icon name="Phone" size={16} className="text-blue-500" />
              +7 978 502 11 13
            </a>
          </div>
          <button
            onClick={() => scrollTo('contact-form')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 font-heading font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:scale-[1.03]"
            style={{ borderRadius: 6 }}
          >
            ЗАПИСАТЬСЯ
          </button>
        </div>

        {/* Бургер */}
        <button
          className={`lg:hidden p-1.5 ${scrolled ? 'text-[#1A2A3A]' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4 shadow-lg">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-left text-gray-700 font-body font-medium hover:text-blue-500 transition-colors py-1"
            >
              {n.label}
            </button>
          ))}
          <hr className="border-gray-100" />
          <span className="text-blue-500 text-xs font-body flex items-center gap-1.5">
            <Icon name="MapPin" size={12} />
            Севастополь · ул. Хрусталева, 177А
          </span>
          <a href="tel:+79785021113" className="flex items-center gap-2 font-heading font-bold text-[#1A2A3A]">
            <Icon name="Phone" size={16} className="text-blue-500" />
            +7 978 502 11 13
          </a>
          <button
            onClick={() => scrollTo('contact-form')}
            className="bg-blue-500 text-white py-3 font-heading font-bold text-sm tracking-wide rounded-lg w-full"
          >
            ЗАПИСАТЬСЯ
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
