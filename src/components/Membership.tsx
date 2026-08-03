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
    desc: "For lawyers, patent attorneys, trade mark attorneys, IP practitioners, consultants, in-house counsel, and other intellectual property professionals.", 
    standardPrice: "Standard Membership Rate: £695/year (effective once all 300 Founding Membership places have been secured).",
    style: "bg-pastel-green"
  },
  { 
    name: "Entrepreneur\nMembership", 
    price: "£295",
    monthlyPrice: "£42",
    limit: "Rate-limited for the first 200 founding members worldwide",
    desc: "For founders, entrepreneurs, innovators, business owners, start-ups, and professionals commercialising intellectual property and innovation.", 
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
  }
];

export default function Membership({ hideExploreButton = false }: { hideExploreButton?: boolean }) {
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

      <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 40px' }}>
        <FadeIn direction="up" delay={0.4} style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--color-pastel-purple)', color: 'var(--color-black)', padding: '6px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.95rem', border: '2px solid var(--color-black)' }}>
            Please note: All memberships purchased today will officially commence in January 2027.
          </div>
        </FadeIn>
        <PlansGridClient plans={tiers} />
      </div>
      {!hideExploreButton && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', paddingBottom: '20px' }}>
          <Link href="/plans" style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline" style={{ borderColor: 'var(--color-white)', color: 'var(--color-black)', backgroundColor: 'var(--color-white)', padding: '15px 40px', fontSize: '1.2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              Explore More Plans
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
