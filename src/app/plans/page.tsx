import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StaggerGrid from "@/components/animations/StaggerGrid";
import TiltCard from "@/components/animations/TiltCard";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import Link from "next/link";
import PlansGridClient from "@/components/PlansGridClient";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Membership Plans',
  description: 'Join WIPA with our flexible membership plans tailored for IP Professionals, Entrepreneurs, and Students. Exclusive benefits and networking opportunities await.',
};

const plans = [
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
    name: "Enterprise\nMembership", 
    subtitle: "(IP Professional Teams)",
    price: "£1,745",
    monthlyPrice: "£175",
    hideLimitOnMonthly: true,
    hideOnMonthly: true,
    limit: "5 Founding Memberships + 1 FREE Membership – An Exclusive Saving of £625",
    desc: "Perfect for law firms, corporate IP departments, universities, innovation teams, and organisations looking to provide membership benefits to multiple professionals while securing Founding Member status for their team.", 
    standardPrice: "Standard Price After Launch: £2,780/year",
    style: "bg-pastel-yellow"
  },
];

export default function PlansPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-charcoal)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "IP Professional Membership",
              "description": "For lawyers, patent attorneys, trade mark attorneys, and IP practitioners.",
              "offers": {
                "@type": "Offer",
                "price": "395.00",
                "priceCurrency": "GBP",
                "availability": "https://schema.org/InStock"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Student Membership",
              "description": "For full-time or part-time students exploring a career in intellectual property.",
              "offers": {
                "@type": "Offer",
                "price": "120.00",
                "priceCurrency": "GBP",
                "availability": "https://schema.org/InStock"
              }
            }
          ])
        }}
      />
      <Navbar />
      
      <section className="section section-dark" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
        <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 40px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', width: '100%', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              <TextReveal 
                lines={["ALL MEMBERSHIP PLANS"]} 
                style={{ marginBottom: '10px' }} 
              />
            </div>
            <FadeIn direction="up" delay={0.2} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-white)', opacity: 0.9, maxWidth: '1200px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
                Choose the perfect plan for you or your organisation.
              </p>
              <div style={{ display: 'inline-block', backgroundColor: 'var(--color-pastel-purple)', color: 'var(--color-black)', padding: '6px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.95rem', border: '2px solid var(--color-black)' }}>
                Please note: All memberships purchased today will officially commence in January 2027.
              </div>
            </FadeIn>
          </div>
          
          <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 40px' }}>
            <FadeIn direction="up" delay={0.3}>
              <div style={{
                margin: '20px auto 40px',
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

          <PlansGridClient plans={plans} />

        </div>
      </section>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 100px', padding: '0 40px' }}>
        <div style={{ backgroundColor: '#e6f2ff', padding: '50px', borderRadius: '32px', border: '2px solid var(--color-black)', boxShadow: '8px 8px 0px var(--color-black)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className="heading-huge" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Custom Enterprise Plan</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', marginBottom: '40px', lineHeight: 1.6 }}>
            Need a tailored solution for your entire organisation? We offer custom enterprise packages for law firms, universities, and corporate IP departments. Get in touch to build a plan that perfectly fits your team's needs.
          </p>
          <Link href="/enterprise" style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline" style={{ borderColor: 'var(--color-black)', color: 'var(--color-black)', backgroundColor: 'var(--color-white)', padding: '15px 40px', fontSize: '1.2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              Inquire About Custom Plans
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
