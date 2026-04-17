import { useEffect, useRef, useCallback } from 'react';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import PainPoints from '@/components/sections/PainPoints';
import Instructors from '@/components/sections/Instructors';
import Triggers from '@/components/sections/Triggers';
import Advantages from '@/components/sections/Advantages';
import Pricing from '@/components/sections/Pricing';
import Reviews from '@/components/sections/Reviews';
import MapSection from '@/components/sections/MapSection';
import ContactForm from '@/components/sections/ContactForm';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import DrivingCar from '@/components/driving-car/DrivingCar';

const SECTION_IDS = ['hero', 'pain-points', 'instructors', 'triggers', 'advantages', 'pricing', 'reviews', 'map', 'faq', 'contact-form'];

const Index = () => {
  const faqOpenRef = useRef<((idx: number) => void) | null>(null);

  // Пробрасываем функцию открытия FAQ-вопроса из машинки
  const handleFaqOpen = useCallback((idx: number) => {
    faqOpenRef.current?.(idx);
    // Скроллим к FAQ
    const el = document.getElementById('faq');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll, .animate-from-left');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main className="relative" style={{ paddingTop: '68px' }}>
        <div className="relative">
          {/* Дорожка с машинкой — правая сторона */}
          <DrivingCar sectionIds={SECTION_IDS} onFaqOpen={handleFaqOpen} />

          {/* Контент с отступом справа для дорожки (fixed) */}
          <div className="lg:pr-24">
            <Hero />
            <PainPoints />
            <Instructors />
            <Triggers />
            <Advantages />
            <Pricing />
            <Reviews />
            <FAQ registerOpen={(fn) => { faqOpenRef.current = fn; }} />
            <MapSection />
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
