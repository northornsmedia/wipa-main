"use client";

import { useState } from "react";
import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const faqs = [
  "When does the Alliance launch?",
  "Who can become a member?",
  "How does Founding Membership work?",
  "When do memberships begin?",
  "Is membership international?",
  "Can organisations enrol multiple members?",
  "What events are included?",
  "How does the mentorship programme work?",
  "Will there be regional chapters?",
  "What makes the Alliance different?"
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section section-white">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge">Frequently Asked Questions</h2>
          </FadeIn>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <StaggerGrid>
            {faqs.map((q, i) => (
              <div 
                key={i} 
                className="pill-container bg-white" 
                style={{ 
                  padding: '20px 30px', 
                  border: '2px solid var(--color-black)', 
                  boxShadow: '4px 4px 0px var(--color-black)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
                onClick={() => toggleFaq(i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="heading-md" style={{ fontSize: '1.3rem' }}>{q}</h4>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    {openIndex === i ? '−' : '+'}
                  </div>
                </div>
                {openIndex === i && (
                  <div style={{ fontSize: '1.1rem', marginTop: '10px', color: 'rgba(0,0,0,0.7)', lineHeight: 1.6 }}>
                    This is a placeholder answer. In the actual platform, this will contain the detailed answer to the question regarding the Women's IP World Alliance.
                  </div>
                )}
              </div>
            ))}
          </StaggerGrid>
        </div>

      </div>
    </section>
  );
}
