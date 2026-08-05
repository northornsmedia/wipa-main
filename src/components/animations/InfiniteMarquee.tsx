"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee({ text, images }: { text?: string, images?: string[] }) {
  // Duplicate text/images to ensure seamless scrolling
  const repeatedText = text ? Array(4).fill(text).join(" • ") : "";
  const repeatedImages = images ? [...images, ...images, ...images] : [];

  const content = images ? (
    <div style={{ display: 'flex', gap: '80px', paddingRight: '80px', alignItems: 'center' }}>
      {repeatedImages.map((src, i) => (
        <img key={i} src={src} alt={`Logo ${i}`} style={{ height: '50px', objectFit: 'contain' }} />
      ))}
    </div>
  ) : (
    <div style={{ paddingRight: "40px" }}>{repeatedText}</div>
  );

  return (
    <div style={{
      width: "100%",
      overflow: "hidden",
      background: "linear-gradient(90deg, #ffffff, #f0f4f8, #ffffff)",
      padding: images ? "30px 0" : "20px 0",
      borderTop: "2px solid var(--color-charcoal-light)",
      borderBottom: "2px solid var(--color-charcoal-light)",
      display: "flex",
      alignItems: "center",
      position: "relative",
      zIndex: 10
    }}>
      <motion.div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          fontSize: "2rem",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          textTransform: "uppercase",
          color: "var(--color-pastel-green)",
          letterSpacing: "0.05em",
          width: "max-content"
        }}
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          duration: images ? 60 : 40,
          ease: "linear",
          repeat: Infinity
        }}
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
}
