import Link from "next/link";
import FadeIn from "./animations/FadeIn";
import FloatAnim from "./animations/FloatAnim";
import MagneticButton from "./animations/MagneticButton";

export default function CTA() {
  return (
    <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>

      <div className="container" style={{ padding: '120px 40px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ marginBottom: '40px' }}>Join the Women Shaping the <br/><span style={{ color: 'var(--color-pastel-pink)' }}>Future of IP</span></h2>
          <p style={{ fontSize: '1.2rem', margin: '0 auto 20px', opacity: 0.9, maxWidth: '900px', lineHeight: 1.6 }}>
            The future of intellectual property will be shaped by women who collaborate across borders, share knowledge, inspire one another, and create lasting professional relationships.
          </p>
          <p style={{ fontSize: '1.2rem', margin: '0 auto 60px', opacity: 0.9, maxWidth: '900px', lineHeight: 1.6 }}>
            Become part of an international community committed to helping women connect, learn, lead, and succeed together. Join today and secure your place as one of our Founding Members.
          </p>
        </FadeIn>
        <FadeIn direction="up" delay={0.2} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <MagneticButton href="#membership" className="btn btn-accent" style={{ padding: '24px 48px', fontSize: '1.4rem' }}>
            Become a Founding Member
          </MagneticButton>
          <MagneticButton href="#join" className="btn btn-outline" style={{ padding: '24px 48px', fontSize: '1.4rem', backgroundColor: 'transparent', color: 'var(--color-white)', border: '2px solid var(--color-white)' }}>
            Join the Waiting List
          </MagneticButton>
        </FadeIn>
      </div>
    </section>
  );
}
