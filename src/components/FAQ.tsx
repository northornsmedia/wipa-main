"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const faqs = [
  { q: "When does the Alliance launch?", a: "The Women's IP Alliance officially launches in January 2027. We are currently accepting applications for our exclusive Founding Membership tier." },
  { q: "Who can become a member?", a: "Membership is open to all women professionals working in intellectual property, including patent practitioners, trade mark attorneys, academics, and researchers." },
  { q: "How does Founding Membership work?", a: "Founding Members join our inaugural cohort with lifetime priority status. This includes locked-in pricing, VIP access to all our global events, and special recognition on our platform." },
  { q: "When do memberships begin?", a: "All memberships will officially activate in January 2027. However, you can secure your Founding Membership today to lock in the exclusive Founding Member rate and benefits. Founding Members will also receive early access to the platform and exclusive pre-launch activities closer to the official launch in January 2027." },
  { q: "Is membership international?", a: "Yes! The Alliance is a truly global community. Our network spans across North America, Europe, Asia, and beyond, providing unparalleled opportunities for cross-border collaboration." },
  { q: "Can organisations enrol multiple members?", a: "Absolutely. We offer tailored Corporate and Academic memberships designed to support entire IP departments, providing discounted rates for group enrolments." },
  { q: "What events are included?", a: "Members enjoy year-round access to virtual workshops, educational webinars led by industry experts, and exclusive networking events, plus heavy discounts on our flagship annual face-to-face summits." },
  { q: "How does the mentorship programme work?", a: "Our mentorship programme is designed to connect women across the global IP community. Whether you are looking for guidance or wish to share your expertise, you can either request to be matched with an experienced mentor or apply to become a mentor and support the next generation of IP professionals." },
  { q: "Will there be regional chapters?", a: "Yes. While our community is global, we will be launching regional chapters throughout 2027 to facilitate local meetups, intimate networking dinners, and region-specific legal discussions." },
  { q: "What makes the Alliance different?", a: "Unlike traditional networking groups, the Alliance is built by the trusted team behind The Women's IP World Annual. We provide a vibrant, year-round ecosystem focused entirely on empowering women in IP." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section section-white">
      <div className="container">
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })
          }}
        />

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge">Frequently Asked Questions</h2>
          </FadeIn>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          <StaggerGrid>
            {faqs.map((faq, i) => (
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
                  marginBottom: '20px'
                }}
                onClick={() => toggleFaq(i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="heading-md" style={{ fontSize: '1.3rem', margin: 0 }}>{faq.q}</h4>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, marginLeft: '20px' }}>
                    {openIndex === i ? '−' : '+'}
                  </div>
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: '15px' }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ fontSize: '1.1rem', color: 'rgba(0,0,0,0.8)', lineHeight: 1.6, paddingRight: '40px', paddingBottom: '10px' }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* SEO: Keep answer in DOM even when collapsed */}
                {openIndex !== i && (
                  <div style={{ display: 'none' }} aria-hidden="true">
                    {faq.a}
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
