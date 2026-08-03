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
      <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 40px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', width: '100%', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <TextReveal 
              lines={["INVEST IN YOUR FUTURE"]} 
              style={{ marginBottom: '10px' }} 
            />
          </div>
          <FadeIn direction="up" delay={0.2} style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-white)', opacity: 0.9, maxWidth: '1200px', margin: '0 auto 25px', lineHeight: 1.8, fontWeight: 300 }}>
              Your membership is an investment in <span style={{ color: 'var(--color-pastel-purple)', fontWeight: 600 }}>lifelong professional development</span>, international networking, leadership opportunities, and meaningful global connections.
            </p>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-white)', opacity: 0.9, maxWidth: '1200px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
              Join an international community dedicated to advancing women across intellectual property, innovation, technology, academia, and entrepreneurship. Secure your place today at our <span style={{ color: 'var(--color-pastel-green)', fontWeight: 600 }}>exclusive Founding Member rate</span> before standard membership pricing applies.
            </p>
          </FadeIn>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 40px' }}>
        <FadeIn direction="up" delay={0.3}>
          <div style={{
            margin: '20px auto 60px',
            padding: '30px 40px',
            backgroundColor: 'transparent',
            color: 'var(--color-white)',
            border: '2px dotted rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            maxWidth: '100%',
            textAlign: 'center',
            position: 'relative'
          }}>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '12px', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--color-pastel-purple)' }}>
              Your Founding Member Advantage
            </h4>
            <p style={{ fontSize: '1.0rem', margin: 0, lineHeight: 1.6, fontWeight: 400, fontStyle: 'italic', opacity: 0.9 }}>
              Joining as a Founding Member not only secures your place within the Alliance's inaugural community, but also <span style={{ backgroundColor: 'var(--color-pastel-pink)', color: 'var(--color-black)', padding: '2px 8px', borderRadius: '4px', fontStyle: 'normal', fontWeight: 600 }}>locks in your exclusive Founding Member rate</span> for future renewals. Once all Founding Memberships have been allocated, new members will join at the standard annual rates, while existing Founding Members will continue to benefit from their protected introductory pricing, provided their membership remains active.
            </p>
          </div>
        </FadeIn>
      </div>

      <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 40px' }}>
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
          {tiers.map((t, i) => (
            <TiltCard key={i} className={`${t.style}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '30px', borderRadius: '32px', border: '2px solid var(--color-black)', boxShadow: '8px 8px 0px var(--color-black)', height: '100%' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', marginBottom: '25px', paddingBottom: '25px', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                <h3 className="heading-md" style={{ lineHeight: 1.2, minHeight: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {t.name}
                  {t.subtitle && <span style={{ fontSize: '1.2rem', marginTop: '5px', opacity: 0.8 }}>{t.subtitle}</span>}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', justifyContent: 'center' }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{t.price}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>/ year</div>
                </div>
              </div>

              <div style={{ flexGrow: 1, marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {t.extra && <div style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '10px' }}>{t.extra}</div>}
                <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--color-black)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px', alignSelf: 'center' }}>{t.limit}</div>
                <div style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '20px', textAlign: 'center' }}>{t.desc}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>{t.standardPrice}</div>
              </div>

              <Link href={`/interest?plan=${encodeURIComponent(t.name)}`} style={{ textDecoration: 'none', width: '100%', marginTop: 'auto' }}>
                <button className="btn btn-outline pricing-btn" style={{ borderColor: 'var(--color-black)', color: 'var(--color-black)', width: '100%', backgroundColor: 'var(--color-white)', padding: '15px', fontSize: '1.1rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Reserve your founding membership</button>
              </Link>
            </TiltCard>
          ))}
        </StaggerGrid>
      </div>
      <div>



      </div>
    </section>
  );
}
