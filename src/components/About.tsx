"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Word = ({ children, progress, range, color }: any) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);
  return (
    <span style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em", paddingBottom: "10px", marginBottom: "-10px" }}>
      <motion.span style={{ opacity, y, color, display: "inline-block" }}>
        {children}
      </motion.span>
    </span>
  );
};

export default function About() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 30%"]
  });

  const words = [
    { text: "More", color: "inherit" },
    { text: "Than", color: "inherit" },
    { text: "a", color: "inherit" },
    { text: "Membership.", color: "inherit", br: true },
    { text: "A", color: "inherit" },
    { text: "Global", color: "inherit" },
    { text: "Community", color: "inherit", br: true },
    { text: "Built", color: "inherit" },
    { text: "for", color: "inherit" },
    { text: "Women", color: "inherit" },
    { text: "in", color: "inherit" },
    { text: "Intellectual", color: "var(--color-accent-purple)" },
    { text: "Property.", color: "var(--color-accent-purple)" }
  ];

  return (
    <section id="about" className="section section-white" style={{ position: 'relative', zIndex: 10 }}>
      <div className="sticker" style={{ '--rot': '10deg', backgroundColor: 'var(--color-pastel-pink)', top: '10%', right: '15%' } as React.CSSProperties}>💡</div>

      <div className="container" style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 ref={ref} className="heading-lg" style={{ marginBottom: '30px' }}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <span key={i}>
                <Word progress={scrollYProgress} range={[start, end]} color={word.color}>
                  {word.text}
                </Word>
                {word.br && <br />}
              </span>
            );
          })}
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', lineHeight: 1.6 }}>
          Women have long played a vital role in shaping innovation, protecting brands, advancing technology, and driving the future of intellectual property. Yet opportunities to build lasting international relationships, exchange expertise, and collaborate beyond conferences remain limited. The Women's IP Alliance has been created to bridge that gap.
        </p>
        <Link href="/about" className="btn btn-accent">
          Discover Our Mission
        </Link>
      </div>
    </section>
  );
}
