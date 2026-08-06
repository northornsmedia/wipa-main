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
    <section className="section section-white" style={{ paddingBottom: '40px' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              Meet the Women Building the <br/> <span style={{ color: 'var(--color-accent-purple)' }}>Future of IP</span>
            </h2>
          </FadeIn>
        </div>

        <div style={{ padding: '10px 0', overflow: 'hidden' }}>
          <div style={{ display: isMounted && isMobile ? 'flex' : 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative', minHeight: isMounted && isMobile ? '500px' : 'auto', justifyContent: 'center' }}>
            <AnimatePresence mode="popLayout">
              {visibleProfiles.map((p) => (
                <motion.div 
                  key={p.name}
                  layout
                  initial={{ opacity: 0, x: isMounted && isMobile ? 50 : 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: isMounted && isMobile ? -50 : -20, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    position: isMounted && isMobile ? 'absolute' : 'relative',
                    left: isMounted && isMobile ? 0 : 'auto',
                    right: isMounted && isMobile ? 0 : 'auto',
                    margin: isMounted && isMobile ? '0 auto' : '0',
                    width: isMounted && isMobile ? '100%' : 'auto',
                    maxWidth: isMounted && isMobile ? '320px' : 'none'
                  }}
                >
                  <div className={p.style} style={{ width: '100%', height: '320px', borderRadius: '32px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <img src={p.src} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ marginTop: 'auto', width: '100%' }}>
                    <div style={{ color: 'var(--color-black)', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px', lineHeight: 1.2 }}>
                      {p.countryCode?.map((code: string) => (
                        <img key={code} src={`https://flagcdn.com/w20/${code}.png`} width="20" alt={code} style={{ borderRadius: '2px' }} />
                      ))}
                      {p.name}
                    </div>
                    <h4 className="heading-md" style={{ fontSize: '0.9rem', marginBottom: '4px', lineHeight: 1.3, color: 'var(--color-charcoal)' }}>{p.position}</h4>
                    {p.company && (
                      <p style={{ fontSize: '0.8rem', margin: 0, fontStyle: 'italic', color: 'rgba(0,0,0,0.7)' }}>{p.company}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
