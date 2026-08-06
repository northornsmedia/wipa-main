"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import StaggerGrid from "@/components/animations/StaggerGrid";
import TiltCard from "@/components/animations/TiltCard";
import Link from "next/link";

interface Plan {
  name: string;
  subtitle?: string;
  extra?: string;
  price: string;
  monthlyPrice: string;
  limit: string;
  desc: string;
  standardPrice: string;
  hideLimitOnMonthly?: boolean;
  style: string;
  hideOnMonthly?: boolean;
}

export default function PlansGridClient({ plans }: { plans: Plan[] }) {
  const [isYearly, setIsYearly] = useState(true);
  const visiblePlans = plans.filter(t => isYearly || !t.hideOnMonthly);

  return (
    <div style={{ width: '100%', maxWidth: visiblePlans.length <= 3 ? '1200px' : '1600px', margin: '0 auto', transition: 'max-width 0.4s ease-in-out' }}>
      
      <div style={{ display: 'none', justifyContent: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50px', padding: '5px' }}>
          <button 
            onClick={() => setIsYearly(false)}
            style={{ 
              position: 'relative',
              padding: '10px 24px', 
              borderRadius: '50px', 
              border: 'none',
              backgroundColor: 'transparent',
              color: !isYearly ? 'var(--color-black)' : 'var(--color-white)',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              zIndex: 1,
              transition: 'color 0.3s ease'
            }}
          >
            {!isYearly && (
              <motion.div
                layoutId="active-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--color-white)',
                  borderRadius: '50px',
                  zIndex: -1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            Monthly
          </button>

          <button 
            onClick={() => setIsYearly(true)}
            style={{ 
              position: 'relative',
              padding: '10px 24px', 
              borderRadius: '50px', 
              border: 'none',
              backgroundColor: 'transparent',
              color: isYearly ? 'var(--color-black)' : 'var(--color-white)',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              zIndex: 1,
              transition: 'color 0.3s ease'
            }}
          >
            {isYearly && (
              <motion.div
                layoutId="active-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--color-white)',
                  borderRadius: '50px',
                  zIndex: -1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            Yearly
          </button>
        </div>
      </div>

      <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
        {visiblePlans.map((t, i) => (
          <TiltCard key={i} className={`${t.style}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '30px', borderRadius: '32px', border: '2px solid var(--color-black)', boxShadow: '8px 8px 0px var(--color-black)', height: '100%', position: 'relative' }}>
            
            {t.subtitle && (
              <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#555', color: 'var(--color-white)', padding: '8px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '1.05rem', whiteSpace: 'nowrap', zIndex: 10 }}>
                {t.subtitle}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', marginBottom: '25px', paddingBottom: '25px', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
              <h3 className="heading-md" style={{ lineHeight: 1.2, minHeight: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', whiteSpace: 'pre-line' }}>
                {t.name.replace('\n(for Start Ups only)', '')}
                {t.name.includes('\n(for Start Ups only)') && (
                  <span style={{ fontSize: '0.55em', fontWeight: 500, marginTop: '5px', opacity: 0.9 }}>
                    (for Start Ups only)
                  </span>
                )}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', justifyContent: 'center' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                  {isYearly ? t.price : t.monthlyPrice}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>
                  / {isYearly ? 'year' : 'month'}
                </div>
              </div>
            </div>

            <div style={{ flexGrow: 1, marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {t.extra && isYearly && <div style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '10px' }}>{t.extra}</div>}
              {isYearly ? (
                <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--color-black)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px', alignSelf: 'center' }}>{t.limit}</div>
              ) : (
                <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--color-black)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px', alignSelf: 'center' }}>Monthly subscribers won't be counted/included as founding members</div>
              )}
              <div style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '20px', textAlign: 'center' }}>{t.desc}</div>
              {isYearly && <div style={{ fontSize: '0.95rem', fontWeight: 'bold', marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>{t.standardPrice}</div>}
            </div>

            <Link href="/waiting-list" style={{ textDecoration: 'none', width: '100%', marginTop: 'auto' }}>
              <button className="btn btn-outline pricing-btn" style={{ borderColor: 'var(--color-black)', color: 'var(--color-black)', width: '100%', backgroundColor: 'var(--color-white)', padding: '15px', fontSize: '1.1rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', lineHeight: '1.2' }}>JOIN THE WAITING LIST</button>
            </Link>
          </TiltCard>
        ))}
      </StaggerGrid>
    </div>
  );
}
