import { useEffect, useRef, useState, useCallback } from 'react';

interface DrivingCarProps {
  sectionIds: string[];
}

// Дорожные знаки расставлены равномерно вдоль пути (0..1)
const ROAD_SIGNS = [
  { pos: 0.07,  type: 'traffic-light', label: 'Светофор' },
  { pos: 0.16,  type: 'yield',         label: 'Уступи дорогу' },
  { pos: 0.26,  type: 'main-road',     label: 'Главная дорога' },
  { pos: 0.36,  type: 'no-entry',      label: 'Въезд запрещён' },
  { pos: 0.47,  type: 'pedestrian',    label: 'Пешеходный переход' },
  { pos: 0.58,  type: 'no-stop',       label: 'Остановка запрещена' },
  { pos: 0.69,  type: 'parking',       label: 'Парковка' },
  { pos: 0.80,  type: 'intersection',  label: 'Перекрёсток' },
  { pos: 0.92,  type: 'traffic-light', label: 'Светофор' },
];

// Путь машинки: массив контрольных точек {pos: 0..1, x: px от левого края полосы}
// x меняется, имитируя повороты. Ширина дорожки ~80px, машинка ~36px
const PATH_POINTS = [
  { pos: 0.00, x: 22 },
  { pos: 0.10, x: 22 },
  { pos: 0.18, x: 38 }, // поворот вправо
  { pos: 0.25, x: 22 },
  { pos: 0.33, x: 10 }, // поворот влево
  { pos: 0.40, x: 22 },
  { pos: 0.50, x: 38 }, // поворот вправо
  { pos: 0.58, x: 22 },
  { pos: 0.66, x: 10 }, // влево
  { pos: 0.74, x: 22 },
  { pos: 0.82, x: 38 }, // вправо
  { pos: 0.90, x: 22 },
  { pos: 1.00, x: 22 },
];

function interpolateX(pos: number): number {
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const a = PATH_POINTS[i];
    const b = PATH_POINTS[i + 1];
    if (pos >= a.pos && pos <= b.pos) {
      const t = (pos - a.pos) / (b.pos - a.pos);
      return a.x + (b.x - a.x) * t;
    }
  }
  return 22;
}

function getRotation(pos: number): number {
  const delta = 0.02;
  const x1 = interpolateX(Math.max(0, pos - delta));
  const x2 = interpolateX(Math.min(1, pos + delta));
  const dx = x2 - x1;
  return Math.max(-25, Math.min(25, dx * 5));
}

// SVG знак по типу
const SignSvg = ({ type, active }: { type: string; active: boolean }) => {
  const glow = active ? 'drop-shadow(0 0 4px rgba(59,130,246,0.9))' : 'none';
  switch (type) {
    case 'traffic-light':
      return (
        <svg viewBox="0 0 28 52" width="28" height="52" style={{ filter: glow }}>
          <rect x="6" y="2" width="16" height="40" rx="4" fill="#222" stroke="#444" strokeWidth="1"/>
          <circle cx="14" cy="11" r="5" fill={active ? '#ef4444' : '#7f1d1d'}/>
          <circle cx="14" cy="22" r="5" fill={active ? '#fbbf24' : '#78350f'}/>
          <circle cx="14" cy="33" r="5" fill={active ? '#22c55e' : '#14532d'}/>
          <rect x="12" y="42" width="4" height="8" fill="#555"/>
          <rect x="8" y="48" width="12" height="3" rx="1.5" fill="#555"/>
        </svg>
      );
    case 'yield':
      return (
        <svg viewBox="0 0 32 52" width="32" height="52" style={{ filter: glow }}>
          <polygon points="16,4 30,28 2,28" fill="white" stroke="#e11d48" strokeWidth="3"/>
          <polygon points="16,10 26,26 6,26" fill="white" stroke="#e11d48" strokeWidth="2"/>
          <text x="16" y="22" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#e11d48">УД</text>
          <rect x="14" y="30" width="4" height="18" fill="#555"/>
          <rect x="8" y="46" width="16" height="3" rx="1.5" fill="#555"/>
        </svg>
      );
    case 'main-road':
      return (
        <svg viewBox="0 0 32 52" width="32" height="52" style={{ filter: glow }}>
          <rect x="8" y="4" width="16" height="24" rx="2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" transform="rotate(45 16 16)"/>
          <text x="16" y="20" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">ГД</text>
          <rect x="14" y="30" width="4" height="18" fill="#555"/>
          <rect x="8" y="46" width="16" height="3" rx="1.5" fill="#555"/>
        </svg>
      );
    case 'no-entry':
      return (
        <svg viewBox="0 0 32 52" width="32" height="52" style={{ filter: glow }}>
          <circle cx="16" cy="16" r="13" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5"/>
          <rect x="5" y="13" width="22" height="6" rx="2" fill="white"/>
          <rect x="14" y="30" width="4" height="18" fill="#555"/>
          <rect x="8" y="46" width="16" height="3" rx="1.5" fill="#555"/>
        </svg>
      );
    case 'pedestrian':
      return (
        <svg viewBox="0 0 32 52" width="32" height="52" style={{ filter: glow }}>
          <rect x="3" y="4" width="26" height="24" rx="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
          <circle cx="16" cy="10" r="3" fill="white"/>
          <line x1="16" y1="13" x2="16" y2="22" stroke="white" strokeWidth="2.5"/>
          <line x1="9" y1="16" x2="23" y2="16" stroke="white" strokeWidth="2.5"/>
          <line x1="16" y1="22" x2="11" y2="28" stroke="white" strokeWidth="2.5"/>
          <line x1="16" y1="22" x2="21" y2="28" stroke="white" strokeWidth="2.5"/>
          <rect x="14" y="30" width="4" height="18" fill="#555"/>
          <rect x="8" y="46" width="16" height="3" rx="1.5" fill="#555"/>
        </svg>
      );
    case 'no-stop':
      return (
        <svg viewBox="0 0 32 52" width="32" height="52" style={{ filter: glow }}>
          <circle cx="16" cy="16" r="13" fill="white" stroke="#ef4444" strokeWidth="3"/>
          <line x1="5" y1="5" x2="27" y2="27" stroke="#ef4444" strokeWidth="3.5"/>
          <rect x="14" y="30" width="4" height="18" fill="#555"/>
          <rect x="8" y="46" width="16" height="3" rx="1.5" fill="#555"/>
        </svg>
      );
    case 'parking':
      return (
        <svg viewBox="0 0 32 52" width="32" height="52" style={{ filter: glow }}>
          <rect x="3" y="4" width="26" height="24" rx="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
          <text x="16" y="22" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">P</text>
          <rect x="14" y="30" width="4" height="18" fill="#555"/>
          <rect x="8" y="46" width="16" height="3" rx="1.5" fill="#555"/>
        </svg>
      );
    case 'intersection':
      return (
        <svg viewBox="0 0 32 52" width="32" height="52" style={{ filter: glow }}>
          <rect x="3" y="4" width="26" height="24" rx="3" fill="white" stroke="#f59e0b" strokeWidth="2.5"/>
          <rect x="13" y="7" width="6" height="18" rx="1" fill="#f59e0b"/>
          <rect x="6" y="13" width="20" height="6" rx="1" fill="#f59e0b"/>
          <rect x="14" y="30" width="4" height="18" fill="#555"/>
          <rect x="8" y="46" width="16" height="3" rx="1.5" fill="#555"/>
        </svg>
      );
    default:
      return null;
  }
};

// Синяя машинка вид сверху (по образцу из файла)
const CarTopView = ({ rotation, braking, hazard, turning }: {
  rotation: number; braking: boolean; hazard: boolean; turning: boolean;
}) => {
  const brakeColor = braking ? '#ef4444' : '#7f1d1d';
  const turnColor = turning || hazard ? '#fbbf24' : 'transparent';
  const leftTurn = hazard || turning;
  const rightTurn = hazard || turning;

  return (
    <div style={{
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 0.3s ease',
      width: 36,
      height: 60,
    }}>
      <svg viewBox="0 0 36 60" width="36" height="60" xmlns="http://www.w3.org/2000/svg">
        {/* Тень */}
        <ellipse cx="18" cy="55" rx="13" ry="4" fill="rgba(0,0,0,0.18)"/>
        {/* Корпус */}
        <rect x="4" y="10" width="28" height="40" rx="7" fill="#5b9bd5"/>
        {/* Капот */}
        <path d="M7 10 Q18 2 29 10 Z" fill="#4a88c5"/>
        {/* Крыша */}
        <rect x="8" y="16" width="20" height="20" rx="4" fill="#1e3a5f"/>
        {/* Стёкла */}
        <rect x="10" y="18" width="16" height="8" rx="2" fill="#7ec8e3" opacity="0.9"/>
        <rect x="10" y="28" width="16" height="6" rx="2" fill="#7ec8e3" opacity="0.7"/>
        {/* Фары передние */}
        <ellipse cx="10" cy="8" rx="4" ry="3" fill="#fffde7" opacity="0.95"/>
        <ellipse cx="26" cy="8" rx="4" ry="3" fill="#fffde7" opacity="0.95"/>
        {/* Задние стоп-сигналы */}
        <rect x="5" y="47" width="8" height="5" rx="2" fill={brakeColor} style={braking ? { animation: 'blink-brake 0.4s ease-in-out infinite' } : {}}/>
        <rect x="23" y="47" width="8" height="5" rx="2" fill={brakeColor} style={braking ? { animation: 'blink-brake 0.4s ease-in-out infinite' } : {}}/>
        {/* Поворотники */}
        {leftTurn && <rect x="2" y="44" width="5" height="4" rx="1.5" fill={turnColor} style={{ animation: 'blink-turn 0.5s ease-in-out infinite' }}/>}
        {rightTurn && <rect x="29" y="44" width="5" height="4" rx="1.5" fill={turnColor} style={{ animation: 'blink-turn 0.5s ease-in-out infinite' }}/>}
        {/* Колёса */}
        <rect x="0" y="14" width="5" height="12" rx="2.5" fill="#1a1a2e"/>
        <rect x="31" y="14" width="5" height="12" rx="2.5" fill="#1a1a2e"/>
        <rect x="0" y="34" width="5" height="12" rx="2.5" fill="#1a1a2e"/>
        <rect x="31" y="34" width="5" height="12" rx="2.5" fill="#1a1a2e"/>
        {/* Диски */}
        <circle cx="2.5" cy="20" r="2" fill="#888"/>
        <circle cx="33.5" cy="20" r="2" fill="#888"/>
        <circle cx="2.5" cy="40" r="2" fill="#888"/>
        <circle cx="33.5" cy="40" r="2" fill="#888"/>
        {/* Зеркала */}
        <rect x="-2" y="18" width="5" height="8" rx="2" fill="#3a78b5"/>
        <rect x="33" y="18" width="5" height="8" rx="2" fill="#3a78b5"/>
      </svg>
    </div>
  );
};

const DrivingCar = ({ sectionIds }: DrivingCarProps) => {
  const [scrollPos, setScrollPos] = useState(0); // 0..1
  const [carState, setCarState] = useState<'driving' | 'braking' | 'stopped' | 'hazard' | 'turning'>('hazard');
  const [activeSignIdx, setActiveSignIdx] = useState<number | null>(null);
  const stateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const roadRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Высота контейнера (весь документ)
  const getScrollPercent = useCallback(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    return docH > 0 ? Math.min(1, window.scrollY / docH) : 0;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setCarState('driving'), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const p = getScrollPercent();
      setScrollPos(p);

      const delta = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;

      // Проверяем близость к знаку
      let hitSign = false;
      ROAD_SIGNS.forEach((sign, idx) => {
        if (Math.abs(p - sign.pos) < 0.025) {
          hitSign = true;
          setActiveSignIdx(idx);
          if (carState !== 'braking' && carState !== 'stopped') {
            setCarState('braking');
            if (stateTimeout.current) clearTimeout(stateTimeout.current);
            stateTimeout.current = setTimeout(() => {
              setCarState('stopped');
              stateTimeout.current = setTimeout(() => {
                setActiveSignIdx(null);
                setCarState('driving');
              }, 1200);
            }, 600);
          }
        }
      });

      // Быстрый скролл
      if (!hitSign && Math.abs(delta) > 100) {
        setCarState('hazard');
        setActiveSignIdx(null);
        if (stateTimeout.current) clearTimeout(stateTimeout.current);
        stateTimeout.current = setTimeout(() => setCarState('driving'), 1200);
      }

      // Поворот на путевых точках
      if (!hitSign && carState === 'driving') {
        const turnPoint = PATH_POINTS.find(pt => Math.abs(p - pt.pos) < 0.015 && (pt.x > 30 || pt.x < 14));
        if (turnPoint) {
          setCarState('turning');
          if (stateTimeout.current) clearTimeout(stateTimeout.current);
          stateTimeout.current = setTimeout(() => setCarState('driving'), 1000);
        }
      }

      if (p >= 0.995) setCarState('stopped');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [carState, getScrollPercent]);

  // Размеры полосы
  const ROAD_W = 80;
  const CAR_H = 60;
  const SIGN_H = 52;

  // Вычисляем позицию машинки относительно road-track div
  const carX = interpolateX(scrollPos);
  const carRotation = getRotation(scrollPos);

  return (
    <>
      <style>{`
        @keyframes blink-turn { 0%,100%{opacity:1} 50%{opacity:0.1} }
        @keyframes blink-brake { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes hazard-anim { 0%,100%{opacity:1} 50%{opacity:0.15} }
        .sign-pulse { animation: sign-pulse-kf 0.5s ease-in-out infinite; }
        @keyframes sign-pulse-kf { 0%,100%{transform:scale(1)} 50%{transform:scale(1.18)} }
      `}</style>

      {/* Контейнер: правая сторона, фиксированный при скролле через sticky */}
      <div
        ref={containerRef}
        className="hidden lg:block"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: `${ROAD_W}px`,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        {/* Асфальт */}
        <div
          ref={roadRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              repeating-linear-gradient(
                transparent,
                transparent 3px,
                rgba(255,255,255,0.03) 3px,
                rgba(255,255,255,0.03) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 5px,
                rgba(255,255,255,0.02) 5px,
                rgba(255,255,255,0.02) 6px
              ),
              linear-gradient(to right, #3a3a3a 0%, #4a4a4a 30%, #454545 70%, #3a3a3a 100%)
            `,
          }}
        >
          {/* Краевая разметка слева */}
          <div style={{
            position: 'absolute', left: 6, top: 0, bottom: 0, width: 2,
            background: 'repeating-linear-gradient(to bottom, #e5e7eb 0px, #e5e7eb 18px, transparent 18px, transparent 32px)',
            opacity: 0.5,
          }}/>
          {/* Краевая разметка справа */}
          <div style={{
            position: 'absolute', right: 6, top: 0, bottom: 0, width: 2,
            background: 'repeating-linear-gradient(to bottom, #e5e7eb 0px, #e5e7eb 18px, transparent 18px, transparent 32px)',
            opacity: 0.5,
          }}/>
          {/* Осевая пунктирная линия */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)',
            background: 'repeating-linear-gradient(to bottom, #facc15 0px, #facc15 14px, transparent 14px, transparent 26px)',
            opacity: 0.55,
          }}/>

          {/* Дорожные знаки */}
          {ROAD_SIGNS.map((sign, idx) => {
            const roadEl = roadRef.current;
            const roadH = roadEl ? roadEl.offsetHeight : 2000;
            const topPx = sign.pos * roadH - SIGN_H / 2;
            const isActive = activeSignIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  top: topPx,
                  left: 2,
                  zIndex: 15,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                className={isActive ? 'sign-pulse' : ''}
                title={sign.label}
              >
                <SignSvg type={sign.type} active={isActive} />
                {isActive && (
                  <div style={{
                    marginTop: 2,
                    background: '#1e40af',
                    color: 'white',
                    fontSize: 9,
                    padding: '1px 4px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  }}>
                    {sign.label}
                  </div>
                )}
              </div>
            );
          })}

          {/* Перекрёстки — горизонтальные полосы */}
          {[0.25, 0.50, 0.75].map((p) => {
            const roadEl = roadRef.current;
            const roadH = roadEl ? roadEl.offsetHeight : 2000;
            return (
              <div key={p} style={{
                position: 'absolute',
                top: p * roadH - 6,
                left: 0,
                right: 0,
                height: 12,
                background: 'repeating-linear-gradient(to right, #fff 0px, #fff 5px, transparent 5px, transparent 10px)',
                opacity: 0.25,
                zIndex: 5,
              }}/>
            );
          })}
        </div>

        {/* Машинка — sticky, чтобы всегда была в viewport */}
        <div style={{
          position: 'sticky',
          top: '50vh',
          height: 0,
          overflow: 'visible',
          zIndex: 30,
        }}>
          <div style={{
            position: 'absolute',
            left: carX,
            top: -CAR_H / 2,
            transition: 'left 0.2s ease-out',
          }}>
            <CarTopView
              rotation={carRotation}
              braking={carState === 'braking' || carState === 'stopped'}
              hazard={carState === 'hazard'}
              turning={carState === 'turning'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DrivingCar;
