"use client";

import React, { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import Link from "next/link";
import PlansGridClient from "@/components/PlansGridClient";
import PricingGateWrapper from "@/components/PricingGateWrapper";

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

export default function PlansPageContent({ plans }: { plans: Plan[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isFromWaitingList, setIsFromWaitingList] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const checkStatus = () => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const fromWlParam = searchParams.get("from_waiting_list") === "true";
    const fromWlStorage = localStorage.getItem("wipa_from_waiting_list") === "true";
    const unlockedStorage = localStorage.getItem("wipa_waitlist_unlocked") === "true";
    const storedName = localStorage.getItem("wipa_user_name") || "";
    const storedPlan = localStorage.getItem("wipa_selected_plan");

    if (fromWlParam || fromWlStorage) {
      setIsFromWaitingList(true);
    } else if (unlockedStorage) {
      setIsFromWaitingList(true);
    } else {
      setIsFromWaitingList(false);
    }

    setUserName(storedName);
    setSelectedPlan(storedPlan || null);
  };

  useEffect(() => {
    setIsMounted(true);
    checkStatus();

    const handleUnlocked = () => checkStatus();
    const handlePlanSelected = (e: any) => {
      if (e?.detail?.plan) {
        setSelectedPlan(e.detail.plan);
      } else {
        checkStatus();
      }
    };

    window.addEventListener("wipa_unlocked", handleUnlocked);
    window.addEventListener("wipa_plan_selected", handlePlanSelected);
    window.addEventListener("storage", checkStatus);

    return () => {
      window.removeEventListener("wipa_unlocked", handleUnlocked);
      window.removeEventListener("wipa_plan_selected", handlePlanSelected);
      window.removeEventListener("storage", checkStatus);
    };
  }, []);

  // Common: Custom Enterprise Plan component
  const renderEnterpriseCard = () => (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '70px auto 0', padding: '0 clamp(10px, 3vw, 20px)' }}>
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '50px 30px', borderRadius: '32px', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h2 className="heading-huge" style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--text-heading)' }}>Custom Enterprise Plan</h2>
        <p className="mobile-text-center" style={{ fontSize: '1.2rem', maxWidth: '800px', marginBottom: '40px', lineHeight: 1.6, textAlign: 'center', color: 'var(--text-body)' }}>
          Need a tailored solution for your entire organisation? We offer custom enterprise packages for law firms, universities, and corporate IP departments. Get in touch to build a plan that perfectly fits your team&apos;s needs.
        </p>
        <Link href="/waiting-list" style={{ textDecoration: 'none' }}>
          <button className="btn btn-accent" style={{ padding: '15px clamp(15px, 4vw, 40px)', fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
            JOIN THE WAITING LIST NOW
          </button>
        </Link>
      </div>
    </div>
  );

  // Common: Founding Member Advantage Card
  const renderAdvantageCard = (margin = '20px auto 40px') => (
    <div style={{ width: '100%', maxWidth: '100%', margin: margin, padding: '0 clamp(15px, 4vw, 40px)' }}>
      <FadeIn direction="up" delay={0.2}>
        <div style={{
          padding: 'clamp(20px, 5vw, 30px) clamp(15px, 4vw, 40px)',
          backgroundColor: 'rgba(236, 72, 153, 0.05)',
          color: 'var(--text-heading)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          boxShadow: '0 0 30px rgba(236, 72, 153, 0.1)',
          borderRadius: '16px',
          maxWidth: '100%',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h4 className="mobile-text-center" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', marginBottom: '12px', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#f472b6', textAlign: 'center' }}>
            Your Founding Member Advantage
          </h4>
          <p className="mobile-text-center" style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6, fontWeight: 400, fontStyle: 'italic', opacity: 0.9, textAlign: 'center', color: 'var(--text-light)' }}>
            Joining as a Founding Member not only secures your place within the Alliance&apos;s inaugural community, but also <span style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: 'var(--text-heading)', border: '1px solid rgba(236, 72, 153, 0.35)', padding: '2px 8px', borderRadius: '4px', fontStyle: 'normal', fontWeight: 600 }}>locks in your exclusive Founding Member rate</span> for future renewals. Once all Founding Memberships have been allocated, new members will join at the standard annual rates, while existing Founding Members will continue to benefit from their protected introductory pricing, provided their membership remains active.
          </p>
        </div>
      </FadeIn>
    </div>
  );

  // Common: 2027 Commencement Pill
  const renderCommencementNote = () => (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 35px' }}>
      <div style={{ display: 'inline-block', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: 'var(--text-heading)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '6px 18px', borderRadius: '20px', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center' }}>
        Please note: All memberships purchased today will officially commence in January 2027.
      </div>
    </div>
  );

  // =========================================================================
  // VIEW A: When user is coming from the waiting list form (CARDS ON TOP!)
  // =========================================================================
  if (isMounted && isFromWaitingList) {
    return (
      <section className="section section-dark" style={{ paddingTop: '110px', paddingBottom: '90px' }}>
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '0 clamp(10px, 3vw, 40px)' }}>
          
          {/* Top Step 2 Header */}
          <div style={{ textAlign: 'center', marginBottom: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            
            {/* 2-Step Progress Indicator */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: '50px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {/* Step 1 badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: '20px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#10b981',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                <span>✓</span>
                <span>Step 1: Details Submitted</span>
              </div>

              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>➔</span>

              {/* Step 2 badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 16px',
                borderRadius: '20px',
                backgroundColor: selectedPlan ? 'rgba(16, 185, 129, 0.15)' : 'rgba(236, 72, 153, 0.2)',
                border: selectedPlan ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid #ec4899',
                color: selectedPlan ? '#10b981' : '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: selectedPlan ? 'none' : '0 0 22px rgba(236, 72, 153, 0.5)',
                animation: selectedPlan ? 'none' : 'pulseStepBadge 2.2s infinite ease-in-out'
              }}>
                <span>{selectedPlan ? "✓" : "⚡"}</span>
                <span>{selectedPlan ? `Step 2: ${selectedPlan} Selected` : "Step 2: Choose Your Plan (Action Required)"}</span>
              </div>
            </div>

            {/* Main Action Title */}
            <h1 style={{
              fontSize: 'clamp(2.1rem, 5.5vw, 3.6rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: '0 0 14px',
              color: 'var(--text-heading)',
              lineHeight: 1.15
            }}>
              {selectedPlan ? "Founding Membership Confirmed" : "Select Your Founding Plan"}
            </h1>

            {/* Instruction Subtitle */}
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.18rem)',
              color: 'var(--text-body)',
              textAlign: 'center',
              maxWidth: '840px',
              margin: '0 auto 20px',
              lineHeight: 1.6,
              fontWeight: 300
            }}>
              {selectedPlan ? (
                <>
                  Welcome, <strong style={{ color: '#10b981' }}>{userName || "Member"}</strong>! Your founding member allocation for <strong>{selectedPlan}</strong> has been secured. Our team will contact you with onboarding details.
                </>
              ) : (
                <>
                  Welcome, <strong style={{ color: '#f472b6' }}>{userName || "Member"}</strong>! <strong>You have one final step:</strong> Please review the plans below and click <span style={{ color: 'var(--text-heading)', fontWeight: 700 }}>&ldquo;SELECT PLAN &amp; JOIN WAITING LIST&rdquo;</span> to confirm your interest and lock in your protected founding rate.
                </>
              )}
            </p>

            {/* Attention banner if plan is NOT yet selected */}
            {!selectedPlan && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(236, 72, 153, 0.12)',
                border: '1px solid rgba(236, 72, 153, 0.4)',
                padding: '9px 22px',
                borderRadius: '50px',
                color: '#f472b6',
                fontWeight: 800,
                fontSize: '0.88rem',
                letterSpacing: '0.03em',
                boxShadow: '0 4px 20px rgba(236, 72, 153, 0.25)',
                marginBottom: '10px'
              }}>
                <span style={{ fontSize: '1.2rem', animation: 'bounceDown 1.5s infinite' }}>👇</span>
                <span>NOT DONE YET — SELECT YOUR PLAN BELOW TO COMPLETE REGISTRATION</span>
              </div>
            )}
          </div>

          {/* CARDS ARE DISPLAYED RIGHT ON TOP! */}
          <PricingGateWrapper hideBanner={true}>
            <PlansGridClient plans={plans} />

            {/* Informational Founding Member Advantage placed below the cards */}
            <div style={{ marginTop: '50px' }}>
              {renderAdvantageCard('0 auto 30px')}
            </div>

            {/* Commencement note */}
            {renderCommencementNote()}

            {/* Custom Enterprise Plan */}
            {renderEnterpriseCard()}
          </PricingGateWrapper>

        </div>

        <style jsx global>{`
          @keyframes pulseStepBadge {
            0%, 100% {
              box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
              border-color: #ec4899;
            }
            50% {
              box-shadow: 0 0 30px rgba(236, 72, 153, 0.85);
              border-color: #f472b6;
            }
          }
          @keyframes bounceDown {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(4px);
            }
          }
        `}</style>
      </section>
    );
  }

  // =========================================================================
  // VIEW B: Standard Visitor (Not from waiting list)
  // =========================================================================
  return (
    <section className="section section-dark" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
      <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '0 clamp(10px, 3vw, 40px)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', width: '100%', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <TextReveal 
              lines={["ALL MEMBERSHIP PLANS"]} 
              style={{ marginBottom: '10px' }} 
            />
          </div>
          <FadeIn direction="up" delay={0.2} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <p className="mobile-text-center" style={{ fontSize: '1.2rem', color: 'var(--text-heading)', opacity: 0.9, maxWidth: '1200px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300, textAlign: 'center' }}>
              Choose the perfect plan for you or your organisation.
            </p>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: 'var(--text-heading)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '6px 18px', borderRadius: '20px', fontWeight: 700, fontSize: '0.95rem' }}>
              Please note: All memberships purchased today will officially commence in January 2027.
            </div>
          </FadeIn>
        </div>
        
        {renderAdvantageCard()}

        <PricingGateWrapper>
          <PlansGridClient plans={plans} />
          {renderEnterpriseCard()}
        </PricingGateWrapper>

      </div>
    </section>
  );
}
