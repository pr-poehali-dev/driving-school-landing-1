import { useEffect, useState } from 'react';
import { useSection } from '@/hooks/useContent';
import { useParallax } from '@/hooks/useMotion';
import Icon from '@/components/ui/icon';

const LINES: Array<{ text: string; accent?: boolean }> = [
  { text: 'АВТОШКОЛА,' },
  { text: 'КОТОРУЮ СОЗДАЛИ', accent: true },
  { text: 'ИНСТРУКТОРЫ,' },
  { text: 'А НЕ МАРКЕТОЛОГИ', accent: true },
];

const Hero = () => {
  const data = useSection('hero', {
    subheading: 'Хватит покупать обещания. Мы учим только тому, что работает. Выбирайте опыт, а не слова.',
    banner_image: 'https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg',
    cta_button: 'НАЧАТЬ ДВИЖЕНИЕ',
  });
  const bannerRef = useParallax<HTMLImageElement>(0.06, 48);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const show = (i: number) => ({
    className: `transition-[opacity,transform] duration-700 ease-quint motion-reduce:transform-none ${
      ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`,
    style: { transitionDelay: `${120 + i * 90}ms` },
  });

  return (
    <section
      id="hero"
      className="relative isolate w-full overflow-hidden bg-night pt-[76px] text-white md:pt-28"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <img
          ref={bannerRef}
          src={data.banner_image as string}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
          style={{ transform: 'scale(1.06)' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#0A1628_0%,rgba(10,22,40,0.92)_38%,rgba(10,22,40,0.55)_68%,rgba(10,22,40,0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night via-night/70 to-transparent" />
        <div className="grid-lines absolute inset-0" />
        <div className="glow -left-40 top-1/3 h-[420px] w-[520px] bg-[#2A7FFF]/25" />
      </div>

      <div className="wrap relative flex min-h-[calc(100svh-76px)] flex-col justify-end pb-14 pt-16 md:pb-20 md:pt-28 lg:min-h-[760px]">
        <div {...show(0)}>
          <span className="eyebrow text-[#4DA8FF]">Автошкола · Севастополь</span>
        </div>

        <h1 className="h-display mt-6 max-w-[15ch] uppercase md:mt-8">
          {LINES.map((l, i) => (
            <span key={l.text} className="block overflow-hidden pb-[0.06em]">
              <span
                className={`block transition-[opacity,transform] duration-700 ease-quint motion-reduce:transform-none ${
                  ready ? 'translate-y-0 opacity-100' : 'translate-y-[60%] opacity-0'
                } ${l.accent ? 'text-[#4DA8FF]' : 'text-white'}`}
                style={{ transitionDelay: `${200 + i * 90}ms` }}
              >
                {l.text}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-10 md:pt-10">
          <p {...show(5)} className={`${show(5).className} lead max-w-[520px] text-night-text md:col-span-6`}>
            {data.subheading as string}
          </p>

          <div
            {...show(6)}
            className={`${show(6).className} flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end`}
          >
            <button onClick={scrollToForm} className="btn-primary w-full sm:w-auto">
              <span>{data.cta_button as string}</span>
              <Icon name="ArrowRight" size={18} strokeWidth={1.75} />
            </button>
            <a
              href="https://vk.ru/timedrivesev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full border-white/20 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="flex-shrink-0" aria-hidden="true">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.05 14.29h-1.48c-.56 0-.73-.46-1.72-1.47-.87-.84-1.25-.95-1.46-.95-.3 0-.38.08-.38.49v1.34c0 .35-.11.56-1.02.56-1.5 0-3.17-.91-4.35-2.6-1.76-2.48-2.25-4.33-2.25-4.71 0-.22.08-.42.49-.42h1.48c.37 0 .51.17.65.57.72 2.07 1.92 3.88 2.41 3.88.18 0 .27-.08.27-.54V9.98c-.06-1-.58-1.08-.58-1.43 0-.17.14-.35.36-.35h2.33c.31 0 .42.17.42.54v2.9c0 .31.14.42.22.42.18 0 .34-.11.68-.45 1.05-1.18 1.8-3 1.8-3 .1-.22.27-.42.65-.42h1.48c.44 0 .54.23.44.54-.18.86-1.96 3.35-1.96 3.35-.15.26-.21.37 0 .65.15.21.65.65.98 1.04.61.7 1.07 1.28 1.19 1.68.12.4-.09.6-.5.6z" />
              </svg>
              ХОЧУ БЕСПЛАТНОЕ ЗАНЯТИЕ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
