import Link from "next/link";
import FadeIn from "./animations/FadeIn";
import FloatAnim from "./animations/FloatAnim";
import MagneticButton from "./animations/MagneticButton";

export default function CTA() {
  return (
    <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>


      <FloatAnim delay={0.3} className="sticker" style={{ '--rot': '-45deg', position: 'absolute', backgroundColor: 'var(--color-pastel-pink)', color: 'var(--color-black)', top: '20%', left: '15%' } as React.CSSProperties}>✨</FloatAnim>

      <div className="container" style={{ padding: '120px 40px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ marginBottom: '40px' }}>Join the Movement</h2>
          <p style={{ fontSize: '1.4rem', margin: '0 auto 60px', opacity: 0.9, maxWidth: '800px' }}>
            WIPA isn&apos;t just a platform — it&apos;s a commitment to equity in intellectual property.
          </p>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <MagneticButton href="https://wipa.vercel.app" className="btn btn-accent" style={{ padding: '24px 48px', fontSize: '1.4rem' }}>
            Create Free Account
          </MagneticButton>
        </FadeIn>
      </div>
    </section>
  );
}
