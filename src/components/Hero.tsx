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
        <FadeIn direction="up" delay={0.1}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--color-pastel-purple)', color: 'var(--color-black)', padding: '8px 16px', borderRadius: '30px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
            Launching January 2027 | Become a Founding Member
          </div>
        </FadeIn>
        
        <TextReveal 
          lines={["The Global Community", "for Women in", "Intellectual Property."]} 
          className="heading-huge" 
          style={{ maxWidth: '1100px' }} 
        />
        
        <FadeIn direction="up" delay={0.2} style={{ display: 'flex', gap: '40px', marginTop: '60px', alignItems: 'flex-start' }}>
          <p style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            The Women's IP World Alliance is an international membership community bringing together women across intellectual property, innovation, technology, law, academia, research, and entrepreneurship. Developed by the team behind <i>The Women's IP World Annual</i>, the Alliance provides year-round opportunities to connect, collaborate, develop professionally, and lead globally.
          </p>
          <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '300px' }}>
            <MagneticButton href="#membership" className="btn btn-accent" style={{ padding: '20px 40px', fontSize: '1.2rem', width: '100%' }}>
              Become a Founding Member
            </MagneticButton>
            <MagneticButton href="#join" className="btn btn-outline" style={{ padding: '15px 40px', fontSize: '1.1rem', backgroundColor: 'transparent', color: 'var(--color-white)', border: '2px solid var(--color-white)', width: '100%' }}>
              Join the Waiting List
            </MagneticButton>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.4} style={{ marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '30px', display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {["Global Community", "Exclusive Events", "International Networking", "Educational Webinars", "Leadership Development"].map((highlight, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--color-pastel-green)' }}>✓</span> {highlight}
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
