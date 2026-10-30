import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useLeadModal } from '@/components/lead/LeadModal';

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById('contact-form');
    let pastHero = false;
    let formInView = false;
    const update = () => setVisible(pastHero && !formInView);

    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.6;
      if (next !== pastHero) {
        pastHero = next;
        update();
      }
    };

    const io = form
      ? new IntersectionObserver(([e]) => {
          formInView = e.isIntersecting;
          update();
        }, { threshold: 0.05 })
      : null;
    if (form && io) io.observe(form);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  const openLead = useLeadModal();
  const scrollToForm = () => openLead({ source: 'мобильная кнопка' });

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 transition-[opacity,transform] duration-500 ease-quint md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <button
        onClick={scrollToForm}
        tabIndex={visible ? 0 : -1}
        className="btn-primary w-full !py-4 shadow-[0_16px_32px_-12px_rgba(10,22,40,0.55)]"
      >
        <Icon name="Phone" size={18} strokeWidth={1.75} />
        Оставить телефон
      </button>
    </div>
  );
};

export default StickyMobileCTA;
