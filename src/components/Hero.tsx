"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./animations/FadeIn";
import MagneticButton from "./animations/MagneticButton";

export default function Hero() {
  const profiles = [
    { src: "/mrinali-menon.png", name: "Mrinali Menon", countryCode: ["ky"], position: "Senior IP Manager", company: "HSM" },
    { src: "/Dr Shweta_AIPPI (1).png", name: "Dr. Shweta Singh", countryCode: ["in"], position: "Founder & CEO, Inaugural WIPA Chair - South Asia", company: "Ennoble IP" },
    { src: "/1.png", name: "Michele S. Katz", countryCode: ["us"], position: "Founding Partner & WIPA Inaugural President", company: "Advitam IP LLC" },
    { src: "/Rafaella Oliveira.png", name: "Rafaella Oliveira", countryCode: ["br"], position: "Head of Chemical and Life Sciences Patent Acquisition Practice", company: "Licks Advogados" },
    { src: "/Tina Nan.png", name: "Tina Nan", countryCode: ["cn"], position: "Managing Partner, Inaugural WIPA Chair - East Asia", company: "Cohorizon IP Attorneys" },
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
    { src: "/Maria khan.webp", name: "Maria Farrukh Irfan Khan", countryCode: ["ae"], position: "Managing Partner", company: "United Trademark & Patent Services" },
    { src: "/Anomi Wanigasekera.jpg", name: "Anomi I. Wanigasekera", countryCode: ["lk"], position: "Senior Partner", company: "Julius & Creasy" },
    { src: "/dr-claudia-m-duffy.png", name: "Dr Claudia M. Duffy", countryCode: ["gb"], position: "Founder", company: "Innovare IP" },
    { src: "/nadine-stuttle.png", name: "Nadine Stuttle", countryCode: ["ch"], position: "CEO", company: "PSS Solutions" },
    { src: "/rashi-rastogi.png", name: "Rashi Rastogi", countryCode: ["in"], position: "Founder", company: "Lexorant" },
    { src: "/adriana-barrera.png", name: "Adriana Barrera", countryCode: ["pe"], position: "Founder and Managing Partner", company: "BARLAW – Barrera & Asociados" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeProfiles = isMounted && isMobile 
    ? [
        profiles[(currentIndex - 1 + profiles.length) % profiles.length], // Left
        profiles[currentIndex],                                         // Center
        profiles[(currentIndex + 1) % profiles.length],                 // Right
      ]
    : [
        profiles[currentIndex],                                         // Center / Desktop Left
        profiles[(currentIndex + 1) % profiles.length],                 // Right / Desktop Right
      ];

  return (
    <section id="hero" className="section section-dark" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', zIndex: 0, overflow: 'hidden', padding: '120px 0 80px 0', position: 'relative' }}>

      <div className="mobile-padding" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1800px', margin: '0 auto', padding: '0 60px' }}>
        
        {/* Top Full-Width Section: Badge & Heading */}
        <div className="mobile-text-center" style={{ textAlign: 'left', marginBottom: '60px' }}>
          <div className="mobile-text-center" style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            <FadeIn direction="up" delay={0.1}>
              <div style={{ 
                display: 'inline-block', 
                backgroundColor: 'rgba(236, 72, 153, 0.12)', 
                color: 'var(--text-heading)', 
                padding: '8px 20px', 
                borderRadius: '30px', 
                fontWeight: 700, 
                fontSize: '0.9rem', 
                marginBottom: '40px', 
                border: '1px solid rgba(236, 72, 153, 0.35)', 
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)' 
              }}>
                <span className="desktop-hide">
                  Launching January 2027 <br />
                  Become a Founding Member
                </span>
                <span className="mobile-hide">
                  Launching January 2027 | Become a Founding Member
                </span>
              </div>
            </FadeIn>
          </div>
          
          <motion.div 
            style={{ width: '100%' }}
            initial={{ y: -150, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 1.2, delay: 1.5 }}
          >
            <h1 className="heading-huge" style={{ margin: '20px 0 0 0', fontSize: 'clamp(2.1rem, 9vw, 4.2rem)', lineHeight: 1.1, maxWidth: '100%', textTransform: 'uppercase' }}>
              <span className="mobile-hide">
                <span style={{ whiteSpace: 'nowrap' }}>THE GLOBAL COMMUNITY</span> <br/>
                <span style={{ whiteSpace: 'nowrap', background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>FOR WOMEN IN</span> <br/>
                <span style={{ whiteSpace: 'nowrap' }}>INTELLECTUAL PROPERTY</span>
              </span>
              <span className="desktop-hide" style={{ lineHeight: 1.2 }}>
                THE GLOBAL <br/>
                COMMUNITY <br/>
                <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>FOR WOMEN IN</span> <br/>
                INTELLECTUAL <br/>
                PROPERTY
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Bottom Split Section: Text/Buttons vs Image */}
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          {/* Left Side: Content */}
          <div className="hero-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', pointerEvents: 'none' }}>
            <FadeIn direction="up" delay={0.2} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start', width: '100%' }}>
              <p className="mobile-text-center" style={{ maxWidth: '800px', fontSize: '1.15rem', color: 'var(--text-body)', lineHeight: 1.4 }}>
                <strong>WIPA (The Women's IP Alliance)</strong> is an international membership community bringing together women across intellectual property, innovation, technology, law, academia, research, and entrepreneurship. Developed by the team behind <i>The Women's IP World Annual</i>, WIPA provides year-round opportunities to connect, collaborate, develop professionally, and lead globally.
              </p>
              
              <div className="mobile-text-center" style={{ pointerEvents: 'auto', display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap' }}>
                <MagneticButton href="/waiting-list" className="btn btn-accent" style={{ padding: '18px 32px', fontSize: '1.1rem' }}>
                  JOIN THE WAITING LIST
                </MagneticButton>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4} className="mobile-grid-2 mobile-gap-sm" style={{ marginTop: '50px', borderTop: '1px solid var(--border-subtle)', paddingTop: '25px', display: 'flex', gap: '25px', flexWrap: 'wrap', width: '100%' }}>
              {["Global Community", "Exclusive Events", "International Networking", "Educational Webinars"].map((highlight, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-heading)', fontSize: '1rem', fontWeight: 600 }}>
                  <span style={{ color: '#10b981' }}>✓</span> {highlight}
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Right Side: Animated Swapping Cards for Profile Images */}
          <div className="hero-right" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
              <FadeIn direction="up" delay={0.3}>
                <h2 className="mobile-no-tilt mobile-text-center" style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(1.0rem, 4.5vw, 2.2rem)', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  color: 'var(--text-heading)',
                  backgroundColor: 'rgba(168, 85, 247, 0.15)',
                  padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 28px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(168, 85, 247, 0.35)',
                  boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)',
                  margin: 0,
                  transform: 'rotate(2deg)'
                }}>
                  Our Founding Members
                </h2>
              </FadeIn>
            </div>

            <div style={{ position: 'relative', width: isMounted && isMobile ? 'calc(100% + 40px)' : '100%', marginLeft: isMounted && isMobile ? '-20px' : '0px', marginRight: isMounted && isMobile ? '-20px' : '0px', marginTop: isMounted && isMobile ? '40px' : '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: isMounted && isMobile ? '0px' : '30px', pointerEvents: 'auto', minHeight: '480px', overflow: 'visible' }}>
            <AnimatePresence mode="popLayout">
              {activeProfiles.map((profile, index) => {
                const isMobileLeft = isMounted && isMobile && index === 0;
                const isMobileCenter = isMounted && isMobile && index === 1;
                const isMobileRight = isMounted && isMobile && index === 2;
                const isDesktopRight = (!isMounted || !isMobile) && index === 1;
                
                let scale = 1;
                let opacity = 1;
                let x: string | number = 0;
                let zIndex = 10;
                
                if (isMounted && isMobile) {
                  scale = isMobileCenter ? 1 : 0.8;
                  opacity = isMobileCenter ? 1 : 0.5;
                  x = isMobileLeft ? '-65%' : (isMobileRight ? '65%' : '0%');
                  zIndex = isMobileCenter ? 10 : 1;
                }

                return (
                  <motion.div
                    layout
                    key={profile.src}
                    initial={isMounted && isMobile ? { opacity: 0, scale: 0.8, x: isMobileLeft ? '-65%' : '65%' } : { opacity: 0, scale: 0.8, x: 100, rotate: 5 }}
                    animate={isMounted && isMobile ? { opacity, scale, x, rotate: 0 } : { opacity: 1, scale: 1, x: 0, rotate: 0 }}
                    exit={isMounted && isMobile ? { opacity: 0, scale: 0.8, x: isMobileLeft ? '-65%' : '65%' } : { opacity: 0, scale: 0.8, x: -100, rotate: -5 }}
                    transition={{ duration: 1.0, ease: "easeInOut" }}
                    className={(!isMounted || !isMobile) && isDesktopRight ? 'mobile-mt-0' : ''}
                    style={{ 
                      position: isMounted && isMobile ? 'absolute' : 'relative', 
                      width: '100%', 
                      maxWidth: '280px', 
                      marginTop: (!isMounted || !isMobile) && isDesktopRight ? '80px' : '0px',
                      zIndex,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ width: '100%', height: '380px', borderRadius: '32px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)', position: 'relative' }}>
                      <img src={profile.src} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '16px', width: '100%' }}>
                      <div style={{ color: 'var(--text-heading)', fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        {profile.countryCode?.map(code => (
                          <img key={code} src={`https://flagcdn.com/w20/${code}.png`} width="20" alt={code} style={{ borderRadius: '2px' }} />
                        ))}
                        {profile.name}
                      </div>
                      <div style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginTop: '4px', lineHeight: 1.3 }}>{profile.position}</div>
                      {profile.company && (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px', fontStyle: 'italic' }}>{profile.company}</div>
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
