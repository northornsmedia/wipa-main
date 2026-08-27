"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import StaggerGrid from "@/components/animations/StaggerGrid";
import TiltCard from "@/components/animations/TiltCard";

export default function EnterprisePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    seats: "",
    needs: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/enterprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("There was an issue submitting your inquiry. Please try again.");
      }
    } catch (err) {
      console.error('Failed to submit:', err);
      alert("Failed to submit. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
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

  const features = [
    {
      title: "Bulk Seat Management",
      desc: "Easily provision and manage memberships for your entire team from a single centralized dashboard.",
      icon: "🏢",
      style: "bg-charcoal span-2 row-span-1"
    },
    {
      title: "Custom IP Workshops",
      desc: "Tailored training sessions and workshops designed specifically for your organization's unique challenges.",
      icon: "🎓",
      style: "bg-pastel-pink span-2 row-span-1"
    },
    {
      title: "Dedicated Account Manager",
      desc: "Get priority support and a dedicated point of contact to ensure your team maximizes their WIPA benefits.",
      icon: "🤝",
      style: "bg-pastel-green span-2 row-span-1"
    },
    {
      title: "Priority Sponsorships",
      desc: "First access to sponsor flagship events, webinars, and community initiatives to boost your firm's visibility.",
      icon: "⭐",
      style: "bg-pastel-yellow span-2 row-span-1"
    }
  ];

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '160px', paddingBottom: '100px', borderBottom: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          <div style={{ textAlign: 'left', zIndex: 10 }}>
            <FadeIn direction="up">
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: 'var(--text-heading)', border: '1px solid rgba(236, 72, 153, 0.35)', padding: '8px 24px', borderRadius: '30px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '30px', textTransform: 'uppercase', boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)' }}>
                For Organizations
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.1}>
              <h1 className="heading-huge" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.05, marginBottom: '30px', color: 'var(--text-heading)', textTransform: 'uppercase' }}>
                SCALE YOUR <br/>
                <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IP TEAM'S</span> <br/>
                IMPACT.
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p style={{ fontSize: '1.3rem', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6, color: 'var(--text-body)', marginBottom: '40px' }}>
                Tailored solutions for law firms, universities, and corporate IP departments. Equip your entire team with the resources, network, and tools they need to succeed in the global IP landscape.
              </p>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3}>
               <a href="#form" style={{ textDecoration: 'none' }}>
                 <button className="btn btn-accent" style={{ padding: '18px 40px', fontSize: '1.2rem', borderRadius: '50px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}>
                   Build Your Plan ↓
                 </button>
               </a>
            </FadeIn>
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
             <FadeIn direction="left" delay={0.4}>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '32px', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)', position: 'relative', transform: 'rotate(2deg)' }}>
                   <img src="/events.png" alt="Women's IP Alliance Enterprise Platform Preview" style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }} />
                   <img src="/sticker (4).png" alt="WIPA corporate engagement sticker" style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', transform: 'rotate(15deg)' }} />
                   <img src="/sticker (1).png" alt="Global IP network decorative sticker" style={{ position: 'absolute', bottom: '-40px', left: '-30px', width: '120px', transform: 'rotate(-25deg)' }} />
                </div>
             </FadeIn>
          </div>

        </div>
      </section>

      {/* Features & Form Section */}
      <section id="form" className="section section-dark" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>
          
          {/* Features */}
          <FadeIn direction="left">
            <div>
              <h2 className="heading-huge" style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--text-heading)' }}>What's Included?</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                Our enterprise plans are fully customizable. We work with you to build a package that aligns perfectly with your organizational goals.
              </p>

              <StaggerGrid className="bento-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {features.map((f, i) => (
                  <TiltCard key={i} className={`bento-card ${f.style}`} style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{f.icon}</div>
                    <h3 className="heading-md" style={{ marginBottom: '10px', color: 'var(--text-heading)' }}>{f.title}</h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-body)' }}>{f.desc}</p>
                  </TiltCard>
                ))}
              </StaggerGrid>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" delay={0.2}>
            <TiltCard className="bento-card" style={{ padding: '50px', cursor: 'default', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
                  <h3 className="heading-huge" style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--text-heading)' }}>Inquiry Received</h3>
                  <p style={{ fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.6, color: 'var(--text-body)' }}>
                    Thank you for your interest! Our enterprise team will be in touch shortly to discuss a tailored plan for your organization.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="heading-huge" style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-heading)' }}>Build Your Plan</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '30px', color: 'var(--text-body)' }}>Tell us a bit about your team's needs.</p>
                  
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Full Name *</label>
                      <input type="text" placeholder="Jane Doe" required style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} onFocus={e => e.target.style.borderColor = "#ec4899"} onBlur={e => e.target.style.borderColor = "var(--border-input)"} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Work Email *</label>
                      <input type="email" placeholder="jane@company.com" required style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} onFocus={e => e.target.style.borderColor = "#ec4899"} onBlur={e => e.target.style.borderColor = "var(--border-input)"} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Phone Number *</label>
                      <input type="tel" placeholder="+1 234 567 8900" required style={inputStyle} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} onFocus={e => e.target.style.borderColor = "#ec4899"} onBlur={e => e.target.style.borderColor = "var(--border-input)"} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Organization Name *</label>
                      <input type="text" placeholder="Acme Law Firm" required style={inputStyle} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} onFocus={e => e.target.style.borderColor = "#ec4899"} onBlur={e => e.target.style.borderColor = "var(--border-input)"} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Estimated Seats Needed *</label>
                      <select required style={{...inputStyle, cursor: 'pointer', appearance: 'none', background: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 15px center/15px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-heading)'}} value={formData.seats} onChange={e => setFormData({...formData, seats: e.target.value})} onFocus={e => e.target.style.borderColor = "#ec4899"} onBlur={e => e.target.style.borderColor = "var(--border-input)"}>
                        <option value="" disabled style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-heading)' }}>Select range</option>
                        <option value="5-10" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-heading)' }}>5 - 10 Seats</option>
                        <option value="11-25" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-heading)' }}>11 - 25 Seats</option>
                        <option value="26-50" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-heading)' }}>26 - 50 Seats</option>
                        <option value="50+" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-heading)' }}>50+ Seats</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', paddingLeft: '5px', color: 'var(--text-heading)' }}>Additional Needs</label>
                      <textarea placeholder="Tell us about any specific requirements..." rows={4} style={{...inputStyle, resize: 'vertical'}} value={formData.needs} onChange={e => setFormData({...formData, needs: e.target.value})} onFocus={e => e.target.style.borderColor = "#ec4899"} onBlur={e => e.target.style.borderColor = "var(--border-input)"}></textarea>
                    </div>

                    <button disabled={isLoading} type="submit" className="btn btn-accent" style={{ width: '100%', padding: '18px', fontSize: '1.2rem', borderRadius: '50px', fontWeight: 900, cursor: isLoading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', marginTop: '10px' }}>
                      {isLoading ? 'Submitting...' : 'Submit Inquiry →'}
                    </button>
                  </form>
                </>
              )}
            </TiltCard>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
