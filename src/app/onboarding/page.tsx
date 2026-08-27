"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiltCard from "@/components/animations/TiltCard";

const countries = [
  { n: "Afghanistan", c: "af", d: "+93" }, { n: "Albania", c: "al", d: "+355" }, { n: "Algeria", c: "dz", d: "+213" }, { n: "Andorra", c: "ad", d: "+376" }, { n: "Angola", c: "ao", d: "+244" }, { n: "Antigua and Barbuda", c: "ag", d: "+1-268" }, { n: "Argentina", c: "ar", d: "+54" }, { n: "Armenia", c: "am", d: "+374" }, { n: "Australia", c: "au", d: "+61" }, { n: "Austria", c: "at", d: "+43" }, { n: "Azerbaijan", c: "az", d: "+994" },
  { n: "Bahamas", c: "bs", d: "+1-242" }, { n: "Bahrain", c: "bh", d: "+973" }, { n: "Bangladesh", c: "bd", d: "+880" }, { n: "Barbados", c: "bb", d: "+1-246" }, { n: "Belarus", c: "by", d: "+375" }, { n: "Belgium", c: "be", d: "+32" }, { n: "Belize", c: "bz", d: "+501" }, { n: "Benin", c: "bj", d: "+229" }, { n: "Bhutan", c: "bt", d: "+975" }, { n: "Bolivia", c: "bo", d: "+591" }, { n: "Bosnia and Herzegovina", c: "ba", d: "+387" }, { n: "Botswana", c: "bw", d: "+267" }, { n: "Brazil", c: "br", d: "+55" }, { n: "Brunei", c: "bn", d: "+673" }, { n: "Bulgaria", c: "bg", d: "+359" }, { n: "Burkina Faso", c: "bf", d: "+226" }, { n: "Burundi", c: "bi", d: "+257" },
  { n: "Cabo Verde", c: "cv", d: "+238" }, { n: "Cambodia", c: "kh", d: "+855" }, { n: "Cameroon", c: "cm", d: "+237" }, { n: "Canada", c: "ca", d: "+1" }, { n: "Central African Republic", c: "cf", d: "+236" }, { n: "Chad", c: "td", d: "+235" }, { n: "Chile", c: "cl", d: "+56" }, { n: "China", c: "cn", d: "+86" }, { n: "Colombia", c: "co", d: "+57" }, { n: "Comoros", c: "km", d: "+269" }, { n: "Congo", c: "cg", d: "+242" }, { n: "Costa Rica", c: "cr", d: "+506" }, { n: "Croatia", c: "hr", d: "+385" }, { n: "Cuba", c: "cu", d: "+53" }, { n: "Cyprus", c: "cy", d: "+357" }, { n: "Czechia", c: "cz", d: "+420" },
  { n: "Denmark", c: "dk", d: "+45" }, { n: "Djibouti", c: "dj", d: "+253" }, { n: "Dominica", c: "dm", d: "+1-767" }, { n: "Dominican Republic", c: "do", d: "+1-809" },
  { n: "Ecuador", c: "ec", d: "+593" }, { n: "Egypt", c: "eg", d: "+20" }, { n: "El Salvador", c: "sv", d: "+503" }, { n: "Equatorial Guinea", c: "gq", d: "+240" }, { n: "Eritrea", c: "er", d: "+291" }, { n: "Estonia", c: "ee", d: "+372" }, { n: "Eswatini", c: "sz", d: "+268" }, { n: "Ethiopia", c: "et", d: "+251" },
  { n: "Fiji", c: "fj", d: "+679" }, { n: "Finland", c: "fi", d: "+358" }, { n: "France", c: "fr", d: "+33" },
  { n: "Gabon", c: "ga", d: "+241" }, { n: "Gambia", c: "gm", d: "+220" }, { n: "Georgia", c: "ge", d: "+995" }, { n: "Germany", c: "de", d: "+49" }, { n: "Ghana", c: "gh", d: "+233" }, { n: "Greece", c: "gr", d: "+30" }, { n: "Grenada", c: "gd", d: "+1-473" }, { n: "Guatemala", c: "gt", d: "+502" }, { n: "Guinea", c: "gn", d: "+224" }, { n: "Guinea-Bissau", c: "gw", d: "+245" }, { n: "Guyana", c: "gy", d: "+592" },
  { n: "Haiti", c: "ht", d: "+509" }, { n: "Honduras", c: "hn", d: "+504" }, { n: "Hungary", c: "hu", d: "+36" },
  { n: "Iceland", c: "is", d: "+354" }, { n: "India", c: "in", d: "+91" }, { n: "Indonesia", c: "id", d: "+62" }, { n: "Iran", c: "ir", d: "+98" }, { n: "Iraq", c: "iq", d: "+964" }, { n: "Ireland", c: "ie", d: "+353" }, { n: "Israel", c: "il", d: "+972" }, { n: "Italy", c: "it", d: "+39" },
  { n: "Jamaica", c: "jm", d: "+1-876" }, { n: "Japan", c: "jp", d: "+81" }, { n: "Jordan", c: "jo", d: "+962" },
  { n: "Kazakhstan", c: "kz", d: "+7" }, { n: "Kenya", c: "ke", d: "+254" }, { n: "Kiribati", c: "ki", d: "+686" }, { n: "Kuwait", c: "kw", d: "+965" }, { n: "Kyrgyzstan", c: "kg", d: "+996" },
  { n: "Laos", c: "la", d: "+856" }, { n: "Latvia", c: "lv", d: "+371" }, { n: "Lebanon", c: "lb", d: "+961" }, { n: "Lesotho", c: "ls", d: "+266" }, { n: "Liberia", c: "lr", d: "+231" }, { n: "Libya", c: "ly", d: "+218" }, { n: "Liechtenstein", c: "li", d: "+423" }, { n: "Lithuania", c: "lt", d: "+370" }, { n: "Luxembourg", c: "lu", d: "+352" },
  { n: "Madagascar", c: "mg", d: "+261" }, { n: "Malawi", c: "mw", d: "+265" }, { n: "Malaysia", c: "my", d: "+60" }, { n: "Maldives", c: "mv", d: "+960" }, { n: "Mali", c: "ml", d: "+223" }, { n: "Malta", c: "mt", d: "+356" }, { n: "Marshall Islands", c: "mh", d: "+692" }, { n: "Mauritania", c: "mr", d: "+222" }, { n: "Mauritius", c: "mu", d: "+230" }, { n: "Mexico", c: "mx", d: "+52" }, { n: "Micronesia", c: "fm", d: "+691" }, { n: "Moldova", c: "md", d: "+373" }, { n: "Monaco", c: "mc", d: "+377" }, { n: "Mongolia", c: "mn", d: "+976" }, { n: "Montenegro", c: "me", d: "+382" }, { n: "Morocco", c: "ma", d: "+212" }, { n: "Mozambique", c: "mz", d: "+258" }, { n: "Myanmar", c: "mm", d: "+95" },
  { n: "Namibia", c: "na", d: "+264" }, { n: "Nauru", c: "nr", d: "+674" }, { n: "Nepal", c: "np", d: "+977" }, { n: "Netherlands", c: "nl", d: "+31" }, { n: "New Zealand", c: "nz", d: "+64" }, { n: "Nicaragua", c: "ni", d: "+505" }, { n: "Niger", c: "ne", d: "+227" }, { n: "Nigeria", c: "ng", d: "+234" }, { n: "North Korea", c: "kp", d: "+850" }, { n: "North Macedonia", c: "mk", d: "+389" }, { n: "Norway", c: "no", d: "+47" },
  { n: "Oman", c: "om", d: "+968" },
  { n: "Pakistan", c: "pk", d: "+92" }, { n: "Palau", c: "pw", d: "+680" }, { n: "Palestine", c: "ps", d: "+970" }, { n: "Panama", c: "pa", d: "+507" }, { n: "Papua New Guinea", c: "pg", d: "+675" }, { n: "Paraguay", c: "py", d: "+595" }, { n: "Peru", c: "pe", d: "+51" }, { n: "Philippines", c: "ph", d: "+63" }, { n: "Poland", c: "pl", d: "+48" }, { n: "Portugal", c: "pt", d: "+351" },
  { n: "Qatar", c: "qa", d: "+974" },
  { n: "Romania", c: "ro", d: "+40" }, { n: "Russia", c: "ru", d: "+7" }, { n: "Rwanda", c: "rw", d: "+250" },
  { n: "Saint Kitts and Nevis", c: "kn", d: "+1-869" }, { n: "Saint Lucia", c: "lc", d: "+1-758" }, { n: "Saint Vincent and the Grenadines", c: "vc", d: "+1-784" }, { n: "Samoa", c: "ws", d: "+685" }, { n: "San Marino", c: "sm", d: "+378" }, { n: "Sao Tome and Principe", c: "st", d: "+239" }, { n: "Saudi Arabia", c: "sa", d: "+966" }, { n: "Senegal", c: "sn", d: "+221" }, { n: "Serbia", c: "rs", d: "+381" }, { n: "Seychelles", c: "sc", d: "+248" }, { n: "Sierra Leone", c: "sl", d: "+232" }, { n: "Singapore", c: "sg", d: "+65" }, { n: "Slovakia", c: "sk", d: "+421" }, { n: "Slovenia", c: "si", d: "+386" }, { n: "Solomon Islands", c: "sb", d: "+677" }, { n: "Somalia", c: "so", d: "+252" }, { n: "South Africa", c: "za", d: "+27" }, { n: "South Korea", c: "kr", d: "+82" }, { n: "South Sudan", c: "ss", d: "+211" }, { n: "Spain", c: "es", d: "+34" }, { n: "Sri Lanka", c: "lk", d: "+94" }, { n: "Sudan", c: "sd", d: "+249" }, { n: "Suriname", c: "sr", d: "+597" }, { n: "Sweden", c: "se", d: "+46" }, { n: "Switzerland", c: "ch", d: "+41" }, { n: "Syria", c: "sy", d: "+963" },
  { n: "Taiwan", c: "tw", d: "+886" }, { n: "Tajikistan", c: "tj", d: "+992" }, { n: "Tanzania", c: "tz", d: "+255" }, { n: "Thailand", c: "th", d: "+66" }, { n: "Timor-Leste", c: "tl", d: "+670" }, { n: "Togo", c: "tg", d: "+228" }, { n: "Tonga", c: "to", d: "+676" }, { n: "Trinidad and Tobago", c: "tt", d: "+1-868" }, { n: "Tunisia", c: "tn", d: "+216" }, { n: "Turkey", c: "tr", d: "+90" }, { n: "Turkmenistan", c: "tm", d: "+993" }, { n: "Tuvalu", c: "tv", d: "+688" },
  { n: "Uganda", c: "ug", d: "+256" }, { n: "Ukraine", c: "ua", d: "+380" }, { n: "United Arab Emirates", c: "ae", d: "+971" }, { n: "United Kingdom", c: "gb", d: "+44" }, { n: "United States", c: "us", d: "+1" }, { n: "Uruguay", c: "uy", d: "+598" }, { n: "Uzbekistan", c: "uz", d: "+998" },
  { n: "Vanuatu", c: "vu", d: "+678" }, { n: "Vatican City", c: "va", d: "+379" }, { n: "Venezuela", c: "ve", d: "+58" }, { n: "Vietnam", c: "vn", d: "+84" },
  { n: "Yemen", c: "ye", d: "+967" },
  { n: "Zambia", c: "zm", d: "+260" }, { n: "Zimbabwe", c: "zw", d: "+263" }
];

type JourneyOption = {
  id: string;
  title: string;
  desc: string;
  planName: string;
  planStyle: string;
  planPrice: string;
  planLimit: string;
};

const options: JourneyOption[] = [
  {
    id: "student",
    title: "Student / Early Career",
    desc: "I am pursuing a career or currently studying in the IP field.",
    planName: "Student Membership",
    planStyle: "bg-pastel-pink",
    planPrice: "£99 / year",
    planLimit: "Rate-limited for the first 200 members"
  },
  {
    id: "entrepreneur",
    title: "Founder / Entrepreneur",
    desc: "I am commercialising intellectual property and innovation.",
    planName: "Entrepreneur Membership",
    planStyle: "bg-pastel-purple",
    planPrice: "£295 / year",
    planLimit: "Rate-limited for the first 200 members"
  },
  {
    id: "professional",
    title: "IP Professional / Lawyer",
    desc: "I am an established practitioner, patent attorney, or counsel.",
    planName: "IP Professional Membership",
    planStyle: "bg-pastel-green",
    planPrice: "£395 / year",
    planLimit: "Rate-limited for the first 300 members"
  },
  {
    id: "corporate",
    title: "Firm / Corporate Team",
    desc: "I want to enroll multiple team members from my organization.",
    planName: "Enterprise Membership",
    planStyle: "bg-pastel-yellow",
    planPrice: "£1,745 / year",
    planLimit: "5 Founding Memberships at £349/per membership + 1 FREE Membership – An Exclusive Saving of £625"
  }
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", country: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<JourneyOption | null>(null);
  const [onboardingId, setOnboardingId] = useState<string | null>(null);

  const selectedCountryObj = countries.find(c => c.n === formData.country);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          country: formData.country,
          phone: (selectedCountryObj ? selectedCountryObj.d + ' ' : '') + formData.phone
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.id) setOnboardingId(data.id);
      }
    } catch (err) {
      console.error('Failed to save lead:', err);
    }
    
    setIsLoading(false);
    setStep(2);
  };

  const handleOptionSelect = async (opt: JourneyOption) => {
    setSelectedOption(opt);
    
    if (onboardingId) {
      try {
        await fetch('/api/onboarding', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: onboardingId,
            journey_stage: opt.title
          })
        });
      } catch (err) {
        console.error('Failed to update lead:', err);
      }
    }
    
    setStep(3);
  };

  const inputStyle = {
    width: "100%",
    padding: "15px 20px",
    fontSize: "1.1rem",
    border: "1px solid var(--border-input)",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-heading)",
    borderRadius: "16px",
    marginBottom: "20px",
    fontFamily: "inherit",
    boxShadow: "var(--shadow-card)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s"
  };

  return (
    <main onClick={(e) => { if ((e.target as Element).closest('.country-dropdown') === null) setDropdownOpen(false); }} style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '100px 20px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: 'var(--text-heading)', border: '1px solid rgba(236, 72, 153, 0.35)', padding: '8px 24px', borderRadius: '30px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase', boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)' }}>
                Step 1 of 2
              </div>
              <h1 className="heading-huge" style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--text-heading)', lineHeight: 1.1, fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                LET'S GET <br/> <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ACQUAINTED</span>
              </h1>
              <p style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-body)', marginBottom: '40px', textAlign: 'center' }}>
                Please share a few details so we can tailor your experience.
              </p>

              <form onSubmit={handleSubmit} style={{ width: '100%', backgroundColor: 'var(--bg-card)', padding: '50px', borderRadius: '32px', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Full Name *</label>
                  <input type="text" placeholder="Jane Doe" required style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} onFocus={e => e.target.style.borderColor = "#ec4899"} onBlur={e => e.target.style.borderColor = "var(--border-input)"} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Email Address *</label>
                  <input type="email" placeholder="jane@example.com" required style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} onFocus={e => e.target.style.borderColor = "#ec4899"} onBlur={e => e.target.style.borderColor = "var(--border-input)"} />
                </div>

                <div className="country-dropdown" style={{ display: 'flex', flexDirection: 'column', gap: '5px', position: 'relative', marginBottom: '20px' }}>
                  <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Country *</label>
                  
                  <div 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{...inputStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-primary)', marginBottom: 0}}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {selectedCountryObj ? (
                        <>
                          <img src={`https://flagcdn.com/w20/${selectedCountryObj.c}.png`} width="20" alt="" style={{ border: '1px solid var(--border-subtle)', borderRadius: '2px' }} />
                          <span style={{ color: 'var(--text-heading)' }}>{selectedCountryObj.n}</span>
                        </>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Select your country</span>
                      )}
                    </div>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-input)', borderRadius: '16px', maxHeight: '300px', overflowY: 'auto', zIndex: 50, boxShadow: 'var(--shadow-card)', marginTop: '5px' }}
                      >
                        {countries.map(c => (
                          <div 
                            key={c.c}
                            onClick={() => { setFormData({...formData, country: c.n}); setDropdownOpen(false); }}
                            style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)', backgroundColor: formData.country === c.n ? 'rgba(236, 72, 153, 0.2)' : 'transparent', color: 'var(--text-heading)' }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = formData.country === c.n ? 'rgba(236, 72, 153, 0.2)' : 'transparent'}
                          >
                            <img src={`https://flagcdn.com/w20/${c.c}.png`} width="20" alt="" style={{ border: '1px solid var(--border-subtle)', borderRadius: '2px' }} />
                            <span style={{ fontWeight: formData.country === c.n ? 700 : 500 }}>{c.n}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '20px' }}>
                  <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Phone Number *</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ 
                      ...inputStyle, 
                      width: 'auto', 
                      marginBottom: 0, 
                      backgroundColor: 'var(--bg-surface-elevated)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 'bold',
                      color: 'var(--text-heading)',
                      opacity: selectedCountryObj ? 1 : 0.5
                    }}>
                      {selectedCountryObj ? selectedCountryObj.d : '+'}
                    </div>
                    <input 
                      type="tel" 
                      placeholder="123 456 7890" 
                      required 
                      style={{ ...inputStyle, marginBottom: 0, flexGrow: 1 }} 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                      onFocus={e => e.target.style.borderColor = "#ec4899"} 
                      onBlur={e => e.target.style.borderColor = "var(--border-input)"} 
                    />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-accent" style={{ width: '100%', padding: '18px', fontSize: '1.2rem', borderRadius: '50px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', marginTop: '10px', opacity: isLoading ? 0.7 : 1 }}>
                  {isLoading ? 'Saving...' : 'Continue →'}
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: 'var(--text-heading)', border: '1px solid rgba(236, 72, 153, 0.35)', padding: '8px 24px', borderRadius: '30px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '30px', textTransform: 'uppercase', boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)' }}>
                Step 2 of 2
              </div>
              <h1 className="heading-huge" style={{ textAlign: 'center', marginBottom: '60px', color: 'var(--text-heading)', lineHeight: 1.1 }}>
                WHERE ARE YOU IN <br/> <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>YOUR IP JOURNEY?</span>
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', width: '100%' }}>
                {options.map((opt) => (
                  <TiltCard 
                    key={opt.id} 
                    className="bento-card"
                    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '24px', padding: '30px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: 'var(--shadow-card)', height: '100%' }}
                  >
                    <div onClick={() => handleOptionSelect(opt)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: '15px', color: 'var(--text-heading)' }}>{opt.title}</h3>
                      <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', fontWeight: 500, lineHeight: 1.5, marginTop: 'auto' }}>{opt.desc}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>

              <button 
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: '#f472b6', fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'underline', fontSize: '1.1rem', marginTop: '50px' }}
              >
                ← Back to Details
              </button>
            </motion.div>
          )}

          {step === 3 && selectedOption && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: 'var(--text-heading)', border: '1px solid rgba(236, 72, 153, 0.35)', padding: '8px 24px', borderRadius: '30px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '30px', textTransform: 'uppercase', boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)' }}>
                Recommended For You
              </div>
              
              <div className={selectedOption.planStyle} style={{ border: '2px solid #ff2d55', borderRadius: '40px', padding: '50px 30px', width: '100%', backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-featured)', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', lineHeight: 1.1, color: 'var(--text-heading)' }}>
                  {selectedOption.planName}
                </h2>
                <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: '15px', color: 'var(--text-heading)' }}>
                  {selectedOption.planPrice}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '30px', color: '#f472b6' }}>
                  {selectedOption.planLimit}
                </div>
                
                <Link href={`/interest?plan=${encodeURIComponent(selectedOption.planName.replace('\n', ' '))}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent((selectedCountryObj ? selectedCountryObj.d + ' ' : '') + formData.phone)}&country=${encodeURIComponent(formData.country)}`} style={{ textDecoration: 'none', width: '100%' }}>
                  <button className="btn btn-accent" style={{ width: '100%', padding: '20px', fontSize: '1.2rem', borderRadius: '50px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}>
                    Continue to Registration
                  </button>
                </Link>
              </div>

              <button 
                onClick={() => setStep(2)}
                style={{ background: 'none', border: 'none', color: '#f472b6', fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'underline', fontSize: '1.1rem' }}
              >
                ← Wait, let me change my answer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
