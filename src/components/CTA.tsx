"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FadeIn from "./animations/FadeIn";
import FloatAnim from "./animations/FloatAnim";
import MagneticButton from "./animations/MagneticButton";

export default function CTA() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden', paddingTop: (!isMounted || !isMobile) ? '' : '40px', paddingBottom: (!isMounted || !isMobile) ? '' : '40px' }}>

      <div className="container" style={{ padding: '0 40px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ marginBottom: '40px' }}>Join the Women Shaping the <br/><span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Future of IP</span></h2>
          <p className="mobile-text-center" style={{ fontSize: '1.2rem', margin: '0 auto 20px', color: 'var(--text-body)', maxWidth: '900px', lineHeight: 1.6, textAlign: 'center' }}>
            The future of intellectual property will be shaped by women who collaborate across borders, share knowledge, inspire one another, and create lasting professional relationships.
          </p>
          <p className="mobile-text-center" style={{ fontSize: '1.2rem', margin: '0 auto 60px', color: 'var(--text-body)', maxWidth: '900px', lineHeight: 1.6, textAlign: 'center' }}>
            Become part of an international community committed to helping women connect, learn, lead, and succeed together. Join today and secure your place as one of our Founding Members.
          </p>
        </FadeIn>
        <FadeIn direction="up" delay={0.2} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <MagneticButton href="/waiting-list" className="btn btn-accent" style={{ padding: (!isMounted || !isMobile) ? '24px 48px' : '16px 24px', fontSize: (!isMounted || !isMobile) ? '1.4rem' : '1rem', whiteSpace: 'nowrap' }}>
            JOIN THE WAITING LIST
          </MagneticButton>
        </FadeIn>
      </div>
    </section>
  );
}
