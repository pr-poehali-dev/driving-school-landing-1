import { useEffect } from 'react';
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
import Footer from '@/components/sections/Footer';
import DrivingCar from '@/components/driving-car/DrivingCar';

const SECTION_IDS = ['pain-points', 'instructors', 'triggers', 'advantages', 'pricing', 'reviews', 'map', 'contact-form'];

const Index = () => {
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
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 z-10 hidden lg:block">
            <DrivingCar sectionIds={SECTION_IDS} />
          </div>

          <div className="lg:pl-20">
            <Hero />
            <PainPoints />
            <Instructors />
            <Triggers />
            <Advantages />
            <Pricing />
            <Reviews />
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
