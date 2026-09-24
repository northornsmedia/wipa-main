"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { allCountries } from "country-telephone-data";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import FloatingGrid from "@/components/animations/FloatingGrid";
import { getDeviceFingerprint } from "@/lib/fingerprint";

interface PricingPlan {
  id: string;
  name: string;
  displayName: string;
  subtitle?: string;
  price: string;
  period: string;
  monthlyPrice?: string;
  limit: string;
  desc: string;
  standardPrice: string;
  highlights: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: "ip-professional",
    name: "IP Professional Membership",
    displayName: "IP Professional Membership",
    price: "£395",
    period: "/ year",
    monthlyPrice: "£50 / month",
    limit: "Rate-limited for the first 300 founding members worldwide",
    desc: "For lawyers, patent attorneys, trade mark attorneys, IP practitioners, consultants, and other intellectual property professionals.",
    standardPrice: "Standard Rate: £695/year (effective once all 300 Founding places are secured).",
    highlights: [
      "Global directory listing & cross-border referral opportunities",
      "Access to private peer forums, roundtables & intelligence briefings",
      "Exclusive invitations to alliance webinars and networking events",
      "Guaranteed lifetime locked Founding Member renewal discount"
    ]
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur Membership",
    displayName: "Entrepreneur Membership",
    subtitle: "(for Start Ups only)",
    price: "£295",
    period: "/ year",
    monthlyPrice: "£42 / month",
    limit: "Rate-limited for the first 200 Startup Founding members worldwide",
    desc: "Open to law firms and IP businesses incorporated or registered within the past 24 months.",
    standardPrice: "Standard Rate: £495/year (effective once all 200 Founding places are secured).",
    highlights: [
      "Startup IP strategy guidance & commercialisation support",
      "Direct introductions to early-stage investors & mentors",
      "Co-marketing & showcase opportunities across the alliance",
      "Founding Startup Member status and community privileges"
    ]
  },
  {
    id: "student",
    name: "Student Membership",
    displayName: "Student Membership",
    price: "£99",
    period: "/ year",
    monthlyPrice: "£12 / month",
    limit: "Rate-limited for the first 200 founding members worldwide",
    desc: "For students, graduates, researchers, and early-career professionals pursuing careers in intellectual property, innovation, law, technology, or related disciplines.",
    standardPrice: "Standard Rate: £149/year (effective once all 200 Founding places are secured).",
    highlights: [
      "1-on-1 mentorship with established IP partners & attorneys",
      "Early career job board & internship opportunities",
      "Academic research exchange & student working groups",
      "Discounted passes to major global IP conferences"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise Membership",
    displayName: "Enterprise Membership",
    subtitle: "(IP Professional Teams)",
    price: "£1,745",
    period: "/ year",
    monthlyPrice: "£175 / month",
    limit: "5 Founding Memberships at £349/ea + 1 FREE Membership (Save £625)",
    desc: "Perfect for law firms, corporate IP departments, universities, innovation teams, and organisations looking to provide membership benefits to multiple professionals.",
    standardPrice: "Standard Price After Launch: £2,780/year",
    highlights: [
      "Includes 5 team memberships plus 1 complimentary team seat",
      "Centralised billing & consolidated annual team administration",
      "Prominent corporate listing in WIPA Global Alliance Directory",
      "Dedicated account manager & bespoke team onboarding"
    ]
  },
  {
    id: "in-house-counsel",
    name: "In-House Counsel Membership",
    displayName: "In-House Counsel Membership",
    price: "FREE",
    period: "for 1st year",
    limit: "COMPLIMENTARY FOR THE FIRST YEAR FOR FIRST 200 IN-HOUSE COUNSEL MEMBERS WORLDWIDE",
    desc: "For women leading intellectual property within corporate legal departments connecting with trusted global peers, industry leaders, and IP experts.",
    standardPrice: "Standard Membership & Annual Renewal: £99/year (after first 200 places).",
    highlights: [
      "100% complimentary for the entire first founding year",
      "Confidential in-house legal roundtables & peer benchmarking",
      "Vendor & counsel review exchange and independent insights",
      "VIP access to global leadership summits & executive retreats"
    ]
  }
];

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
      style={{ width: "20px", height: "14px", objectFit: "cover", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "2px" }} 
    />
    <span style={{ fontSize: "0.94rem" }}>{label}</span>
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
    borderRadius: "12px",
    border: "1px solid var(--border-input)",
    fontSize: "0.95rem",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-heading)",
    boxShadow: "none",
    minHeight: "46px",
    height: "46px",
    '&:hover': {
      border: "1px solid var(--border-input)"
    }
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0 10px"
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "var(--text-heading)",
    margin: 0
  }),
  input: (base: any) => ({
    ...base,
    color: "var(--text-heading)",
    margin: 0,
    padding: 0
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
    fontSize: "0.92rem"
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "12px",
    border: "1px solid var(--border-input)",
    backgroundColor: "var(--bg-card)",
    boxShadow: "var(--shadow-card)",
    overflow: "hidden",
    zIndex: 100
  })
};

export default function WaitingListPage() {
  const router = useRouter();
  
  // Step state: 1: Details, 2: Select Plan, 3: Completed
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    country: "GB",
    phone: "",
    email: "",
    company: "",
    profession: ""
  });
  
  // Auto-selected by default: IP Professional Membership
  const [selectedPlan, setSelectedPlan] = useState<string>("IP Professional Membership");
  const [modalPlan, setModalPlan] = useState<PricingPlan | null>(null);

  const selectedCountryOption = countryOptions.find(c => c.value === formData.country) || countryOptions.find(c => c.value === "GB") || countryOptions[0];
  const dialCode = selectedCountryOption ? selectedCountryOption.dialCode : "+44";
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneStatus, setPhoneStatus] = useState<{ status: 'idle' | 'valid' | 'invalid'; message: string }>({
    status: 'idle',
    message: ''
  });

  // 1. Read plan query param & restore details from browser cache on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if plan is passed in URL query param, or stored in localStorage
    const searchParams = new URLSearchParams(window.location.search);
    const planParam = searchParams.get("plan");
    const storedPreferred = localStorage.getItem("wipa_preferred_plan");
    const storedSelected = localStorage.getItem("wipa_selected_plan");
    const targetPlan = planParam || storedPreferred || storedSelected;

    if (targetPlan) {
      const cleanTarget = targetPlan.replace(/\n/g, ' ').replace('(for Start Ups only)', '').trim();
      const matched = pricingPlans.find(p => 
        p.name.toLowerCase() === cleanTarget.toLowerCase() ||
        p.id.toLowerCase() === cleanTarget.toLowerCase() ||
        p.displayName.toLowerCase() === cleanTarget.toLowerCase()
      );
      if (matched) {
        setSelectedPlan(matched.name);
      } else {
        setSelectedPlan(cleanTarget);
      }
    }

    // Restore user details from browser cache (wipa_form_cache or individual keys)
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

      // Clean phone input if it contains dial code prefix
      if (phone) {
        const countryObj = countryOptions.find(c => c.value === country) || countryOptions.find(c => c.value === "GB");
        const countryDial = countryObj ? countryObj.dialCode : "+44";
        if (phone.startsWith(countryDial)) {
          phone = phone.substring(countryDial.length).trim();
        } else if (phone.startsWith("+")) {
          const parts = phone.split(/\s+/);
          if (parts.length > 1) {
            phone = parts.slice(1).join(" ");
          }
        }
      }

      if (title || name || phone || email || company || profession) {
        setFormData({
          title,
          name,
          country,
          phone,
          email,
          company,
          profession
        });

        // Validate phone number if present
        if (phone) {
          try {
            const isValid = isValidPhoneNumber(phone, (country || "GB").toUpperCase() as CountryCode);
            if (isValid) {
              setPhoneStatus({ status: 'valid', message: '' });
            }
          } catch {}
        }
      }
    } catch (e) {
      console.warn("Failed to load cached form data", e);
    }
  }, []);

  // Save form data continuously to browser cache
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

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalPlan) {
        setModalPlan(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalPlan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
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
          message: "Please enter a valid phone number for selected country" 
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
        message: "Please enter a valid phone number" 
      });
    }
  };

  // Step 1 -> Step 2 validation and transition (in same frame, ultra fast)
  const handleContinueToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    try {
      const isValid = isValidPhoneNumber(formData.phone, formData.country.toUpperCase() as CountryCode);
      if (!isValid) {
        setPhoneStatus({ 
          status: 'invalid', 
          message: "Please enter a valid phone number for selected country" 
        });
        setError("Please enter a valid phone number before continuing.");
        return;
      }
    } catch {
      setPhoneStatus({ 
        status: 'invalid', 
        message: "Please enter a valid phone number" 
      });
      setError("Please enter a valid phone number before continuing.");
      return;
    }

    if (!formData.profession.trim()) {
      setError("Please state who you are / your role or profession.");
      return;
    }

    // Instant in-place transition to Step 2
    setStep(2);
  };

  // Step 2 final submission with chosen plan to DB
  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { fingerprint, deviceInfo } = await getDeviceFingerprint();

      const countryObj = countryOptions.find(c => c.value === formData.country) || countryOptions.find(c => c.value === "GB");
      const fullCountryName = countryObj ? `${countryObj.name} (${countryObj.dialCode})` : formData.country;
      const currentDialCode = countryObj ? countryObj.dialCode : "+44";

      let formattedPhone = formData.phone.trim();
      if (formattedPhone && !formattedPhone.startsWith('+')) {
        formattedPhone = `${currentDialCode} ${formattedPhone}`;
      }

      // Save directly to DB with selected plan
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
          plan: selectedPlan,
          fingerprint,
          device_info: deviceInfo
        })
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit registration");
      }

      // Save identity & unlock flags in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wipa_waitlist_unlocked", "true");
        localStorage.setItem("wipa_from_waiting_list", "true");
        localStorage.setItem("wipa_selected_plan", selectedPlan);
        if (result.id) localStorage.setItem("wipa_user_id", result.id);
        if (result.name || formData.name) localStorage.setItem("wipa_user_name", result.name || formData.name);
        if (result.email || formData.email) localStorage.setItem("wipa_user_email", result.email || formData.email);
      }

      // Transition to final confirmation state in same frame
      setStep(3);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Uniform plan card: exactly the same height & size for all plans
  const renderPlanCard = (plan: PricingPlan, gridSpanClass: string) => {
    const isSelected = selectedPlan === plan.name;

    return (
      <div
        key={plan.id}
        className={`plan-card-item ${gridSpanClass}`}
        onClick={() => setSelectedPlan(plan.name)}
        style={{
          cursor: "pointer",
          borderRadius: "14px",
          padding: "clamp(10px, 1.4vh, 14px) clamp(12px, 1.4vw, 18px)",
          backgroundColor: isSelected ? "rgba(16, 185, 129, 0.08)" : "var(--bg-surface-elevated)",
          border: isSelected ? "2px solid #10b981" : "1px solid var(--border-card)",
          boxShadow: isSelected ? "0 4px 16px rgba(16, 185, 129, 0.2)" : "0 2px 6px rgba(0,0,0,0.02)",
          transition: "border 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "82px",
          minHeight: "82px",
          maxHeight: "82px",
          boxSizing: "border-box",
          position: "relative"
        }}
      >
        {/* Top Row: Plan Name & Square with Green Tick */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <div style={{ 
            fontWeight: 700, 
            fontSize: "clamp(0.92rem, 1.15vw, 1.02rem)", 
            color: "var(--text-heading)", 
            lineHeight: 1.25,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {plan.displayName}
          </div>

          {/* Square with Green Tick */}
          <div
            style={{
              width: "22px",
              height: "22px",
              minWidth: "22px",
              borderRadius: "6px",
              border: isSelected ? "2px solid #10b981" : "2px solid var(--border-input)",
              backgroundColor: isSelected ? "#10b981" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
              flexShrink: 0
            }}
          >
            {isSelected && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>

        {/* Bottom Row: Know more */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModalPlan(plan);
            }}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#ec4899",
              fontWeight: 600,
              fontSize: "0.82rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              textDecoration: "underline",
              textUnderlineOffset: "3px"
            }}
          >
            Know more ↗
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      padding: "clamp(10px, 2vh, 28px) clamp(12px, 2.5vw, 36px)", 
      backgroundColor: "var(--bg-primary)",
      overflowX: "hidden"
    }}>
      {/* Back to Home Button */}
      <button 
        onClick={() => router.push('/')}
        style={{
          position: "fixed",
          top: "14px",
          left: "14px",
          padding: "7px 14px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          color: "var(--text-heading)",
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "0.85rem",
          cursor: "pointer",
          zIndex: 100,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}
      >
        ← Back to Home
      </button>

      <FloatingGrid />

      {/* Main Container - Optimized for Desktop and Mobile Viewports with NO Scrolling */}
      <div 
        style={{ 
          width: "100%", 
          maxWidth: step === 2 ? "clamp(880px, 70vw, 1100px)" : "clamp(780px, 60vw, 1000px)", 
          margin: "auto",
          transition: "max-width 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative", 
          zIndex: 10 
        }}
      >
        <div 
          className="main-card-box"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            padding: "clamp(18px, 2.8vh, 32px) clamp(18px, 3vw, 44px)", 
            borderRadius: "26px", 
            border: "1px solid var(--border-card)", 
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.09)", 
            width: "100%",
            maxHeight: "calc(100vh - clamp(20px, 3.5vh, 44px))",
            overflowY: "auto"
          }}
        >
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <div style={{ textAlign: "center", marginBottom: "clamp(10px, 1.8vh, 18px)" }}>
                <div style={{ display: "inline-block", background: "linear-gradient(90deg, #d946ef 0%, #ec4899 100%)", color: "#ffffff", padding: "3px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "6px" }}>
                  Step 1 of 2
                </div>
                <h1 className="heading-md" style={{ margin: "2px 0 4px", textAlign: "center", color: "var(--text-heading)", fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Join the Waiting List
                </h1>
                <p style={{ fontSize: "clamp(0.88rem, 1.1vw, 1rem)", textAlign: "center", color: "var(--text-body)", margin: 0, lineHeight: 1.45 }}>
                  {formData.name 
                    ? `Welcome, ${formData.name}! Your details have been auto-filled from your previous entry.` 
                    : "Enter your details to secure your spot. On the next step, confirm your founding plan."}
                </p>
                {selectedPlan && (
                  <div style={{ marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.35)", color: "#10b981", padding: "4px 14px", borderRadius: "16px", fontSize: "0.84rem", fontWeight: 700 }}>
                    <span>✓</span> Selected Plan: {selectedPlan}
                  </div>
                )}
              </div>

              <form onSubmit={handleContinueToStep2} className="form-grid-step1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(10px, 1.5vh, 15px) clamp(12px, 1.6vw, 22px)" }}>
                
                {/* Title & Name (Flex Row) */}
                <div style={{ display: "flex", gap: "10px", gridColumn: "1 / -1" }}>
                  <div style={{ width: "130px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.86rem", color: "var(--text-heading)" }}>Title</label>
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

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontWeight: 600, fontSize: "0.86rem", color: "var(--text-heading)" }}>
                      Full Name <span style={{ color: "#ec4899" }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      placeholder="Enter your full name"
                      value={formData.name} 
                      onChange={handleChange}
                      style={{ height: "46px", padding: "0 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem", outline: "none" }}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.86rem", color: "var(--text-heading)" }}>
                    Email Address <span style={{ color: "#ec4899" }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    placeholder="you@example.com"
                    value={formData.email} 
                    onChange={handleChange}
                    style={{ height: "46px", padding: "0 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem", outline: "none" }}
                  />
                </div>

                {/* Country */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.86rem", color: "var(--text-heading)" }}>
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

                {/* Phone */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.86rem", color: "var(--text-heading)" }}>
                    Phone Number <span style={{ color: "#ec4899" }}>*</span>
                  </label>
                  <div style={{ display: "flex", height: "46px", border: `1px solid ${phoneStatus.status === 'invalid' ? '#ef4444' : phoneStatus.status === 'valid' ? '#10b981' : 'var(--border-input)'}`, borderRadius: "12px", overflow: "hidden", backgroundColor: "var(--bg-primary)" }}>
                    <div style={{ padding: "0 12px", backgroundColor: "var(--bg-surface-elevated)", color: "var(--text-heading)", fontWeight: 600, borderRight: "1px solid var(--border-input)", minWidth: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>
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
                      style={{ padding: "0 14px", border: "none", fontSize: "0.95rem", flex: 1, outline: "none", backgroundColor: "transparent", color: "var(--text-heading)", height: "100%" }}
                    />
                  </div>
                  {phoneStatus.status === 'invalid' && (
                    <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
                      ❌ {phoneStatus.message}
                    </div>
                  )}
                </div>
                
                {/* Company / Law Firm */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.86rem", color: "var(--text-heading)" }}>
                    Company / Organisation <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "normal" }}>(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    name="company" 
                    placeholder="Where do you work / study?"
                    value={formData.company} 
                    onChange={handleChange}
                    style={{ height: "46px", padding: "0 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem", outline: "none" }}
                  />
                </div>

                {/* Role / Profession */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", gridColumn: "1 / -1" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.86rem", color: "var(--text-heading)" }}>
                    Who are you? (Role / Profession) <span style={{ color: "#ec4899" }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    name="profession" 
                    required
                    placeholder="e.g. IP Attorney, Patent Attorney, Founder, Student..."
                    value={formData.profession} 
                    onChange={handleChange}
                    style={{ height: "46px", padding: "0 14px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "0.95rem", outline: "none" }}
                  />
                </div>

                {error && (
                  <div style={{ gridColumn: "1 / -1", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "8px 12px", borderRadius: "10px", fontSize: "0.88rem", textAlign: "center" }}>
                    {error}
                  </div>
                )}

                <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn btn-accent" 
                    style={{ 
                      height: "48px",
                      fontSize: "1rem", 
                      borderRadius: "50px", 
                      fontWeight: 700, 
                      cursor: "pointer", 
                      width: "100%", 
                      boxShadow: "0 6px 20px rgba(236, 72, 153, 0.35)",
                      background: "linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)",
                      color: "#ffffff",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      letterSpacing: "0.03em"
                    }}
                  >
                    CONTINUE ➔
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2: Plan Selection (Uniform cards, zero scrolling, no arrow on submit) */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.18 }}
            >
              <div style={{ textAlign: "center", marginBottom: "clamp(8px, 1.4vh, 14px)" }}>
                <div style={{ display: "inline-block", background: "linear-gradient(90deg, #d946ef 0%, #ec4899 100%)", color: "#ffffff", padding: "3px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>
                  Step 2 of 2
                </div>
                <h1 className="heading-md" style={{ margin: "2px 0 4px", textAlign: "center", color: "var(--text-heading)", fontSize: "clamp(1.4rem, 2.2vw, 1.95rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Select Your Founding Plan
                </h1>
                <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", textAlign: "center", color: "var(--text-body)", margin: 0 }}>
                  Choose your membership plan below. IP Professional is selected by default.
                </p>
              </div>

              {/* All Plan Cards: Perfectly uniform height across all 5 cards */}
              <div className="step2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "clamp(8px, 1.2vh, 12px)", marginBottom: "clamp(10px, 1.4vh, 16px)" }}>
                {renderPlanCard(pricingPlans[0], "grid-col-card-top")}
                {renderPlanCard(pricingPlans[1], "grid-col-card-top")}
                {renderPlanCard(pricingPlans[2], "grid-col-card-top")}
                {renderPlanCard(pricingPlans[3], "grid-col-card-bottom")}
                {renderPlanCard(pricingPlans[4], "grid-col-card-bottom")}
              </div>

              {error && (
                <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "8px 12px", borderRadius: "10px", fontSize: "0.88rem", textAlign: "center", marginBottom: "10px" }}>
                  {error}
                </div>
              )}

              {/* Action Buttons: Back + Submit (Arrow removed, no text wrapping) */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => { setError(""); setStep(1); }}
                  style={{
                    height: "48px",
                    padding: "0 clamp(16px, 2.5vw, 24px)",
                    borderRadius: "50px",
                    border: "1px solid var(--border-input)",
                    backgroundColor: "var(--bg-surface-elevated)",
                    color: "var(--text-heading)",
                    fontWeight: 600,
                    fontSize: "clamp(0.85rem, 2.2vw, 0.94rem)",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  ← Back
                </button>

                <motion.button 
                  type="button" 
                  onClick={handleFinalSubmit}
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="btn btn-accent" 
                  style={{ 
                    height: "48px",
                    fontSize: "clamp(0.85rem, 2.4vw, 0.98rem)", 
                    borderRadius: "50px", 
                    fontWeight: 700, 
                    cursor: isLoading ? "not-allowed" : "pointer", 
                    flex: 1, 
                    boxShadow: "0 6px 20px rgba(236, 72, 153, 0.35)",
                    background: "linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)",
                    color: "#ffffff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                    padding: "0 clamp(10px, 2vw, 20px)"
                  }}
                >
                  {isLoading ? (
                    <>
                      <span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Submitting Details...
                    </>
                  ) : (
                    "COMPLETE REGISTRATION"
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Final Confirmation in same frame */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18 }}
              style={{ textAlign: "center", padding: "10px 0" }}
            >
              <div style={{ fontSize: "3.2rem", marginBottom: "8px" }}>🎉</div>
              
              <div style={{ display: "inline-block", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "10px" }}>
                Founding Member Spot Confirmed
              </div>

              <h2 className="heading-md" style={{ marginBottom: "6px", color: "var(--text-heading)", fontSize: "clamp(1.5rem, 2.5vw, 1.95rem)", fontWeight: 800 }}>
                Welcome to WIPA, {formData.name}!
              </h2>
              
              <p style={{ fontSize: "0.95rem", color: "var(--text-body)", marginBottom: "18px", lineHeight: 1.45, maxWidth: "540px", margin: "0 auto 18px" }}>
                Your details and founding plan choice have been officially logged in our system. You are now prioritized on our waiting list.
              </p>

              {/* Confirmation Details Card */}
              <div style={{ 
                backgroundColor: "var(--bg-surface-elevated)", 
                border: "1px solid var(--border-card)", 
                borderRadius: "16px", 
                padding: "16px 20px", 
                marginBottom: "18px",
                textAlign: "left",
                maxWidth: "500px",
                margin: "0 auto 18px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border-subtle)", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Selected Plan:</span>
                  <span style={{ fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: "6px" }}>
                    ✓ {selectedPlan}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border-subtle)", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Email:</span>
                  <span style={{ fontWeight: 600, color: "var(--text-heading)" }}>{formData.email}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border-subtle)", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Role:</span>
                  <span style={{ fontWeight: 600, color: "var(--text-heading)" }}>{formData.profession}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Status:</span>
                  <span style={{ fontWeight: 700, color: "#38bdf8" }}>Pre-Registered</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  onClick={() => router.push('/')}
                  className="btn btn-accent"
                  style={{
                    padding: "12px 28px",
                    borderRadius: "50px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    background: "linear-gradient(90deg, #d946ef 0%, #ec4899 45%, #f97316 100%)",
                    color: "#ffffff",
                    border: "none",
                    boxShadow: "0 6px 20px rgba(236, 72, 153, 0.35)"
                  }}
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Plan Details & Price Modal ("Know more") */}
      <AnimatePresence>
        {modalPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalPlan(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.72)",
              backdropFilter: "blur(6px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px"
            }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              transition={{ duration: 0.16 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "var(--bg-card)",
                border: "2px solid rgba(236, 72, 153, 0.35)",
                borderRadius: "24px",
                padding: "clamp(20px, 4vw, 30px)",
                width: "100%",
                maxWidth: "520px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
                position: "relative"
              }}
            >
              {/* Top-Right Close Button */}
              <button
                type="button"
                onClick={() => setModalPlan(null)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  background: "var(--bg-surface-elevated)",
                  border: "1px solid var(--border-input)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  fontSize: "1.1rem",
                  color: "var(--text-heading)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease"
                }}
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div style={{ marginBottom: "14px" }}>
                <div style={{ display: "inline-block", background: "linear-gradient(90deg, #d946ef 0%, #ec4899 100%)", color: "#ffffff", padding: "4px 12px", borderRadius: "20px", fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "6px" }}>
                  Plan Overview & Pricing
                </div>
                <h2 style={{ margin: "2px 0 4px", fontSize: "1.38rem", color: "var(--text-heading)", fontWeight: 800 }}>
                  {modalPlan.displayName} {modalPlan.subtitle && <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-muted)" }}>{modalPlan.subtitle}</span>}
                </h2>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.45 }}>
                  {modalPlan.desc}
                </p>
              </div>

              {/* Pricing Box */}
              <div style={{ 
                backgroundColor: "var(--bg-surface-elevated)", 
                border: "1px solid var(--border-subtle)", 
                borderRadius: "16px", 
                padding: "14px 16px", 
                marginBottom: "14px" 
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontSize: "1.95rem", fontWeight: 900, color: "var(--text-heading)", lineHeight: 1 }}>
                    {modalPlan.price}
                  </span>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                    {modalPlan.period}
                  </span>
                  {modalPlan.monthlyPrice && (
                    <span style={{ marginLeft: "auto", fontSize: "0.84rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      (or {modalPlan.monthlyPrice})
                    </span>
                  )}
                </div>
                
                <div style={{ marginTop: "8px", fontSize: "0.84rem", fontWeight: 700, color: "#ec4899", lineHeight: 1.35 }}>
                  ⚡ {modalPlan.limit}
                </div>

                <div style={{ marginTop: "6px", fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)", paddingTop: "6px" }}>
                  {modalPlan.standardPrice}
                </div>
              </div>

              {/* Key Features List */}
              <div style={{ marginBottom: "18px" }}>
                <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Included In This Plan:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {modalPlan.highlights.map((highlight, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.86rem", color: "var(--text-body)", lineHeight: 1.35 }}>
                      <span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setModalPlan(null)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "50px",
                    border: "1px solid var(--border-input)",
                    backgroundColor: "transparent",
                    color: "var(--text-heading)",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    cursor: "pointer"
                  }}
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan(modalPlan.name);
                    setModalPlan(null);
                  }}
                  style={{
                    flex: 2,
                    padding: "10px",
                    borderRadius: "50px",
                    border: "none",
                    background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  Select This Plan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Desktop: 6-column balanced system */
        .grid-col-card-top {
          grid-column: span 2;
        }
        .grid-col-card-bottom {
          grid-column: span 3;
        }

        /* Mobile Viewports Optimization */
        @media (max-width: 640px) {
          .main-card-box {
            padding: 14px 14px !important;
            border-radius: 20px !important;
          }
          .form-grid-step1 {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .form-grid-step1 > div {
            grid-column: 1 / -1 !important;
          }
          .step2-grid {
            grid-template-columns: 1fr !important;
            gap: 7px !important;
          }
          .grid-col-card-top,
          .grid-col-card-bottom {
            grid-column: 1 / -1 !important;
          }
          .plan-card-item {
            height: 64px !important;
            min-height: 64px !important;
            max-height: 64px !important;
            padding: 8px 12px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
