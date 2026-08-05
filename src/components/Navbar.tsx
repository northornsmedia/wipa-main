"use client";
import React, { useState } from "react";
import Link from "next/link";
import FadeIn from "./animations/FadeIn";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

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
        className={`section-white navbar-header ${scrolled ? 'scrolled' : ''}`}
      >
        <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ zIndex: 101, display: 'flex', alignItems: 'center' }}>
            <img src="/WIPALOGO.png" alt="WIPA (Women's IP Alliance) Official Logo" className="navbar-logo" />
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
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 1001, display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px' }}
          >
            <motion.div 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 9 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '30px', height: '3px', backgroundColor: 'var(--color-white)', borderRadius: '3px', transformOrigin: 'center' }}
            ></motion.div>
            <motion.div 
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ width: '30px', height: '3px', backgroundColor: 'var(--color-white)', borderRadius: '3px' }}
            ></motion.div>
            <motion.div 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -9 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '30px', height: '3px', backgroundColor: 'var(--color-white)', borderRadius: '3px', transformOrigin: 'center' }}
            ></motion.div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'var(--color-charcoal)', color: 'var(--color-white)', zIndex: 999, display: 'flex', flexDirection: 'column', padding: '100px 20px 40px', overflowY: 'auto' }}
          >
          
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
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
