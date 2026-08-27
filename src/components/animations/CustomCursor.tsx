"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('pill-container') ||
        target.classList.contains('bento-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(236, 72, 153, 0.3)',
        backdropFilter: 'blur(4px)',
        pointerEvents: 'none',
        zIndex: 9999,
        x: cursorXSpring,
        y: cursorYSpring,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      animate={{
        scale: isHovering ? 2.2 : 1,
        opacity: isHovering ? 0.8 : 0.6,
        backgroundColor: isHovering ? 'rgba(249, 115, 22, 0.4)' : 'rgba(236, 72, 153, 0.3)'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        style={{ width: 4, height: 4, backgroundColor: '#ffffff', borderRadius: '50%' }}
        animate={{ opacity: isHovering ? 0 : 1 }}
      />
    </motion.div>
  );
}
