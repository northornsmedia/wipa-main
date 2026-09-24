"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { allCountries } from "country-telephone-data";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { getDeviceFingerprint } from "@/lib/fingerprint";

interface PricingGateWrapperProps {
  children: React.ReactNode;
  hideBanner?: boolean;
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
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <img 
      src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`} 
      alt={value} 
      style={{ width: "18px", height: "13px", objectFit: "cover", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "2px", flexShrink: 0 }} 
    />
    <span style={{ fontSize: "0.86rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
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

const selectStyles = {
  control: (base: any) => ({
    ...base,
    padding: "0 4px",
    borderRadius: "10px",
    border: "1px solid var(--border-input)",
    fontSize: "0.86rem",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-heading)",
    boxShadow: "none",
    minHeight: "38px",
    height: "38px",
    '&:hover': {
      border: "1px solid var(--border-input)"
    }
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0 6px"
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "var(--text-heading)",
    fontSize: "0.86rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }),
  input: (base: any) => ({
    ...base,
    color: "var(--text-heading)",
    fontSize: "0.86rem",
    margin: 0,
    padding: 0
  }),
  placeholder: (base: any) => ({
    ...base,
    fontSize: "0.84rem",
    color: "var(--text-muted)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
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
    padding: "8px 12px",
    fontSize: "0.86rem"
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "10px",
    border: "1px solid var(--border-input)",
    backgroundColor: "var(--bg-card)",
    boxShadow: "var(--shadow-card)",
    overflow: "hidden",
    zIndex: 999999
  })
};

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: "10px",
  border: "1px solid var(--border-input)",
  backgroundColor: "var(--bg-primary)",
  color: "var(--text-heading)",
  fontSize: "0.86rem",
  outline: "none",
  height: "38px",
  width: "100%",
  boxSizing: "border-box"
};

export default function PricingGateWrapper({ children, hideBanner = false }: PricingGateWrapperProps) {
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
    } else if (unlocked === "true") {
      setIsUnlocked(true);
    }

    // Pre-populate form fields from browser cache
    try {
      let cached: any = {};
      const rawCache = localStorage.getItem("wipa_form_cache");
      if (rawCache) {
        cached = JSON.parse(rawCache);
      }
      const title = cached.title || localStorage.getItem("wipa_user_title") || "";
      const name = cached.name || localStorage.getItem("wipa_user_name") || "";
      const country = cached.country || localStorage.getItem("wipa_user_country") || "GB";
      let phone = cached.phone || localStorage.getItem("wipa_user_phone") || "";
      const email = cached.email || localStorage.getItem("wipa_user_email") || "";
      const company = cached.company || localStorage.getItem("wipa_user_company") || "";
      const profession = cached.profession || localStorage.getItem("wipa_user_profession") || "";

      if (phone && phone.startsWith("+")) {
        const parts = phone.split(/\s+/);
        if (parts.length > 1) {
          phone = parts.slice(1).join(" ");
        }
      }

      setFormData(prev => ({
        ...prev,
        title: title || prev.title,
        name: name || prev.name,
        country: country || prev.country,
        phone: phone || prev.phone,
        email: email || prev.email,
        company: company || prev.company,
        profession: profession || prev.profession
      }));

      if (name) {
        setUserName(name);
      } else if (storedName) {
        setUserName(storedName);
      }
    } catch {}
  }, []);

  const selectedCountryOption =
    countryOptions.find(c => c.value === formData.country) ||
    countryOptions.find(c => c.value === "GB") ||
    countryOptions[0];

  const dialCode = selectedCountryOption ? selectedCountryOption.dialCode : "+44";

  const saveToBrowserCache = (updated: typeof formData) => {
    try {
      localStorage.setItem("wipa_form_cache", JSON.stringify(updated));
      if (updated.title) localStorage.setItem("wipa_user_title", updated.title);
      if (updated.name) localStorage.setItem("wipa_user_name", updated.name);
      if (updated.country) localStorage.setItem("wipa_user_country", updated.country);
      if (updated.phone) localStorage.setItem("wipa_user_phone", updated.phone);
      if (updated.email) localStorage.setItem("wipa_user_email", updated.email);
      if (updated.company) localStorage.setItem("wipa_user_company", updated.company);
      if (updated.profession) localStorage.setItem("wipa_user_profession", updated.profession);
    } catch {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      saveToBrowserCache(updated);
      return updated;
    });
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

    const trimmedProf = formData.profession.trim();
    if (!trimmedProf) {
      setError("Please enter your profession or role.");
      return;
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

      const res = await fetch("/api/pricing-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          name: formData.name,
          country: fullCountryName,
          phone: formattedPhone,
          email: formData.email,
          company: formData.company,
          profession: trimmedProf,
          fingerprint,
          device_info: deviceInfo
        })
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      // Unlock pricing & persist identity in browser cache
      saveToBrowserCache(formData);
      localStorage.setItem("wipa_waitlist_unlocked", "true");
      if (result.id) localStorage.setItem("wipa_user_id", result.id);
      if (formData.name) {
        localStorage.setItem("wipa_user_name", formData.name);
        setUserName(formData.name);
      }
      if (formData.email) {
        localStorage.setItem("wipa_user_email", formData.email);
      }
      
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
      {isUnlocked && !hideBanner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: "1100px",
            margin: "0 auto 35px",
            padding: "16px 24px",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            boxShadow: "0 4px 20px rgba(16, 185, 129, 0.15)"
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flex: 1 }}>
            <span style={{ fontSize: "1.4rem", marginTop: "2px" }}>✨</span>
            <div>
              <div style={{ fontSize: "1.05rem", color: "#10b981", fontWeight: 800 }}>
                {userName ? `Welcome, ${userName}! ` : ""}Founding Member Rates Unlocked
              </div>
              <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "4px", lineHeight: 1.5 }}>
                Browse our Founding Member packages below. Click &ldquo;JOIN THE WAITING LIST NOW&rdquo; on any plan to select your plan and complete your registration.
              </div>
            </div>
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

      {/* Frosted Glass Gate Overlay Form (fixed dead-center in viewport, 2-column layout, NO SCROLLING required on desktop, viewport-safe on mobile) */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            key="pricing-gate-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.35 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              minHeight: "100dvh",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "max(12px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left))",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxSizing: "border-box"
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="gate-modal-card"
              style={{
                width: "100%",
                maxWidth: "620px",
                maxHeight: "min(92vh, 92dvh)",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                border: "1.5px solid rgba(236, 72, 153, 0.45)",
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6), 0 0 35px rgba(236, 72, 153, 0.25)",
                padding: "clamp(16px, 2.5vh, 24px) clamp(16px, 3vw, 26px)",
                position: "relative",
                margin: "auto",
                boxSizing: "border-box"
              }}
            >
              {/* Glowing decorative accent */}
              <div
                style={{
                  position: "absolute",
                  top: "-70px",
                  right: "-70px",
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(0,0,0,0) 70%)",
                  pointerEvents: "none"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-70px",
                  left: "-70px",
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(0,0,0,0) 70%)",
                  pointerEvents: "none"
                }}
              />

              {/* Gate Header */}
              <div style={{ textAlign: "center", marginBottom: "12px", position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "linear-gradient(90deg, #ff2d55 0%, #ff7a00 100%)",
                    color: "#ffffff",
                    padding: "3px 12px",
                    borderRadius: "9999px",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    boxShadow: "0 3px 10px rgba(255, 45, 85, 0.35)",
                    marginBottom: "6px"
                  }}
                >
                  🔒 EXCLUSIVE FOUNDING ACCESS
                </div>

                <h2
                  className="heading-md"
                  style={{
                    fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)",
                    marginBottom: "4px",
                    color: "var(--text-heading)",
                    lineHeight: 1.15,
                    fontWeight: 800
                  }}
                >
                  Unlock Founding Member Pricing
                </h2>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-body)",
                    lineHeight: 1.35,
                    maxWidth: "500px",
                    margin: "0 auto"
                  }}
                >
                  Join the official waiting list to view our limited-availability introductory rates.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "9px", position: "relative", zIndex: 1 }}>
                
                {/* Row 1: Title & Full Name */}
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <div style={{ width: "90px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "2px" }} className="gate-title-col">
                    <label style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--text-heading)" }}>
                      Title
                    </label>
                    <Select
                      options={titleOptions}
                      placeholder="Title"
                      value={titleOptions.find(t => t.value === formData.title) || null}
                      onChange={(selected: any) => {
                        if (selected) {
                          setFormData(prev => {
                            const updated = { ...prev, title: selected.value };
                            saveToBrowserCache(updated);
                            return updated;
                          });
                        }
                      }}
                      styles={selectStyles}
                    />
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--text-heading)" }}>
                      Full Name <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="gate-input"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Row 2: Email Address & Country */}
                <div className="gate-row-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--text-heading)" }}>
                      Email Address <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@organisation.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="gate-input"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--text-heading)" }}>
                      Country <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <Select
                      options={countryOptions}
                      value={countryOptions.find(c => c.value === formData.country)}
                      onChange={(selected: any) => {
                        if (selected) {
                          setFormData(prev => {
                            const updated = { ...prev, country: selected.value };
                            saveToBrowserCache(updated);
                            return updated;
                          });
                        }
                      }}
                      formatOptionLabel={formatOptionLabel}
                      styles={selectStyles}
                    />
                  </div>
                </div>

                {/* Row 3: Phone Number & Profession / Role */}
                <div className="gate-row-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--text-heading)" }}>
                      Phone Number <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <div
                      style={{
                        display: "flex",
                        border: `1px solid ${phoneStatus.status === 'invalid' ? '#ef4444' : phoneStatus.status === 'valid' ? '#10b981' : 'var(--border-input)'}`,
                        borderRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "var(--bg-primary)",
                        height: "38px"
                      }}
                      className="gate-phone-wrapper"
                    >
                      <div
                        style={{
                          padding: "0 8px",
                          backgroundColor: "var(--bg-surface-elevated)",
                          color: "var(--text-heading)",
                          fontWeight: 700,
                          borderRight: "1px solid var(--border-input)",
                          minWidth: "55px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.85rem"
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
                        className="gate-phone-input"
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          border: "none",
                          backgroundColor: "transparent",
                          color: "var(--text-heading)",
                          fontSize: "0.86rem",
                          outline: "none",
                          width: "100%"
                        }}
                      />
                    </div>
                    {phoneStatus.message && (
                      <span style={{ fontSize: "0.72rem", color: phoneStatus.status === 'invalid' ? '#ef4444' : '#10b981' }}>
                        {phoneStatus.message}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--text-heading)" }}>
                      Profession / Role <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="profession"
                      required
                      placeholder="e.g. Patent Attorney, Legal Counsel..."
                      value={formData.profession}
                      onChange={handleChange}
                      className="gate-input"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Row 4: Company / Law Firm / Organisation */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--text-heading)" }}>
                    Company / Law Firm / Organisation <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: "normal" }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Acme IP Law"
                    value={formData.company}
                    onChange={handleChange}
                    className="gate-input"
                    style={inputStyle}
                  />
                </div>

                {/* Error Banner */}
                {error && (
                  <div
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "rgba(239, 68, 68, 0.12)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "10px",
                      color: "#ef4444",
                      fontSize: "0.82rem",
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
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="btn btn-accent"
                  style={{
                    marginTop: "4px",
                    padding: "11px",
                    fontSize: "0.95rem",
                    borderRadius: "40px",
                    fontWeight: "bold",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)",
                    color: "#ffffff",
                    border: "none",
                    boxShadow: "0 6px 20px rgba(236, 72, 153, 0.35)"
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner" style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      <span>SAVING & CONTINUING...</span>
                    </>
                  ) : (
                    "CONTINUE ➔"
                  )}
                </motion.button>

                <p style={{ textAlign: "center", fontSize: "0.74rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                  🔒 Your details are protected & strictly confidential.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .gate-row-2col {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .gate-modal-card {
            padding: 16px 14px !important;
            border-radius: 16px !important;
            max-height: calc(100dvh - 20px) !important;
          }
          .gate-input, .gate-phone-input {
            font-size: 16px !important; /* Prevents auto-zoom on iOS Safari */
            height: 40px !important;
          }
          .gate-phone-wrapper {
            height: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
