import { useState } from 'react';
import Icon from '@/components/ui/icon';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex-shrink-0 group">
          <img
            src="https://cdn.poehali.dev/files/64d381d9-3aff-47f8-b787-c99612c38c64.png"
            alt="Автошкола Время Рулить"
            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:+79785021113"
            className="flex items-center gap-2 text-brand-dark font-heading text-xl font-semibold hover:text-brand-blue transition-colors group"
            title="Позвоните нам — ответим на любые вопросы"
          >
            <Icon name="Phone" size={20} className="text-brand-blue" />
            <span className="group-hover:underline">+7 978 502 11 13</span>
          </a>
          <button
            onClick={scrollToForm}
            className="bg-brand-blue text-white px-6 py-3 rounded-xl font-heading font-semibold text-base hover:bg-blue-600 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Записаться на консультацию
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-brand-dark"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <a
            href="tel:+79785021113"
            className="flex items-center gap-2 text-brand-dark font-heading text-lg font-semibold"
          >
            <Icon name="Phone" size={18} className="text-brand-blue" />
            +7 978 502 11 13
          </a>
          <button
            onClick={scrollToForm}
            className="bg-brand-blue text-white px-6 py-3 rounded-xl font-heading font-semibold text-base w-full"
          >
            Записаться на консультацию
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
