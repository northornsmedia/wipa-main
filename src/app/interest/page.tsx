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

            {step === 1 && (
              <button 
                type="submit" 
                style={{ padding: "20px", marginTop: "10px", borderRadius: "50px", border: "2px solid var(--color-black)", backgroundColor: "var(--color-black)", color: "var(--color-white)", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Submit Details
              </button>
            )}
          </form>

          {step === 2 && (
            <FadeIn direction="up">
              <div style={{ marginTop: "30px", padding: "20px", borderRadius: "16px", backgroundColor: "var(--color-pastel-purple)", border: "2px solid var(--color-black)" }}>
                <h3 className="heading-md" style={{ marginBottom: "15px", fontSize: "1.5rem" }}>Review Your Details</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px", fontSize: "1.1rem" }}>
                  <p><strong>Plan:</strong> {formData.plan}</p>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Role:</strong> {formData.profession}</p>
                </div>
                
                <div style={{ display: "flex", gap: "15px" }}>
                  <button 
                    onClick={() => setStep(1)}
                    style={{ flex: 1, padding: "15px", borderRadius: "50px", border: "2px solid var(--color-black)", backgroundColor: "var(--color-white)", color: "var(--color-black)", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer" }}
                  >
                    Edit Details
                  </button>
                  <button 
                    onClick={handlePayNow}
                    disabled={isLoading}
                    style={{ flex: 2, padding: "15px", borderRadius: "50px", border: "2px solid var(--color-black)", backgroundColor: isLoading ? "var(--color-charcoal)" : "var(--color-pastel-green)", color: isLoading ? "var(--color-white)" : "var(--color-black)", fontSize: "1.1rem", fontWeight: "bold", cursor: isLoading ? "not-allowed" : "pointer", transition: "transform 0.2s" }}
                    onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = "scale(1)")}
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
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-pastel-purple)", display: "flex", justifyContent: "center", alignItems: "center", padding: "100px 20px" }}>
      <Suspense fallback={<div>Loading form...</div>}>
        <InterestForm />
      </Suspense>
    </div>
  );
}
