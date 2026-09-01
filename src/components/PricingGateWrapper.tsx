"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { allCountries } from "country-telephone-data";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { getDeviceFingerprint } from "@/lib/fingerprint";

interface PricingGateWrapperProps {
  children: React.ReactNode;
}

const countryOptions = allCountries
  .map(c => {
    const cleanName = c.name.replace(/\s*\([^)]*\)/g, '').trim();
    return {
      value: c.iso2.toUpperCase(),
      name: cleanName,
      label: `${cleanName} (+${c.dialCode})`,
      dialCode: `+${c.dialCode}`,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const formatOptionLabel = ({ value, label }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <img 
      src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`} 
      alt={value} 
      style={{ width: "20px", height: "15px", objectFit: "cover", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "2px" }} 
    />
    <span style={{ fontSize: "0.95rem" }}>{label}</span>
  </div>
);

const titleOptions = [
  { value: "Ms.", label: "Ms." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Mr.", label: "Mr." },
  { value: "Dr.", label: "Dr." },
  { value: "Prof.", label: "Prof." },
  { value: "Adv.", label: "Adv." },
  { value: "Other", label: "Other" }
];

const professionOptions = [
  { value: "IP Attorney / Patent Attorney", label: "IP Attorney / Patent Attorney" },
  { value: "Trade Mark Attorney", label: "Trade Mark Attorney" },
  { value: "In-House IP Counsel", label: "In-House IP Counsel" },
  { value: "Startup Founder / Entrepreneur", label: "Startup Founder / Entrepreneur" },
  { value: "IP Consultant / Specialist", label: "IP Consultant / Specialist" },
  { value: "Student / Academic Researcher", label: "Student / Academic Researcher" },
  { value: "Law Firm Partner / Leader", label: "Law Firm Partner / Leader" },
  { value: "Other", label: "Other" }
];

const selectStyles = {
  control: (base: any) => ({
    ...base,
    padding: "3px 8px",
    borderRadius: "12px",
    border: "1px solid var(--border-input)",
    fontSize: "0.95rem",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-heading)",
    boxShadow: "none",
    minHeight: "48px",
    '&:hover': {
      border: "1px solid var(--border-input)"
    }
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "var(--text-heading)"
  }),
  input: (base: any) => ({
    ...base,
    color: "var(--text-heading)"
  }),
  option: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    backgroundColor: isSelected 
      ? "rgba(236, 72, 153, 0.3)" 
      : isFocused 
        ? "var(--bg-surface-elevated)" 
        : "transparent",
    color: "var(--text-heading)",
    cursor: "pointer",
    padding: "10px 14px",
    fontSize: "0.95rem"
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "12px",
    border: "1px solid var(--border-input)",
    backgroundColor: "var(--bg-card)",
    boxShadow: "var(--shadow-card)",
    overflow: "hidden",
    zIndex: 50
  })
};

export default function PricingGateWrapper({ children }: PricingGateWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFromWaitingList, setIsFromWaitingList] = useState(false);
  const [userName, setUserName] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    country: "GB",
    phone: "",
    email: "",
    company: "",
    profession: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneStatus, setPhoneStatus] = useState<{ status: 'idle' | 'valid' | 'invalid'; message: string }>({
    status: 'idle',
    message: ''
  });

  useEffect(() => {
    setIsMounted(true);
    const searchParams = new URLSearchParams(window.location.search);
    const fromWlParam = searchParams.get("from_waiting_list") === "true";
    const leadIdParam = searchParams.get("lead_id");
    const unlocked = localStorage.getItem("wipa_waitlist_unlocked");
    const fromWlStorage = localStorage.getItem("wipa_from_waiting_list") === "true";
    const storedName = localStorage.getItem("wipa_user_name");

    if (leadIdParam) {
      localStorage.setItem("wipa_user_id", leadIdParam);
    }

    if (fromWlParam || fromWlStorage) {
      setIsFromWaitingList(true);
      setIsUnlocked(true);
      localStorage.setItem("wipa_waitlist_unlocked", "true");
      localStorage.setItem("wipa_from_waiting_list", "true");
    } else if (unlocked === "true") {
      setIsUnlocked(true);
    }

    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const selectedCountryOption =
    countryOptions.find(c => c.value === formData.country) ||
    countryOptions.find(c => c.value === "GB") ||
    countryOptions[0];

  const dialCode = selectedCountryOption ? selectedCountryOption.dialCode : "+44";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (name === 'phone') setPhoneStatus({ status: 'idle', message: '' });
  };

  const handlePhoneBlur = () => {
    if (!formData.phone) {
      setPhoneStatus({ status: 'idle', message: '' });
      return;
    }
    try {
      const isValid = isValidPhoneNumber(formData.phone, formData.country.toUpperCase() as CountryCode);
      if (!isValid) {
        setPhoneStatus({
          status: 'invalid',
          message: "Please enter a valid phone number for the selected country."
        });
      } else {
        setPhoneStatus({
          status: 'valid',
          message: ""
        });
      }
    } catch {
      setPhoneStatus({
        status: 'invalid',
        message: "Please enter a valid phone number."
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Phone validation
    if (formData.phone) {
      try {
        const isValid = isValidPhoneNumber(formData.phone, formData.country.toUpperCase() as CountryCode);
        if (!isValid) {
          setError("Please enter a valid phone number for the selected country.");
          return;
        }
      } catch {
        setError("Please enter a valid phone number.");
        return;
      }
    }

    setIsLoading(true);

    try {
      const { fingerprint, deviceInfo } = await getDeviceFingerprint();

      const countryObj = countryOptions.find(c => c.value === formData.country) || countryOptions.find(c => c.value === "GB");
      const fullCountryName = countryObj ? `${countryObj.name} (${countryObj.dialCode})` : formData.country;
      const currentDialCode = countryObj ? countryObj.dialCode : "+44";

      let formattedPhone = formData.phone.trim();
      if (formattedPhone && !formattedPhone.startsWith('+')) {
        formattedPhone = `${currentDialCode} ${formattedPhone}`;
      }

      const res = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          name: formData.name,
          country: fullCountryName,
          phone: formattedPhone,
          email: formData.email,
          company: formData.company,
          profession: formData.profession,
          plan: null,
          fingerprint,
          device_info: deviceInfo
        })
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      // Unlock pricing & persist identity
      localStorage.setItem("wipa_waitlist_unlocked", "true");
      localStorage.setItem("wipa_from_waiting_list", "true");
      if (result.id) localStorage.setItem("wipa_user_id", result.id);
      if (formData.name) {
        localStorage.setItem("wipa_user_name", formData.name);
        setUserName(formData.name);
      }
      if (formData.email) {
        localStorage.setItem("wipa_user_email", formData.email);
      }
      
      setIsFromWaitingList(true);
      setIsUnlocked(true);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("wipa_unlocked", { detail: { unlocked: true } }));
      }

      // Scroll to top of pricing section smoothly
      setTimeout(() => {
        window.scrollTo({ top: 350, behavior: "smooth" });
      }, 300);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterAnotherPerson = () => {
    localStorage.removeItem("wipa_waitlist_unlocked");
    localStorage.removeItem("wipa_from_waiting_list");
    localStorage.removeItem("wipa_user_id");
    localStorage.removeItem("wipa_user_name");
    localStorage.removeItem("wipa_user_email");
    localStorage.removeItem("wipa_selected_plan");
    localStorage.removeItem("wipa_device_fingerprint");
    window.location.href = "/waiting-list";
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div style={{ position: "relative", width: "100%" }}>
        <div style={{ filter: "none", opacity: 1 }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Unlocked banner if already unlocked */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: "1100px",
            margin: "0 auto 35px",
            padding: "16px 24px",
            backgroundColor: isFromWaitingList ? "rgba(236, 72, 153, 0.12)" : "rgba(16, 185, 129, 0.1)",
            border: `1px solid ${isFromWaitingList ? "rgba(236, 72, 153, 0.4)" : "rgba(16, 185, 129, 0.35)"}`,
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            boxShadow: isFromWaitingList ? "0 4px 25px rgba(236, 72, 153, 0.2)" : "0 4px 20px rgba(16, 185, 129, 0.15)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "1.4rem" }}>{isFromWaitingList ? "🎯" : "✨"}</span>
            <div>
              <div style={{ fontSize: "1.05rem", color: isFromWaitingList ? "#ec4899" : "#10b981", fontWeight: 800 }}>
                {userName ? `Welcome, ${userName}! ` : ""}
                {isFromWaitingList ? "Step 2: Choose Your Founding Plan Below" : "Founding Member Rates are Unlocked"}
              </div>
              {isFromWaitingList && (
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  Click <strong>&ldquo;SELECT THE PLAN AND JOIN WAITING LIST&rdquo;</strong> on any plan card below to confirm your membership selection.
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={handleRegisterAnotherPerson}
              title="Register another colleague on this device"
              style={{
                background: "rgba(236, 72, 153, 0.15)",
                border: "1px solid rgba(236, 72, 153, 0.4)",
                color: "var(--text-heading)",
                fontSize: "0.82rem",
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <span>➕</span> Register Another Person
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Pricing Content Area with Conditional Blur */}
      <motion.div
        animate={{
          filter: isUnlocked ? "blur(0px)" : "blur(14px)",
          opacity: isUnlocked ? 1 : 0.35,
          scale: isUnlocked ? 1 : 0.985
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          pointerEvents: isUnlocked ? "auto" : "none",
          userSelect: isUnlocked ? "auto" : "none",
          position: "relative"
        }}
        aria-hidden={!isUnlocked}
      >
        {children}
      </motion.div>

      {/* Frosted Glass Gate Overlay Form (only shown if not unlocked and not from waiting list) */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            key="pricing-gate-overlay"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -30, transition: { duration: 0.4 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "640px",
              zIndex: 30,
              padding: "0 15px"
            }}
          >
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "28px",
                border: "2px solid rgba(236, 72, 153, 0.4)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(236, 72, 153, 0.2)",
                padding: "clamp(24px, 5vw, 44px)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Glowing decorative accent */}
              <div
                style={{
                  position: "absolute",
                  top: "-80px",
                  right: "-80px",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(0,0,0,0) 70%)",
                  pointerEvents: "none"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-80px",
                  left: "-80px",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(0,0,0,0) 70%)",
                  pointerEvents: "none"
                }}
              />

              {/* Gate Header */}
              <div style={{ textAlign: "center", marginBottom: "28px", position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "linear-gradient(90deg, #ff2d55 0%, #ff7a00 100%)",
                    color: "#ffffff",
                    padding: "6px 18px",
                    borderRadius: "9999px",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 15px rgba(255, 45, 85, 0.4)",
                    marginBottom: "16px"
                  }}
                >
                  🔒 EXCLUSIVE FOUNDING ACCESS
                </div>

                <h2
                  className="heading-md"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
                    marginBottom: "10px",
                    color: "var(--text-heading)",
                    lineHeight: 1.2
                  }}
                >
                  Unlock Founding Member Pricing
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-body)",
                    lineHeight: 1.5,
                    maxWidth: "480px",
                    margin: "0 auto"
                  }}
                >
                  Join the official waiting list to view our limited-availability introductory rates and select your protected Founding Member plan.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
                
                {/* Title & Full Name */}
                <div className="mobile-stack" style={{ display: "flex", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "120px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                      Title
                    </label>
                    <Select
                      options={titleOptions}
                      placeholder="Title"
                      value={titleOptions.find(t => t.value === formData.title) || null}
                      onChange={(selected: any) => {
                        if (selected) {
                          setFormData(prev => ({ ...prev, title: selected.value }));
                        }
                      }}
                      styles={selectStyles}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 3 }}>
                    <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                      Full Name <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "12px",
                        border: "1px solid var(--border-input)",
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-heading)",
                        fontSize: "0.95rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                    Email Address <span style={{ color: "#ec4899" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@organisation.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-input)",
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-heading)",
                      fontSize: "0.95rem",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Country Selection */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                    Country <span style={{ color: "#ec4899" }}>*</span>
                  </label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find(c => c.value === formData.country)}
                    onChange={(selected: any) => {
                      if (selected) {
                        setFormData(prev => ({ ...prev, country: selected.value }));
                      }
                    }}
                    formatOptionLabel={formatOptionLabel}
                    styles={selectStyles}
                  />
                </div>

                {/* Phone Number */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                    Phone Number <span style={{ color: "#ec4899" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      border: `1px solid ${phoneStatus.status === 'invalid' ? '#ef4444' : phoneStatus.status === 'valid' ? '#10b981' : 'var(--border-input)'}`,
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "var(--bg-primary)"
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 14px",
                        backgroundColor: "var(--bg-surface-elevated)",
                        color: "var(--text-heading)",
                        fontWeight: 700,
                        borderRight: "1px solid var(--border-input)",
                        minWidth: "65px",
                        textAlign: "center",
                        fontSize: "0.95rem"
                      }}
                    >
                      {dialCode}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 7123456789"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handlePhoneBlur}
                      style={{
                        flex: 1,
                        padding: "12px 14px",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "var(--text-heading)",
                        fontSize: "0.95rem",
                        outline: "none"
                      }}
                    />
                  </div>
                  {phoneStatus.message && (
                    <span style={{ fontSize: "0.8rem", color: phoneStatus.status === 'invalid' ? '#ef4444' : '#10b981' }}>
                      {phoneStatus.message}
                    </span>
                  )}
                </div>

                {/* Profession / Role */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                    Profession / Role
                  </label>
                  <Select
                    options={professionOptions}
                    placeholder="Select your profession / role"
                    value={professionOptions.find(p => p.value === formData.profession) || null}
                    onChange={(selected: any) => {
                      if (selected) {
                        setFormData(prev => ({ ...prev, profession: selected.value }));
                      }
                    }}
                    styles={selectStyles}
                  />
                </div>

                {/* Company / Organisation (Optional) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-heading)" }}>
                    Company / Law Firm / Organisation <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "normal" }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Acme IP Law"
                    value={formData.company}
                    onChange={handleChange}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-input)",
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-heading)",
                      fontSize: "0.95rem",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Error Banner */}
                {error && (
                  <div
                    style={{
                      padding: "12px 16px",
                      backgroundColor: "rgba(239, 68, 68, 0.12)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "12px",
                      color: "#ef4444",
                      fontSize: "0.88rem",
                      textAlign: "center"
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-accent"
                  style={{
                    marginTop: "8px",
                    padding: "15px",
                    fontSize: "1.05rem",
                    borderRadius: "50px",
                    fontWeight: "bold",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: "linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)",
                    color: "#ffffff",
                    border: "none",
                    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.4)"
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner" style={{ display: "inline-block", width: "18px", height: "18px", border: "2px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      <span>SAVING & CONTINUING...</span>
                    </>
                  ) : (
                    "CONTINUE ➔"
                  )}
                </motion.button>

                <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
                  🔒 Your details are protected & strictly confidential.
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
