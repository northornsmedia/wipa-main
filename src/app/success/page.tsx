"use client";

import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const interestId = searchParams.get("interestId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (interestId) {
      fetch('/api/interest', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: interestId, 
          payment_status: 'Payment success, subscription purchased',
          amount_paid: amount ? (parseInt(amount) / 100).toFixed(2) : null,
          paid_at: new Date().toISOString()
        })
      }).catch(err => console.error("Failed to update status:", err));
    }
  }, [interestId, amount]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-pastel-green)", display: "flex", justifyContent: "center", alignItems: "center", padding: "100px 20px" }}>
      <FadeIn direction="up">
        <div style={{ backgroundColor: "var(--color-white)", padding: "60px", borderRadius: "32px", border: "4px solid var(--color-black)", boxShadow: "16px 16px 0px var(--color-black)", maxWidth: "600px", textAlign: "center" }}>
          <div style={{ fontSize: "5rem", marginBottom: "20px" }}>🎉</div>
          <h1 className="heading-lg" style={{ marginBottom: "20px" }}>Payment Successful!</h1>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.6, marginBottom: "40px", fontWeight: 500, opacity: 0.9 }}>
            Thank you for securing your Founding Membership with the Women's IP Alliance. We are thrilled to have you join our global community!
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, marginBottom: "40px", fontWeight: 400, opacity: 0.8 }}>
            You will receive a confirmation email shortly with your receipt and next steps.
          </p>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{ padding: "20px 40px", borderRadius: "50px", border: "3px solid var(--color-black)", backgroundColor: "var(--color-black)", color: "var(--color-white)", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Return to Homepage
            </button>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
