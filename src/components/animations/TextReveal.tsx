"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

export default function TextReveal({ text, lines, className = "", style }: { text?: string; lines?: string[]; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const content = lines || (text ? [text] : []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", ...style }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {content.map((line, lineIndex) => (
        <div key={lineIndex} style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {line.split(" ").map((word, wordIndex) => (
            <motion.span
              variants={child}
              style={{ marginRight: "0.25em" }}
              key={wordIndex}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
