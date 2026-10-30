import { useEffect, useRef, useState } from 'react';
import Car, { CAR_H, CAR_W, type CarLights } from './Car';
import { RoadSignView, type LightPhase, type SignKind } from './Signs';

const ROAD_W = 96;
const VERGE_W = 28;
const LANE_X = VERGE_W + (ROAD_W - VERGE_W) / 4 - CAR_W / 2;
const CAR_VIEW_Y = 0.58;

const ROUTE: Array<{ anchor: string; offset: number; kind: SignKind }> = [
  { anchor: 'pain-points', offset: 140, kind: 'traffic-light' },
  { anchor: 'instructors', offset: 160, kind: 'speed' },
  { anchor: 'advantages', offset: 200, kind: 'roadworks' },
  { anchor: 'pricing', offset: 240, kind: 'fuel' },
  { anchor: 'map', offset: 160, kind: 'parking' },
  { anchor: 'contact-form', offset: 260, kind: 'stop' },
];

type Placed = { kind: SignKind; y: number };

interface DrivingCarProps {
  sectionIds?: string[];
  onFaqOpen?: (idx: number) => void;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const DrivingCar = (_props: DrivingCarProps) => {
  const [signs, setSigns] = useState<Placed[]>([]);
  const [lights, setLights] = useState<CarLights>({ brake: false, hazard: true, signalLeft: false, signalRight: false });
  const [phase, setPhase] = useState<LightPhase>('red');

  const worldRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const signsRef = useRef<Placed[]>([]);
  const lightsRef = useRef(lights);
  const phaseRef = useRef(phase);

  useEffect(() => {
    let pending = 0;
    const measure = () => {
      pending = 0;
      const y = window.scrollY;
      const placed = ROUTE.flatMap(r => {
        const el = document.getElementById(r.anchor);
        if (!el) return [];
        return [{ kind: r.kind, y: Math.round(el.getBoundingClientRect().top + y + r.offset) }];
      });
      const same =
        placed.length === signsRef.current.length &&
        placed.every((p, i) => p.y === signsRef.current[i].y);
      if (same) return;
      signsRef.current = placed;
      setSigns(placed);
    };
    const schedule = () => {
      if (!pending) pending = requestAnimationFrame(measure);
    };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    window.addEventListener('resize', schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', schedule);
      if (pending) cancelAnimationFrame(pending);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let lastScroll = window.scrollY;
    let velocity = 0;
    let sway = 0;
    let idleFrames = 0;
    let stillFrames = 0;

    const commitLights = (next: CarLights) => {
      const prev = lightsRef.current;
      if (
        prev.brake !== next.brake || prev.hazard !== next.hazard ||
        prev.signalLeft !== next.signalLeft || prev.signalRight !== next.signalRight
      ) {
        lightsRef.current = next;
        setLights(next);
      }
    };

    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const rawV = y - lastScroll;
      lastScroll = y;
      velocity = lerp(velocity, rawV, 0.18);

      if (worldRef.current) worldRef.current.style.transform = `translate3d(0, ${-y}px, 0)`;
      if (roadRef.current) roadRef.current.style.backgroundPositionY = `0, 0, ${-y}px, 0, ${-y}px`;

      const targetSway = reduced ? 0 : clamp(velocity * 0.05, -2.5, 2.5);
      sway = lerp(sway, targetSway, 0.07);
      if (carRef.current) {
        carRef.current.style.transform = `translate3d(${sway.toFixed(2)}px, 0, 0) rotate(${(sway * 0.8).toFixed(2)}deg)`;
      }

      const carWorldY = y + vh * CAR_VIEW_Y;
      const ahead = (kind: SignKind, range: number) =>
        signsRef.current.some(s => s.kind === kind && s.y - carWorldY > -40 && s.y - carWorldY < range);

      let nextPhase: LightPhase = 'green';
      const tl = signsRef.current.find(s => s.kind === 'traffic-light');
      if (tl) {
        const d = tl.y - carWorldY;
        nextPhase = d > 260 ? 'red' : d > 60 ? 'yellow' : 'green';
      }
      if (nextPhase !== phaseRef.current) {
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
      }

      stillFrames = Math.abs(rawV) < 0.5 ? stillFrames + 1 : 0;
      const nearStop = ahead('stop', 220) || (ahead('traffic-light', 260) && nextPhase !== 'green');

      commitLights({
        hazard: y < 24,
        brake: y >= 24 && (nearStop || (stillFrames > 3 && stillFrames < 50)),
        signalLeft: ahead('parking', 320) || ahead('fuel', 260),
        signalRight: false,
      });

      const settled = Math.abs(velocity) < 0.05 && Math.abs(sway) < 0.02;
      idleFrames = settled ? idleFrames + 1 : 0;
      if (idleFrames < 60) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      idleFrames = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    kick();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block"
      style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: ROAD_W,
        zIndex: 40, pointerEvents: 'none', overflow: 'hidden', contain: 'strict',
      }}
    >
      <style>{`@keyframes dc-blink{0%{opacity:1}50%{opacity:.15}}`}</style>

      <div
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: VERGE_W,
          background: 'linear-gradient(90deg,#E9E6DE 0%,#DCD8CD 70%,#BFBAAE 100%)',
        }}
      />

      <div
        ref={roadRef}
        style={{
          position: 'absolute', top: 0, bottom: 0, left: VERGE_W, right: 0,
          backgroundColor: '#2E3236',
          backgroundImage: [
            'linear-gradient(90deg,#F2F2EE 0,#F2F2EE 2px,transparent 2px)',
            'linear-gradient(270deg,#F2F2EE 0,#F2F2EE 2px,transparent 2px)',
            'repeating-linear-gradient(180deg,#F2F2EE 0,#F2F2EE 34px,transparent 34px,transparent 72px)',
            'linear-gradient(90deg,rgba(0,0,0,.18) 0%,transparent 18%,transparent 82%,rgba(0,0,0,.22) 100%)',
            'radial-gradient(rgba(255,255,255,.035) 1px,transparent 1.2px)',
          ].join(','),
          backgroundSize: '100% 100%, 100% 100%, 2px 72px, 100% 100%, 5px 5px',
          backgroundPositionX: '0, 0, center, 0, 0',
          backgroundRepeat: 'no-repeat, no-repeat, repeat-y, no-repeat, repeat',
        }}
      />

      <div ref={worldRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, willChange: 'transform' }}>
        {signs.map(s => (
          <div
            key={`${s.kind}-${s.y}`}
            style={{ position: 'absolute', top: s.y, left: VERGE_W / 2, transform: 'translate(-50%, -100%)' }}
          >
            <RoadSignView kind={s.kind} phase={phase} />
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', left: LANE_X, top: `calc(${CAR_VIEW_Y * 100}% - ${CAR_H / 2}px)` }}>
        <div ref={carRef} style={{ willChange: 'transform', transformOrigin: '50% 30%' }}>
          <Car {...lights} />
        </div>
      </div>
    </div>
  );
};

export default DrivingCar;
