export const CAR_W = 30;
export const CAR_H = 58;

export interface CarLights {
  brake: boolean;
  hazard: boolean;
  signalLeft: boolean;
  signalRight: boolean;
}

const Lamp = ({ on, blink, x, y, w, h, color, off }: {
  on: boolean; blink?: boolean; x: number; y: number; w: number; h: number; color: string; off: string;
}) => (
  <rect
    x={x} y={y} width={w} height={h} rx={1.2}
    fill={on ? color : off}
    style={{
      transition: 'fill 300ms cubic-bezier(0.22,1,0.36,1)',
      animation: on && blink ? 'dc-blink 900ms steps(1, end) infinite' : undefined,
      filter: on ? `drop-shadow(0 0 2.5px ${color})` : undefined,
    }}
  />
);

const Car = ({ brake, hazard, signalLeft, signalRight }: CarLights) => {
  const left = hazard || signalLeft;
  const right = hazard || signalRight;

  return (
    <svg viewBox="0 0 40 78" width={CAR_W} height={CAR_H} style={{ overflow: 'visible', display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id="dc-body" x1="0" x2="1">
          <stop offset="0" stopColor="#D9DEE5" />
          <stop offset="0.18" stopColor="#F7F8FA" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="0.82" stopColor="#F2F4F7" />
          <stop offset="1" stopColor="#CDD3DB" />
        </linearGradient>
        <linearGradient id="dc-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B3D52" />
          <stop offset="1" stopColor="#0E1724" />
        </linearGradient>
        <linearGradient id="dc-roof" x1="0" x2="1">
          <stop offset="0" stopColor="#E4E8EE" />
          <stop offset="0.5" stopColor="#FAFBFC" />
          <stop offset="1" stopColor="#DDE2E8" />
        </linearGradient>
        <radialGradient id="dc-beam" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#FFF7D6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFF7D6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d="M6 76 L-4 108 L44 108 L34 76 Z" fill="url(#dc-beam)" opacity="0.5" />

      <ellipse cx="20" cy="40" rx="21" ry="38" fill="rgba(0,0,0,0.28)" style={{ filter: 'blur(2.5px)' }} />

      <rect x="0.5" y="11" width="5" height="12" rx="2" fill="#15181C" />
      <rect x="34.5" y="11" width="5" height="12" rx="2" fill="#15181C" />
      <rect x="0.5" y="54" width="5" height="12" rx="2" fill="#15181C" />
      <rect x="34.5" y="54" width="5" height="12" rx="2" fill="#15181C" />

      <path
        d="M9 1.5 C14 0.6 26 0.6 31 1.5 C35.5 2.4 37.5 5.5 37.8 10 L38.2 64 C38 71.5 35.5 75.6 30 76.6 C24 77.5 16 77.5 10 76.6 C4.5 75.6 2 71.5 1.8 64 L2.2 10 C2.5 5.5 4.5 2.4 9 1.5 Z"
        fill="url(#dc-body)" stroke="#AEB6C0" strokeWidth="0.6"
      />

      <path d="M7 13 C12 10.5 28 10.5 33 13 L31.5 19.5 C26 18 14 18 8.5 19.5 Z" fill="url(#dc-glass)" />
      <path d="M8.6 20.5 C14 19.2 26 19.2 31.4 20.5 L31.2 50.5 C26 51.8 14 51.8 8.8 50.5 Z" fill="url(#dc-roof)" stroke="#C7CED6" strokeWidth="0.5" />
      <path d="M8.8 51.5 C14 53 26 53 31.2 51.5 L33.2 60.5 C28 63 12 63 6.8 60.5 Z" fill="url(#dc-glass)" />
      <path d="M10 53.5 C15 54.6 25 54.6 30 53.5 L30.8 56.5 C25 58 15 58 9.2 56.5 Z" fill="#FFFFFF" opacity="0.12" />

      <path d="M7.2 21 L8.3 50 L6.6 50.3 L5.6 21.5 Z" fill="#1A2533" opacity="0.85" />
      <path d="M32.8 21 L31.7 50 L33.4 50.3 L34.4 21.5 Z" fill="#1A2533" opacity="0.85" />

      <rect x="18.4" y="2" width="1.3" height="74" fill="#1A6FEF" opacity="0.9" />
      <rect x="20.3" y="2" width="1.3" height="74" fill="#1A6FEF" opacity="0.9" />

      <path d="M20 29.5 L25.2 38.5 L14.8 38.5 Z" fill="#FFFFFF" stroke="#C8102E" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="20" y="37.4" textAnchor="middle" fontSize="5.4" fontWeight="700" fontFamily="Arial, sans-serif" fill="#111">У</text>

      <rect x="-1.2" y="56.5" width="3.6" height="2.4" rx="1" fill="#E9EDF2" stroke="#AEB6C0" strokeWidth="0.4" />
      <rect x="37.6" y="56.5" width="3.6" height="2.4" rx="1" fill="#E9EDF2" stroke="#AEB6C0" strokeWidth="0.4" />

      <Lamp on={false} x={5} y={70.5} w={8} h={3} color="#FFF4C2" off="#F6F1DA" />
      <Lamp on={false} x={27} y={70.5} w={8} h={3} color="#FFF4C2" off="#F6F1DA" />
      <Lamp on={left} blink x={3.2} y={67} w={3} h={2.4} color="#FFB020" off="#E8D3A8" />
      <Lamp on={right} blink x={33.8} y={67} w={3} h={2.4} color="#FFB020" off="#E8D3A8" />

      <Lamp on={brake} x={4.2} y={3.2} w={8} h={2.6} color="#FF2A2A" off="#9E1B1B" />
      <Lamp on={brake} x={27.8} y={3.2} w={8} h={2.6} color="#FF2A2A" off="#9E1B1B" />
      <Lamp on={left} blink x={3} y={6.4} w={3} h={2} color="#FFB020" off="#B9862E" />
      <Lamp on={right} blink x={34} y={6.4} w={3} h={2} color="#FFB020" off="#B9862E" />
    </svg>
  );
};

export default Car;
