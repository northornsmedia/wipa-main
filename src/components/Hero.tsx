import FadeIn from "./animations/FadeIn";
import TextReveal from "./animations/TextReveal";
import FloatAnim from "./animations/FloatAnim";
import MagneticButton from "./animations/MagneticButton";
import MeshGradient from "./animations/MeshGradient";

export default function Hero() {
  return (
    <section className="section section-dark" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      
      <MeshGradient />

      <FloatAnim delay={0} className="sticker" style={{ '--rot': '-15deg', backgroundColor: 'var(--color-pastel-purple)', top: '15%', left: '10%' } as React.CSSProperties}>✿</FloatAnim>
      <FloatAnim delay={1} className="sticker" style={{ '--rot': '25deg', backgroundColor: 'var(--color-accent-yellow)', bottom: '20%', right: '15%', width: '120px', height: '120px', fontSize: '3rem' } as React.CSSProperties}>✨</FloatAnim>

      <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <TextReveal 
          lines={["Advance &", "Connect Women", "in Innovation."]} 
          className="heading-huge" 
          style={{ maxWidth: '1100px' }} 
        />
        
        <FadeIn direction="up" delay={0.2} style={{ display: 'flex', gap: '40px', marginTop: '60px', alignItems: 'flex-start' }}>
          <p style={{ maxWidth: '400px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
            The premier digital platform built exclusively for professionals in Patents, Trademarks, Copyright, and Deep Tech.
          </p>
          <div style={{ pointerEvents: 'auto' }}>
            <MagneticButton href="https://wipa.vercel.app" className="btn btn-accent" style={{ padding: '20px 40px', fontSize: '1.2rem' }}>
              Join the Movement
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
