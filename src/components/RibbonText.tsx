export default function RibbonText({ text, top = 0, right = 0 }: { text: string; top?: string | number; right?: string | number }) {
  return (
    <div 
      style={{ position: 'absolute', top, right, zIndex: 0, opacity: 0.4, pointerEvents: 'none', transform: 'scale(1.8)', transformOrigin: 'center right' }}
    >
      <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,1))' }}>
        {/* The Ribbon Background */}
        <path id="curve" d="M 0 600 Q 400 600, 400 300 T 800 0" stroke="var(--color-pastel-purple)" strokeWidth="80" strokeLinecap="round" fill="transparent" />
        
        {/* The Text inside the Ribbon */}
        <text style={{ fontSize: '24px', letterSpacing: '4px', textTransform: 'uppercase', fill: 'var(--color-black)', fontWeight: 800 }} dy="8">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
