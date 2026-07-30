"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function MeshGradient() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse tracking
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Map spring to pixel offsets (inverted for parallax feel)
  const xOffset = useTransform(springX, [-100, 100], [50, -50]);
  const yOffset = useTransform(springY, [-100, 100], [50, -50]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 100;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 100;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-charcoal)', zIndex: 0 }} />;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", backgroundColor: 'var(--color-charcoal)' }}>
      {/* Orb 1: Pastel Purple */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          backgroundColor: "var(--color-pastel-purple)",
          filter: "blur(120px)",
          opacity: 0.4,
          x: xOffset,
          y: yOffset,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Orb 2: Pastel Green */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          backgroundColor: "var(--color-pastel-green)",
          filter: "blur(100px)",
          opacity: 0.3,
          x: useTransform(springX, [-100, 100], [-30, 30]), 
          y: useTransform(springY, [-100, 100], [-30, 30]),
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Orb 3: Pastel Yellow */}
      <motion.div
        style={{
          position: "absolute",
          top: "40%",
          left: "60%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          backgroundColor: "var(--color-pastel-yellow)",
          filter: "blur(90px)",
          opacity: 0.2,
          x: useTransform(springX, [-100, 100], [20, -20]),
          y: useTransform(springY, [-100, 100], [-40, 40]),
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Noise overlay to give it a textured feel */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: 0.05, 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay',
          pointerEvents: 'none'
        }} 
      />
    </div>
  );
}
