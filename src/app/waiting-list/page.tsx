"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import Select from "react-select";
import { allCountries } from "country-telephone-data";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import FloatingGrid from "@/components/animations/FloatingGrid";
import { getDeviceFingerprint } from "@/lib/fingerprint";

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
    <span>{label}</span>
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
    padding: "5px",
    borderRadius: "12px",
    border: "1px solid var(--border-input)",
    fontSize: "1.1rem",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-heading)",
    boxShadow: "none",
    minHeight: "54px",
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
    padding: "12px 15px"
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

export default function WaitingListPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    country: "GB",
    phone: "",
    email: "",
    company: "",
    profession: ""
  });
  
  const selectedCountryOption = countryOptions.find(c => c.value === formData.country) || countryOptions.find(c => c.value === "GB") || countryOptions[0];
  const dialCode = selectedCountryOption ? selectedCountryOption.dialCode : "+44";
  
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneStatus, setPhoneStatus] = useState<{ status: 'idle' | 'valid' | 'invalid'; message: string }>({
    status: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          message: "Please enter a valid phone number for selected country" 
        });
      } else {
        setPhoneStatus({ 
          status: 'valid', 
          message: "" 
        });
      }
    } catch (err) {
      setPhoneStatus({ 
        status: 'invalid', 
        message: "Please enter a valid phone number" 
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address format.");
      return;
    }

    // Phone validation based on selected country
    if (formData.phone) {
      try {
        const isValid = isValidPhoneNumber(formData.phone, formData.country.toUpperCase() as CountryCode);
        if (!isValid) {
          setPhoneStatus({ 
            status: 'invalid', 
            message: "Wrong number entered, please enter correct number" 
          });
          return;
        }
      } catch (err) {
        setPhoneStatus({ 
          status: 'invalid', 
          message: "Wrong number entered, please enter correct number" 
        });
        return;
      }
    }

    setIsLoading(true);
    
    try {
      // Capture device fingerprint and internet telemetry
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

      // Save identity & unlock flags in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wipa_waitlist_unlocked", "true");
        localStorage.setItem("wipa_from_waiting_list", "true");
        if (result.id) localStorage.setItem("wipa_user_id", result.id);
        if (result.name || formData.name) localStorage.setItem("wipa_user_name", result.name || formData.name);
        if (result.email || formData.email) localStorage.setItem("wipa_user_email", result.email || formData.email);
      }

      setSubmitted(true);

      // Smoothly redirect to /plans to choose their plan
      setTimeout(() => {
        router.push(`/plans?from_waiting_list=true&lead_id=${result.id || ''}`);
      }, 1200);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "100px 20px", backgroundColor: "var(--bg-primary)" }}>
      <button 
        onClick={() => router.push('/')}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          color: "var(--text-heading)",
          borderRadius: "12px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 100,
          boxShadow: "var(--shadow-card)",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        ← Back to Home
      </button>
      <FloatingGrid />
      <FadeIn direction="up" style={{ width: "100%", maxWidth: "620px", position: "relative", zIndex: 10 }}>
        <div 
          style={{ backgroundColor: "var(--bg-card)", padding: "clamp(24px, 6vw, 48px)", borderRadius: "32px", border: "1px solid var(--border-card)", boxShadow: "var(--shadow-card)", width: "100%" }}
        >
          
          {!submitted ? (
            <>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <div style={{ display: "inline-block", background: "linear-gradient(90deg, #d946ef 0%, #ec4899 100%)", color: "#ffffff", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "12px" }}>
                  Step 1 of 2
                </div>
                <h1 className="heading-lg" style={{ marginBottom: "12px", textAlign: "center", color: "var(--text-heading)" }}>Join the Waiting List</h1>
                <p style={{ fontSize: "1.05rem", textAlign: "center", color: "var(--text-body)", margin: 0, lineHeight: 1.5 }}>
                  Enter your details to secure your spot. On the next step, you will be invited to select your founding plan.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                
                {/* Title & Name */}
                <div className="mobile-stack" style={{ display: "flex", gap: "15px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, minWidth: "120px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "1rem", color: "var(--text-heading)" }}>Title</label>
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

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 3 }}>
                    <label style={{ fontWeight: "bold", fontSize: "1rem", color: "var(--text-heading)" }}>Full Name <span style={{ color: "#ec4899" }}>*</span></label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      placeholder="Enter your full name"
                      value={formData.name} 
                      onChange={handleChange}
                      style={{ padding: "14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "1rem" }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1rem", color: "var(--text-heading)" }}>Email Address <span style={{ color: "#ec4899" }}>*</span></label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    placeholder="you@example.com"
                    value={formData.email} 
                    onChange={handleChange}
                    style={{ padding: "14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "1rem" }}
                  />
                </div>

                {/* Country */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1rem", color: "var(--text-heading)" }}>Country <span style={{ color: "#ec4899" }}>*</span></label>
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

                {/* Phone */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1rem", color: "var(--text-heading)" }}>Phone Number <span style={{ color: "#ec4899" }}>*</span></label>
                  <div style={{ display: "flex", border: `1px solid ${phoneStatus.status === 'invalid' ? '#ef4444' : phoneStatus.status === 'valid' ? '#10b981' : 'var(--border-input)'}`, borderRadius: "12px", overflow: "hidden", backgroundColor: "var(--bg-primary)" }}>
                    <div style={{ padding: "14px", backgroundColor: "var(--bg-surface-elevated)", color: "var(--text-heading)", fontWeight: "bold", borderRight: "1px solid var(--border-input)", minWidth: "65px", textAlign: "center" }}>
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
                      style={{ padding: "14px", border: "none", fontSize: "1rem", flex: 1, outline: "none", backgroundColor: "transparent", color: "var(--text-heading)" }}
                    />
                  </div>
                  {phoneStatus.status === 'invalid' && (
                    <div style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 600, marginTop: '2px' }}>
                      ❌ {phoneStatus.message}
                    </div>
                  )}
                </div>
                
                {/* Company Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1rem", color: "var(--text-heading)" }}>
                    Company / Law Firm / Organisation <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "normal" }}>(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    name="company" 
                    placeholder="Where do you work / study?"
                    value={formData.company} 
                    onChange={handleChange}
                    style={{ padding: "14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "1rem" }}
                  />
                </div>

                {/* Role / Profession */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1rem", color: "var(--text-heading)" }}>Who are you? (Role / Profession) <span style={{ color: "#ec4899" }}>*</span></label>
                  <input 
                    type="text" 
                    name="profession" 
                    required
                    placeholder="e.g. IP Attorney, Patent Attorney, Founder, Student..."
                    value={formData.profession} 
                    onChange={handleChange}
                    style={{ padding: "14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "1rem" }}
                  />
                </div>

                {error && (
                  <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "12px 16px", borderRadius: "12px", fontSize: "0.95rem", textAlign: "center" }}>
                    {error}
                  </div>
                )}

                <motion.button 
                  type="submit" 
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-accent" 
                  style={{ 
                    marginTop: "10px", 
                    padding: "16px", 
                    fontSize: "1.1rem", 
                    borderRadius: "50px", 
                    fontWeight: "bold", 
                    cursor: isLoading ? "not-allowed" : "pointer", 
                    width: "100%", 
                    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.4)",
                    background: "linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)",
                    color: "#ffffff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                  }}
                >
                  {isLoading ? "Saving Details..." : "CONTINUE ➔"}
                </motion.button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🎉</div>
              <h2 className="heading-md" style={{ marginBottom: "15px", color: "var(--text-heading)" }}>
                Details Saved, {formData.name}!
              </h2>
              <p style={{ fontSize: "1.15rem", color: "var(--text-body)", marginBottom: "30px", fontWeight: "500" }}>
                Taking you to the pricing plans to choose your membership...
              </p>
              
              <div style={{ 
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "rgba(56, 189, 248, 0.15)", 
                color: "#38bdf8",
                padding: "14px 28px", 
                borderRadius: "50px", 
                border: "1px solid rgba(56, 189, 248, 0.3)", 
                fontWeight: "bold",
                fontSize: "1.1rem",
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.2)"
              }}>
                <span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid #38bdf8", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Redirecting to Plans...
              </div>
            </div>
          )}

        </div>
      </FadeIn>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
