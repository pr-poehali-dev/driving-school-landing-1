import { useEffect, useRef, useState, useCallback } from 'react';

interface DrivingCarProps {
  sectionIds: string[];
}

// Знак привязан к секции сайта — по одному на блок
// maneuver: что делает машинка при подъезде к знаку
const SECTION_SIGNS: Record<string, { img: string; label: string; maneuver: 'brake' | 'left' | 'right' | 'hazard' | 'stop' }> = {
  'hero':          { img: 'https://cdn.poehali.dev/files/7323fd50-7a02-4305-ab2e-9273d0fe414c.jpeg', label: 'Главная дорога',        maneuver: 'right'  },
  'pain-points':   { img: 'https://cdn.poehali.dev/files/c0b816cf-759e-459c-987b-b95d934508c2.jpg',  label: 'Уступи дорогу',        maneuver: 'brake'  },
  'instructors':   { img: 'https://cdn.poehali.dev/files/0bac1acf-dbce-4ad9-8634-41fb5df01eae.jpeg', label: 'Въезд запрещён',       maneuver: 'stop'   },
  'triggers':      { img: 'https://cdn.poehali.dev/files/772f9c7a-0197-4b6a-8dad-a04deff562cf.png',  label: 'Пешеходный переход',   maneuver: 'brake'  },
  'advantages':    { img: 'https://cdn.poehali.dev/files/395a17bb-cae0-406b-b19d-d1337ad24252.png',  label: 'Парковка',             maneuver: 'left'   },
  'pricing':       { img: 'https://cdn.poehali.dev/files/c0b816cf-759e-459c-987b-b95d934508c2.jpg',  label: 'Уступи дорогу',       maneuver: 'right'  },
  'reviews':       { img: 'https://cdn.poehali.dev/files/772f9c7a-0197-4b6a-8dad-a04deff562cf.png',  label: 'Пешеходный переход',   maneuver: 'hazard' },
  'map':           { img: 'https://cdn.poehali.dev/files/395a17bb-cae0-406b-b19d-d1337ad24252.png',  label: 'Парковка',             maneuver: 'stop'   },
  'contact-form':  { img: 'https://cdn.poehali.dev/files/7323fd50-7a02-4305-ab2e-9273d0fe414c.jpeg', label: 'Главная дорога',       maneuver: 'brake'  },
};

// Путь X — разные смещения для поворотов
const PATH = [
  { pos: 0.00, x: 30 },
  { pos: 0.08, x: 30 },
  { pos: 0.14, x: 52 }, // вправо
  { pos: 0.22, x: 30 },
  { pos: 0.30, x: 12 }, // влево
  { pos: 0.38, x: 30 },
  { pos: 0.46, x: 52 }, // вправо
  { pos: 0.54, x: 30 },
  { pos: 0.62, x: 12 }, // влево
  { pos: 0.70, x: 30 },
  { pos: 0.78, x: 52 }, // вправо
  { pos: 0.86, x: 30 },
  { pos: 0.93, x: 12 }, // влево
  { pos: 1.00, x: 30 },
];

function lerpX(pos: number) {
  for (let i = 0; i < PATH.length - 1; i++) {
    const a = PATH[i], b = PATH[i + 1];
    if (pos >= a.pos && pos <= b.pos) {
      const t = (pos - a.pos) / (b.pos - a.pos);
      return a.x + (b.x - a.x) * t;
    }
  }
  return 30;
}

function lerpRot(pos: number) {
  const d = 0.012;
  const dx = lerpX(Math.min(1, pos + d)) - lerpX(Math.max(0, pos - d));
  return Math.max(-32, Math.min(32, dx * 5));
}

// ─── Машинка 61×102 (×1.7 от оригинала 36×60) ───────
// Фары ВВЕРХУ (машинка едет вниз по дороге)
const CAR_W = 61;
const CAR_H = 102;

const Car = ({ rot, brake, hazard, turnLeft, turnRight }: {
  rot: number; brake: boolean; hazard: boolean; turnLeft: boolean; turnRight: boolean;
}) => {
  const leftBlink  = hazard || turnLeft;
  const rightBlink = hazard || turnRight;
  return (
    <div style={{
      transform: `rotate(${rot}deg)`,
      transition: 'transform 0.3s ease',
      width: CAR_W,
      height: CAR_H,
    }}>
      <svg viewBox="0 0 61 102" width={CAR_W} height={CAR_H}>
        {/* Тень */}
        <ellipse cx="30.5" cy="97" rx="20" ry="5" fill="rgba(0,0,0,0.2)"/>
        {/* Корпус */}
        <rect x="5" y="16" width="51" height="72" rx="13" fill="#5b9bd5"/>
        {/* Капот — ВВЕРХУ (нос машины) */}
        <path d="M10 16 Q30.5 2 51 16" fill="#4a88c5"/>
        {/* Крыша */}
        <rect x="12" y="27" width="37" height="37" rx="8" fill="#1a3356"/>
        {/* Лобовое стекло (верхнее) */}
        <rect x="15" y="29" width="31" height="15" rx="3" fill="#7ec8e3" opacity="0.9"/>
        {/* Заднее стекло (нижнее) */}
        <rect x="15" y="47" width="31" height="12" rx="3" fill="#7ec8e3" opacity="0.7"/>
        {/* Линия по центру */}
        <line x1="30.5" y1="17" x2="30.5" y2="88" stroke="#4a88c5" strokeWidth="1.2" opacity="0.35"/>
        {/* ФАРЫ — вверху (перед машины) */}
        <ellipse cx="15"  cy="12" rx="7" ry="4" fill="#fffde7" opacity="0.95"/>
        <ellipse cx="46"  cy="12" rx="7" ry="4" fill="#fffde7" opacity="0.95"/>
        {/* СТОП-СИГНАЛЫ — внизу (зад машины) */}
        <rect x="7"  y="83" width="14" height="8" rx="3"
          fill={brake ? '#ef4444' : '#7f1d1d'}
          style={brake ? { animation: 'blink-brake 0.4s ease-in-out infinite' } : {}}/>
        <rect x="40" y="83" width="14" height="8" rx="3"
          fill={brake ? '#ef4444' : '#7f1d1d'}
          style={brake ? { animation: 'blink-brake 0.4s ease-in-out infinite' } : {}}/>
        {/* ПОВОРОТНИКИ — снизу */}
        <rect x="3"  y="79" width="8" height="6" rx="2"
          fill={leftBlink ? '#fbbf24' : 'transparent'}
          style={leftBlink ? { animation: 'blink-turn 0.5s ease-in-out infinite' } : {}}/>
        <rect x="50" y="79" width="8" height="6" rx="2"
          fill={rightBlink ? '#fbbf24' : 'transparent'}
          style={rightBlink ? { animation: 'blink-turn 0.5s ease-in-out infinite' } : {}}/>
        {/* Колёса */}
        <rect x="0"  y="24" width="8" height="22" rx="4" fill="#111"/>
        <rect x="53" y="24" width="8" height="22" rx="4" fill="#111"/>
        <rect x="0"  y="60" width="8" height="22" rx="4" fill="#111"/>
        <rect x="53" y="60" width="8" height="22" rx="4" fill="#111"/>
        {/* Диски */}
        <circle cx="4"  cy="35" r="3.5" fill="#999"/>
        <circle cx="57" cy="35" r="3.5" fill="#999"/>
        <circle cx="4"  cy="71" r="3.5" fill="#999"/>
        <circle cx="57" cy="71" r="3.5" fill="#999"/>
        {/* Зеркала */}
        <rect x="-4" y="30" width="9" height="14" rx="3" fill="#3a78b5"/>
        <rect x="56" y="30" width="9" height="14" rx="3" fill="#3a78b5"/>
      </svg>
    </div>
  );
};

// ─── Главный компонент ────────────────────────────────
const ROAD_W = 100;

const DrivingCar = ({ sectionIds }: DrivingCarProps) => {
  const [scrollPct, setScrollPct]       = useState(0);
  const [carState, setCarState]         = useState<'driving' | 'braking' | 'stopped' | 'hazard' | 'turnLeft' | 'turnRight'>('hazard');
  const [activeSignId, setActiveSignId] = useState<string | null>(null);
  const [vh, setVh]                     = useState(window.innerHeight);

  // позиции секций (pos 0..1) вычисляем при скролле
  const sectionPosRef = useRef<Record<string, number>>({});
  const stateRef      = useRef(carState);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY         = useRef(0);

  useEffect(() => { stateRef.current = carState; }, [carState]);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Вычитываем позиции секций
  const updateSectionPos = useCallback(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    const result: Record<string, number> = {};
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      // pos = когда секция попадает в середину экрана
      const midY = el.offsetTop + el.offsetHeight * 0.3;
      result[id] = Math.min(1, Math.max(0, (midY - vh * 0.5) / docH));
    });
    sectionPosRef.current = result;
  }, [sectionIds, vh]);

  useEffect(() => {
    updateSectionPos();
    window.addEventListener('resize', updateSectionPos);
    return () => window.removeEventListener('resize', updateSectionPos);
  }, [updateSectionPos]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

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
      if (Math.abs(delta) > 120) {
        clearTimer();
        setCarState('hazard');
        setActiveSignId(null);
        timerRef.current = setTimeout(() => setCarState('driving'), 1100);
        return;
      }

      // Проверяем близость к секции
      let hitId: string | null = null;
      const poses = sectionPosRef.current;
      Object.keys(poses).forEach(id => {
        if (Math.abs(pct - poses[id]) < 0.030) hitId = id;
      });

      if (hitId && SECTION_SIGNS[hitId]) {
        const sign = SECTION_SIGNS[hitId];
        setActiveSignId(hitId);
        if (cur !== 'braking' && cur !== 'stopped' && cur !== 'turnLeft' && cur !== 'turnRight') {
          clearTimer();
          // Разные маневры
          if (sign.maneuver === 'left') {
            setCarState('turnLeft');
            timerRef.current = setTimeout(() => { setCarState('braking'); timerRef.current = setTimeout(() => { setActiveSignId(null); setCarState('driving'); }, 800); }, 700);
          } else if (sign.maneuver === 'right') {
            setCarState('turnRight');
            timerRef.current = setTimeout(() => { setActiveSignId(null); setCarState('driving'); }, 900);
          } else if (sign.maneuver === 'hazard') {
            setCarState('hazard');
            timerRef.current = setTimeout(() => { setCarState('braking'); timerRef.current = setTimeout(() => { setActiveSignId(null); setCarState('driving'); }, 700); }, 800);
          } else if (sign.maneuver === 'stop') {
            setCarState('braking');
            timerRef.current = setTimeout(() => { setCarState('stopped'); timerRef.current = setTimeout(() => { setActiveSignId(null); setCarState('driving'); }, 1100); }, 600);
          } else { // brake
            setCarState('braking');
            timerRef.current = setTimeout(() => { setActiveSignId(null); setCarState('driving'); }, 900);
          }
        }
      } else if (!hitId) {
        setActiveSignId(null);
      }

      if (pct >= 0.99) setCarState('stopped');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [clearTimer]);

  // Машинка в viewport: Y от 12% до 88% высоты экрана
  const carViewY = vh * 0.12 + scrollPct * vh * 0.76;
  const carX     = lerpX(scrollPct);
  const carRot   = lerpRot(scrollPct);

  // Позиции знаков в viewport-координатах
  const signItems = sectionIds
    .filter(id => SECTION_SIGNS[id] && sectionPosRef.current[id] !== undefined)
    .map(id => ({
      id,
      sign: SECTION_SIGNS[id],
      vy: vh * 0.12 + sectionPosRef.current[id] * vh * 0.76,
    }));

  return (
    <>
      <style>{`
        @keyframes blink-turn  { 0%,100%{opacity:1}50%{opacity:0.08} }
        @keyframes blink-brake { 0%,100%{opacity:1}50%{opacity:0.28} }
        @keyframes sign-pop    { 0%,100%{transform:scale(1)}50%{transform:scale(1.22)} }
        @keyframes sign-glow   { 0%,100%{filter:drop-shadow(0 0 6px rgba(59,130,246,0.9))}50%{filter:drop-shadow(0 0 14px rgba(59,130,246,1))} }
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
          repeating-linear-gradient(transparent,transparent 2px,rgba(255,255,255,0.025) 2px,rgba(255,255,255,0.025) 3px),
          repeating-linear-gradient(90deg,transparent,transparent 4px,rgba(255,255,255,0.018) 4px,rgba(255,255,255,0.018) 5px),
          linear-gradient(to right,#2e2e2e 0%,#404040 25%,#484848 50%,#404040 75%,#2e2e2e 100%)
        `,
      }}>
        {/* Левая белая разметка */}
        <div style={{ position:'absolute',left:6,top:0,bottom:0,width:2,
          background:'repeating-linear-gradient(to bottom,#c8c8c8 0,#c8c8c8 12px,transparent 12px,transparent 26px)',
          opacity:0.45 }}/>
        {/* Правая белая разметка */}
        <div style={{ position:'absolute',right:6,top:0,bottom:0,width:2,
          background:'repeating-linear-gradient(to bottom,#c8c8c8 0,#c8c8c8 12px,transparent 12px,transparent 26px)',
          opacity:0.45 }}/>
        {/* Осевая жёлтая */}
        <div style={{ position:'absolute',left:'50%',top:0,bottom:0,width:3,transform:'translateX(-50%)',
          background:'repeating-linear-gradient(to bottom,#facc15 0,#facc15 14px,transparent 14px,transparent 28px)',
          opacity:0.5 }}/>

        {/* Знаки — по одному на секцию */}
        {signItems.map(({ id, sign, vy }) => {
          const isActive = activeSignId === id;
          return (
            <div key={id} style={{
              position: 'absolute',
              top: vy - 52,
              left: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 50,
              animation: isActive ? 'sign-pop 0.55s ease-in-out infinite' : 'none',
            }}>
              {/* Знак — реальное изображение */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: isActive ? '0 0 12px rgba(59,130,246,0.9)' : '0 2px 6px rgba(0,0,0,0.5)',
                animation: isActive ? 'sign-glow 0.6s ease-in-out infinite' : 'none',
                flexShrink: 0,
              }}>
                <img src={sign.img} alt={sign.label} style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
              </div>
              {/* Столбик */}
              <div style={{ width: 3, height: 18, background: '#666', marginTop: 1 }}/>
              <div style={{ width: 18, height: 3, background: '#666', borderRadius: 2 }}/>
              {/* Подпись при активации */}
              {isActive && (
                <div style={{
                  marginTop: 4,
                  fontSize: 9,
                  background: '#1e40af',
                  color: '#fff',
                  padding: '2px 6px',
                  borderRadius: 5,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  fontFamily: 'Golos Text, sans-serif',
                  fontWeight: 600,
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
          top: carViewY - CAR_H / 2,
          left: carX - CAR_W / 2,
          transition: 'top 0.1s linear, left 0.22s ease-out',
          zIndex: 60,
        }}>
          <Car
            rot={carRot}
            brake={carState === 'braking' || carState === 'stopped'}
            hazard={carState === 'hazard'}
            turnLeft={carState === 'turnLeft'}
            turnRight={carState === 'turnRight'}
          />
        </div>
      </div>
    </>
  );
};

export default DrivingCar;
