import { useEffect, useRef, useState } from 'react';

interface DrivingCarProps {
  sectionIds: string[];
}

type CarState = 'driving' | 'turning' | 'braking' | 'hazard' | 'stopped';

const DrivingCar = ({ sectionIds }: DrivingCarProps) => {
  const carRef = useRef<HTMLDivElement>(null);
  const [carTop, setCarTop] = useState(80);
  const [carState, setCarState] = useState<CarState>('hazard');
  const [rotation, setRotation] = useState(0);
  const stateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setCarState('driving'), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;

      const roadEl = document.getElementById('road-track');
      if (!roadEl) return;

      const roadRect = roadEl.getBoundingClientRect();
      const roadTop = roadEl.offsetTop;
      const roadHeight = roadEl.offsetHeight;
      const carHeight = 56;

      const newTop = roadTop + scrollPercent * (roadHeight - carHeight);
      setCarTop(newTop);

      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;

      if (Math.abs(delta) > 80) {
        setCarState('hazard');
        if (stateTimeout.current) clearTimeout(stateTimeout.current);
        stateTimeout.current = setTimeout(() => setCarState('driving'), 1500);
        return;
      }

      let nearSection = false;
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top >= -50 && rect.top <= window.innerHeight * 0.3) {
          nearSection = true;
          if (carState !== 'turning' && carState !== 'braking') {
            setCarState('turning');
            if (stateTimeout.current) clearTimeout(stateTimeout.current);
            stateTimeout.current = setTimeout(() => {
              setCarState('braking');
              stateTimeout.current = setTimeout(() => {
                setCarState('driving');
              }, 1500);
            }, 1500);
          }
        }
      });

      if (scrollPercent >= 0.98) {
        setCarState('stopped');
      } else if (!nearSection && carState === 'driving') {
        setRotation(delta > 0 ? 2 : -2);
        setTimeout(() => setRotation(0), 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, carState]);

  const getTurnSignalColor = () => {
    if (carState === 'turning') return '#f59e0b';
    return 'transparent';
  };

  const getBrakeLightColor = () => {
    if (carState === 'braking' || carState === 'stopped') return '#ef4444';
    return '#7f1d1d';
  };

  const getHazardColor = () => {
    if (carState === 'hazard') return '#f59e0b';
    return 'transparent';
  };

  return (
    <div
      id="road-track"
      className="absolute left-0 top-0 bottom-0 w-16 md:w-20"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-full flex flex-col items-center"
        style={{
          background: 'linear-gradient(to bottom, #d1d5db 0%, #9ca3af 100%)',
        }}
      >
        <div
          className="absolute left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 road-line opacity-60"
        />
        <div
          className="absolute left-2 top-0 bottom-0 w-0.5 bg-white opacity-40"
        />
        <div
          className="absolute right-2 top-0 bottom-0 w-0.5 bg-white opacity-40"
        />
      </div>

      <div
        ref={carRef}
        className="absolute left-1/2 -translate-x-1/2 transition-none"
        style={{
          top: `${carTop}px`,
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          transition: 'top 0.15s linear, transform 0.3s ease',
          width: '40px',
          zIndex: 10,
        }}
      >
        <svg viewBox="0 0 40 70" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="70">
          <rect x="5" y="15" width="30" height="40" rx="6" fill="#1E2A3E" />
          <rect x="8" y="8" width="24" height="22" rx="5" fill="#2563EB" />
          <rect x="10" y="10" width="20" height="16" rx="3" fill="#93C5FD" opacity="0.8" />
          <rect x="6" y="50" width="28" height="8" rx="3" fill="#1E2A3E" />

          <rect x="6" y="5" width="12" height="6" rx="2" fill="#FEF3C7" opacity="0.9" />
          <rect x="22" y="5" width="12" height="6" rx="2" fill="#FEF3C7" opacity="0.9" />

          <rect
            x="6" y="55" width="12" height="6" rx="2"
            fill={getBrakeLightColor()}
            className={carState === 'braking' || carState === 'stopped' ? 'car-braking' : ''}
          />
          <rect
            x="22" y="55" width="12" height="6" rx="2"
            fill={getBrakeLightColor()}
            className={carState === 'braking' || carState === 'stopped' ? 'car-braking' : ''}
          />

          <rect
            x="28" y="3" width="6" height="5" rx="1.5"
            fill={carState === 'hazard' ? getHazardColor() : getTurnSignalColor()}
            className={
              carState === 'turning' ? 'car-turn-right' :
              carState === 'hazard' ? 'car-hazard' : ''
            }
          />
          {carState === 'hazard' && (
            <rect
              x="6" y="3" width="6" height="5" rx="1.5"
              fill={getHazardColor()}
              className="car-hazard"
            />
          )}

          <rect x="0" y="25" width="5" height="16" rx="2" fill="#374151" />
          <rect x="35" y="25" width="5" height="16" rx="2" fill="#374151" />
          <rect x="0" y="42" width="5" height="14" rx="2" fill="#374151" />
          <rect x="35" y="42" width="5" height="14" rx="2" fill="#374151" />
        </svg>
      </div>
    </div>
  );
};

export default DrivingCar;
