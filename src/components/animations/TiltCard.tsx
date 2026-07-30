"use client";

import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import React from "react";

export default function TiltCard({ children, className, style, variants }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; variants?: Variants }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);
  const opacity = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Create the glow background based on raw mouse coordinates
  const background = useTransform(
    [mouseXRaw, mouseYRaw],
    ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    mouseXRaw.set(mouseX);
    mouseYRaw.set(mouseY);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    opacity.set(0);
  };

  return (
    <motion.div
      suppressHydrationWarning
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style
      }}
      className={className}
      variants={variants}
      whileHover={{ scale: 1.02, zIndex: 10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    >
      <motion.div 
        style={{
          position: "absolute",
          inset: 0,
          background,
          opacity,
          pointerEvents: "none",
          borderRadius: "inherit",
          zIndex: 1,
        }}
      />
      <div style={{ transform: "translateZ(30px)", height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}
