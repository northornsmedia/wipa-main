import FadeIn from "./animations/FadeIn";
import TextReveal from "./animations/TextReveal";
import StaggerGrid from "./animations/StaggerGrid";
import TiltCard from "./animations/TiltCard";
import React from "react";
import Link from "next/link";
import PlansGridClient from "./PlansGridClient";

const tiers = [
  { 
    name: "IP Professional\nMembership", 
    price: "£395",
    monthlyPrice: "£50",
    limit: "Rate-limited for the first 300 founding members worldwide",
    desc: "For lawyers, patent attorneys, trade mark attorneys, IP practitioners, consultants, and other intellectual property professionals.", 
    standardPrice: "Standard Membership Rate: £695/year (effective once all 300 Founding Membership places have been secured).",
    style: "bg-pastel-green"
  },
  { 
    name: "Entrepreneur\nMembership\n(for Start Ups only)",
    price: "£295",
    monthlyPrice: "£42",
    limit: "Rate-limited for the first 200 Startup Founding members worldwide",
    desc: "Open to law firms and IP businesses incorporated or registered within the past 24 months.",
    standardPrice: "Standard Membership Rate: £495/year (effective once all 200 Founding Membership places have been secured).",
    style: "bg-pastel-purple"
  },
  { 
    name: "Student\nMembership", 
    price: "£99",
    monthlyPrice: "£12",
    limit: "Rate-limited for the first 200 founding members worldwide",
    desc: "For students, graduates, researchers, and early-career professionals pursuing careers in intellectual property, innovation, law, technology, or related disciplines.", 
    standardPrice: "Standard Membership Rate: £149/year (effective once all 200 Founding Membership places have been secured).",
    style: "bg-pastel-pink"
  },
  { 
    name: "In-House Counsel\nMembership", 
    price: "FREE",
    monthlyPrice: "FREE",
    limit: "COMPLIMENTARY FOR THE FIRST YEAR FOR THE FIRST 200 FOUNDING IN-HOUSE COUNSEL MEMBERS WORLDWIDE",
    desc: "For women leading intellectual property within corporate legal departments, The Women's IP Alliance connects you with a global community of trusted peers, industry leaders, and IP experts.", 
    standardPrice: "Standard Membership & Annual Renewal: £99/year (Effective once all 200 Founding In-House Counsel Membership places have been allocated.)",
    style: "bg-pastel-orange"
  }
];

export default function Membership({ hideExploreButton = false }: { hideExploreButton?: boolean }) {
  return (
    <section id="membership" className="section section-dark" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
      <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '0 40px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', width: '100%', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <TextReveal 
              lines={["INVEST IN YOUR FUTURE"]} 
              style={{ marginBottom: '10px' }} 
            />
          </div>
          <FadeIn direction="up" delay={0.2} style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-heading)', opacity: 0.9, maxWidth: '1200px', margin: '0 auto 25px', lineHeight: 1.8, fontWeight: 300, textAlign: 'center' }}>
              Your membership is an investment in <span style={{ color: '#f472b6', fontWeight: 600 }}>lifelong professional development</span>, international networking, leadership opportunities, and meaningful global connections.
            </p>
          </FadeIn>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 clamp(15px, 4vw, 40px)' }}>
        <FadeIn direction="up" delay={0.3}>
          <div style={{
            margin: '20px auto 60px',
            padding: 'clamp(20px, 4vw, 30px) clamp(15px, 4vw, 40px)',
            backgroundColor: 'rgba(236, 72, 153, 0.05)',
            color: 'var(--text-heading)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.1)',
            borderRadius: '16px',
            maxWidth: '100%',
            textAlign: 'center',
            position: 'relative'
          }}>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '12px', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#f472b6' }}>
              Your Founding Member Advantage
            </h4>
            <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.0rem)', margin: 0, lineHeight: 1.6, fontWeight: 400, fontStyle: 'italic', opacity: 0.9, textAlign: 'center', color: 'var(--text-light)' }}>
              Joining as a Founding Member not only secures your place within the Alliance's inaugural community, but also <span style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: 'var(--text-heading)', border: '1px solid rgba(236, 72, 153, 0.35)', padding: '2px 8px', borderRadius: '4px', fontStyle: 'normal', fontWeight: 600 }}>locks in your exclusive Founding Member rate</span> for future renewals. Once all Founding Memberships have been allocated, new members will join at the standard annual rates, while existing Founding Members will continue to benefit from their protected introductory pricing, provided their membership remains active.
            </p>
          </div>
        </FadeIn>
      </div>

      <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 clamp(15px, 4vw, 40px)' }}>
        <FadeIn direction="up" delay={0.4} style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div className="mobile-text-center" style={{ display: 'inline-block', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: 'var(--text-heading)', padding: '6px 18px', borderRadius: '20px', fontWeight: 700, fontSize: '0.95rem', border: '1px solid rgba(168, 85, 247, 0.3)', textAlign: 'center' }}>
            Please note: All memberships purchased today will officially commence in January 2027.
          </div>
        </FadeIn>
        <PlansGridClient plans={tiers} />
      </div>
      {!hideExploreButton && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', paddingBottom: '20px' }}>
          <Link href="/plans" style={{ textDecoration: 'none' }}>
            <button className="btn btn-accent" style={{ padding: '15px 40px', fontSize: '1.2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              Explore More Plans
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
