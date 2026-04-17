import { useEffect, useRef, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   ТИПЫ
═══════════════════════════════════════════════════════════════════ */
type SignType =
  | 'start'         // 🚩 старт
  | 'hill'          // 🏞️ холм — машинка скрывается
  | 'warning'       // ⚠️ предупреждение — экран трясётся
  | 'traffic-light' // 🚦 светофор
  | 'stop'          // 🛑 стоп
  | 'roadwork'      // 🚧 дорожные работы
  | 'parking'       // 🅿️ парковка
  | 'children'      // 🚸 дети
  | 'trigger'       // 👩/🎖️/🚗 — триггеры
  | 'gas'           // ⛽ заправка
  | 'question'      // ❓ FAQ
  | 'reviews-tl'    // 🚦 перед отзывами
  | 'finish';       // 🏁 финиш

interface RoadSign {
  pct: number;          // 0..1 — позиция по скроллу
  side: 'left' | 'right';
  type: SignType;
  emoji: string;
  label: string;
  faqIdx?: number;      // для type=question — индекс вопроса FAQ
}

/* ═══════════════════════════════════════════════════════════════════
   ВСЕ ЗНАКИ ПО СХЕМЕ
═══════════════════════════════════════════════════════════════════ */
const SIGNS: RoadSign[] = [
  // 0 — Старт
  { pct: 0.00, side: 'left',  type: 'start',         emoji: '🚩', label: 'Поехали!' },
  // 0.1 — Холм
  { pct: 0.03, side: 'left',  type: 'hill',           emoji: '🏞️', label: '' },
  // 0.2 — Выезд на главную
  { pct: 0.07, side: 'right', type: 'warning',        emoji: '⚠️', label: 'Выезд на главную' },
  // 1 — 1-й экран: светофор
  { pct: 0.09, side: 'left',  type: 'traffic-light',  emoji: '🚦', label: 'Светофор' },
  { pct: 0.12, side: 'left',  type: 'stop',           emoji: '🛑', label: '' },
  // 1.1 — Скользкая дорога
  { pct: 0.16, side: 'right', type: 'warning',        emoji: '⚠️', label: 'Скользкая дорога' },
  // 2 — Блок проблем: светофор + стоп
  { pct: 0.20, side: 'left',  type: 'traffic-light',  emoji: '🚦', label: 'Уступи дорогу' },
  { pct: 0.26, side: 'left',  type: 'stop',           emoji: '🛑', label: '' },
  // 2.1 — Дорожные работы
  { pct: 0.33, side: 'right', type: 'roadwork',       emoji: '🚧', label: 'Дорожные работы' },
  // 3 — Инструкторы: 5 парковочных мест
  { pct: 0.36, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 1' },
  { pct: 0.39, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 2' },
  { pct: 0.42, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 3' },
  { pct: 0.45, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 4' },
  { pct: 0.48, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 5' },
  // 3.1 — Дети
  { pct: 0.40, side: 'left',  type: 'children',       emoji: '🚸', label: 'Новый инструктор!' },
  // 3.2 — Холм внутри инструкторов
  { pct: 0.45, side: 'left',  type: 'hill',           emoji: '🏞️', label: '' },
  // 4 — Триггеры: 3 знака
  { pct: 0.51, side: 'left',  type: 'trigger',        emoji: '👩', label: 'Инструктор-женщина' },
  { pct: 0.54, side: 'left',  type: 'trigger',        emoji: '🎖️', label: 'Скидка для СВО' },
  { pct: 0.57, side: 'left',  type: 'trigger',        emoji: '🚗', label: 'Свой автодром' },
  // 4.1 — Вопрос со скидкой
  { pct: 0.59, side: 'left',  type: 'question',       emoji: '❓', label: 'Скидка 5000 ₽', faqIdx: 5 },
  // 5 — Цена: заправка
  { pct: 0.64, side: 'right', type: 'gas',            emoji: '⛽', label: 'Заправка' },
  // 5.1 — Крутой спуск
  { pct: 0.70, side: 'left',  type: 'warning',        emoji: '⚠️', label: 'Крутой спуск' },
  // 6 — FAQ: 8 знаков
  { pct: 0.73, side: 'left',  type: 'question',       emoji: '❓', label: 'Вопрос 1', faqIdx: 0 },
  { pct: 0.74, side: 'right', type: 'question',       emoji: '❓', label: 'Вопрос 2', faqIdx: 1 },
  { pct: 0.75, side: 'left',  type: 'question',       emoji: '❓', label: 'Вопрос 3', faqIdx: 2 },
  { pct: 0.76, side: 'right', type: 'question',       emoji: '❓', label: 'Вопрос 4', faqIdx: 3 },
  // 6.1 — Холм
  { pct: 0.76, side: 'left',  type: 'hill',           emoji: '🏞️', label: '' },
  { pct: 0.77, side: 'left',  type: 'question',       emoji: '❓', label: 'Вопрос 5', faqIdx: 4 },
  { pct: 0.78, side: 'right', type: 'question',       emoji: '❓', label: 'Вопрос 6', faqIdx: 5 },
  // 6.2 — Дорожные работы
  { pct: 0.79, side: 'right', type: 'roadwork',       emoji: '🚧', label: 'Сложный вопрос!' },
  { pct: 0.80, side: 'left',  type: 'question',       emoji: '❓', label: 'Вопрос 7', faqIdx: 6 },
  { pct: 0.81, side: 'right', type: 'question',       emoji: '❓', label: 'Вопрос 8', faqIdx: 7 },
  // 7 — Отзывы
  { pct: 0.84, side: 'left',  type: 'reviews-tl',     emoji: '🚦', label: 'Отзывы впереди' },
  // 8 — Карта
  { pct: 0.90, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Мы здесь!' },
  // 9 — Форма
  { pct: 0.93, side: 'right', type: 'finish',         emoji: '🏁', label: 'Финиш!' },
  { pct: 0.94, side: 'left',  type: 'stop',           emoji: '🛑', label: '' },
  { pct: 0.96, side: 'left',  type: 'warning',        emoji: '⚠️', label: 'Проверь телефон' },
  // 10 — Подвал
  { pct: 0.99, side: 'left',  type: 'finish',         emoji: '🏁', label: 'Вы доехали!' },
];

/* ═══════════════════════════════════════════════════════════════════
   ИЗГИБ ДОРОГИ ПО % СКРОЛЛА
═══════════════════════════════════════════════════════════════════ */
const ROAD_CURVE: { pct: number; x: number }[] = [
  { pct: 0.00, x: 28 },
  { pct: 0.07, x: 38 }, // выезд → правее
  { pct: 0.12, x: 18 }, // 1й экран → левее
  { pct: 0.20, x: 12 }, // боли → влево
  { pct: 0.33, x: 32 }, // дорожные работы
  { pct: 0.38, x: 40 }, // парковки → правее
  { pct: 0.51, x: 16 }, // триггеры → влево
  { pct: 0.60, x: 28 }, // прямо
  { pct: 0.64, x: 36 }, // заправка → правее
  { pct: 0.70, x: 22 }, // спуск → влево
  { pct: 0.73, x: 28 }, // FAQ
  { pct: 0.84, x: 36 }, // отзывы → правее
  { pct: 0.90, x: 40 }, // парковка
  { pct: 0.93, x: 28 }, // финиш
  { pct: 1.00, x: 28 },
];

function curveX(pct: number): number {
  for (let i = 0; i < ROAD_CURVE.length - 1; i++) {
    const a = ROAD_CURVE[i], b = ROAD_CURVE[i + 1];
    if (pct >= a.pct && pct <= b.pct) {
      const t = (pct - a.pct) / (b.pct - a.pct);
      const et = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return a.x + (b.x - a.x) * et;
    }
  }
  return 28;
}

function carRotFromCurve(pct: number): number {
  const d = 0.015;
  const dx = curveX(Math.min(1, pct + d)) - curveX(Math.max(0, pct - d));
  return Math.max(-30, Math.min(30, dx * 3.5));
}

/* ═══════════════════════════════════════════════════════════════════
   КОНФЕТТИ
═══════════════════════════════════════════════════════════════════ */
const CONFETTI_COLORS = ['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899'];

function launchConfetti() {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(container);
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    const size = 6 + Math.random() * 8;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;
      top:-${size}px;
      background:${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation:confetti-fall ${1.2 + Math.random() * 1.5}s ${Math.random() * 0.8}s ease-in forwards;
    `;
    container.appendChild(p);
  }
  setTimeout(() => container.remove(), 4000);
}

/* ═══════════════════════════════════════════════════════════════════
   ТРЯСКА ЭКРАНА
═══════════════════════════════════════════════════════════════════ */
function shakeScreen(intensity = 6, ms = 350) {
  const el = document.documentElement;
  const kf = `@keyframes screen-shake {
    0%,100%{transform:translate(0,0)}
    20%{transform:translate(-${intensity}px,${intensity/2}px)}
    40%{transform:translate(${intensity}px,-${intensity/2}px)}
    60%{transform:translate(-${intensity/2}px,${intensity}px)}
    80%{transform:translate(${intensity/2}px,-${intensity}px)}
  }`;
  const style = document.createElement('style');
  style.textContent = kf;
  document.head.appendChild(style);
  el.style.animation = `screen-shake ${ms}ms ease-in-out`;
  setTimeout(() => { el.style.animation = ''; style.remove(); }, ms + 50);
}

/* ═══════════════════════════════════════════════════════════════════
   КОМПОНЕНТЫ ЗНАКОВ
═══════════════════════════════════════════════════════════════════ */

// Светофор
const TrafficLight = ({ phase }: { phase: 'red'|'yellow'|'green'|'off' }) => (
  <div style={{
    display:'flex', flexDirection:'column', alignItems:'center', gap:2,
    background:'#111', borderRadius:5, padding:'4px 3px',
    border:'1.5px solid #333', boxShadow:'0 2px 10px rgba(0,0,0,0.6)',
  }}>
    {[
      { color:'#ef4444', on: phase==='red',    glow:'#ef444488' },
      { color:'#f59e0b', on: phase==='yellow', glow:'#f59e0b88' },
      { color:'#22c55e', on: phase==='green',  glow:'#22c55e88' },
    ].map((l,i) => (
      <div key={i} style={{
        width:10,height:10,borderRadius:'50%',
        background: l.on ? l.color : '#1f1f1f',
        boxShadow: l.on ? `0 0 10px 2px ${l.glow}` : 'none',
        transition:'background 0.25s,box-shadow 0.25s',
      }}/>
    ))}
  </div>
);

// Дорожный знак (треугольник предупреждения / круглый / прямоугольный)
const SignPost = ({ sign, active, tlPhase, onFaqClick }: {
  sign: RoadSign;
  active: boolean;
  tlPhase: 'red'|'yellow'|'green'|'off';
  onFaqClick?: (idx: number) => void;
}) => {
  const pulse = active ? 'sign-pulse 0.6s ease-in-out infinite alternate' : 'none';

  // Светофор — отдельно
  if (sign.type === 'traffic-light' || sign.type === 'reviews-tl') {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
        <TrafficLight phase={active ? tlPhase : 'off'} />
        {/* Стойка */}
        <div style={{ width:2, height:14, background:'#555' }}/>
      </div>
    );
  }

  // FAQ знак — кликабельный
  if (sign.type === 'question') {
    return (
      <div
        title={sign.label}
        onClick={() => sign.faqIdx !== undefined && onFaqClick?.(sign.faqIdx)}
        style={{
          cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:1,
          animation: pulse,
        }}>
        <div style={{
          width:22,height:22,borderRadius:'50%',
          background: active ? '#f59e0b' : '#1e40af',
          border:'2px solid white',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:11, fontWeight:'bold', color:'white',
          boxShadow: active ? '0 0 12px rgba(245,158,11,0.8)' : '0 2px 6px rgba(0,0,0,0.4)',
          transition:'all 0.2s',
        }}>?</div>
        {active && sign.label && (
          <div style={{
            background:'#f59e0b', color:'#1a1a1a',
            fontSize:7, fontWeight:'bold',
            padding:'1px 4px', borderRadius:3,
            whiteSpace:'nowrap', maxWidth:60, textAlign:'center',
            fontFamily:'Golos Text,sans-serif',
          }}>{sign.label}</div>
        )}
        <div style={{ width:2, height:10, background:'#555' }}/>
      </div>
    );
  }

  // Холм — невидимый (эффект скрытия)
  if (sign.type === 'hill') return null;

  // Парковка
  if (sign.type === 'parking') {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1 }}>
        <div style={{
          width:20,height:20,borderRadius:3,
          background: active ? '#3b82f6' : '#1e3a8a',
          border:'2px solid white',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontWeight:'bold', fontSize:11, color:'white',
          boxShadow: active ? '0 0 12px rgba(59,130,246,0.9)' : '0 2px 6px rgba(0,0,0,0.4)',
          animation: pulse,
          transition:'all 0.2s',
        }}>P</div>
        {active && <div style={{ fontSize:7, color:'#93c5fd', fontFamily:'Golos Text,sans-serif', whiteSpace:'nowrap' }}>{sign.label}</div>}
        <div style={{ width:2, height:10, background:'#555' }}/>
      </div>
    );
  }

  // Заправка
  if (sign.type === 'gas') {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1 }}>
        <div style={{
          background:'#111', border:'2px solid #f59e0b',
          borderRadius:4, padding:'3px 4px',
          fontSize:14, lineHeight:1,
          boxShadow: active ? '0 0 14px rgba(245,158,11,0.8)' : '0 2px 6px rgba(0,0,0,0.4)',
          animation: pulse,
        }}>⛽</div>
        {active && (
          <div style={{ background:'#f59e0b', color:'#111', fontSize:7, fontWeight:'bold', padding:'1px 4px', borderRadius:3, fontFamily:'Golos Text,sans-serif' }}>
            Заправка!
          </div>
        )}
        <div style={{ width:2, height:10, background:'#555' }}/>
      </div>
    );
  }

  // Финиш
  if (sign.type === 'finish') {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1, animation: active ? 'flag-wave 0.4s ease-in-out infinite alternate' : 'none' }}>
        <div style={{ fontSize: active ? 22 : 16, lineHeight:1, transition:'font-size 0.3s' }}>🏁</div>
        {active && (
          <div style={{ background:'#16a34a', color:'white', fontSize:7, fontWeight:'bold', padding:'1px 5px', borderRadius:3, whiteSpace:'nowrap', fontFamily:'Golos Text,sans-serif' }}>
            {sign.label}
          </div>
        )}
        <div style={{ width:2, height:10, background:'#555' }}/>
      </div>
    );
  }

  // Все остальные знаки — emoji + стойка
  const emojiSize = sign.type === 'stop' ? 16 : sign.type === 'children' ? 18 : 14;
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1 }}>
      <div style={{
        fontSize:emojiSize, lineHeight:1,
        filter: active ? 'drop-shadow(0 0 6px rgba(255,200,50,0.9))' : 'none',
        animation: pulse,
        transition:'filter 0.2s',
      }}>{sign.emoji}</div>
      {active && sign.label && (
        <div style={{
          background:'#1e40af', color:'white',
          fontSize:7, fontWeight:'bold',
          padding:'1px 4px', borderRadius:3,
          whiteSpace:'nowrap', maxWidth:55, textAlign:'center',
          fontFamily:'Golos Text,sans-serif',
        }}>{sign.label}</div>
      )}
      <div style={{ width:2, height:10, background:'#555' }}/>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   МАШИНКА SVG
═══════════════════════════════════════════════════════════════════ */
const CAR_W = 52;
const CAR_H = 88;

interface CarProps {
  rot: number;
  brake: boolean;
  hazard: boolean;
  turnLeft: boolean;
  turnRight: boolean;
  bounceY: number;
  forwardTilt: number;
  glow: boolean;
  headlights: boolean;
  hidden: boolean; // за холмом
}

const Car = ({ rot, brake, hazard, turnLeft, turnRight, bounceY, forwardTilt, glow, headlights, hidden }: CarProps) => {
  const lb = hazard || turnLeft;
  const rb = hazard || turnRight;
  const angle = rot + forwardTilt;

  return (
    <div style={{
      position:'relative',
      opacity: hidden ? 0 : 1,
      transition:'opacity 0.3s ease',
    }}>
      {glow && (
        <div style={{
          position:'absolute', inset:-14, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(250,204,21,0.55) 0%,transparent 70%)',
          animation:'car-glow 0.9s ease-in-out infinite alternate',
          pointerEvents:'none', zIndex:0,
        }}/>
      )}
      <div style={{
        transform: `rotate(${angle}deg) translateY(${bounceY}px)`,
        transition:'transform 0.28s cubic-bezier(0.22,1,0.36,1)',
        width:CAR_W, height:CAR_H, position:'relative', zIndex:1,
      }}>
        <svg viewBox="0 0 52 88" width={CAR_W} height={CAR_H}>
          <ellipse cx="26" cy="84" rx="17" ry="4" fill="rgba(0,0,0,0.18)"/>
          <rect x="3" y="13" width="46" height="63" rx="11" fill="#5b9bd5"/>
          <path d="M8 13 Q26 2 44 13" fill="#4a88c5"/>
          <rect x="9" y="23" width="34" height="32" rx="6" fill="#1a3356"/>
          <rect x="12" y="25" width="28" height="12" rx="3" fill="#7ec8e3" opacity="0.9"/>
          <rect x="12" y="40" width="28" height="11" rx="3" fill="#7ec8e3" opacity="0.7"/>
          <line x1="26" y1="14" x2="26" y2="76" stroke="#4a88c5" strokeWidth="1" opacity="0.28"/>
          {/* Фары */}
          <ellipse cx="12" cy="9" rx="5.5" ry="3"
            fill="#fffde7" opacity={headlights ? 1 : 0.85}
            style={headlights ? {filter:'drop-shadow(0 0 5px rgba(255,255,200,0.9))'} : {}}/>
          <ellipse cx="40" cy="9" rx="5.5" ry="3"
            fill="#fffde7" opacity={headlights ? 1 : 0.85}
            style={headlights ? {filter:'drop-shadow(0 0 5px rgba(255,255,200,0.9))'} : {}}/>
          {/* Стоп */}
          <rect x="4"  y="72" width="11" height="7" rx="2.5"
            fill={brake ? '#ef4444' : '#7f1d1d'}
            style={brake ? {animation:'blink-brake 0.4s ease-in-out infinite'} : {}}/>
          <rect x="37" y="72" width="11" height="7" rx="2.5"
            fill={brake ? '#ef4444' : '#7f1d1d'}
            style={brake ? {animation:'blink-brake 0.4s ease-in-out infinite'} : {}}/>
          {/* Поворотники */}
          <rect x="1"  y="68" width="7" height="5" rx="2"
            fill={lb ? '#fbbf24' : 'transparent'}
            style={lb ? {animation:'blink-turn 0.5s ease-in-out infinite'} : {}}/>
          <rect x="44" y="68" width="7" height="5" rx="2"
            fill={rb ? '#fbbf24' : 'transparent'}
            style={rb ? {animation:'blink-turn 0.5s ease-in-out infinite'} : {}}/>
          {/* Колёса */}
          <rect x="0"  y="18" width="7" height="18" rx="3.5" fill="#111"/>
          <rect x="45" y="18" width="7" height="18" rx="3.5" fill="#111"/>
          <rect x="0"  y="50" width="7" height="18" rx="3.5" fill="#111"/>
          <rect x="45" y="50" width="7" height="18" rx="3.5" fill="#111"/>
          <circle cx="3.5"  cy="27" r="2.8" fill="#888"/>
          <circle cx="48.5" cy="27" r="2.8" fill="#888"/>
          <circle cx="3.5"  cy="59" r="2.8" fill="#888"/>
          <circle cx="48.5" cy="59" r="2.8" fill="#888"/>
          <rect x="-4" y="24" width="8" height="11" rx="2.5" fill="#3a78b5"/>
          <rect x="48" y="24" width="8" height="11" rx="2.5" fill="#3a78b5"/>
        </svg>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   СЧЁТЧИК ЦЕНЫ (заправка)
═══════════════════════════════════════════════════════════════════ */
const PriceCounter = ({ active }: { active: boolean }) => {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const dur = 2000, target = 64000, start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(e * target));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active]);
  return (
    <div style={{
      position:'absolute', top:-50, left:'50%', transform:'translateX(-50%)',
      background:'#111', color:'#facc15', fontFamily:'monospace',
      fontSize:12, fontWeight:'bold', padding:'3px 7px', borderRadius:4,
      whiteSpace:'nowrap', boxShadow:'0 2px 10px rgba(0,0,0,0.6)',
      letterSpacing:1, zIndex:90,
    }}>⛽ {val.toLocaleString('ru')} ₽</div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ГЛАВНЫЙ КОМПОНЕНТ
═══════════════════════════════════════════════════════════════════ */
const ROAD_W = 100; // px, ширина полосы

interface DrivingCarProps {
  sectionIds: string[];
  onFaqOpen?: (idx: number) => void;
}

const DrivingCar = ({ onFaqOpen }: DrivingCarProps) => {
  const [scrollPct, setScrollPct]   = useState(0);
  const [vh, setVh]                 = useState(window.innerHeight);
  const [carVisible, setCarVisible] = useState(false);

  // Машинка
  const [carX, setCarX]               = useState(28);
  const [carRot, setCarRot]           = useState(0);
  const [isBrake, setIsBrake]         = useState(false);
  const [isHazard, setIsHazard]       = useState(true);
  const [isTurnLeft, setIsTurnLeft]   = useState(false);
  const [isTurnRight, setIsTurnRight] = useState(false);
  const [bounceY, setBounceY]         = useState(0);
  const [forwardTilt, setForwardTilt] = useState(0);
  const [glow, setGlow]               = useState(false);
  const [headlights, setHeadlights]   = useState(false);
  const [carHidden, setCarHidden]     = useState(false);
  const [tooltip, setTooltip]         = useState('');

  // Светофор
  const [tlPhase, setTlPhase] = useState<'red'|'yellow'|'green'|'off'>('off');

  // Заправка
  const [priceActive, setPriceActive] = useState(false);

  // Активные знаки
  const [activeSignPcts, setActiveSignPcts] = useState<Set<number>>(new Set());

  // Дорожные работы — дрифт
  const [driftOffset, setDriftOffset] = useState(0);

  const lastY         = useRef(0);
  const timerRef      = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastObstacle  = useRef(0);
  const tlRunning     = useRef(false);

  const t = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timerRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Появление машинки при первом скролле
  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 30) {
        setCarVisible(true);
        setIsHazard(false);
        setCarState_driving();
        window.removeEventListener('scroll', handler);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const setCarState_driving = useCallback(() => {
    setIsBrake(false); setIsHazard(false);
    setIsTurnLeft(false); setIsTurnRight(false);
  }, []);

  // Запуск светофора
  const runTrafficLight = useCallback(() => {
    if (tlRunning.current) return;
    tlRunning.current = true;
    setIsBrake(true); setTlPhase('red');
    t(() => setTlPhase('yellow'), 1300);
    t(() => { setTlPhase('green'); setIsBrake(false); }, 2200);
    t(() => { setTlPhase('off'); tlRunning.current = false; }, 3000);
  }, [t]);

  // Обработка знаков при приближении машинки
  const handleSignActivation = useCallback((sign: RoadSign) => {
    setActiveSignPcts(prev => new Set(prev).add(sign.pct));
    t(() => setActiveSignPcts(prev => { const n = new Set(prev); n.delete(sign.pct); return n; }), 2500);

    switch (sign.type) {
      case 'traffic-light':
      case 'reviews-tl':
        runTrafficLight();
        setGlow(true);
        t(() => setGlow(false), 2500);
        break;

      case 'stop':
        setIsBrake(true);
        t(() => setIsBrake(false), 900);
        break;

      case 'warning':
        shakeScreen(sign.pct < 0.20 ? 4 : 7, 400);
        setIsHazard(true);
        t(() => setIsHazard(false), 600);
        if (sign.label) { setTooltip(sign.label); t(() => setTooltip(''), 1800); }
        break;

      case 'roadwork':
        shakeScreen(3, 250);
        setDriftOffset(8);
        t(() => setDriftOffset(-6), 180);
        t(() => setDriftOffset(0), 360);
        if (sign.label) { setTooltip(sign.label); t(() => setTooltip(''), 1800); }
        break;

      case 'parking':
        setIsTurnRight(true);
        setIsBrake(true);
        t(() => { setIsTurnRight(false); setIsBrake(false); }, 900);
        if (sign.label) { setTooltip(sign.label); t(() => setTooltip(''), 2000); }
        break;

      case 'children':
        setIsBrake(true);
        t(() => setIsBrake(false), 700);
        setTooltip(sign.label);
        t(() => setTooltip(''), 2000);
        break;

      case 'trigger':
        setIsHazard(true);
        t(() => setIsHazard(false), 500);
        setTooltip(sign.label);
        t(() => setTooltip(''), 2200);
        break;

      case 'gas':
        setIsBrake(true);
        setPriceActive(true);
        setGlow(true);
        t(() => { setIsBrake(false); setGlow(false); }, 2200);
        t(() => setPriceActive(false), 4000);
        break;

      case 'question':
        setIsBrake(true);
        t(() => setIsBrake(false), 500);
        if (sign.label) { setTooltip(sign.label); t(() => setTooltip(''), 1500); }
        break;

      case 'hill':
        setCarHidden(true);
        t(() => setCarHidden(false), 1200);
        break;

      case 'finish':
        setIsBrake(true);
        setIsHazard(true);
        setHeadlights(true);
        setGlow(true);
        launchConfetti();
        setTooltip(sign.label);
        break;

      case 'start':
        setIsHazard(true);
        t(() => setIsHazard(false), 1200);
        setTooltip('Поехали! 🚗');
        t(() => setTooltip(''), 2000);
        break;
    }
  }, [runTrafficLight, t]);

  const triggeredRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? Math.min(1, window.scrollY / docH) : 0;
      setScrollPct(pct);

      const delta = window.scrollY - lastY.current;
      lastY.current = window.scrollY;

      // Позиция и поворот машинки по кривой
      const cx = curveX(pct);
      const cr = carRotFromCurve(pct);
      setCarX(cx);
      setCarRot(cr);

      // Поворотники по изгибу кривой
      if (Math.abs(cr) > 8) {
        if (cr < 0) setIsTurnLeft(true);
        else setIsTurnRight(true);
      } else {
        setIsTurnLeft(false);
        setIsTurnRight(false);
      }

      // Очень быстрый скролл → аварийка
      if (Math.abs(delta) > 160) {
        setIsHazard(true);
        setTimeout(() => setIsHazard(false), 700);
        return;
      }

      // Случайные препятствия
      const now = Date.now();
      if (carVisible && now - lastObstacle.current > 18000 && pct > 0.1 && pct < 0.95) {
        if (Math.random() < 0.07) {
          lastObstacle.current = now;
          const roll = Math.random();
          if (roll < 0.35) {
            // Яма
            setBounceY(-16);
            shakeScreen(4, 300);
            setTooltip('⚠️ Яма!');
            setTimeout(() => { setBounceY(0); setTooltip(''); }, 700);
          } else if (roll < 0.65) {
            // Лужа
            setTooltip('💧 Лужа!');
            setTimeout(() => setTooltip(''), 1200);
          } else {
            // Лежачий
            setForwardTilt(14);
            setIsBrake(true);
            setTooltip('🛑 Лежачий!');
            setTimeout(() => { setForwardTilt(0); setIsBrake(false); setTooltip(''); }, 700);
          }
        }
      }

      // Проверка активации знаков
      SIGNS.forEach(sign => {
        const dist = Math.abs(pct - sign.pct);
        if (dist < 0.018 && !triggeredRef.current.has(sign.pct)) {
          triggeredRef.current.add(sign.pct);
          if (carVisible || sign.type === 'start') handleSignActivation(sign);
          // Через время — сброс триггера чтобы при обратном скролле сработало снова
          setTimeout(() => triggeredRef.current.delete(sign.pct), 4000);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [carVisible, handleSignActivation]);

  // Позиция машинки в viewport
  const carViewY  = vh * 0.12 + scrollPct * (vh * 0.76);

  // Какие знаки показывать (в зоне видимости ±25% от текущего скролла)
  const visibleSigns = SIGNS.filter(s =>
    s.pct >= scrollPct - 0.28 && s.pct <= scrollPct + 0.28
  );

  if (!carVisible) return null;

  return (
    <>
      <style>{`
        @keyframes blink-turn  {0%,100%{opacity:1}50%{opacity:0.05}}
        @keyframes blink-brake {0%,100%{opacity:1}50%{opacity:0.25}}
        @keyframes car-glow    {from{opacity:0.55}to{opacity:1}}
        @keyframes flag-wave   {from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}
        @keyframes sign-pulse  {from{opacity:0.7;transform:scale(0.95)}to{opacity:1;transform:scale(1.08)}}
        @keyframes confetti-fall{
          0%  {transform:translateY(-10px) rotate(0deg); opacity:1}
          100%{transform:translateY(110vh) rotate(720deg); opacity:0}
        }
        @keyframes tooltip-in {
          0%  {opacity:0;transform:translateX(-50%) translateY(6px)}
          15% {opacity:1;transform:translateX(-50%) translateY(0)}
          85% {opacity:1}
          100%{opacity:0}
        }
      `}</style>

      {/* ── ДОРОЖНАЯ ПОЛОСА (fixed, правая сторона) ── */}
      <div className="hidden lg:block" style={{
        position:'fixed', right:0, top:0, bottom:0,
        width:ROAD_W, zIndex:40, pointerEvents:'none',
        // Изгиб через skewX
        transform:`skewX(${(curveX(scrollPct) - 28) * -0.18}deg)`,
        transition:'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}>
        {/* Асфальт */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to right,#2a2a2a 0%,#3d3d3d 30%,#424242 50%,#3d3d3d 70%,#2a2a2a 100%)',
        }}/>
        {/* Текстура */}
        <div style={{
          position:'absolute', inset:0, opacity:0.06,
          backgroundImage:'repeating-linear-gradient(transparent,transparent 3px,rgba(255,255,255,0.12) 3px,rgba(255,255,255,0.12) 4px)',
        }}/>
        {/* Левая обочина */}
        <div style={{
          position:'absolute', left:6, top:0, bottom:0, width:2,
          background:'repeating-linear-gradient(to bottom,#bbb 0,#bbb 14px,transparent 14px,transparent 28px)',
          opacity:0.35,
        }}/>
        {/* Правая обочина */}
        <div style={{
          position:'absolute', right:6, top:0, bottom:0, width:2,
          background:'repeating-linear-gradient(to bottom,#bbb 0,#bbb 14px,transparent 14px,transparent 28px)',
          opacity:0.35,
        }}/>
        {/* Осевая линия */}
        <div style={{
          position:'absolute', left:'50%', top:0, bottom:0, width:3,
          transform:'translateX(-50%)',
          background:'repeating-linear-gradient(to bottom,#facc15 0,#facc15 16px,transparent 16px,transparent 34px)',
          opacity:0.45,
        }}/>

        {/* ── ЗНАКИ ── */}
        {visibleSigns.map(sign => {
          // Y позиция знака в viewport
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          const signScrollY = sign.pct * docH;
          const signViewY = signScrollY - window.scrollY + vh * 0.12 + sign.pct * (vh * 0.76);
          // Упрощённо: относительно машинки
          const vy = vh * 0.12 + sign.pct * (vh * 0.76) + (sign.pct - scrollPct) * vh * 0.0;
          const isAct = activeSignPcts.has(sign.pct);

          return (
            <div key={`${sign.pct}-${sign.side}`} style={{
              position:'absolute',
              top: vy - 30,
              left: sign.side === 'left' ? 3 : ROAD_W - 30,
              zIndex:60,
              display:'flex', alignItems:'flex-end',
              pointerEvents: sign.type === 'question' ? 'auto' : 'none',
            }}>
              <SignPost
                sign={sign}
                active={isAct}
                tlPhase={tlPhase}
                onFaqClick={(idx) => onFaqOpen?.(idx)}
              />
            </div>
          );
        })}

        {/* ── МАШИНКА ── */}
        <div style={{
          position:'absolute',
          top: carViewY - CAR_H / 2,
          left: carX + driftOffset,
          zIndex:70,
          transition:'top 0.12s linear, left 0.32s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents:'none',
        }}>
          {priceActive && <PriceCounter active={priceActive} />}

          <Car
            rot={carRot}
            brake={isBrake}
            hazard={isHazard}
            turnLeft={isTurnLeft}
            turnRight={isTurnRight}
            bounceY={bounceY}
            forwardTilt={forwardTilt}
            glow={glow}
            headlights={headlights}
            hidden={carHidden}
          />

          {/* Тултип над машинкой */}
          {tooltip && (
            <div style={{
              position:'absolute', top:-30, left:'50%',
              transform:'translateX(-50%)',
              background:'#facc15', color:'#111',
              fontSize:9, fontWeight:'bold',
              padding:'2px 7px', borderRadius:10,
              whiteSpace:'nowrap',
              fontFamily:'Golos Text,sans-serif',
              boxShadow:'0 2px 8px rgba(0,0,0,0.3)',
              animation:'tooltip-in 1.8s ease-in-out forwards',
              pointerEvents:'none', zIndex:80,
            }}>{tooltip}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default DrivingCar;
