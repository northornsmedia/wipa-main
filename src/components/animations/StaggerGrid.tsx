"use client";

import { motion, useInView, Variants } from "framer-motion";
import React, { useRef } from "react";

interface StaggerGridProps {
  children: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -150, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 12 } },
};

export default function StaggerGrid({ children, className, style }: StaggerGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        
        const childType = child.type;
        const props = child.props as any;

        if (typeof childType === 'string') {
          return (
            <motion.div key={i} variants={itemVariants} {...props}>
              {props.children}
            </motion.div>
          );
        }

        return React.cloneElement(child as React.ReactElement, { key: i, variants: itemVariants } as any);
      })}
    </motion.div>
  );
}
