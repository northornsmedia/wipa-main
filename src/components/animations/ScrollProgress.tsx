"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        background: "linear-gradient(90deg, var(--color-pastel-purple) 0%, var(--color-pastel-green) 50%, var(--color-pastel-yellow) 100%)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 9999,
      }}
    />
  );
}
