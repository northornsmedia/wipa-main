"use client";

import { useState, useEffect } from "react";
import FadeIn from "./animations/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

const baseStyles = ["bg-pastel-pink", "bg-pastel-yellow", "bg-pastel-purple", "bg-pastel-green"];
const profiles = [
  { src: "/Dr Shweta_AIPPI (1).png", name: "Dr. Shweta Singh", countryCode: ["in"], position: "Founder & CEO, Inaugural WIPA Chair", company: "Ennoble IP" },
  { src: "/1.png", name: "Michele S. Katz", countryCode: ["us"], position: "Founding Partner & WIPA Inaugural President", company: "Advitam IP LLC" },
  { src: "/Rafaella Oliveira.png", name: "Rafaella Oliveira", countryCode: ["br"], position: "Head of Chemical and Life Sciences Patent Acquisition Practice", company: "Licks Advogados" },
  { src: "/2.png", name: "Dhruva Dakhani", countryCode: ["gb", "in"], position: "Director", company: "Women’s IP Alliance" },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % profiles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const visibleProfiles = Array.from({ length: 4 }).map((_, i) => profiles[(startIndex + i) % profiles.length]);

  return (
    <section className="section section-white">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              Meet the Women Building the <br/> <span style={{ color: 'var(--color-accent-purple)' }}>Future of IP</span>
            </h2>
          </FadeIn>
        </div>

        <div style={{ padding: '10px 0', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <AnimatePresence mode="popLayout">
              {visibleProfiles.map((p) => (
                <motion.div 
                  key={p.name}
                  layout
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                  className={`pill-container ${p.style}`} 
                  style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}
                >
                  <div style={{ width: '160px', height: '160px', borderRadius: '24px', overflow: 'hidden', border: '3px solid var(--color-black)', backgroundColor: 'var(--color-white)' }}>
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
