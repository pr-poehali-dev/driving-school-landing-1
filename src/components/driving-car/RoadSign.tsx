import { RoadSign as RoadSignType } from './roadTypes';

/* ═══════════════════════════════════════════════════════════════════
   СВЕТОФОР
═══════════════════════════════════════════════════════════════════ */
export const TrafficLight = ({ phase }: { phase: 'red'|'yellow'|'green'|'off' }) => (
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

/* ═══════════════════════════════════════════════════════════════════
   ДОРОЖНЫЙ ЗНАК
═══════════════════════════════════════════════════════════════════ */
export const SignPost = ({ sign, active, tlPhase, onFaqClick }: {
  sign: RoadSignType;
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
