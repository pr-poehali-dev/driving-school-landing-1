import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const ExitIntentPopup = () => {
  const [visible, setVisible] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !shown.current) {
        shown.current = true;
        setVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!visible) return null;

  const scrollToForm = () => {
    setVisible(false);
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const scrollToPricing = () => {
    setVisible(false);
    setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Оверлей */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Карточка */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Иконка */}
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-5">
          <Icon name="AlertCircle" size={28} className="text-blue-500" />
        </div>

        <h3 className="font-heading font-bold text-[#1A2A3A] text-2xl mb-3 leading-tight">
          Уходишь?
        </h3>
        <p className="text-gray-500 leading-relaxed mb-6">
          В других школах ты переплатишь <strong className="text-red-500">20 000 ₽</strong> за бензин и пересдачи.
          Останься — узнай реальные цены.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setVisible(false)}
            className="flex-1 border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500 py-3 font-heading font-bold text-sm tracking-wide rounded-xl transition-all duration-200"
          >
            Остаюсь
          </button>
          <button
            onClick={scrollToPricing}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 font-heading font-bold text-sm tracking-wide rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(42,127,255,0.4)]"
          >
            Показать цены
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
