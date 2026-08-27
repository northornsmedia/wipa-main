"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingGrid() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate an array of floating squares
  const squares = Array.from({ length: 15 }).map((_, i) => ({
    id: `sq-${i}`,
    size: Math.random() * 80 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 10,
    rotation: Math.random() * 360,
  }));

  // Generate some floating circles
  const circles = Array.from({ length: 10 }).map((_, i) => ({
    id: `c-${i}`,
    size: Math.random() * 40 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Generate some plus signs
  const pluses = Array.from({ length: 12 }).map((_, i) => ({
    id: `p-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
  }));

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      backgroundColor: 'var(--bg-primary)',
    }}>
      {/* Animated Grid Pattern */}
      <div style={{
        position: 'absolute',
        inset: -200,
        backgroundImage: `
          linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
          linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 1,
        animation: 'grid-drift 25s linear infinite',
      }} />

      {/* Grid Drift Animation */}
      <style>{`
        @keyframes grid-drift {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-100px) translateX(-100px); }
        }
      `}</style>

      {/* Floating abstract squares */}
      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          initial={{ opacity: 0, y: `${sq.y}vh`, x: `${sq.x}vw`, rotate: sq.rotation }}
          animate={{ opacity: [0, 0.4, 0], y: [`${sq.y}vh`, `${sq.y - 30}vh`], rotate: sq.rotation + 90 }}
          transition={{ duration: sq.duration, delay: sq.delay, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute', width: sq.size, height: sq.size, border: '1px solid var(--border-subtle)',
            backgroundColor: 'transparent', zIndex: 2, boxShadow: 'var(--shadow-card)',
          }}
        />
      ))}

      {/* Floating circles */}
      {circles.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: `${c.y}vh`, x: `${c.x}vw` }}
          animate={{ opacity: [0, 0.3, 0], y: [`${c.y}vh`, `${c.y + 30}vh`] }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', width: c.size, height: c.size, borderRadius: '50%',
            backgroundColor: 'var(--color-pastel-purple)', zIndex: 2, backdropFilter: 'blur(4px)',
          }}
        />
      ))}

      {/* Floating plus signs */}
      {pluses.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: `${p.y}vh`, x: `${p.x}vw`, rotate: p.rotation }}
          animate={{ opacity: [0, 0.4, 0], y: [`${p.y}vh`, `${p.y - 40}vh`], rotate: p.rotation - 180 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute', zIndex: 2, color: 'var(--text-muted)', opacity: 0.3, fontSize: '2rem', fontWeight: 'bold'
          }}
        >
          +
        </motion.div>
      ))}

      {/* Big blurry accent blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: '20%', left: '10%', width: '40vw', height: '40vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)', zIndex: 1,
        }}
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: 'absolute', bottom: '10%', right: '5%', width: '50vw', height: '50vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)', zIndex: 1,
        }}
      />
    </div>
  );
}
