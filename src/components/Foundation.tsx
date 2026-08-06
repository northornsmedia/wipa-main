"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const highlights = [
  { title: "International Community", style: "bg-pastel-pink" },
  { title: "Global Recognition", style: "bg-pastel-yellow" },
  { title: "Industry Credibility", style: "bg-pastel-purple" },
  { title: "Professional Excellence", style: "bg-pastel-green" },
  { title: "Trusted Network", style: "bg-charcoal" },
];

export default function Foundation() {
  const containerRef = useRef<HTMLElement>(null);
  const sticker1Ref = useRef<HTMLImageElement>(null);
  const sticker2Ref = useRef<HTMLImageElement>(null);
  const sticker3Ref = useRef<HTMLImageElement>(null);
  const sticker4Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const stickers = [
        sticker1Ref.current,
        sticker3Ref.current,
        sticker2Ref.current,
        sticker4Ref.current
      ];

      gsap.fromTo(
        stickers,
        { scale: 0, opacity: 0, rotation: () => gsap.utils.random(-45, 45) },
        {
          scale: 1,
          opacity: 1,
          rotation: () => gsap.utils.random(-15, 15),
          duration: 1,
          stagger: 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section section-white" style={{ position: 'relative' }}>
      
      {/* Decorative Stickers */}
      <img ref={sticker1Ref} src="/sticker (1).png" alt="WIPA global networking decorative sticker" style={{ position: 'absolute', top: '15%', left: '8%', width: '160px', zIndex: 0, objectFit: 'contain' }} className="foundation-sticker" />
      <img ref={sticker2Ref} src="/sticker (4).png" alt="Empowering women in IP sticker" style={{ position: 'absolute', bottom: '35%', left: '12%', width: '220px', zIndex: 0, objectFit: 'contain' }} className="foundation-sticker" />
      <img ref={sticker3Ref} src="/sticker (3).png" alt="Women's IP Alliance innovation sticker" style={{ position: 'absolute', top: '20%', right: '10%', width: '150px', zIndex: 0, objectFit: 'contain' }} className="foundation-sticker" />
      <img ref={sticker4Ref} src="/sticker (2).png" alt="Patents and Trademarks decorative sticker" style={{ position: 'absolute', bottom: '40%', right: '5%', width: '180px', zIndex: 0, objectFit: 'contain' }} className="foundation-sticker" />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <div style={{ display: 'inline-block', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '8px 16px', borderRadius: '30px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '20px' }}>
              Powered by The Women's IP World
            </div>
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              An International Legacy
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              The Women's IP Alliance has been developed by the team behind The Women's IP World Annual—the world's leading publication celebrating women across intellectual property.
            </p>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              For years, the publication has connected outstanding professionals from every region, showcasing leadership, celebrating achievement, and promoting diversity across patents, trade marks, innovation, technology, academia, and law.
            </p>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              The Alliance extends this trusted global network beyond an annual publication, creating a vibrant year-round ecosystem where relationships continue to grow long after conferences and publications are complete.
            </p>
          </FadeIn>
        </div>

      </div>
      
      <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 10 }}>
        <StaggerGrid className="foundation-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', width: '100%' }}>
          {highlights.map((h, i) => (
            <div key={i} className={`pill-container ${h.style}`} style={{ padding: '40px 20px', textAlign: 'center', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, minWidth: '220px' }}>
              <h4 className="heading-md foundation-pill-text" style={{ color: h.style === 'bg-charcoal' ? 'var(--color-white)' : 'var(--color-black)' }}>{h.title}</h4>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
