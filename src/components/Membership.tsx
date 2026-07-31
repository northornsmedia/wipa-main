import FadeIn from "./animations/FadeIn";
import TextReveal from "./animations/TextReveal";
import StaggerGrid from "./animations/StaggerGrid";
import TiltCard from "./animations/TiltCard";
import React from "react";
import Link from "next/link";

const tiers = [
  { 
    name: "IP Professional Membership", 
    price: "£395",
    limit: "Limited to the first 300 members worldwide",
    desc: "For lawyers, patent attorneys, trade mark attorneys, IP practitioners, consultants, in-house counsel, and other intellectual property professionals.", 
    standardPrice: "Standard Membership Price: £695/year",
    style: "bg-pastel-green"
  },
  { 
    name: "Entrepreneur Membership", 
    price: "£295",
    limit: "Limited to the first 200 members worldwide",
    desc: "For founders, entrepreneurs, innovators, business owners, start-ups, and professionals commercialising intellectual property and innovation.", 
    standardPrice: "Standard Membership Price: £495/year",
    style: "bg-pastel-purple"
  },
  { 
    name: "Student Membership", 
    price: "£99",
    limit: "Limited to the first 200 members worldwide",
    desc: "For students, graduates, researchers, and early-career professionals pursuing careers in intellectual property, innovation, law, technology, or related disciplines.", 
    standardPrice: "Standard Membership Price: £149/year",
    style: "bg-pastel-pink"
  },
  { 
    name: "Enterprise Membership", 
    subtitle: "(IP Professional Teams)",
    extra: "5 IP Professional Memberships for the Price of 4",
    price: "£1,580",
    limit: "Saving £395 – One membership completely free",
    desc: "Perfect for law firms, corporate IP departments, universities, innovation teams, and organisations looking to provide membership benefits to multiple professionals while securing Founding Member status for their team.", 
    standardPrice: "Standard Price After Launch: £2,780/year",
    style: "bg-pastel-yellow"
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
              Join an international community dedicated to advancing women across intellectual property, innovation, technology, academia, and entrepreneurship. Secure your place today at our exclusive Founding Member rate before standard membership pricing applies.
            </p>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.3}>
          <div style={{
            margin: '40px auto 60px',
            padding: '40px',
            backgroundColor: 'var(--color-pastel-yellow)',
            color: 'var(--color-charcoal)',
            border: '2px solid var(--color-white)',
            boxShadow: '0px 0px 40px rgba(254, 243, 199, 0.2)',
            borderRadius: '32px',
            maxWidth: '900px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h4 style={{ fontSize: '2.2rem', marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              🔥 Your Founding Member Advantage
            </h4>
            <p style={{ fontSize: '1.2rem', margin: 0, lineHeight: 1.6, fontWeight: 600 }}>
              Joining as a Founding Member not only secures your place within the Alliance's inaugural community, but also <span style={{ backgroundColor: 'var(--color-pastel-pink)', padding: '2px 8px', borderRadius: '4px' }}>locks in your exclusive Founding Member rate</span> for future renewals. Once all Founding Memberships have been allocated, new members will join at the standard annual rates, while existing Founding Members will continue to benefit from their protected introductory pricing, provided their membership remains active.
            </p>
          </div>
        </FadeIn>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch' }}>
          {tiers.map((t, i) => (
            <TiltCard key={i} className={`${t.style}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px', borderRadius: '32px', border: '2px solid var(--color-black)', boxShadow: '8px 8px 0px var(--color-black)', height: '100%' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', marginBottom: '25px', paddingBottom: '25px', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                <h3 className="heading-md" style={{ lineHeight: 1.2, minHeight: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {t.name}
                  {t.subtitle && <span style={{ fontSize: '1.2rem', marginTop: '5px', opacity: 0.8 }}>{t.subtitle}</span>}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', justifyContent: 'center' }}>
                  <div style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{t.price}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>/ year</div>
                </div>
              </div>

              <div style={{ flexGrow: 1, marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {t.extra && <div style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '10px' }}>{t.extra}</div>}
                <div className="pulse-highlight" style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-black)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px', alignSelf: 'center' }}>🚨 {t.limit}</div>
                <div style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '20px', textAlign: 'center' }}>{t.desc}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>{t.standardPrice}</div>
              </div>

              <Link href={`/interest?plan=${encodeURIComponent(t.name)}`} style={{ textDecoration: 'none', width: '100%', marginTop: 'auto' }}>
                <button className="btn btn-outline pricing-btn" style={{ borderColor: 'var(--color-black)', color: 'var(--color-black)', width: '100%', backgroundColor: 'var(--color-white)', padding: '15px', fontSize: '1.1rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Reserve your founding membership</button>
              </Link>
            </TiltCard>
          ))}
        </StaggerGrid>



      </div>
    </section>
  );
}
