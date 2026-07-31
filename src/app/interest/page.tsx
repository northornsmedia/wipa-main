"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FadeIn from "@/components/animations/FadeIn";

export default function InterestPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planName = searchParams.get("plan") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    plan: planName
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (planName) {
      setFormData((prev) => ({ ...prev, plan: planName }));
    }
  }, [planName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-pastel-purple)", display: "flex", justifyContent: "center", alignItems: "center", padding: "100px 20px" }}>
      <FadeIn direction="up">
        <div style={{ backgroundColor: "var(--color-white)", padding: "50px", borderRadius: "32px", border: "3px solid var(--color-black)", boxShadow: "12px 12px 0px var(--color-black)", width: "100%", maxWidth: "600px" }}>
          
          <h1 className="heading-lg" style={{ marginBottom: "20px", textAlign: "center" }}>Reserve Your Membership</h1>
          <p style={{ fontSize: "1.1rem", marginBottom: "40px", textAlign: "center", opacity: 0.8 }}>
            Fill out the form below to secure your founding membership.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Selected Plan</label>
              <input 
                type="text" 
                name="plan" 
                value={formData.plan} 
                readOnly
                style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", backgroundColor: "var(--color-pastel-yellow)", fontSize: "1.1rem", fontWeight: "bold" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                required
                placeholder="Enter your full name"
                value={formData.name} 
                onChange={handleChange}
                style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                required
                placeholder="+1 234 567 8900"
                value={formData.phone} 
                onChange={handleChange}
                style={{ padding: "15px", borderRadius: "12px", border: "2px solid var(--color-black)", fontSize: "1.1rem" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Who are you? (Profession/Role)</label>
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

            <button 
              type="submit" 
              style={{ padding: "20px", marginTop: "10px", borderRadius: "50px", border: "2px solid var(--color-black)", backgroundColor: "var(--color-black)", color: "var(--color-white)", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Submit Details
            </button>
          </form>

        </div>
      </FadeIn>

      {/* SUCCESS MODAL */}
      {isSubmitted && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "20px" }}>
          <FadeIn direction="up">
            <div style={{ backgroundColor: "var(--color-pastel-green)", padding: "50px", borderRadius: "32px", border: "3px solid var(--color-black)", boxShadow: "12px 12px 0px var(--color-black)", maxWidth: "500px", textAlign: "center" }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🎉</div>
              <h2 className="heading-md" style={{ marginBottom: "20px" }}>Thank You!</h2>
              <p style={{ fontSize: "1.2rem", lineHeight: 1.6, marginBottom: "30px", fontWeight: 500 }}>
                Your details are submitted <strong>{formData.name}</strong> and we will reach you back shortly thanks ..
              </p>
              <button 
                onClick={() => router.push("/")}
                style={{ padding: "15px 30px", borderRadius: "50px", border: "2px solid var(--color-black)", backgroundColor: "var(--color-white)", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", boxShadow: "4px 4px 0px var(--color-black)" }}
              >
                Return to Homepage
              </button>
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  );
}
