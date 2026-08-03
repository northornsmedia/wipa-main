"use client";

import { useState, useEffect } from "react";
import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const baseStyles = ["bg-pastel-pink", "bg-pastel-yellow", "bg-pastel-purple", "bg-pastel-green"];
const stories = [
  { role: "Founding President", quote: "\"Why I Joined the Alliance\"...", style: "bg-pastel-pink" },
  { role: "Regional Representative", quote: "\"Building the future of IP together.\"", style: "bg-pastel-yellow" },
  { role: "Member Spotlight", quote: "\"An incredible international community.\"", style: "bg-pastel-purple" },
  { role: "Early Member", quote: "\"Networking that actually works beyond conferences.\"", style: "bg-pastel-green" },
  ...Array.from({ length: 16 }).map((_, i) => {
    const realisticRoles = [
      "Patent Attorney", "IP Consultant", "In-House Counsel", "Trade Mark Specialist",
      "Law Student", "Innovation Director", "IP Litigator", "Tech Transfer Officer"
    ];
    const realisticQuotes = [
      "A transformative community for female professionals.",
      "The best networking I've experienced in the IP sector.",
      "Empowering, supportive, and truly global.",
      "Found my mentors and business partners here.",
      "An invaluable resource for career growth in IP law.",
      "Connecting with top minds across borders.",
      "Finally, a space dedicated to women innovating in IP.",
      "Highly recommend to anyone starting in the industry."
    ];
    return {
      role: realisticRoles[i % realisticRoles.length],
      quote: `"${realisticQuotes[i % realisticQuotes.length]}"`,
      style: baseStyles[i % 4]
    };
  })
];

export default function CommunityImpact() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 4) % stories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const visibleStories = stories.slice(startIndex, startIndex + 4);

  return (
    <section className="section section-white">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              Meet the Women Building the <br/> <span style={{ color: 'var(--color-accent-purple)' }}>Future of IP</span>
            </h2>
          </FadeIn>
        </div>

        <div key={startIndex} style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {visibleStories.map((s, i) => (
              <div key={`${startIndex}-${i}`} className={`pill-container ${s.style}`} style={{ padding: '40px 25px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'all 0.3s ease' }}>
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                  {s.quote}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="heading-md" style={{ fontSize: '1.2rem' }}>{s.role}</h4>
                </div>
              </div>
            ))}
          </StaggerGrid>
        </div>

      </div>
    </section>
  );
}
