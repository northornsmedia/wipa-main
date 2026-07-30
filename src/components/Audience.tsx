import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";
import FloatAnim from "./animations/FloatAnim";

const personas = [
  { title: "Patent Attorneys", desc: "Connect with peers, find mentors, and stay on top of trends.", style: "bg-charcoal" },
  { title: "Trademark Specialists", desc: "Join a focused community that understands your challenges.", style: "bg-pastel-pink" },
  { title: "IP Law Students", desc: "Get mentorship and build your network before graduation.", style: "bg-pastel-yellow" },
  { title: "Startup Founders", desc: "Learn how to protect your innovations and connect with pros.", style: "bg-pastel-purple" },
];

export default function Audience() {
  return (
    <section id="audience" className="section section-dark">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '80px' }}>
          <FadeIn direction="right">
            <h2 className="heading-huge">Designed for <br/><span style={{ color: 'var(--color-pastel-pink)' }}>Every Woman</span></h2>
          </FadeIn>
          <FloatAnim delay={0.2} className="sticker" style={{ '--rot': '15deg', position: 'relative', backgroundColor: 'var(--color-pastel-yellow)', color: 'var(--color-black)' } as React.CSSProperties}>🎯</FloatAnim>
        </div>

        <StaggerGrid className="bento-grid">
          {personas.map((p, i) => (
            <div key={i} className={`bento-card span-2 ${p.style}`} style={{ border: p.style === 'bg-charcoal' ? '2px solid rgba(255,255,255,0.2)' : '2px solid var(--color-black)' }}>
              <h4 className="heading-md" style={{ marginBottom: '15px' }}>{p.title}</h4>
              <p style={{ fontSize: '1.1rem', opacity: p.style === 'bg-charcoal' ? 0.8 : 1 }}>{p.desc}</p>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
