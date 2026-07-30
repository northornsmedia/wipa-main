"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee({ text }: { text: string }) {
  // Duplicate text multiple times to ensure seamless scrolling
  const repeatedText = Array(4).fill(text).join(" • ");

  return (
    <div style={{
      width: "100%",
      overflow: "hidden",
      backgroundColor: "var(--color-black)",
      padding: "20px 0",
      borderTop: "2px solid var(--color-charcoal-light)",
      borderBottom: "2px solid var(--color-charcoal-light)",
      display: "flex",
      alignItems: "center"
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
          letterSpacing: "0.05em"
        }}
        animate={{
          x: ["0%", "-50%"] // Move exactly half width (since we repeated it to be twice as long as needed)
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity
        }}
      >
        <div style={{ paddingRight: "40px" }}>{repeatedText}</div>
        <div style={{ paddingRight: "40px" }}>{repeatedText}</div>
      </motion.div>
    </div>
  );
}
