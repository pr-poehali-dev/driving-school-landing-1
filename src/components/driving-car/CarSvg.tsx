import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   МАШИНКА SVG
═══════════════════════════════════════════════════════════════════ */
export const CAR_W = 52;
export const CAR_H = 88;

export interface CarProps {
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

export const Car = ({ rot, brake, hazard, turnLeft, turnRight, bounceY, forwardTilt, glow, headlights, hidden }: CarProps) => {
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
export const PriceCounter = ({ active }: { active: boolean }) => {
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
