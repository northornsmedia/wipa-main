import FadeIn from "./animations/FadeIn";
import TextReveal from "./animations/TextReveal";
import StaggerGrid from "./animations/StaggerGrid";
import TiltCard from "./animations/TiltCard";
import React from "react";

const tiers = [
  { 
    name: "IP Professionals", 
    desc: "For IP lawyers, attorneys, trademark practitioners, patent professionals, in-house counsel, academics, and consultants.", 
    price: "£395",
    style: "bg-pastel-green"
  },
  { 
    name: "Start-Up Law Firms & Emerging IP Businesses", 
    desc: (
      <>
        For founders, innovators, entrepreneurs, business owners, and technology leaders looking to scale global visibility.
        <div style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-pastel-purple)', padding: '8px 12px', marginTop: '15px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600, display: 'block' }}>
          Open to businesses founded within the past 12 months.
        </div>
      </>
    ), 
    price: "£295",
    style: "bg-pastel-purple"
  },
  { 
    name: "Students & Alumni", 
    desc: "For students and recent graduates pursuing careers in intellectual property, innovation, law, or related disciplines.", 
    price: "£99",
    style: "bg-pastel-pink"
  },
];

export default function Membership() {
  return (
    <section id="membership" className="section section-dark">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextReveal 
            lines={["Membership", "Investment."]} 
            className="heading-huge" 
            style={{ marginBottom: '10px' }} 
          />
          <FadeIn direction="up" delay={0.2}>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              To celebrate the inaugural launch of the Alliance, exclusive introductory membership rates will be available exclusively during our first year. This special launch offer provides a unique opportunity to become one of the Alliance&apos;s first members and shape the beginning of this global community.
            </p>
          </FadeIn>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch' }}>
          {tiers.map((t, i) => (
            <TiltCard key={i} className={`pill-container ${t.style}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px 25px', border: '2px solid var(--color-black)', boxShadow: '6px 6px 0px var(--color-black)', height: '100%' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginBottom: '20px' }}>
                <h3 className="heading-md" style={{ lineHeight: 1.1, minHeight: '85px', display: 'flex', alignItems: 'flex-start' }}>{t.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{t.price}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase' }}>/ year</div>
                </div>
              </div>

              <div style={{ flexGrow: 1, marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.5 }}>{t.desc}</div>
              </div>

              <button className="btn btn-outline" style={{ borderColor: 'var(--color-black)', color: 'var(--color-black)', width: '100%', marginTop: 'auto', backgroundColor: 'var(--color-white)' }}>SELECT PLAN</button>
            </TiltCard>
          ))}
        </StaggerGrid>

        <FadeIn direction="up" delay={0.4}>
          <div style={{ marginTop: '60px', padding: '30px', backgroundColor: 'var(--color-charcoal-light)', border: '2px solid var(--color-pastel-yellow)', borderRadius: '20px', maxWidth: '1000px', margin: '60px auto 0', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>
              <strong style={{ color: 'var(--color-pastel-yellow)' }}>Important Note on Renewals:</strong> These introductory launch rates are available exclusively during the Alliance&apos;s first year and can only be purchased once. Standard membership rates will apply upon renewal.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
