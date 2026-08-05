"use client";
import React, { useState } from "react";
import Link from "next/link";
import FadeIn from "./animations/FadeIn";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Add shadow/shrink when scrolled down a bit
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="section-white" 
        style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 1000, 
          padding: scrolled ? '10px 0' : '20px 0', 
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ zIndex: 101, display: 'flex', alignItems: 'center' }}>
            <img src="/WIPALOGO.png" alt="WIPA (Women's IP Alliance) Official Logo" style={{ height: '40px', width: 'auto' }} />
          </Link>

          {/* Desktop Nav */}
          <div className="mobile-hidden" style={{ display: 'flex', gap: '3rem', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase' }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/coming-soon">Platform</Link>
            <Link href="/community">Community</Link>
            <Link href="/plans">Pricing</Link>
            <Link href="/faqs">FAQs</Link>
          </div>

          <div className="mobile-hidden" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/waiting-list" className="btn btn-accent" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
              JOIN THE WAITING LIST
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="desktop-hidden" 
            onClick={() => setIsOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 101, display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px' }}
          >
            <div style={{ width: '30px', height: '3px', backgroundColor: 'var(--color-black)', borderRadius: '3px' }}></div>
            <div style={{ width: '30px', height: '3px', backgroundColor: 'var(--color-black)', borderRadius: '3px' }}></div>
            <div style={{ width: '30px', height: '3px', backgroundColor: 'var(--color-black)', borderRadius: '3px' }}></div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'var(--color-charcoal)', color: 'var(--color-white)', zIndex: 1000, display: 'flex', flexDirection: 'column', padding: '40px 20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--color-white)', fontSize: '2rem', cursor: 'pointer', padding: '10px' }}
            >
              ✕
            </button>
          </div>
          
          <FadeIn direction="up" style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', marginTop: '60px', fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/coming-soon" onClick={() => setIsOpen(false)}>Platform</Link>
            <Link href="/community" onClick={() => setIsOpen(false)}>Community</Link>
            <Link href="/plans" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="/faqs" onClick={() => setIsOpen(false)}>FAQs</Link>
            
            <div style={{ width: '80%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '20px 0' }}></div>
            
            <Link href="/waiting-list" onClick={() => setIsOpen(false)} className="btn btn-accent" style={{ padding: '15px 30px', fontSize: '1.2rem', marginTop: '10px' }}>
              JOIN THE WAITING LIST
            </Link>
          </FadeIn>
        </div>
      )}
    </>
  );
}
