"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import Select from "react-select";
import { allCountries } from "country-telephone-data";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { nameCompliments } from "@/data/compliments";
import { funnyErrorMessages, funnySuccessMessages } from "@/data/phoneMessages";
import FloatingGrid from "@/components/animations/FloatingGrid";

const countryOptions = allCountries
  .map(c => ({
    value: c.iso2.toUpperCase(),
    label: c.name,
    dialCode: `+${c.dialCode}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const formatOptionLabel = ({ value, label }: any) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <img 
      src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`} 
      alt={value} 
      style={{ width: "20px", height: "15px", objectFit: "cover", border: "1px solid rgba(0,0,0,0.1)" }} 
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

const planOptions = [
  { value: "IP Professional Membership", label: "IP Professional Membership" },
  { value: "Entrepreneur Membership", label: "Entrepreneur Membership ( for startups only )" },
  { value: "Student Membership", label: "Student Membership" },
  { value: "In-House Counsel Membership", label: "In-House Counsel Membership" },
  { value: "Enterprise Membership", label: "Enterprise Membership" },
  { value: "Custom Plan", label: "Custom Plan" }
];

const seatsOptions = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "10-20", label: "10-20" },
  { value: "20+", label: "20+" }
];

const selectStyles = {
  control: (base: any) => ({
    ...base,
    padding: "5px",
    borderRadius: "12px",
    border: "2px solid var(--color-black)",
    fontSize: "1.1rem",
    backgroundColor: "var(--color-white)",
    boxShadow: "none",
    minHeight: "54px",
    '&:hover': {
      border: "2px solid var(--color-black)"
    }
  }),
  option: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    backgroundColor: isSelected 
      ? "var(--color-pastel-blue)" 
      : isFocused 
        ? "rgba(0,0,0,0.05)" 
        : "transparent",
    color: "var(--color-black)",
    cursor: "pointer",
    padding: "12px 15px"
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "12px",
    border: "2px solid var(--color-black)",
    boxShadow: "4px 4px 0px var(--color-black)",
    overflow: "hidden",
    zIndex: 10
  })
};

export default function WaitingListPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    country: "US",
    phone: "",
    email: "",
    company: "",
    profession: "",
    plan: "",
    businessRegistrationNumber: "",
    dateOfIncorporation: "",
    collegeInstitute: "",
    studentId: "",
    seats: "",
  });
  
  const selectedCountryOption = countryOptions.find(c => c.value === formData.country) || countryOptions.find(c => c.value === "US");
  const dialCode = selectedCountryOption ? selectedCountryOption.dialCode : "+1";
  
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameStatus, setNameStatus] = useState("");
  const [phoneStatus, setPhoneStatus] = useState<{status: 'idle' | 'valid' | 'invalid', message: string}>({ status: 'idle', message: '' });
  

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitted && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (submitted && countdown === 0) {
      router.push("/");
    }
    return () => clearTimeout(timer);
  }, [submitted, countdown, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // clear error on change
    if (name === 'phone') setPhoneStatus({ status: 'idle', message: '' });
    if (name === 'name') setNameStatus("");
  };

  const handleNameBlur = () => {
    if (formData.name && formData.name.trim().length > 1) {
      setNameStatus(nameCompliments[Math.floor(Math.random() * nameCompliments.length)]);
    } else {
      setNameStatus("");
    }
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
          message: funnyErrorMessages[Math.floor(Math.random() * funnyErrorMessages.length)] 
        });
      } else {
        setPhoneStatus({ 
          status: 'valid', 
          message: funnySuccessMessages[Math.floor(Math.random() * funnySuccessMessages.length)] 
        });
      }
    } catch (err) {
      setPhoneStatus({ 
        status: 'invalid', 
        message: funnyErrorMessages[Math.floor(Math.random() * funnyErrorMessages.length)] 
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

    if (formData.plan === 'In-House Counsel Membership') {
      const personalDomains = [
        'gmail.com', 'outlook.com', 'hotmail.com', 'live.com', 'yahoo.com', 
        'icloud.com', 'me.com', 'mac.com', 'aol.com', 'proton.me', 
        'protonmail.com', 'pm.me', 'gmx.com', 'gmx.net', 'mail.com', 
        'zoho.com', 'zohomail.com', 'rediffmail.com', 'yandex.com', 
        'mail.ru', 'qq.com', '163.com', '126.com', 'naver.com', 
        'daum.net', 'web.de', 't-online.de', 'orange.fr', 'btinternet.com', 
        'comcast.net', 'att.net', 'shaw.ca', 'telus.net', 'bigpond.com'
      ];
      const domain = formData.email.split('@')[1]?.toLowerCase();
      if (domain && personalDomains.includes(domain)) {
        setError("Please provide a valid company email address for the In-House Counsel Membership. Personal email addresses are not accepted for this plan.");
        return;
      }
    }

    // Phone validation based on selected country
    try {
      // libphonenumber-js handles the validation using the country code (e.g., 'US', 'GB')
      const isValid = isValidPhoneNumber(formData.phone, formData.country.toUpperCase() as CountryCode);
      if (!isValid) {
        setPhoneStatus({ 
          status: 'invalid', 
          message: funnyErrorMessages[Math.floor(Math.random() * funnyErrorMessages.length)] 
        });
        return;
      }
    } catch (err) {
      setPhoneStatus({ 
        status: 'invalid', 
        message: funnyErrorMessages[Math.floor(Math.random() * funnyErrorMessages.length)] 
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          name: formData.name,
          country: formData.country,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          profession: formData.profession,
          plan: formData.plan,
          businessRegistrationNumber: formData.plan === 'Entrepreneur Membership' ? formData.businessRegistrationNumber : null,
          dateOfIncorporation: formData.plan === 'Entrepreneur Membership' ? formData.dateOfIncorporation : null,
          collegeInstitute: formData.plan === 'Student Membership' ? formData.collegeInstitute : null,
          studentId: formData.plan === 'Student Membership' ? formData.studentId : null,
          seats: formData.plan === 'Custom Plan' ? formData.seats : null
        })
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "100px 20px" }}>
      <button 
        onClick={() => router.push('/')}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "var(--color-white)",
          border: "2px solid var(--color-black)",
          borderRadius: "12px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 100,
          boxShadow: "4px 4px 0px var(--color-black)",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        ← Back to Home
      </button>
      <FloatingGrid />
      <FadeIn direction="up" style={{ width: "100%", maxWidth: "600px", position: "relative", zIndex: 10 }}>
        <motion.div 
          animate={{ y: [0, -8, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: "var(--color-white)", padding: "clamp(20px, 6vw, 50px)", borderRadius: "32px", border: "3px solid var(--color-black)", width: "100%" }}
        >
          
          {!submitted ? (
            <>
              <h1 className="heading-lg" style={{ marginBottom: "20px", textAlign: "center" }}>Join the Waiting List</h1>
              <p style={{ fontSize: "1.1rem", marginBottom: "40px", textAlign: "center", opacity: 0.8 }}>
                Be the first to know when memberships open. Secure your spot on the list today!
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                <div className="mobile-stack" style={{ display: "flex", gap: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, minWidth: "140px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Title</label>
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
                    <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      placeholder="Enter your full name"
                      value={formData.name} 
                      onChange={handleChange}
                      onBlur={handleNameBlur}
                      style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
                    />
                    {nameStatus && (
                      <div style={{ 
                        color: 'var(--color-accent)', 
                        fontSize: '0.75rem', 
                        fontWeight: '600',
                        marginTop: '4px',
                        paddingLeft: '5px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        ✨ {nameStatus}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    placeholder="you@example.com"
                    value={formData.email} 
                    onChange={handleChange}
                    style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Country</label>
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

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Phone Number</label>
                  <div style={{ display: "flex", border: "2px solid var(--color-black)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ padding: "15px", backgroundColor: "var(--color-charcoal)", color: "var(--color-white)", fontWeight: "bold", borderRight: "2px solid var(--color-black)", minWidth: "60px", textAlign: "center" }}>
                      {dialCode}
                    </div>
                    <input 
                      type="tel" 
                      name="phone" 
                      required
                      placeholder="e.g. 234 567 8900"
                      value={formData.phone} 
                      onChange={handleChange}
                      onBlur={handlePhoneBlur}
                      style={{ padding: "15px", border: "none", fontSize: "1.1rem", flex: 1, outline: "none" }}
                    />
                  </div>
                  {phoneStatus.status !== 'idle' && (
                    <div style={{ 
                      color: phoneStatus.status === 'valid' ? 'var(--color-accent)' : '#ef5350', 
                      fontSize: '0.95rem', 
                      fontWeight: 'bold',
                      marginTop: '4px',
                      paddingLeft: '5px'
                    }}>
                      {phoneStatus.status === 'valid' ? '✨ ' : '❌ '}{phoneStatus.message}
                    </div>
                  )}
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Which plan are you interested in?</label>
                  <Select
                    options={planOptions}
                    placeholder="Select a Plan"
                    value={planOptions.find(p => p.value === formData.plan) || null}
                    onChange={(selected: any) => {
                      if (selected) {
                        setFormData(prev => ({ ...prev, plan: selected.value }));
                      }
                    }}
                    styles={selectStyles}
                  />
                </div>

                {formData.plan === 'Entrepreneur Membership' && (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Business Registration Number</label>
                      <input 
                        type="text" 
                        name="businessRegistrationNumber" 
                        required
                        placeholder="Registration Number"
                        value={formData.businessRegistrationNumber} 
                        onChange={handleChange}
                        style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Date of Incorporation</label>
                      <input 
                        type="date" 
                        name="dateOfIncorporation" 
                        required
                        value={formData.dateOfIncorporation} 
                        onChange={handleChange}
                        style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
                      />
                    </div>
                  </>
                )}

                {formData.plan === 'Student Membership' && (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>College/Institute</label>
                      <input 
                        type="text" 
                        name="collegeInstitute" 
                        required
                        placeholder="Where do you study?"
                        value={formData.collegeInstitute} 
                        onChange={handleChange}
                        style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Student ID</label>
                      <input 
                        type="text" 
                        name="studentId" 
                        required
                        placeholder="Your Student ID"
                        value={formData.studentId} 
                        onChange={handleChange}
                        style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
                      />
                    </div>
                  </>
                )}

                {formData.plan === 'Custom Plan' && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>How many seats?</label>
                    <Select
                      options={seatsOptions}
                      placeholder="Select seats"
                      value={seatsOptions.find(s => s.value === formData.seats) || null}
                      onChange={(selected: any) => {
                        if (selected) {
                          setFormData(prev => ({ ...prev, seats: selected.value }));
                        }
                      }}
                      styles={selectStyles}
                    />
                  </div>
                )}

                {formData.plan !== 'Student Membership' && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Company Name</label>
                    <input 
                      type="text" 
                      name="company" 
                      required={formData.plan !== 'Student Membership'}
                      placeholder="Where do you work?"
                      value={formData.company} 
                      onChange={handleChange}
                      style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
                    />
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Who are you? (Role)</label>
                  <input 
                    type="text" 
                    name="profession" 
                    required
                    placeholder="e.g. Patent Attorney, Founder, Student..."
                    value={formData.profession} 
                    onChange={handleChange}
                    style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
                  />
                </div>

                {error && (
                  <div style={{ padding: "15px", backgroundColor: "#ffebee", border: "2px solid #ef5350", color: "#c62828", borderRadius: "12px", fontWeight: "bold", textAlign: "center" }}>
                    {error}
                  </div>
                )}

                <motion.button 
                  type="submit" 
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.03, boxShadow: "6px 6px 0px var(--color-accent-purple)" }}
                  whileTap={{ scale: isLoading ? 1 : 0.97 }}
                  style={{ padding: "20px", marginTop: "10px", borderRadius: "50px", border: "2px solid var(--color-black)", backgroundColor: isLoading ? "var(--color-charcoal)" : "var(--color-pastel-pink)", color: isLoading ? "var(--color-white)" : "var(--color-black)", fontSize: "1.2rem", fontWeight: "bold", cursor: isLoading ? "not-allowed" : "pointer", transition: "background-color 0.2s" }}
                >
                  {isLoading ? "Submitting..." : "JOIN THE WAITING AREA NOW !"}
                </motion.button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🎉</div>
              <h2 className="heading-md" style={{ marginBottom: "15px" }}>
                {formData.title} {formData.name}
              </h2>
              <p style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "30px", fontWeight: "500" }}>
                Your interest has been submitted. We will be back to you!
              </p>
              
              <div style={{ 
                display: "inline-block", 
                backgroundColor: "var(--color-pastel-blue)", 
                padding: "15px 30px", 
                borderRadius: "50px", 
                border: "2px solid var(--color-black)", 
                fontWeight: "bold",
                fontSize: "1.2rem",
                boxShadow: "4px 4px 0px var(--color-black)"
              }}>
                Returning to home in {countdown}...
              </div>
            </div>
          )}

        </motion.div>
      </FadeIn>
    </div>
  );
}
