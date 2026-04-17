import { useEffect, useRef, useState, useCallback } from 'react';

interface DrivingCarProps {
  sectionIds: string[];
}

// Знаки вдоль дороги (pos = 0..1 от начала до конца скролла)
const ROAD_SIGNS = [
  { pos: 0.06,  type: 'traffic-light', label: 'Светофор' },
  { pos: 0.17,  type: 'yield',         label: 'Уступи дорогу' },
  { pos: 0.27,  type: 'main-road',     label: 'Главная дорога' },
  { pos: 0.38,  type: 'no-entry',      label: 'Въезд запрещён' },
  { pos: 0.49,  type: 'pedestrian',    label: 'Пешеходный переход' },
  { pos: 0.60,  type: 'no-stop',       label: 'Остановка запрещена' },
  { pos: 0.71,  type: 'parking',       label: 'Парковка' },
  { pos: 0.82,  type: 'intersection',  label: 'Перекрёсток' },
  { pos: 0.93,  type: 'traffic-light', label: 'Светофор' },
];

// Путь (горизонтальные смещения машинки) — повороты
const PATH = [
  { pos: 0.00, x: 24 },
  { pos: 0.12, x: 24 },
  { pos: 0.20, x: 44 },
  { pos: 0.28, x: 24 },
  { pos: 0.36, x: 10 },
  { pos: 0.44, x: 24 },
  { pos: 0.52, x: 44 },
  { pos: 0.60, x: 24 },
  { pos: 0.68, x: 10 },
  { pos: 0.76, x: 24 },
  { pos: 0.84, x: 44 },
  { pos: 0.92, x: 24 },
  { pos: 1.00, x: 24 },
];

function lerpX(pos: number) {
  for (let i = 0; i < PATH.length - 1; i++) {
    const a = PATH[i], b = PATH[i + 1];
    if (pos >= a.pos && pos <= b.pos) {
      const t = (pos - a.pos) / (b.pos - a.pos);
      return a.x + (b.x - a.x) * t;
    }
  }
  return 24;
}

function lerpRot(pos: number) {
  const d = 0.015;
  const dx = lerpX(Math.min(1, pos + d)) - lerpX(Math.max(0, pos - d));
  return Math.max(-30, Math.min(30, dx * 4.5));
}

// ─── SVG знаки ───────────────────────────────────────
const TrafficLight = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 46" width="24" height="46">
    <rect x="4" y="1" width="16" height="34" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
    <circle cx="12" cy="8"  r="5" fill={active ? '#ef4444' : '#4b0000'}/>
    <circle cx="12" cy="18" r="5" fill={active ? '#f59e0b' : '#451a03'}/>
    <circle cx="12" cy="28" r="5" fill={active ? '#22c55e' : '#052e16'}/>
    <rect x="11" y="35" width="2" height="9" fill="#555"/>
    <rect x="7"  y="42" width="10" height="2.5" rx="1" fill="#555"/>
  </svg>
);
const Yield = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 28 46" width="28" height="46">
    <polygon points="14,3 27,24 1,24" fill="white" stroke={active ? '#e11d48' : '#881337'} strokeWidth="2.5"/>
    <polygon points="14,9 23,23 5,23"  fill="white" stroke={active ? '#e11d48' : '#881337'} strokeWidth="1.5"/>
    <text x="14" y="20" textAnchor="middle" fontSize="6" fontWeight="bold" fill={active ? '#e11d48' : '#881337'}>УД</text>
    <rect x="13" y="27" width="2" height="16" fill="#555"/>
    <rect x="9"  y="41" width="10" height="2.5" rx="1" fill="#555"/>
  </svg>
);
const MainRoad = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 28 46" width="28" height="46">
    <rect x="5" y="2" width="18" height="18" rx="2" fill={active ? '#f59e0b' : '#78350f'} transform="rotate(45 14 11)"/>
    <rect x="13" y="27" width="2" height="16" fill="#555"/>
    <rect x="9"  y="41" width="10" height="2.5" rx="1" fill="#555"/>
  </svg>
);
const NoEntry = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 28 46" width="28" height="46">
    <circle cx="14" cy="13" r="12" fill={active ? '#ef4444' : '#7f1d1d'} stroke="#450a0a" strokeWidth="1"/>
    <rect x="5" y="10" width="18" height="6" rx="2" fill="white"/>
    <rect x="13" y="27" width="2" height="16" fill="#555"/>
    <rect x="9"  y="41" width="10" height="2.5" rx="1" fill="#555"/>
  </svg>
);
const Pedestrian = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 28 46" width="28" height="46">
    <rect x="2" y="2" width="24" height="22" rx="3" fill={active ? '#3b82f6' : '#1e3a8a'} stroke="#1d4ed8" strokeWidth="1"/>
    <circle cx="14" cy="8"  r="3"   fill="white"/>
    <line x1="14" y1="11" x2="14" y2="19" stroke="white" strokeWidth="2.5"/>
    <line x1="8"  y1="14" x2="20" y2="14" stroke="white" strokeWidth="2.5"/>
    <line x1="14" y1="19" x2="9"  y2="24" stroke="white" strokeWidth="2"/>
    <line x1="14" y1="19" x2="19" y2="24" stroke="white" strokeWidth="2"/>
    <rect x="13" y="27" width="2" height="16" fill="#555"/>
    <rect x="9"  y="41" width="10" height="2.5" rx="1" fill="#555"/>
  </svg>
);
const NoStop = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 28 46" width="28" height="46">
    <circle cx="14" cy="13" r="12" fill="white" stroke={active ? '#ef4444' : '#7f1d1d'} strokeWidth="3"/>
    <line x1="4" y1="3" x2="24" y2="23" stroke={active ? '#ef4444' : '#7f1d1d'} strokeWidth="3.5"/>
    <rect x="13" y="27" width="2" height="16" fill="#555"/>
    <rect x="9"  y="41" width="10" height="2.5" rx="1" fill="#555"/>
  </svg>
);
const ParkingSign = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 28 46" width="28" height="46">
    <rect x="2" y="2" width="24" height="22" rx="3" fill={active ? '#3b82f6' : '#1e3a8a'} stroke="#1d4ed8" strokeWidth="1"/>
    <text x="14" y="20" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">P</text>
    <rect x="13" y="27" width="2" height="16" fill="#555"/>
    <rect x="9"  y="41" width="10" height="2.5" rx="1" fill="#555"/>
  </svg>
);
const Crossroad = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 28 46" width="28" height="46">
    <rect x="2" y="2" width="24" height="22" rx="3" fill="white" stroke={active ? '#f59e0b' : '#78350f'} strokeWidth="2.5"/>
    <rect x="11" y="5"  width="6" height="16" rx="1" fill={active ? '#f59e0b' : '#78350f'}/>
    <rect x="5"  y="10" width="18" height="6"  rx="1" fill={active ? '#f59e0b' : '#78350f'}/>
    <rect x="13" y="27" width="2" height="16" fill="#555"/>
    <rect x="9"  y="41" width="10" height="2.5" rx="1" fill="#555"/>
  </svg>
);

const SIGN_MAP: Record<string, React.FC<{ active: boolean }>> = {
  'traffic-light': TrafficLight,
  'yield':         Yield,
  'main-road':     MainRoad,
  'no-entry':      NoEntry,
  'pedestrian':    Pedestrian,
  'no-stop':       NoStop,
  'parking':       ParkingSign,
  'intersection':  Crossroad,
};

// ─── Машинка (синяя, вид сверху) ─────────────────────
const Car = ({ rot, brake, hazard, turning }: {
  rot: number; brake: boolean; hazard: boolean; turning: boolean;
}) => {
  const blink = hazard || turning;
  return (
    <div style={{ transform: `rotate(${rot}deg)`, transition: 'transform 0.25s ease', width: 36, height: 60 }}>
      <svg viewBox="0 0 36 60" width="36" height="60">
        <ellipse cx="18" cy="57" rx="12" ry="3" fill="rgba(0,0,0,0.18)"/>
        <rect x="3" y="10" width="30" height="42" rx="8" fill="#5b9bd5"/>
        <path d="M6 10 Q18 1 30 10" fill="#4a88c5"/>
        <rect x="7" y="16" width="22" height="22" rx="5" fill="#1a3356"/>
        <rect x="9" y="18" width="18" height="9" rx="2" fill="#7ec8e3" opacity="0.9"/>
        <rect x="9" y="28" width="18" height="7" rx="2" fill="#7ec8e3" opacity="0.7"/>
        <line x1="18" y1="10" x2="18" y2="52" stroke="#4a88c5" strokeWidth="0.8" opacity="0.4"/>
        {/* Фары */}
        <ellipse cx="9"  cy="7" rx="4" ry="2.5" fill="#fffde7" opacity="0.95"/>
        <ellipse cx="27" cy="7" rx="4" ry="2.5" fill="#fffde7" opacity="0.95"/>
        {/* Стоп-сигналы */}
        <rect x="4"  y="49" width="8" height="5" rx="2"
          fill={brake ? '#ef4444' : '#7f1d1d'}
          style={brake ? { animation: 'blink-brake 0.4s ease-in-out infinite' } : {}}/>
        <rect x="24" y="49" width="8" height="5" rx="2"
          fill={brake ? '#ef4444' : '#7f1d1d'}
          style={brake ? { animation: 'blink-brake 0.4s ease-in-out infinite' } : {}}/>
        {/* Поворотники */}
        <rect x="2"  y="46" width="5" height="4" rx="1.5"
          fill={blink ? '#fbbf24' : 'transparent'}
          style={blink ? { animation: 'blink-turn 0.5s ease-in-out infinite' } : {}}/>
        <rect x="29" y="46" width="5" height="4" rx="1.5"
          fill={blink ? '#fbbf24' : 'transparent'}
          style={blink ? { animation: 'blink-turn 0.5s ease-in-out infinite' } : {}}/>
        {/* Колёса */}
        <rect x="0"  y="14" width="5" height="13" rx="2.5" fill="#111"/>
        <rect x="31" y="14" width="5" height="13" rx="2.5" fill="#111"/>
        <rect x="0"  y="35" width="5" height="13" rx="2.5" fill="#111"/>
        <rect x="31" y="35" width="5" height="13" rx="2.5" fill="#111"/>
        <circle cx="2.5"  cy="20.5" r="2" fill="#999"/>
        <circle cx="33.5" cy="20.5" r="2" fill="#999"/>
        <circle cx="2.5"  cy="41.5" r="2" fill="#999"/>
        <circle cx="33.5" cy="41.5" r="2" fill="#999"/>
        {/* Зеркала */}
        <rect x="-2" y="18" width="5" height="9" rx="2" fill="#3a78b5"/>
        <rect x="33" y="18" width="5" height="9" rx="2" fill="#3a78b5"/>
      </svg>
    </div>
  );
};

// ─── Главный компонент ───────────────────────────────
const ROAD_W = 84;

const DrivingCar = ({ sectionIds: _ }: DrivingCarProps) => {
  const [scrollPct, setScrollPct]   = useState(0);
  const [carState, setCarState]     = useState<'driving'|'braking'|'stopped'|'hazard'|'turning'>('hazard');
  const [activeSign, setActiveSign] = useState<number | null>(null);
  const [vh, setVh]                 = useState(window.innerHeight);

  const stateRef = useRef(carState);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY    = useRef(0);

  useEffect(() => { stateRef.current = carState; }, [carState]);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  // Старт — аварийка → едем
  useEffect(() => {
    const t = setTimeout(() => setCarState('driving'), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? Math.min(1, window.scrollY / docH) : 0;
      setScrollPct(pct);

      const delta = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      const cur = stateRef.current;

      // Быстрый скролл
      if (Math.abs(delta) > 110) {
        clearTimer();
        setCarState('hazard');
        setActiveSign(null);
        timerRef.current = setTimeout(() => setCarState('driving'), 1100);
        return;
      }

      // Знак рядом
      let hit = false;
      ROAD_SIGNS.forEach((sign, idx) => {
        if (Math.abs(pct - sign.pos) < 0.024) {
          hit = true;
          setActiveSign(idx);
          if (cur !== 'braking' && cur !== 'stopped') {
            clearTimer();
            setCarState('braking');
            timerRef.current = setTimeout(() => {
              setCarState('stopped');
              timerRef.current = setTimeout(() => {
                setActiveSign(null);
                setCarState('driving');
              }, 900);
            }, 550);
          }
        }
      });

      if (!hit && cur === 'driving') setActiveSign(null);

      // Поворот
      if (!hit && cur === 'driving') {
        const isTurn = PATH.some(pt =>
          Math.abs(pct - pt.pos) < 0.013 && (pt.x > 36 || pt.x < 16)
        );
        if (isTurn) {
          clearTimer();
          setCarState('turning');
          timerRef.current = setTimeout(() => setCarState('driving'), 850);
        }
      }

      if (pct >= 0.99) setCarState('stopped');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [clearTimer]);

  // Машинка: Y в viewport = 15%..85% высоты экрана, плавно следует за скроллом
  const carViewY = vh * 0.15 + scrollPct * vh * 0.70;
  const carX     = lerpX(scrollPct);
  const carRot   = lerpRot(scrollPct);

  // Знаки: их viewport Y = та же формула, но с их pos
  // Они нарисованы прямо на fixed-полосе относительно viewport
  const signPositions = ROAD_SIGNS.map(s => ({
    ...s,
    vy: vh * 0.15 + s.pos * vh * 0.70,
  }));

  return (
    <>
      <style>{`
        @keyframes blink-turn  { 0%,100%{opacity:1}50%{opacity:0.08} }
        @keyframes blink-brake { 0%,100%{opacity:1}50%{opacity:0.3}  }
        @keyframes sign-pop    { 0%,100%{transform:scale(1)translateY(0)}50%{transform:scale(1.18)translateY(-2px)} }
      `}</style>

      {/* Дорожка — fixed, всегда справа */}
      <div className="hidden lg:block" style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: ROAD_W,
        zIndex: 40,
        pointerEvents: 'none',
        background: `
          repeating-linear-gradient(transparent,transparent 3px,rgba(255,255,255,0.03) 3px,rgba(255,255,255,0.03) 4px),
          repeating-linear-gradient(90deg,transparent,transparent 5px,rgba(255,255,255,0.02) 5px,rgba(255,255,255,0.02) 6px),
          linear-gradient(to right,#353535 0%,#464646 35%,#464646 65%,#353535 100%)
        `,
      }}>
        {/* Левая разметка */}
        <div style={{ position:'absolute',left:5,top:0,bottom:0,width:2,
          background:'repeating-linear-gradient(to bottom,#d4d4d4 0,#d4d4d4 14px,transparent 14px,transparent 28px)',
          opacity:0.4 }}/>
        {/* Правая разметка */}
        <div style={{ position:'absolute',right:5,top:0,bottom:0,width:2,
          background:'repeating-linear-gradient(to bottom,#d4d4d4 0,#d4d4d4 14px,transparent 14px,transparent 28px)',
          opacity:0.4 }}/>
        {/* Осевая жёлтая */}
        <div style={{ position:'absolute',left:'50%',top:0,bottom:0,width:2,transform:'translateX(-50%)',
          background:'repeating-linear-gradient(to bottom,#facc15 0,#facc15 12px,transparent 12px,transparent 24px)',
          opacity:0.55 }}/>

        {/* Дорожные знаки */}
        {signPositions.map((sign, idx) => {
          const Comp = SIGN_MAP[sign.type];
          if (!Comp) return null;
          const isActive = activeSign === idx;
          return (
            <div key={idx} style={{
              position: 'absolute',
              top: sign.vy - 46,
              left: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: isActive ? 'sign-pop 0.55s ease-in-out infinite' : 'none',
              zIndex: 50,
            }}>
              <Comp active={isActive} />
              {isActive && (
                <div style={{
                  fontSize: 8, background: '#1e40af', color: '#fff',
                  padding: '1px 5px', borderRadius: 4,
                  whiteSpace: 'nowrap', marginTop: 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}>
                  {sign.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Машинка */}
        <div style={{
          position: 'absolute',
          top: carViewY - 30,
          left: carX,
          transition: 'top 0.1s linear, left 0.2s ease-out',
          zIndex: 60,
        }}>
          <Car
            rot={carRot}
            brake={carState === 'braking' || carState === 'stopped'}
            hazard={carState === 'hazard'}
            turning={carState === 'turning'}
          />
        </div>
      </div>
    </>
  );
};

export default DrivingCar;
