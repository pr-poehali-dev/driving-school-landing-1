import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  style?: CSSProperties;
  value: string | number;
  duration?: number;
  className?: string;
};

const formatLike = (n: number, sample: string) =>
  /\s/.test(sample) || n >= 10000 ? n.toLocaleString('ru-RU').replace(/\u00a0/g, ' ') : String(n);

const CountUp = ({ value, duration = 1200, className = '', style }: Props) => {
  const raw = String(value);
  const target = parseInt(raw.replace(/\D/g, ''), 10);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(raw);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) setDisplay(formatLike(0, raw));

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 5);
          setDisplay(formatLike(Math.round(target * eased), raw));
          if (t < 1) frame = requestAnimationFrame(tick);
          else setDisplay(raw);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, raw, duration]);

  return (
    <span ref={ref} className={`num ${className}`} style={style} aria-label={raw}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
};

export default CountUp;