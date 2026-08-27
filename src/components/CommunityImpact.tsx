"use client";

import { useState, useEffect } from "react";
import FadeIn from "./animations/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

const baseStyles = ["bg-pastel-pink", "bg-pastel-yellow", "bg-pastel-purple", "bg-pastel-green"];
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
  { src: "/Maria khan.webp", name: "Maria Farrukh Irfan Khan", countryCode: ["ae"], position: "Managing Partner", company: "United Trademark & Patent Services" },
  { src: "/Anomi Wanigasekera.jpg", name: "Anomi I. Wanigasekera", countryCode: ["lk"], position: "Senior Partner", company: "Julius & Creasy" },
].map((p, i) => ({ ...p, style: baseStyles[i % 4] }));

export default function CommunityImpact() {
  const [startIndex, setStartIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % profiles.length);
    }, 3000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const visibleCount = isMounted && isMobile ? 1 : 4;
  const visibleProfiles = Array.from({ length: visibleCount }).map((_, i) => profiles[(startIndex + i) % profiles.length]);

  return (
    <section className="section section-white" style={{ paddingBottom: (!isMounted || !isMobile) ? '' : '40px' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              Meet the Women Building the <br/> <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Future of IP</span>
            </h2>
          </FadeIn>
        </div>

        <div style={{ padding: '10px 0', overflow: 'hidden' }}>
          <div style={{ display: isMounted && isMobile ? 'flex' : 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative', minHeight: isMounted && isMobile ? '500px' : 'auto', justifyContent: 'center', padding: (!isMounted || !isMobile) ? '20px' : '0' }}>
            <AnimatePresence mode="popLayout">
              {visibleProfiles.map((p) => {
                return (
                <motion.div 
                  key={p.name}
                  layout
                  initial={{ opacity: 0, x: isMounted && isMobile ? 50 : 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: isMounted && isMobile ? -50 : -20, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className={p.style}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: (!isMounted || !isMobile) ? '20px' : '16px', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    position: isMounted && isMobile ? 'absolute' : 'relative',
                    left: isMounted && isMobile ? 0 : 'auto',
                    right: isMounted && isMobile ? 0 : 'auto',
                    margin: isMounted && isMobile ? '0 auto' : '0',
                    width: isMounted && isMobile ? '100%' : 'auto',
                    maxWidth: isMounted && isMobile ? '320px' : 'none',
                    border: '1px solid var(--border-card)',
                    borderRadius: '24px',
                    padding: (!isMounted || !isMobile) ? '24px 24px 32px 24px' : '20px 20px 24px 20px',
                    boxShadow: 'var(--shadow-card)'
                  }}
                >
                  <div style={{ width: '100%', height: (!isMounted || !isMobile) ? '260px' : '280px', borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid var(--border-subtle)' }}>
                    <img src={p.src} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ marginTop: 'auto', width: '100%' }}>
                    <div style={{ color: 'var(--text-heading)', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px', lineHeight: 1.2 }}>
                      {p.countryCode?.map((code: string) => (
                        <img key={code} src={`https://flagcdn.com/w20/${code}.png`} width="20" alt={code} style={{ borderRadius: '2px' }} />
                      ))}
                      {p.name}
                    </div>
                    <h4 className="heading-md" style={{ fontSize: '0.9rem', marginBottom: '4px', lineHeight: 1.3, color: 'var(--text-body)' }}>{p.position}</h4>
                    {p.company && (
                      <div style={{ fontSize: '0.8rem', margin: 0, fontStyle: 'italic', color: 'var(--text-muted)', textAlign: 'center' }}>{p.company}</div>
                    )}
                  </div>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
