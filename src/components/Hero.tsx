import FadeIn from "./animations/FadeIn";
import MagneticButton from "./animations/MagneticButton";

export default function Hero() {
  return (
    <section className="section section-dark" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>

      <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <FadeIn direction="up" delay={0.1}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--color-pastel-purple)', color: 'var(--color-black)', padding: '8px 16px', borderRadius: '30px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '30px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
            Launching January 2027 | Become a Founding Member
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1} style={{ width: '100%' }}>
          <h1 className="heading-huge" style={{ maxWidth: '100%', margin: '0 auto', fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', lineHeight: 1.1 }}>
            The Global Community for Women in <br/> Intellectual Property
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2} style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '40px', alignItems: 'center', width: '100%' }}>
          <p style={{ maxWidth: '800px', fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            The Women's IP Alliance is an international membership community bringing together women across intellectual property, innovation, technology, law, academia, research, and entrepreneurship. Developed by the team behind <i>The Women's IP World Annual</i>, the Alliance provides year-round opportunities to connect, collaborate, develop professionally, and lead globally.
          </p>
          
          <div style={{ pointerEvents: 'auto', display: 'flex', gap: '20px', width: '100%', maxWidth: '600px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagneticButton href="#membership" className="btn btn-accent" style={{ padding: '20px 40px', fontSize: '1.2rem', flex: '1 1 250px' }}>
              Become a Founding Member
            </MagneticButton>
            <MagneticButton href="#join" className="btn btn-outline" style={{ padding: '15px 40px', fontSize: '1.1rem', backgroundColor: 'transparent', color: 'var(--color-white)', border: '2px solid var(--color-white)', flex: '1 1 250px' }}>
              Join the Waiting List
            </MagneticButton>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.4} style={{ marginTop: '70px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '30px', display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
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
