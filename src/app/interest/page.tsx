"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FadeIn from "@/components/animations/FadeIn";

function InterestForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planName = searchParams.get("plan") || "";
  const amount = searchParams.get("amount") || "";
  const initialPlanDisplay = planName + (amount ? ` (${amount})` : "");

  const [formData, setFormData] = useState({
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    profession: "",
    plan: initialPlanDisplay
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [interestId, setInterestId] = useState<string | null>(null);
  const isYearly = searchParams.get("billing") === "yearly" || searchParams.get("billing") === null;

  useEffect(() => {
    if (planName) {
      setFormData((prev) => ({ ...prev, plan: initialPlanDisplay }));
    }
  }, [planName, amount, initialPlanDisplay]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          country: searchParams.get("country") || "",
          phone: formData.phone,
          profession: formData.profession,
          plan: planName
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.id) setInterestId(data.id);
      }
    } catch (err) {
      console.error('Failed to save interest:', err);
    }
    
    setIsLoading(false);
    setStep(2);
  };

  const handlePayNow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planName, 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          profession: formData.profession,
          isYearly: isYearly, 
          interestId: interestId
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        console.error("Error creating checkout session:", data.error);
        alert("There was an issue initiating checkout. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an issue connecting to the payment processor.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <FadeIn direction="up">
        <div style={{ backgroundColor: "var(--bg-card)", padding: "50px", borderRadius: "32px", border: "1px solid var(--border-card)", boxShadow: "var(--shadow-card)", width: "100%", maxWidth: "600px" }}>
          
          <h1 className="heading-lg" style={{ marginBottom: "20px", textAlign: "center", color: "var(--text-heading)" }}>Reserve Your Membership</h1>
          <p style={{ fontSize: "1.1rem", marginBottom: "40px", textAlign: "center", color: "var(--text-body)" }}>
            Fill out the form below to secure your founding membership.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--text-heading)" }}>Selected Plan</label>
              <input 
                type="text" 
                name="plan" 
                value={formData.plan} 
                readOnly
                style={{ padding: "15px", borderRadius: "12px", border: "1px solid rgba(236, 72, 153, 0.35)", backgroundColor: "rgba(236, 72, 153, 0.1)", color: "#f472b6", fontSize: "1.1rem", fontWeight: "bold" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--text-heading)" }}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                required
                placeholder="Enter your full name"
                value={formData.name} 
                onChange={handleChange}
                style={{ padding: "15px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "1.1rem" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--text-heading)" }}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                required
                placeholder="you@example.com"
                value={formData.email} 
                onChange={handleChange}
                style={{ padding: "15px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "1.1rem" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--text-heading)" }}>Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                required
                placeholder="+1 234 567 8900"
                value={formData.phone} 
                onChange={handleChange}
                style={{ padding: "15px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "1.1rem" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--text-heading)" }}>Who are you? (Profession/Role)</label>
              <input 
                type="text" 
                name="profession" 
                required
                placeholder="e.g. Patent Attorney, Founder, Student..."
                value={formData.profession} 
                onChange={handleChange}
                style={{ padding: "15px", borderRadius: "12px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-primary)", color: "var(--text-heading)", fontSize: "1.1rem" }}
              />
            </div>

            {step === 1 && (
              <button 
                type="submit" 
                className="btn btn-accent"
                style={{ padding: "18px", marginTop: "10px", borderRadius: "50px", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer" }}
              >
                Submit Details
              </button>
            )}
          </form>

          {step === 2 && (
            <FadeIn direction="up">
              <div style={{ marginTop: "30px", padding: "20px", borderRadius: "16px", backgroundColor: "var(--color-pastel-purple)", border: "1px solid var(--border-card)", color: "var(--text-heading)" }}>
                <h3 className="heading-md" style={{ marginBottom: "15px", fontSize: "1.5rem", color: "var(--text-heading)" }}>Review Your Details</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px", fontSize: "1.1rem", color: "var(--text-body)" }}>
                  <p><strong>Plan:</strong> {formData.plan}</p>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Role:</strong> {formData.profession}</p>
                </div>
                
                <div style={{ display: "flex", gap: "15px" }}>
                  <button 
                    onClick={() => setStep(1)}
                    style={{ flex: 1, padding: "15px", borderRadius: "50px", border: "1px solid var(--border-input)", backgroundColor: "var(--bg-surface-elevated)", color: "var(--text-heading)", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer" }}
                  >
                    Edit Details
                  </button>
                  <button 
                    onClick={handlePayNow}
                    disabled={isLoading}
                    className="btn btn-accent"
                    style={{ flex: 2, padding: "15px", borderRadius: "50px", fontSize: "1.1rem", fontWeight: "bold", cursor: isLoading ? "not-allowed" : "pointer" }}
                  >
                    {isLoading ? "Redirecting to Stripe..." : "Pay Now"}
                  </button>
                </div>
              </div>
            </FadeIn>
          )}

        </div>
      </FadeIn>
    </>
  );
}

export default function InterestPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", display: "flex", justifyContent: "center", alignItems: "center", padding: "100px 20px" }}>
      <Suspense fallback={<div style={{ color: "var(--text-heading)" }}>Loading form...</div>}>
        <InterestForm />
      </Suspense>
    </div>
  );
}
