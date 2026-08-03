"use client";
import React, { useState } from "react";
import Link from "next/link";
import FadeIn from "./animations/FadeIn";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="section-white" style={{ position: 'relative', zIndex: 100, padding: '20px 0' }}>
        <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ zIndex: 101, display: 'flex', alignItems: 'center' }}>
            <img src="/WIPALOGO.png" alt="WIPA Logo" style={{ height: '40px', width: 'auto' }} />
          </Link>

          {/* Desktop Nav */}
          <div className="mobile-hidden" style={{ display: 'flex', gap: '3rem', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase' }}>
            <Link href="#about">About</Link>
            <Link href="#features">Platform</Link>
            <Link href="#audience">Community</Link>
          </div>

          <div className="mobile-hidden" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="https://wipa.vercel.app" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase' }}>Sign In</Link>
            <Link href="#membership" className="btn btn-accent" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
              Get Started
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
      </header>

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
            <Link href="#about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#features" onClick={() => setIsOpen(false)}>Platform</Link>
            <Link href="#audience" onClick={() => setIsOpen(false)}>Community</Link>
            
            <div style={{ width: '80%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '20px 0' }}></div>
            
            <Link href="https://wipa.vercel.app" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem' }}>Sign In</Link>
            <Link href="#membership" onClick={() => setIsOpen(false)} className="btn btn-accent" style={{ padding: '15px 30px', fontSize: '1.2rem', marginTop: '10px' }}>
              Get Started
            </Link>
          </FadeIn>
        </div>
      )}
    </>
  );
}
