import { useEffect, useRef, useState, useCallback } from 'react';

interface DrivingCarProps {
  sectionIds: string[];
}

// ─── Конфигурация секций ────────────────────────────────────────
type StationType = 'traffic-light' | 'parking' | 'gas-station' | 'sign' | 'finish' | 'bump' | 'none';

interface Station {
  id: string;
  type: StationType;
  roadBend: number;       // смещение дороги: -1=левый поворот, 0=прямо, 1=правый поворот
  label: string;
  emoji: string;
}

const STATIONS: Station[] = [
  { id: 'hero',         type: 'none',          roadBend:  0,    label: '',                    emoji: '' },
  { id: 'pain-points',  type: 'traffic-light', roadBend:  1,    label: 'Светофор!',            emoji: '🚦' },
  { id: 'instructors',  type: 'parking',       roadBend: -1,    label: 'Парковка инструкторов',emoji: '🅿️' },
  { id: 'triggers',     type: 'sign',          roadBend:  0.5,  label: 'Дорожные знаки',       emoji: '⚠️' },
  { id: 'advantages',   type: 'bump',          roadBend: -0.5,  label: 'Лежачий полицейский',  emoji: '🛑' },
  { id: 'pricing',      type: 'gas-station',   roadBend:  0,    label: 'Заправка',             emoji: '⛽' },
  { id: 'reviews',      type: 'sign',          roadBend:  0.8,  label: 'Отзывы впереди',       emoji: '💬' },
  { id: 'map',          type: 'bump',          roadBend: -0.6,  label: 'Осторожно — яма!',     emoji: '⚠️' },
  { id: 'contact-form', type: 'finish',        roadBend:  0,    label: '🏁 Финиш!',            emoji: '🏁' },
];

// ─── Путь дороги — X меняется с учётом поворотов ───────────────
// базовая ширина дорожки = 96px, машинка = 61px
// x = смещение от левого края дорожки
const BASE_X = 17; // центр при прямой дороге
const ROAD_W = 96;

function getRoadBend(pct: number, stations: Station[], poses: Record<string, number>): number {
  // Интерполируем bend между станциями
  const sorted = stations
    .filter(s => poses[s.id] !== undefined)
    .sort((a, b) => poses[a.id] - poses[b.id]);

  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i], b = sorted[i + 1];
    const pa = poses[a.id], pb = poses[b.id];
    if (pct >= pa && pct <= pb) {
      const t = (pct - pa) / (pb - pa);
      // ease in-out
      const et = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return a.roadBend + (b.roadBend - a.roadBend) * et;
    }
  }
  return 0;
}

function getCarX(bend: number): number {
  // bend -1..1 → x 5..29 (смещение по дороге)
  return BASE_X + bend * 12;
}

function getCarRotation(bend: number, prevBend: number): number {
  const delta = bend - prevBend;
  return Math.max(-28, Math.min(28, delta * 60));
}

// ─── Цена с анимацией накопления ───────────────────────────────
const PriceCounter = ({ active }: { active: boolean }) => {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) { setVal(0); return; }
    const target = 64000;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active]);

  return (
    <div style={{
      position: 'absolute',
      top: -60,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1a1a1a',
      color: '#facc15',
      fontFamily: 'monospace',
      fontSize: 13,
      fontWeight: 'bold',
      padding: '4px 8px',
      borderRadius: 4,
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
      letterSpacing: 1,
      zIndex: 80,
    }}>
      ⛽ {val.toLocaleString('ru')} ₽
    </div>
  );
};

// ─── Светофор ──────────────────────────────────────────────────
const TrafficLight = ({ phase }: { phase: 'red' | 'yellow' | 'green' | 'off' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    background: '#111',
    borderRadius: 5,
    padding: '4px 3px',
    border: '1.5px solid #333',
    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
  }}>
    {[
      { color: '#ef4444', on: phase === 'red',    glow: '#ef444480' },
      { color: '#f59e0b', on: phase === 'yellow', glow: '#f59e0b80' },
      { color: '#22c55e', on: phase === 'green',  glow: '#22c55e80' },
    ].map((l, i) => (
      <div key={i} style={{
        width: 10, height: 10, borderRadius: '50%',
        background: l.on ? l.color : '#222',
        boxShadow: l.on ? `0 0 8px ${l.glow}` : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}/>
    ))}
  </div>
);

// ─── Машинка (SVG, вид сверху) ─────────────────────────────────
const CAR_W = 56;
const CAR_H = 92;

interface CarProps {
  rot: number;
  brake: boolean;
  hazard: boolean;
  turnLeft: boolean;
  turnRight: boolean;
  bounce: number;    // 0..1 — прыжок на яме
  tilt: number;      // градусы наклона вперёд (лежачий полицейский)
  glow: boolean;     // подсветка при достижении блока
  headlights: boolean;
}

const Car = ({ rot, brake, hazard, turnLeft, turnRight, bounce, tilt, glow, headlights }: CarProps) => {
  const leftBlink  = hazard || turnLeft;
  const rightBlink = hazard || turnRight;
  const translateY = bounce > 0 ? -bounce * 14 : 0;
  const tiltAngle  = rot + tilt;

  return (
    <div style={{ position: 'relative' }}>
      {glow && (
        <div style={{
          position: 'absolute',
          inset: -12,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250,204,21,0.5) 0%, transparent 70%)',
          animation: 'car-glow 1s ease-in-out infinite alternate',
          zIndex: 0,
          pointerEvents: 'none',
        }}/>
      )}
      <div style={{
        transform: `rotate(${tiltAngle}deg) translateY(${translateY}px)`,
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        width: CAR_W, height: CAR_H,
        position: 'relative', zIndex: 1,
      }}>
        <svg viewBox="0 0 56 92" width={CAR_W} height={CAR_H}>
          <ellipse cx="28" cy="88" rx="18" ry="4" fill="rgba(0,0,0,0.2)"/>
          <rect x="4" y="14" width="48" height="66" rx="12" fill="#5b9bd5"/>
          <path d="M9 14 Q28 2 47 14" fill="#4a88c5"/>
          <rect x="10" y="24" width="36" height="34" rx="7" fill="#1a3356"/>
          <rect x="13" y="26" width="30" height="13" rx="3" fill="#7ec8e3" opacity="0.9"/>
          <rect x="13" y="42" width="30" height="11" rx="3" fill="#7ec8e3" opacity="0.7"/>
          <line x1="28" y1="15" x2="28" y2="80" stroke="#4a88c5" strokeWidth="1" opacity="0.3"/>
          {/* Фары */}
          <ellipse cx="13" cy="10" rx="6" ry="3.5"
            fill={headlights ? '#fffde7' : '#fffde7'}
            opacity={headlights ? 1 : 0.9}
            style={headlights ? { filter: 'drop-shadow(0 0 6px #fff8)' } : {}}/>
          <ellipse cx="43" cy="10" rx="6" ry="3.5"
            fill={headlights ? '#fffde7' : '#fffde7'}
            opacity={headlights ? 1 : 0.9}
            style={headlights ? { filter: 'drop-shadow(0 0 6px #fff8)' } : {}}/>
          {/* Стоп */}
          <rect x="5"  y="76" width="12" height="7" rx="2.5"
            fill={brake ? '#ef4444' : '#7f1d1d'}
            style={brake ? { animation: 'blink-brake 0.4s ease-in-out infinite' } : {}}/>
          <rect x="39" y="76" width="12" height="7" rx="2.5"
            fill={brake ? '#ef4444' : '#7f1d1d'}
            style={brake ? { animation: 'blink-brake 0.4s ease-in-out infinite' } : {}}/>
          {/* Поворотники */}
          <rect x="2"  y="72" width="7" height="5" rx="2"
            fill={leftBlink ? '#fbbf24' : 'transparent'}
            style={leftBlink ? { animation: 'blink-turn 0.5s ease-in-out infinite' } : {}}/>
          <rect x="47" y="72" width="7" height="5" rx="2"
            fill={rightBlink ? '#fbbf24' : 'transparent'}
            style={rightBlink ? { animation: 'blink-turn 0.5s ease-in-out infinite' } : {}}/>
          {/* Колёса */}
          <rect x="0"  y="20" width="7" height="19" rx="3.5" fill="#111"/>
          <rect x="49" y="20" width="7" height="19" rx="3.5" fill="#111"/>
          <rect x="0"  y="53" width="7" height="19" rx="3.5" fill="#111"/>
          <rect x="49" y="53" width="7" height="19" rx="3.5" fill="#111"/>
          <circle cx="3.5"  cy="29.5" r="3" fill="#888"/>
          <circle cx="52.5" cy="29.5" r="3" fill="#888"/>
          <circle cx="3.5"  cy="62.5" r="3" fill="#888"/>
          <circle cx="52.5" cy="62.5" r="3" fill="#888"/>
          <rect x="-4" y="26" width="8" height="12" rx="2.5" fill="#3a78b5"/>
          <rect x="52" y="26" width="8" height="12" rx="2.5" fill="#3a78b5"/>
        </svg>
      </div>
    </div>
  );
};

// ─── Финишный флаг ────────────────────────────────────────────
const FinishFlag = ({ active }: { active: boolean }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    opacity: active ? 1 : 0.5,
    transition: 'opacity 0.4s',
  }}>
    <div style={{ fontSize: 22, animation: active ? 'flag-wave 0.5s ease-in-out infinite alternate' : 'none' }}>
      🏁
    </div>
    {active && (
      <div style={{
        background: '#16a34a', color: 'white',
        fontSize: 9, fontWeight: 'bold', padding: '2px 6px',
        borderRadius: 4, whiteSpace: 'nowrap', marginTop: 2,
        fontFamily: 'Golos Text, sans-serif',
      }}>
        ФИНИШ!
      </div>
    )}
  </div>
);

// ─── Главный компонент ──────────────────────────────────────────
const DrivingCar = ({ sectionIds }: DrivingCarProps) => {
  const [scrollPct, setScrollPct]       = useState(0);
  const [vh, setVh]                     = useState(window.innerHeight);
  const [carState, setCarState]         = useState<'idle'|'driving'|'braking'|'stopped'|'hazard'|'turnLeft'|'turnRight'|'parking'|'finish'>('idle');
  const [activeStation, setActiveStation] = useState<string | null>(null);
  const [tlPhase, setTlPhase]           = useState<'red'|'yellow'|'green'|'off'>('off');
  const [bounce, setBounce]             = useState(0);
  const [tilt, setTilt]                 = useState(0);
  const [glow, setGlow]                 = useState(false);
  const [headlights, setHeadlights]     = useState(false);
  const [priceActive, setPriceActive]   = useState(false);
  const [carVisible, setCarVisible]     = useState(false);
  const [bend, setBend]                 = useState(0);
  const [prevBend, setPrevBend]         = useState(0);
  const [obstacleMsg, setObstacleMsg]   = useState('');
  const [hazardLoop, setHazardLoop]     = useState(false);

  const sectionPosRef = useRef<Record<string, number>>({});
  const stateRef      = useRef(carState);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY         = useRef(0);
  const lastObstacle  = useRef(0);
  const prevBendRef   = useRef(0);

  useEffect(() => { stateRef.current = carState; }, [carState]);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const updateSectionPos = useCallback(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    const result: Record<string, number> = {};
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const midY = el.offsetTop + el.offsetHeight * 0.25;
      result[id] = Math.min(1, Math.max(0, (midY - vh * 0.4) / docH));
    });
    sectionPosRef.current = result;
  }, [sectionIds, vh]);

  useEffect(() => {
    const t = setTimeout(updateSectionPos, 500);
    window.addEventListener('resize', updateSectionPos);
    return () => { clearTimeout(t); window.removeEventListener('resize', updateSectionPos); };
  }, [updateSectionPos]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  // Появление машинки при первом скролле
  useEffect(() => {
    const onFirstScroll = () => {
      if (window.scrollY > 50) {
        setCarVisible(true);
        setCarState('driving');
        window.removeEventListener('scroll', onFirstScroll);
      }
    };
    window.addEventListener('scroll', onFirstScroll, { passive: true });
    return () => window.removeEventListener('scroll', onFirstScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!carVisible) return;

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? Math.min(1, window.scrollY / docH) : 0;
      setScrollPct(pct);

      const delta = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      const cur = stateRef.current;

      // Новый изгиб дороги
      const newBend = getRoadBend(pct, STATIONS, sectionPosRef.current);
      setPrevBend(prevBendRef.current);
      prevBendRef.current = newBend;
      setBend(newBend);

      // Случайные препятствия (раз в ~15 сек скролла)
      const now = Date.now();
      if (now - lastObstacle.current > 15000 && Math.random() < 0.08) {
        lastObstacle.current = now;
        const obstacles = [
          { msg: '💧 Лужа!',            fn: () => { setObstacleMsg('💧 Лужа!'); setTimeout(() => setObstacleMsg(''), 1500); } },
          { msg: '⚠️ Яма!',             fn: () => { setObstacleMsg('⚠️ Яма!'); setBounce(1); setTimeout(() => setBounce(0), 600); setTimeout(() => setObstacleMsg(''), 1500); } },
          { msg: '🛑 Лежачий полицейский!', fn: () => { setObstacleMsg('🛑'); setTilt(12); setTimeout(() => setTilt(0), 700); setTimeout(() => setObstacleMsg(''), 1500); } },
        ];
        obstacles[Math.floor(Math.random() * obstacles.length)].fn();
      }

      // Быстрый скролл → аварийка
      if (Math.abs(delta) > 130) {
        clearTimer();
        setCarState('hazard'); setGlow(false);
        timerRef.current = setTimeout(() => setCarState('driving'), 900);
        return;
      }

      // Определяем ближайшую станцию
      let hitStation: Station | null = null;
      STATIONS.forEach(s => {
        const sp = sectionPosRef.current[s.id];
        if (sp === undefined) return;
        if (Math.abs(pct - sp) < 0.026) hitStation = s;
      });

      if (hitStation) {
        const st = hitStation as Station;
        if (activeStation !== st.id) {
          setActiveStation(st.id);
          clearTimer();
          setGlow(true);
          timerRef.current = setTimeout(() => setGlow(false), 2500);

          switch (st.type) {
            case 'traffic-light':
              if (cur !== 'stopped') {
                setCarState('braking');
                setTlPhase('red');
                timerRef.current = setTimeout(() => {
                  setTlPhase('yellow');
                  timerRef.current = setTimeout(() => {
                    setTlPhase('green');
                    setCarState('driving');
                    timerRef.current = setTimeout(() => {
                      setTlPhase('off');
                      setActiveStation(null);
                    }, 800);
                  }, 900);
                }, 1200);
              }
              break;

            case 'parking':
              if (cur !== 'stopped' && cur !== 'parking') {
                setCarState('turnRight');
                timerRef.current = setTimeout(() => {
                  setCarState('parking');
                  timerRef.current = setTimeout(() => {
                    setCarState('driving');
                    setActiveStation(null);
                  }, 1400);
                }, 700);
              }
              break;

            case 'gas-station':
              if (cur !== 'stopped') {
                setCarState('braking');
                setPriceActive(true);
                timerRef.current = setTimeout(() => {
                  setCarState('driving');
                  timerRef.current = setTimeout(() => {
                    setPriceActive(false);
                    setActiveStation(null);
                  }, 2000);
                }, 2200);
              }
              break;

            case 'bump':
              setBounce(1);
              setTilt(10);
              timerRef.current = setTimeout(() => { setBounce(0); setTilt(0); }, 600);
              timerRef.current = setTimeout(() => setActiveStation(null), 1200);
              break;

            case 'finish':
              setCarState('finish');
              setHazardLoop(true);
              setHeadlights(true);
              break;

            case 'sign':
              setCarState('turnLeft');
              timerRef.current = setTimeout(() => {
                setCarState('driving');
                setActiveStation(null);
              }, 800);
              break;

            default:
              break;
          }
        }
      } else if (activeStation && !hitStation) {
        setActiveStation(null);
      }

      // Поворот по изгибу дороги
      if (!hitStation && cur === 'driving') {
        if (newBend > 0.3) { setCarState('turnRight'); clearTimer(); timerRef.current = setTimeout(() => setCarState('driving'), 600); }
        else if (newBend < -0.3) { setCarState('turnLeft'); clearTimer(); timerRef.current = setTimeout(() => setCarState('driving'), 600); }
      }

      if (pct >= 0.99) {
        setCarState('finish');
        setHeadlights(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [carVisible, activeStation, clearTimer]);

  // Позиция машинки по вертикали в viewport
  const carViewY = vh * 0.15 + scrollPct * vh * 0.70;
  const carX     = getCarX(bend);
  const carRot   = getCarRotation(bend, prevBend);

  // Состояния флагов машинки
  const isBrake     = ['braking','stopped','parking','finish'].includes(carState);
  const isHazard    = carState === 'hazard' || carState === 'finish' || hazardLoop;
  const isTurnLeft  = carState === 'turnLeft';
  const isTurnRight = carState === 'turnRight' || carState === 'parking';

  // Найти активную станцию
  const activeS = STATIONS.find(s => s.id === activeStation);

  // Станции с их viewport-позицией
  const stationItems = STATIONS
    .filter(s => sectionPosRef.current[s.id] !== undefined && s.type !== 'none')
    .map(s => ({
      ...s,
      vy: vh * 0.15 + sectionPosRef.current[s.id] * vh * 0.70,
    }));

  if (!carVisible) return null;

  return (
    <>
      <style>{`
        @keyframes blink-turn   { 0%,100%{opacity:1} 50%{opacity:0.08} }
        @keyframes blink-brake  { 0%,100%{opacity:1} 50%{opacity:0.28} }
        @keyframes car-glow     { from{opacity:0.6} to{opacity:1} }
        @keyframes flag-wave    { from{transform:rotate(-10deg)} to{transform:rotate(10deg)} }
        @keyframes tl-pulse     { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes obstacle-in  { 0%{opacity:0;transform:translateX(-50%) translateY(10px)} 20%{opacity:1;transform:translateX(-50%) translateY(0)} 80%{opacity:1} 100%{opacity:0} }
      `}</style>

      {/* Дорожка — fixed справа, изгибается через transform */}
      <div className="hidden lg:block" style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: ROAD_W,
        zIndex: 40,
        pointerEvents: 'none',
        transform: `skewX(${bend * -4}deg)`,
        transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
        background: `
          repeating-linear-gradient(transparent,transparent 2px,rgba(255,255,255,0.022) 2px,rgba(255,255,255,0.022) 3px),
          repeating-linear-gradient(90deg,transparent,transparent 4px,rgba(255,255,255,0.015) 4px,rgba(255,255,255,0.015) 5px),
          linear-gradient(to right,#2e2e2e 0%,#444 25%,#4a4a4a 50%,#444 75%,#2e2e2e 100%)
        `,
      }}>
        {/* Обочина левая */}
        <div style={{ position:'absolute',left:5,top:0,bottom:0,width:2,
          background:'repeating-linear-gradient(to bottom,#bbb 0,#bbb 12px,transparent 12px,transparent 26px)',
          opacity:0.4 }}/>
        {/* Обочина правая */}
        <div style={{ position:'absolute',right:5,top:0,bottom:0,width:2,
          background:'repeating-linear-gradient(to bottom,#bbb 0,#bbb 12px,transparent 12px,transparent 26px)',
          opacity:0.4 }}/>
        {/* Осевая */}
        <div style={{ position:'absolute',left:'50%',top:0,bottom:0,width:3,transform:'translateX(-50%)',
          background:'repeating-linear-gradient(to bottom,#facc15 0,#facc15 14px,transparent 14px,transparent 30px)',
          opacity:0.5 }}/>

        {/* Станции вдоль дороги */}
        {stationItems.map(st => {
          const isAct = activeStation === st.id;
          return (
            <div key={st.id} style={{
              position: 'absolute',
              top: st.vy - 36,
              left: 4,
              zIndex: 55,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}>
              {/* Светофор */}
              {st.type === 'traffic-light' && (
                <TrafficLight phase={isAct ? tlPhase : 'off'} />
              )}
              {/* Парковка */}
              {st.type === 'parking' && (
                <div style={{
                  background: isAct ? '#3b82f6' : '#1e3a8a',
                  color: 'white', fontWeight: 'bold', fontSize: 14,
                  width: 26, height: 26, borderRadius: 4,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border: '2px solid white',
                  boxShadow: isAct ? '0 0 10px rgba(59,130,246,0.8)' : 'none',
                  transition: 'all 0.3s',
                  animation: isAct ? 'tl-pulse 0.6s ease-in-out infinite' : 'none',
                }}>P</div>
              )}
              {/* Заправка */}
              {st.type === 'gas-station' && (
                <div style={{ fontSize: 20, animation: isAct ? 'tl-pulse 0.5s ease-in-out infinite' : 'none' }}>⛽</div>
              )}
              {/* Финиш */}
              {st.type === 'finish' && <FinishFlag active={isAct} />}
              {/* Знак / бугор */}
              {(st.type === 'sign' || st.type === 'bump') && (
                <div style={{ fontSize: 18, animation: isAct ? 'tl-pulse 0.4s ease-in-out infinite' : 'none' }}>{st.emoji}</div>
              )}

              {/* Подпись при активации */}
              {isAct && st.label && (
                <div style={{
                  fontSize: 8, background: '#1e40af', color: '#fff',
                  padding: '2px 5px', borderRadius: 4,
                  whiteSpace: 'nowrap',
                  fontFamily: 'Golos Text, sans-serif', fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}>
                  {st.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Машинка */}
        <div style={{
          position: 'absolute',
          top: carViewY - CAR_H / 2,
          left: carX,
          transition: 'top 0.1s linear, left 0.3s cubic-bezier(0.22,1,0.36,1)',
          zIndex: 70,
        }}>
          {/* Анимация цены у заправки */}
          {priceActive && <PriceCounter active={priceActive} />}

          <Car
            rot={carRot}
            brake={isBrake}
            hazard={isHazard}
            turnLeft={isTurnLeft}
            turnRight={isTurnRight}
            bounce={bounce}
            tilt={tilt}
            glow={glow}
            headlights={headlights}
          />

          {/* Подсказка «Я здесь!» */}
          {glow && activeS && (
            <div style={{
              position: 'absolute', top: -28, left: '50%',
              transform: 'translateX(-50%)',
              background: '#facc15', color: '#1a1a1a',
              fontSize: 9, fontWeight: 'bold',
              padding: '2px 6px', borderRadius: 10,
              whiteSpace: 'nowrap',
              fontFamily: 'Golos Text, sans-serif',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
            }}>
              {activeS.emoji} {activeS.label}
            </div>
          )}
        </div>

        {/* Сообщение о препятствии */}
        {obstacleMsg && (
          <div style={{
            position: 'absolute',
            top: carViewY - CAR_H / 2 - 40,
            left: '50%',
            zIndex: 90,
            background: '#ef4444',
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
            padding: '3px 8px',
            borderRadius: 6,
            whiteSpace: 'nowrap',
            fontFamily: 'Golos Text, sans-serif',
            animation: 'obstacle-in 1.5s ease-in-out forwards',
          }}>
            {obstacleMsg}
          </div>
        )}
      </div>
    </>
  );
};

export default DrivingCar;