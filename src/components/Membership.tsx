import FadeIn from "./animations/FadeIn";
import TextReveal from "./animations/TextReveal";
import StaggerGrid from "./animations/StaggerGrid";
import TiltCard from "./animations/TiltCard";
import React from "react";

const tiers = [
  { 
    name: "IP Professionals", 
    desc: "For lawyers, attorneys, trade mark professionals, patent practitioners, consultants, and in-house counsel.", 
    price: "£395",
    style: "bg-pastel-green"
  },
  { 
    name: "Start-ups & Emerging Businesses", 
    desc: (
      <>
        For founders, entrepreneurs, innovators, and businesses established within the previous 12 months.
      </>
    ), 
    price: "£295",
    style: "bg-pastel-purple"
  },
  { 
    name: "Students & Alumni", 
    desc: "For students and graduates beginning careers across intellectual property and innovation.", 
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
            lines={["Invest in", "Your Future"]} 
            className="heading-huge" 
            style={{ marginBottom: '10px' }} 
          />
          <FadeIn direction="up" delay={0.2}>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              Your membership is an investment in lifelong professional development, international networking, leadership opportunities, and meaningful global connections.
            </p>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              Choose the membership designed for your stage of career and become part of an international community shaping the future of intellectual property.
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
              <strong style={{ color: 'var(--color-pastel-yellow)' }}>Note:</strong> Founding Member rates are available exclusively during the Alliance&apos;s inaugural launch period and are available for a limited time. Standard membership rates will apply upon renewal.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
