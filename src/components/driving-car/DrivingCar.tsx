import { useEffect, useRef, useState, useCallback } from 'react';
import { SIGNS, curveX, carRotFromCurve, launchConfetti, shakeScreen } from './roadTypes';
import { Car, PriceCounter, CAR_H } from './CarSvg';
import { SignPost } from './RoadSign';

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
  const handleSignActivation = useCallback((sign: typeof SIGNS[number]) => {
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
