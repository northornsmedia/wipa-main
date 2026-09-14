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
    { src: "/adriana-barrera.png", name: "Adriana Barrera", countryCode: ["pe"], position: "Founder and Managing Partner, Inaugural WIPA Chair - South America", company: "BARLAW – Barrera & Asociados" },
  ];
  type DeviceTier = 'mobile' | 'tablet' | 'laptop' | 'desktop';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceTier, setDeviceTier] = useState<DeviceTier>('desktop');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceTier('mobile');
        setIsMobile(true);
      } else if (width < 1024) {
        setDeviceTier('tablet');
        setIsMobile(false);
      } else if (width < 1440) {
        setDeviceTier('laptop');
        setIsMobile(false);
      } else {
        setDeviceTier('desktop');
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [profiles.length]);

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

  // Dynamic responsive values based on device tier
  const cardWidth = isMounted && isMobile 
    ? '260px' 
    : (deviceTier === 'laptop' ? 'clamp(185px, 14.5vw, 235px)' : (deviceTier === 'tablet' ? 'clamp(200px, 24vw, 250px)' : '270px'));
  const cardImgHeight = isMounted && isMobile 
    ? '330px' 
    : (deviceTier === 'laptop' ? 'clamp(250px, 20vw, 320px)' : (deviceTier === 'tablet' ? 'clamp(270px, 28vw, 340px)' : '370px'));
  const cardGap = isMounted && isMobile 
    ? '0px' 
    : (deviceTier === 'laptop' ? 'clamp(12px, 1.5vw, 20px)' : '24px');
  const staggerOffset = isMounted && isMobile 
    ? '0px' 
    : (deviceTier === 'laptop' ? 'clamp(24px, 3vw, 45px)' : (deviceTier === 'tablet' ? '0px' : '65px'));
  const minCardSectionHeight = isMounted && isMobile 
    ? '440px' 
    : (deviceTier === 'laptop' ? '410px' : '490px');

  return (
    <section 
      id="hero" 
      className="section section-dark" 
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        minHeight: '85vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        zIndex: 0, 
        overflow: 'hidden', 
        padding: 'clamp(80px, 9vw, 120px) 0 clamp(40px, 5vw, 80px) 0', 
        position: 'relative' 
      }}
    >
      <div 
        className="mobile-padding" 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          width: '100%', 
          maxWidth: '1720px', 
          margin: '0 auto', 
          padding: '0 clamp(20px, 4vw, 60px)' 
        }}
      >
        <div className="hero-grid">
          
          {/* Left Column: Badge, Heading, Description, CTA, Highlights */}
          <div 
            className="hero-left" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start', 
              textAlign: 'left', 
              width: '100%',
              maxWidth: deviceTier === 'desktop' ? '820px' : '100%'
            }}
          >
            {/* Launching Badge */}
            <div className="mobile-text-center" style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
              <FadeIn direction="up" delay={0.1}>
                <div style={{ 
                  display: 'inline-block', 
                  backgroundColor: 'rgba(236, 72, 153, 0.12)', 
                  color: 'var(--text-heading)', 
                  padding: '7px 18px', 
                  borderRadius: '30px', 
                  fontWeight: 700, 
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)', 
                  marginBottom: '24px', 
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
            
            {/* Main Headline */}
            <motion.div 
              style={{ width: '100%' }}
              initial={{ y: -30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 1, delay: 0.15 }}
            >
              <h1 
                className="heading-huge mobile-text-center" 
                style={{ 
                  margin: '0 0 clamp(16px, 2vw, 24px) 0', 
                  fontSize: isMounted && isMobile 
                    ? 'clamp(1.8rem, 7.5vw, 2.5rem)' 
                    : (deviceTier === 'laptop' ? 'clamp(1.85rem, 2.55vw, 2.9rem)' : (deviceTier === 'tablet' ? 'clamp(2rem, 4.5vw, 3rem)' : 'clamp(2.4rem, 3.6vw, 4rem)')), 
                  lineHeight: 1.12, 
                  maxWidth: '100%', 
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  wordBreak: 'break-word'
                }}
              >
                <span className="mobile-hide">
                  <span style={{ display: 'inline-block' }}>THE GLOBAL COMMUNITY</span> <br/>
                  <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>FOR WOMEN IN</span> <br/>
                  <span style={{ display: 'inline-block' }}>INTELLECTUAL PROPERTY</span>
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

            {/* Paragraph & CTA */}
            <FadeIn direction="up" delay={0.25} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start', width: '100%' }}>
              <p 
                className="mobile-text-center" 
                style={{ 
                  maxWidth: '720px', 
                  fontSize: isMounted && isMobile ? '1.05rem' : (deviceTier === 'laptop' ? '1.02rem' : '1.14rem'), 
                  color: 'var(--text-body)', 
                  lineHeight: 1.5,
                  margin: '0 0 10px 0'
                }}
              >
                <strong>WIPA (The Women's IP Alliance)</strong> is an international membership community bringing together women across intellectual property, innovation, technology, law, academia, research, and entrepreneurship. Developed by the team behind <i>The Women's IP World Annual</i>, WIPA provides year-round opportunities to connect, collaborate, develop professionally, and lead globally.
              </p>
              
              <div className="mobile-text-center" style={{ display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap', marginBottom: '16px' }}>
                <MagneticButton href="/waiting-list" className="btn btn-accent" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
                  JOIN THE WAITING LIST
                </MagneticButton>
              </div>
            </FadeIn>

            {/* Feature Highlights */}
            <FadeIn 
              direction="up" 
              delay={0.35} 
              className="mobile-grid-2 mobile-gap-sm" 
              style={{ 
                marginTop: 'clamp(18px, 2.5vw, 32px)', 
                borderTop: '1px solid var(--border-subtle)', 
                paddingTop: '20px', 
                display: 'flex', 
                gap: 'clamp(14px, 2vw, 24px)', 
                flexWrap: 'wrap', 
                width: '100%' 
              }}
            >
              {["Global Community", "Exclusive Events", "International Networking", "Educational Webinars"].map((highlight, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-heading)', fontSize: 'clamp(0.85rem, 0.95vw, 0.95rem)', fontWeight: 600 }}>
                  <span style={{ color: '#10b981' }}>✓</span> {highlight}
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Right Column: Title Card & Animated Profile Cards */}
          <div 
            className="hero-right" 
            style={{ 
              position: 'relative', 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Title Card: Our Founding Members */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 'clamp(16px, 2vw, 24px)', position: 'relative', zIndex: 10 }}>
              <FadeIn direction="up" delay={0.2}>
                <h2 
                  className="mobile-no-tilt mobile-text-center" 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: isMounted && isMobile 
                      ? '1.15rem' 
                      : (deviceTier === 'laptop' ? 'clamp(1rem, 1.3vw, 1.35rem)' : 'clamp(1.15rem, 1.7vw, 1.7rem)'), 
                    fontWeight: 900, 
                    textTransform: 'uppercase', 
                    color: 'var(--text-heading)',
                    backgroundColor: 'rgba(168, 85, 247, 0.15)',
                    padding: 'clamp(6px, 1vw, 10px) clamp(14px, 2vw, 24px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(168, 85, 247, 0.35)',
                    boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)',
                    margin: 0,
                    transform: isMounted && isMobile ? 'none' : 'rotate(2deg)'
                  }}
                >
                  Our Founding Members
                </h2>
              </FadeIn>
            </div>

            {/* Profile Cards Container */}
            <div 
              style={{ 
                position: 'relative', 
                width: isMounted && isMobile ? 'calc(100% + 40px)' : '100%', 
                maxWidth: isMounted && isMobile ? '100%' : '580px',
                marginLeft: isMounted && isMobile ? '-20px' : '0px', 
                marginRight: isMounted && isMobile ? '-20px' : '0px', 
                marginTop: isMounted && isMobile ? '20px' : '0px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: cardGap, 
                pointerEvents: 'auto', 
                minHeight: minCardSectionHeight, 
                overflow: 'visible' 
              }}
            >
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
                      initial={isMounted && isMobile ? { opacity: 0, scale: 0.8, x: isMobileLeft ? '-65%' : '65%' } : { opacity: 0, scale: 0.92, x: 40, rotate: 2 }}
                      animate={isMounted && isMobile ? { opacity, scale, x, rotate: 0 } : { opacity: 1, scale: 1, x: 0, rotate: 0 }}
                      exit={isMounted && isMobile ? { opacity: 0, scale: 0.8, x: isMobileLeft ? '-65%' : '65%' } : { opacity: 0, scale: 0.92, x: -40, rotate: -2 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className={(!isMounted || !isMobile) && isDesktopRight ? 'mobile-mt-0' : ''}
                      style={{ 
                        position: isMounted && isMobile ? 'absolute' : 'relative', 
                        width: '100%', 
                        maxWidth: cardWidth, 
                        marginTop: (!isMounted || !isMobile) && isDesktopRight ? staggerOffset : '0px',
                        zIndex,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <div 
                        style={{ 
                          width: '100%', 
                          height: cardImgHeight, 
                          borderRadius: 'clamp(20px, 2.5vw, 32px)', 
                          overflow: 'hidden', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          backgroundColor: 'var(--bg-card)', 
                          border: '1px solid var(--border-card)', 
                          boxShadow: 'var(--shadow-card)', 
                          position: 'relative' 
                        }}
                      >
                        <img 
                          src={profile.src} 
                          alt={profile.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div style={{ textAlign: 'center', marginTop: '12px', width: '100%' }}>
                        <div 
                          style={{ 
                            color: 'var(--text-heading)', 
                            fontSize: 'clamp(0.95rem, 1.08vw, 1.15rem)', 
                            fontWeight: 600, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '6px' 
                          }}
                        >
                          {profile.countryCode?.map(code => (
                            <img 
                              key={code} 
                              src={`https://flagcdn.com/w20/${code}.png`} 
                              width="18" 
                              alt={code} 
                              style={{ borderRadius: '2px' }} 
                            />
                          ))}
                          <span>{profile.name}</span>
                        </div>
                        <div 
                          style={{ 
                            color: 'var(--text-body)', 
                            fontSize: 'clamp(0.76rem, 0.84vw, 0.88rem)', 
                            marginTop: '3px', 
                            lineHeight: 1.3 
                          }}
                        >
                          {profile.position}
                        </div>
                        {profile.company && (
                          <div 
                            style={{ 
                              color: 'var(--text-muted)', 
                              fontSize: 'clamp(0.72rem, 0.8vw, 0.82rem)', 
                              marginTop: '2px', 
                              fontStyle: 'italic' 
                            }}
                          >
                            {profile.company}
                          </div>
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
