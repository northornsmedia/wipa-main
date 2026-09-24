"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StaggerGrid from "@/components/animations/StaggerGrid";
import TiltCard from "@/components/animations/TiltCard";
import Link from "next/link";
import Select from "react-select";
import { getDeviceFingerprint } from "@/lib/fingerprint";

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

const seatsOptions = [
  { value: "5", label: "5 Seats" },
  { value: "10", label: "10 Seats" },
  { value: "10-20", label: "10-20 Seats" },
  { value: "20+", label: "20+ Seats" }
];

const modalSelectStyles = {
  control: (base: any) => ({
    ...base,
    padding: "4px 8px",
    borderRadius: "12px",
    border: "1px solid var(--border-input)",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-heading)",
    fontSize: "0.95rem"
  }),
  singleValue: (base: any) => ({ ...base, color: "var(--text-heading)" }),
  input: (base: any) => ({ ...base, color: "var(--text-heading)" }),
  option: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    backgroundColor: isSelected ? "rgba(236, 72, 153, 0.3)" : isFocused ? "var(--bg-surface-elevated)" : "transparent",
    color: "var(--text-heading)",
    cursor: "pointer"
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "12px",
    border: "1px solid var(--border-input)",
    backgroundColor: "var(--bg-card)",
    zIndex: 100
  })
};

export default function PlansGridClient({ plans }: { plans: Plan[] }) {
  const [isYearly, setIsYearly] = useState(true);
  const [isFromWaitingList, setIsFromWaitingList] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeModalPlan, setActiveModalPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmedPlanName, setConfirmedPlanName] = useState("");
  const [modalError, setModalError] = useState("");

  // Modal extra fields
  const [extraFields, setExtraFields] = useState({
    businessRegistrationNumber: "",
    dateOfIncorporation: "",
    collegeInstitute: "",
    studentId: "",
    seats: "5",
    workEmail: ""
  });

  const visiblePlans = plans.filter(t => isYearly || !t.hideOnMonthly);

  useEffect(() => {
    const checkState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const fromWlParam = searchParams.get("from_waiting_list") === "true";
      const fromWlStorage = localStorage.getItem("wipa_from_waiting_list") === "true";
      const unlockedStorage = localStorage.getItem("wipa_waitlist_unlocked") === "true";
      const storedPlan = localStorage.getItem("wipa_selected_plan");

      if (fromWlParam || fromWlStorage || unlockedStorage) {
        setIsFromWaitingList(true);
      } else {
        setIsFromWaitingList(false);
      }

      if (storedPlan) {
        setSelectedPlan(storedPlan);
      } else {
        setSelectedPlan(null);
      }
    };

    checkState();

    const handleUnlockedEvent = (e: any) => {
      if (e?.detail?.unlocked === false) {
        setIsFromWaitingList(false);
        setSelectedPlan(null);
      } else {
        setIsFromWaitingList(true);
      }
      checkState();
    };

    window.addEventListener("wipa_unlocked", handleUnlockedEvent);
    window.addEventListener("storage", checkState);

    return () => {
      window.removeEventListener("wipa_unlocked", handleUnlockedEvent);
      window.removeEventListener("storage", checkState);
    };
  }, []);

  const handlePlanClick = (rawPlanName: string) => {
    const cleanPlanName = rawPlanName.replace(/\n/g, ' ').replace('(for Start Ups only)', '').trim();
    
    // If not from waiting list or if plan already chosen, return
    if (!isFromWaitingList || selectedPlan) return;

    // Plan-specific extra info check
    if (cleanPlanName === "Entrepreneur Membership") {
      setActiveModalPlan("Entrepreneur Membership");
    } else if (cleanPlanName === "Student Membership") {
      setActiveModalPlan("Student Membership");
    } else if (cleanPlanName === "Enterprise Membership") {
      setActiveModalPlan("Enterprise Membership");
    } else if (cleanPlanName === "In-House Counsel Membership") {
      const storedEmail = localStorage.getItem("wipa_user_email") || "";
      const personalDomains = [
        'gmail.com', 'outlook.com', 'hotmail.com', 'live.com', 'yahoo.com', 
        'icloud.com', 'me.com', 'mac.com', 'aol.com', 'proton.me', 
        'protonmail.com', 'pm.me', 'gmx.com', 'gmx.net', 'mail.com'
      ];
      const domain = storedEmail.split('@')[1]?.toLowerCase();
      if (domain && personalDomains.includes(domain)) {
        setActiveModalPlan("In-House Counsel Membership");
      } else {
        submitPlanSelection("In-House Counsel Membership", {});
      }
    } else {
      // IP Professional or other plans
      submitPlanSelection(cleanPlanName, {});
    }
  };

  const submitPlanSelection = async (planToSubmit: string, additionalData: Record<string, any>) => {
    setIsSubmitting(true);
    setModalError("");

    try {
      const userId = localStorage.getItem("wipa_user_id") || new URLSearchParams(window.location.search).get("lead_id");
      const userEmail = localStorage.getItem("wipa_user_email");
      const { fingerprint } = await getDeviceFingerprint();

      const payload = {
        id: userId,
        email: userEmail,
        fingerprint,
        plan: planToSubmit,
        ...additionalData
      };

      const res = await fetch("/api/waiting-list/select-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to confirm plan selection");
      }

      // Success
      localStorage.setItem("wipa_selected_plan", planToSubmit);
      setSelectedPlan(planToSubmit);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("wipa_plan_selected", { detail: { plan: planToSubmit } }));
      }
      setConfirmedPlanName(planToSubmit);
      setActiveModalPlan(null);
      setShowSuccessModal(true);

    } catch (err: any) {
      setModalError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterAnotherColleague = () => {
    localStorage.removeItem("wipa_waitlist_unlocked");
    localStorage.removeItem("wipa_from_waiting_list");
    localStorage.removeItem("wipa_user_id");
    localStorage.removeItem("wipa_user_name");
    localStorage.removeItem("wipa_user_email");
    localStorage.removeItem("wipa_selected_plan");
    localStorage.removeItem("wipa_device_fingerprint");
    window.location.href = "/waiting-list";
  };

  return (
    <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', transition: 'max-width 0.4s ease-in-out' }}>
      
      {/* Monthly / Yearly Toggle */}
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
          const planNameClean = t.name.replace(/\n/g, ' ').replace('(for Start Ups only)', '').trim();

          return (
          <div key={i} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Top Pill Badge slot */}
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
              position: 'relative',
              opacity: 1,
              filter: 'none',
              transition: 'all 0.4s ease'
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
                    Monthly subscribers won&apos;t be counted/included as founding members
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

            {/* CTA Button: Links directly to /waiting-list with plan pre-selected */}
            <Link 
              href={`/waiting-list?plan=${encodeURIComponent(planNameClean)}`}
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.setItem("wipa_preferred_plan", planNameClean);
                  localStorage.setItem("wipa_selected_plan", planNameClean);
                }
              }}
              style={{ textDecoration: 'none', width: '100%', marginTop: 'auto' }}
            >
              <button 
                className="btn pricing-btn" 
                style={{ 
                  width: '100%', 
                  padding: '15px 12px', 
                  fontSize: '0.98rem', 
                  borderRadius: '50px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  textTransform: 'uppercase', 
                  lineHeight: '1.2',
                  marginTop: 'auto',
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s ease',
                  ...(isFeatured ? {
                    background: 'linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)',
                    color: '#ffffff',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.35)'
                  } : {
                    background: 'var(--bg-surface-elevated)',
                    color: 'var(--text-heading)',
                    border: '1px solid var(--border-card)'
                  })
                }}
              >
                JOIN THE WAITING LIST NOW
              </button>
            </Link>
          </TiltCard>
          </div>
        );
        })}
      </StaggerGrid>

      {/* Plan-specific Details Modal */}
      <AnimatePresence>
        {activeModalPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                backgroundColor: "var(--bg-card)",
                border: "2px solid rgba(236, 72, 153, 0.4)",
                borderRadius: "28px",
                padding: "clamp(24px, 5vw, 40px)",
                width: "100%",
                maxWidth: "540px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
                position: "relative"
              }}
            >
              <button
                onClick={() => setActiveModalPlan(null)}
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.4rem",
                  color: "var(--text-muted)",
                  cursor: "pointer"
                }}
              >
                ✕
              </button>

              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ display: "inline-block", background: "linear-gradient(90deg, #d946ef 0%, #ec4899 100%)", color: "#ffffff", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "10px" }}>
                  Confirm Plan Details
                </div>
                <h3 className="heading-md" style={{ color: "var(--text-heading)", margin: "0 0 8px" }}>
                  {activeModalPlan}
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-body)", margin: 0 }}>
                  Please provide the required details to secure your Founding Member rate.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (activeModalPlan === "Entrepreneur Membership") {
                    submitPlanSelection(activeModalPlan, {
                      businessRegistrationNumber: extraFields.businessRegistrationNumber,
                      dateOfIncorporation: extraFields.dateOfIncorporation
                    });
                  } else if (activeModalPlan === "Student Membership") {
                    submitPlanSelection(activeModalPlan, {
                      collegeInstitute: extraFields.collegeInstitute,
                      studentId: extraFields.studentId
                    });
                  } else if (activeModalPlan === "Enterprise Membership") {
                    submitPlanSelection(activeModalPlan, {
                      seats: extraFields.seats
                    });
                  } else if (activeModalPlan === "In-House Counsel Membership") {
                    submitPlanSelection(activeModalPlan, {
                      workEmail: extraFields.workEmail
                    });
                  }
                }}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {/* Entrepreneur Fields */}
                {activeModalPlan === "Entrepreneur Membership" && (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                        Business Registration Number <span style={{ color: "#ec4899" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 12345678"
                        value={extraFields.businessRegistrationNumber}
                        onChange={(e) => setExtraFields(prev => ({ ...prev, businessRegistrationNumber: e.target.value }))}
                        style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                        Date of Incorporation <span style={{ color: "#ec4899" }}>*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={extraFields.dateOfIncorporation}
                        onChange={(e) => setExtraFields(prev => ({ ...prev, dateOfIncorporation: e.target.value }))}
                        style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem" }}
                      />
                    </div>
                  </>
                )}

                {/* Student Fields */}
                {activeModalPlan === "Student Membership" && (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                        College / University / Institute <span style={{ color: "#ec4899" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Oxford Law School"
                        value={extraFields.collegeInstitute}
                        onChange={(e) => setExtraFields(prev => ({ ...prev, collegeInstitute: e.target.value }))}
                        style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                        Student ID / Proof Number <span style={{ color: "#ec4899" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. STU-987654"
                        value={extraFields.studentId}
                        onChange={(e) => setExtraFields(prev => ({ ...prev, studentId: e.target.value }))}
                        style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem" }}
                      />
                    </div>
                  </>
                )}

                {/* Enterprise Fields */}
                {activeModalPlan === "Enterprise Membership" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                      Number of Team Seats <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <Select
                      options={seatsOptions}
                      defaultValue={seatsOptions[0]}
                      onChange={(opt: any) => setExtraFields(prev => ({ ...prev, seats: opt.value }))}
                      styles={modalSelectStyles}
                    />
                  </div>
                )}

                {/* In-House Counsel Work Email Field */}
                {activeModalPlan === "In-House Counsel Membership" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                      Official Corporate Work Email <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. counsel@corporate.com"
                      value={extraFields.workEmail}
                      onChange={(e) => setExtraFields(prev => ({ ...prev, workEmail: e.target.value }))}
                      style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem" }}
                    />
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Complimentary In-House Counsel membership is verified with a valid corporate organisation domain.
                    </span>
                  </div>
                )}

                {modalError && (
                  <div style={{ color: "#ef4444", fontSize: "0.88rem", textAlign: "center", backgroundColor: "rgba(239,68,68,0.1)", padding: "10px", borderRadius: "8px" }}>
                    {modalError}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-accent"
                  style={{
                    marginTop: "10px",
                    padding: "14px",
                    fontSize: "1rem",
                    borderRadius: "50px",
                    fontWeight: "bold",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    background: "linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)",
                    color: "#ffffff",
                    border: "none"
                  }}
                >
                  {isSubmitting ? "CONFIRMING PLAN..." : "SELECT PLAN & JOIN WAITING LIST NOW ➔"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 30 }}
              style={{
                backgroundColor: "var(--bg-card)",
                border: "2px solid #10b981",
                borderRadius: "32px",
                padding: "clamp(30px, 6vw, 50px)",
                width: "100%",
                maxWidth: "560px",
                textAlign: "center",
                boxShadow: "0 20px 70px rgba(16, 185, 129, 0.3)",
                position: "relative"
              }}
            >
              <div style={{ fontSize: "4.5rem", marginBottom: "16px" }}>🎉</div>
              <div style={{ display: "inline-block", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "6px 18px", borderRadius: "20px", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "16px", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
                Founding Member Registered
              </div>
              <h2 className="heading-md" style={{ color: "var(--text-heading)", marginBottom: "12px", fontSize: "1.8rem" }}>
                {confirmedPlanName}
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-body)", lineHeight: 1.6, marginBottom: "30px" }}>
                Thank you! Your founding rate has been locked in and your details are registered in the priority allocation list. We will be in touch with your membership onboarding details.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="btn btn-accent"
                  style={{
                    padding: "14px 36px",
                    borderRadius: "50px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                    color: "#ffffff",
                    border: "none",
                    boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
                    cursor: "pointer",
                    width: "100%"
                  }}
                >
                  VIEW YOUR SELECTED PLAN ✓
                </button>

                <button
                  onClick={handleRegisterAnotherColleague}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    background: "transparent",
                    color: "var(--text-heading)",
                    border: "1px solid var(--border-input)",
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s"
                  }}
                >
                  <span>➕</span> Register Another Colleague / Team Member
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
