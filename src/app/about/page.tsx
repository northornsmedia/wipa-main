import About from "@/components/About";
import Values from "@/components/Values";
import Foundation from "@/components/Foundation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the Women's IP Alliance (WIPA), our mission, vision, and how we empower women in intellectual property to drive global innovation.",
};

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-white)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flexGrow: 1 }}>
        <section className="section section-white" style={{ position: 'relative' }}>
          <div className="sticker mobile-hidden" style={{ '--rot': '10deg', backgroundColor: 'var(--color-pastel-pink)', top: '10%', right: '15%' } as React.CSSProperties}>💡</div>

          <div className="container grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="heading-lg" style={{ marginBottom: '30px', textAlign: 'center' }}>
                More Than a Membership.<br/>
                A Global Community Built for Women in <span style={{ color: 'var(--color-accent-purple)' }}>Intellectual Property.</span>
              </h2>
              <p className="mobile-text-center" style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6, textAlign: 'center' }}>
                Women have long played a vital role in shaping innovation, protecting brands, advancing technology, and driving the future of intellectual property. Yet opportunities to build lasting international relationships, exchange expertise, and collaborate beyond conferences remain limited.
              </p>
              <p className="mobile-text-center" style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6, textAlign: 'center' }}>
                The Women's IP Alliance has been created to bridge that gap.
              </p>
              <p className="mobile-text-center" style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6, textAlign: 'center' }}>
                Launching in 2027, the Alliance transforms an annual publication into a year-round international community where members can connect with peers, access world-class learning opportunities, develop professionally, and become part of a collaborative global network designed specifically for women in IP.
              </p>
              <p className="mobile-text-center" style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6, textAlign: 'center' }}>
                Whether you are an experienced practitioner, a rising professional, an entrepreneur, an academic, or a student beginning your journey, the Alliance provides the environment, opportunities, and connections to help you thrive.
              </p>
            </div>

            <div className="grid-2" style={{ gap: '20px' }}>
              <div className="pill-container bg-pastel-yellow" style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
                <h4 className="heading-md">Connect</h4>
                <p style={{ marginTop: '10px' }}>Build meaningful relationships with women from around the world.</p>
              </div>
              <div className="pill-container bg-pastel-purple" style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
                <h4 className="heading-md">Collaborate</h4>
                <p style={{ marginTop: '10px' }}>Develop cross-border partnerships and referral opportunities.</p>
              </div>
              <div className="pill-container bg-pastel-green" style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
                <h4 className="heading-md">Grow</h4>
                <p style={{ marginTop: '10px' }}>Access education, mentoring, and professional development.</p>
              </div>
              <div className="pill-container bg-pastel-pink" style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
                <h4 className="heading-md">Lead</h4>
                <p style={{ marginTop: '10px' }}>Increase your visibility and become part of the future of the profession.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <div style={{ backgroundColor: 'var(--color-charcoal)', position: 'relative', zIndex: 10 }}>
        <Values />
        <Foundation />
      </div>

      <Footer />
    </main>
  );
}
