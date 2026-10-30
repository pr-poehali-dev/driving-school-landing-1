export type SignKind = 'roadworks' | 'parking' | 'speed' | 'fuel' | 'stop' | 'traffic-light';
export type LightPhase = 'red' | 'yellow' | 'green';

const Post = ({ height = 34 }: { height?: number }) => (
  <svg width="6" height={height} viewBox={`0 0 6 ${height}`} style={{ display: 'block', margin: '-1px auto 0' }}>
    <defs>
      <linearGradient id="sg-post" x1="0" x2="1">
        <stop offset="0" stopColor="#7C838C" />
        <stop offset="0.45" stopColor="#E3E7EC" />
        <stop offset="1" stopColor="#6B727B" />
      </linearGradient>
    </defs>
    <rect x="1.5" y="0" width="3" height={height} fill="url(#sg-post)" />
    <ellipse cx="3" cy={height - 0.5} rx="3" ry="1" fill="rgba(0,0,0,0.25)" />
  </svg>
);

const plateShadow = { filter: 'drop-shadow(0 2px 2px rgba(10,22,40,0.35))' };

const Triangle = ({ children }: { children: React.ReactNode }) => (
  <svg width="34" height="31" viewBox="0 0 34 31" style={plateShadow}>
    <path d="M17 1.2 L33 29.4 H1 Z" fill="#FFFFFF" stroke="#D5DAE0" strokeWidth="0.8" strokeLinejoin="round" />
    <path d="M17 3.6 L31 28.2 H3 Z" fill="#E30613" strokeLinejoin="round" />
    <path d="M17 8.4 L26.8 25.6 H7.2 Z" fill="#FFFFFF" />
    {children}
  </svg>
);

const Roadworks = () => (
  <Triangle>
    <g fill="#111">
      <circle cx="15.2" cy="13.6" r="1.25" />
      <path d="M14.6 15.2 L17.4 15.6 L18.6 19.6 L20.6 22.8 L19.6 23.4 L17.4 20.4 L15.6 21 L14.8 23.6 L13.6 23.3 L14.3 20 L13.4 17.4 Z" />
      <path d="M12.2 18.6 L11.6 17.9 L14.4 16 L14.8 16.8 Z" />
      <path d="M10.4 23.8 C11 21.8 12.6 21.2 13.6 22 L13.2 23.8 Z" />
      <path d="M11.2 15.8 L11.8 15.4 L13.8 22.6 L13.2 22.9 Z" />
    </g>
  </Triangle>
);

const Parking = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" style={plateShadow}>
    <rect x="0.5" y="0.5" width="27" height="27" rx="3" fill="#FFFFFF" stroke="#D5DAE0" strokeWidth="0.6" />
    <rect x="2" y="2" width="24" height="24" rx="2" fill="#0057B8" />
    <text x="14" y="21.6" textAnchor="middle" fontSize="19" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif" fill="#FFFFFF">P</text>
  </svg>
);

const Speed = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" style={plateShadow}>
    <circle cx="15" cy="15" r="14.4" fill="#FFFFFF" stroke="#D5DAE0" strokeWidth="0.6" />
    <circle cx="15" cy="15" r="13" fill="#E30613" />
    <circle cx="15" cy="15" r="9.6" fill="#FFFFFF" />
    <text x="15" y="18.9" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif" fill="#111" letterSpacing="-0.4">40</text>
  </svg>
);

const Fuel = () => (
  <svg width="26" height="34" viewBox="0 0 26 34" style={plateShadow}>
    <rect x="0.5" y="0.5" width="25" height="33" rx="2.5" fill="#FFFFFF" stroke="#D5DAE0" strokeWidth="0.6" />
    <rect x="2" y="2" width="22" height="30" rx="1.6" fill="#0057B8" />
    <rect x="5" y="9" width="16" height="16" fill="#FFFFFF" />
    <g fill="#111">
      <rect x="8.2" y="11.6" width="6.4" height="10.6" rx="0.6" />
      <rect x="7.4" y="21.6" width="8" height="1.4" />
      <path d="M14.6 13.6 H16.4 L17.8 15 V20.2 C17.8 21 18.8 21 18.8 20.2 V15.8 L17.2 14.2 L17.8 13.6 L19.6 15.4 V20.2 C19.6 22 17 22 17 20.2 V15.4 L16 14.4 H14.6 Z" />
    </g>
    <rect x="9.3" y="12.8" width="4.2" height="3" fill="#FFFFFF" />
  </svg>
);

const Stop = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" style={plateShadow}>
    <path d="M9.2 0.6 H20.8 L29.4 9.2 V20.8 L20.8 29.4 H9.2 L0.6 20.8 V9.2 Z" fill="#FFFFFF" stroke="#D5DAE0" strokeWidth="0.6" />
    <path d="M9.8 2 H20.2 L28 9.8 V20.2 L20.2 28 H9.8 L2 20.2 V9.8 Z" fill="#E30613" />
    <text x="15" y="18.4" textAnchor="middle" fontSize="8.4" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif" fill="#FFFFFF" letterSpacing="0.2">STOP</text>
  </svg>
);

const LIGHT = {
  red: { on: '#FF3B30', off: '#3A1210' },
  yellow: { on: '#FFB800', off: '#3A2A08' },
  green: { on: '#2BD46A', off: '#0C2A18' },
} as const;

const TrafficLight = ({ phase }: { phase: LightPhase }) => (
  <svg width="18" height="44" viewBox="0 0 18 44" style={plateShadow}>
    <defs>
      <linearGradient id="tl-body" x1="0" x2="1">
        <stop offset="0" stopColor="#15181C" />
        <stop offset="0.5" stopColor="#2A2F36" />
        <stop offset="1" stopColor="#111316" />
      </linearGradient>
    </defs>
    <rect x="2" y="0.5" width="14" height="43" rx="3" fill="url(#tl-body)" stroke="#000" strokeWidth="0.5" />
    {(['red', 'yellow', 'green'] as const).map((c, i) => {
      const cy = 8 + i * 14;
      const on = phase === c;
      return (
        <g key={c}>
          <circle cx="9" cy={cy} r="4.6" fill="#0A0B0D" />
          <circle
            cx="9" cy={cy} r="3.8"
            fill={on ? LIGHT[c].on : LIGHT[c].off}
            style={{
              transition: 'fill 350ms cubic-bezier(0.22,1,0.36,1)',
              filter: on ? `drop-shadow(0 0 3px ${LIGHT[c].on})` : undefined,
            }}
          />
          <circle cx="7.8" cy={cy - 1.3} r="1" fill="#FFFFFF" opacity={on ? 0.55 : 0.12} />
          <path d={`M3 ${cy - 5.4} H15 L13.4 ${cy - 3} H4.6 Z`} fill="#0A0B0D" />
        </g>
      );
    })}
  </svg>
);

export const RoadSignView = ({ kind, phase = 'red' }: { kind: SignKind; phase?: LightPhase }) => {
  const plate = {
    roadworks: <Roadworks />,
    parking: <Parking />,
    speed: <Speed />,
    fuel: <Fuel />,
    stop: <Stop />,
    'traffic-light': <TrafficLight phase={phase} />,
  }[kind];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {plate}
      <Post height={kind === 'traffic-light' ? 30 : 36} />
    </div>
  );
};
