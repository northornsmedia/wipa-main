"use client";

import { motion } from "framer-motion";
import FadeIn from "./animations/FadeIn";

const locations = [
  "New York", "London", "Tokyo", "Silicon Valley", "Paris", 
  "Berlin", "Geneva", "Singapore", "Sydney", "Toronto",
  // Duplicate for seamless loop
  "New York", "London", "Tokyo", "Silicon Valley", "Paris", 
  "Berlin", "Geneva", "Singapore", "Sydney", "Toronto"
];

export default function GlobalNetwork() {
  return (
    <section className="section section-white" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <FadeIn direction="up">
          <h2 className="heading-lg" style={{ marginBottom: '60px' }}>A Global Network.</h2>
        </FadeIn>
      </div>

      <div style={{ position: 'relative', width: '100vw', left: 'calc(-50vw + 50%)', overflow: 'hidden', display: 'flex', backgroundColor: 'var(--bg-card)', padding: '40px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', transform: 'rotate(-2deg)' }}>
        
        <motion.div
          style={{ display: 'flex', whiteSpace: 'nowrap', gap: '40px', paddingRight: '40px' }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {locations.map((loc, i) => (
            <div key={i} style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-heading)' }}>
              {loc} <span style={{ color: '#ec4899', margin: '0 20px' }}>*</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
