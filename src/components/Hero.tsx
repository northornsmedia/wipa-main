"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./animations/FadeIn";
import MagneticButton from "./animations/MagneticButton";

export default function Hero() {
  const profiles = [
    { src: "/Dr Shweta_AIPPI (1).png", name: "Dr. Shweta Singh", countryCode: ["in"], position: "Founder & CEO, Inaugural WIPA Chair", company: "Ennoble IP" },
    { src: "/1.png", name: "Michele S. Katz", countryCode: ["us"], position: "Founding Partner & WIPA Inaugural President", company: "Advitam IP LLC" },
    { src: "/Rafaella Oliveira.png", name: "Rafaella Oliveira", countryCode: ["br"], position: "Head of Chemical and Life Sciences Patent Acquisition Practice", company: "Licks Advogados" },
    { src: "/2.png", name: "Dhruva Dakhani", countryCode: ["in"], position: "Director", company: "Women’s IP Alliance" },
    { src: "/Liliane Roriz.png", name: "Appellate Judge (ret.) Liliane Roriz", countryCode: ["br"], position: "Partner – Patent and Trademark Litigation", company: "Licks Advogados" },
    { src: "/roba.jpg", name: "Roba Hamam", countryCode: ["ch"], position: "Partner, Intellectual Property & Life Sciences.", company: "AÏP Genius" },
    { src: "/Leonne Theodore-John.png", name: "Leonne Theodore-John", countryCode: ["lc"], position: "Partner & Head of Intellectual Property", company: "Nicholas John & Co" },
    { src: "/4.jpg", name: "Nithya Somasundaram", countryCode: ["in"], position: "Senior Legal Consultant", company: "R.K. Dewan & Co" },
    { src: "/Juliana Neves.png", name: "Juliana Neves", countryCode: ["br"], position: "Partner – Patent and Trademark Litigation", company: "Licks Advogados" },
    { src: "/5.jpeg", name: "Claudia Kaya", countryCode: ["ch"], position: "Director and Managing IP Consultant", company: "Dormann IP" },
    { src: "/Isabella Bonisolo.png", name: "Isabella Bonisolo", countryCode: ["br"], position: "Partner – Patent Litigation", company: "Licks Advogados" },
    { src: "/6.png", name: "Ximena Souza Ferreira", countryCode: ["pe"], position: "Partner", company: "Osterling Abogados" },
    { src: "/Carolina Caetano.png", name: "Carolina Caetano", countryCode: ["br"], position: "Head of Trademark Prosecution", company: "Licks Advogados" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeProfiles = [
    profiles[currentIndex],
    profiles[(currentIndex + 1) % profiles.length],
  ];

  return (
    <section id="hero" className="section section-dark" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'sticky', top: 0, zIndex: 0, overflow: 'hidden', padding: '60px 0 80px 0', marginBottom: '-150px' }}>

      <div className="mobile-padding" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 60px' }}>
        
        {/* Top Full-Width Section: Badge & Heading */}
        <div style={{ textAlign: 'left', marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            <FadeIn direction="up" delay={0.1}>
              <div style={{ 
                display: 'inline-block', 
                backgroundColor: 'var(--color-pastel-blue)', 
                color: 'var(--color-black)', 
                padding: '8px 16px', 
                borderRadius: '30px', 
                fontWeight: 700, 
                fontSize: '0.9rem', 
                marginBottom: '40px', 
                border: '2px solid var(--color-black)', 
                boxShadow: '4px 4px 0px var(--color-black)' 
              }}>
                Launching January 2027 | Become a Founding Member
              </div>
            </FadeIn>
          </div>
          
          <FadeIn direction="up" delay={0.1} style={{ width: '100%' }}>
            <h1 className="heading-huge" style={{ margin: '20px 0 0 0', fontSize: 'clamp(1.8rem, 3vw, 3.5rem)', lineHeight: 1.1, maxWidth: '100%', textTransform: 'uppercase' }}>
              THE GLOBAL COMMUNITY <br/>
              FOR WOMEN IN <br/>
              INTELLECTUAL PROPERTY
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Split Section: Text/Buttons vs Image */}
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          {/* Left Side: Content */}
          <div className="hero-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', pointerEvents: 'none' }}>
            <FadeIn direction="up" delay={0.2} style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start', width: '100%' }}>
              <p style={{ maxWidth: '800px', fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, textAlign: 'justify' }}>
                <strong>WIPA (The Women's IP Alliance)</strong> is an international membership community bringing together women across intellectual property, innovation, technology, law, academia, research, and entrepreneurship. Developed by the team behind <i>The Women's IP World Annual</i>, WIPA provides year-round opportunities to connect, collaborate, develop professionally, and lead globally.
              </p>
              
              <div style={{ pointerEvents: 'auto', display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap' }}>
                <MagneticButton href="/waiting-list" className="btn btn-accent" style={{ padding: '18px 32px', fontSize: '1.1rem' }}>
                  JOIN WAITING LIST
                </MagneticButton>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4} style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '25px', display: 'flex', gap: '25px', flexWrap: 'wrap', width: '100%' }}>
              {["Global Community", "Exclusive Events", "International Networking", "Educational Webinars"].map((highlight, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--color-pastel-green)' }}>✓</span> {highlight}
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Right Side: Animated Swapping Cards for Profile Images */}
          <div className="hero-right" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
              <FadeIn direction="up" delay={0.3}>
                <h2 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '2.2rem', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  color: 'var(--color-black)',
                  backgroundColor: 'var(--color-pastel-purple)',
                  padding: '12px 28px',
                  borderRadius: '16px',
                  border: '3px solid var(--color-white)',
                  boxShadow: '6px 6px 0px rgba(255,255,255,0.9)',
                  margin: 0,
                  transform: 'rotate(2deg)'
                }}>
                  Our Founding Members
                </h2>
              </FadeIn>
            </div>

            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', pointerEvents: 'auto', minHeight: '480px' }}>
            <AnimatePresence mode="popLayout">
              {activeProfiles.map((profile, index) => {
                const isRight = index === 1;
                return (
                  <motion.div
                    layout
                    key={profile.src}
                    initial={{ opacity: 0, scale: 0.8, x: 100, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100, rotate: -5 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ 
                      position: 'relative', 
                      width: '100%', 
                      maxWidth: '280px', 
                      marginTop: isRight ? '80px' : '0px',
                      zIndex: isRight ? 1 : 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ width: '100%', height: '380px', borderRadius: '32px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isRight ? 'var(--color-pastel-purple)' : 'var(--color-pastel-yellow)', position: 'relative' }}>
                      <img src={profile.src} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '16px', width: '100%' }}>
                      <div style={{ color: 'var(--color-white)', fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        {profile.countryCode?.map(code => (
                          <img key={code} src={`https://flagcdn.com/w20/${code}.png`} width="20" alt={code} style={{ borderRadius: '2px' }} />
                        ))}
                        {profile.name}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '4px', lineHeight: 1.3 }}>{profile.position}</div>
                      {profile.company && (
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '4px', fontStyle: 'italic' }}>{profile.company}</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
