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
    <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', transition: 'max-width 0.4s ease-in-out' }}>
      
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

      <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
        {visiblePlans.map((t, i) => {
          const isFeatured = t.name.includes("IP Professional");
          return (
          <div key={i} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Top Pill Badge slot (outside the card) */}
            <div style={{ height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              {(t.subtitle || isFeatured) ? (
                <div style={{ 
                  background: 'linear-gradient(90deg, #ff2d55 0%, #ff7a00 100%)', 
                  color: '#ffffff', 
                  padding: '5px 18px', 
                  borderRadius: '9999px', 
                  fontWeight: 800, 
                  fontSize: '0.8rem', 
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase', 
                  whiteSpace: 'nowrap', 
                  boxShadow: '0 4px 15px rgba(255, 45, 85, 0.4)'
                }}>
                  {t.subtitle || "MOST POPULAR"}
                </div>
              ) : null}
            </div>

            <TiltCard className={`${t.style}`} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center', 
              padding: '34px 24px 28px', 
              borderRadius: '32px', 
              backgroundColor: 'var(--bg-card)',
              border: isFeatured ? '2px solid #ff2d55' : '1px solid var(--border-card)', 
              boxShadow: isFeatured ? 'var(--shadow-featured)' : 'var(--shadow-card)', 
              flexGrow: 1, 
              width: '100%', 
              position: 'relative' 
            }}>

            {/* Header: Title + Subtitle + Price */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', minHeight: '165px', justifyContent: 'space-between' }}>
              <h3 className="heading-md" style={{ lineHeight: 1.2, minHeight: '65px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', whiteSpace: 'pre-line', color: 'var(--text-heading)', margin: 0 }}>
                {t.name.replace('\n(for Start Ups only)', '')}
                {t.name.includes('\n(for Start Ups only)') && (
                  <span style={{ fontSize: '0.55em', fontWeight: 500, marginTop: '4px', color: 'var(--text-muted)' }}>
                    (for Start Ups only)
                  </span>
                )}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', justifyContent: 'center', minHeight: '55px' }}>
                <div style={{ fontSize: '3.2rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1, color: 'var(--text-heading)' }}>
                  {isYearly ? t.price : t.monthlyPrice}
                </div>
                <div style={{ 
                  fontWeight: 700, 
                  color: 'var(--text-muted)', 
                  ...(t.price === 'FREE' && isYearly 
                    ? { fontFamily: 'cursive', textTransform: 'lowercase', fontSize: '1.25rem', marginLeft: '5px', whiteSpace: 'nowrap' } 
                    : { textTransform: 'uppercase', fontSize: '1.05rem' }) 
                }}>
                  {t.price === 'FREE' && isYearly ? 'for 1st year' : `/ ${isYearly ? 'year' : 'month'}`}
                </div>
              </div>
            </div>

            {/* Body Section */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
              
              {/* Rate-Limited / Special badge */}
              <div style={{ minHeight: '85px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                {isYearly ? (
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f472b6', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', lineHeight: 1.35 }}>
                    {t.limit}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', lineHeight: 1.35 }}>
                    Monthly subscribers won't be counted/included as founding members
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={{ fontSize: '0.98rem', color: 'var(--text-body)', lineHeight: 1.6, textAlign: 'center', minHeight: '135px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '20px' }}>
                {t.desc}
              </div>

              {/* Standard Price / Footnote */}
              {isYearly && (
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', paddingTop: '15px', borderTop: '1px solid var(--border-subtle)', minHeight: '85px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '25px' }}>
                  {t.standardPrice}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href="/waiting-list" style={{ textDecoration: 'none', width: '100%', marginTop: 'auto' }}>
              <button 
                className="btn pricing-btn" 
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  fontSize: '1.05rem', 
                  borderRadius: '50px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  textTransform: 'uppercase', 
                  lineHeight: '1.2',
                  ...(isFeatured ? {
                    background: 'linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)',
                    color: '#ffffff',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.35)'
                  } : {})
                }}
              >
                JOIN THE WAITING LIST
              </button>
            </Link>
          </TiltCard>
          </div>
        );
        })}
      </StaggerGrid>
    </div>
  );
}
