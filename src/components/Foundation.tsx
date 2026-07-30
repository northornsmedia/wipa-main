import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const highlights = [
  { title: "5,000+", desc: "Women Featured", style: "bg-pastel-pink" },
  { title: "80+", desc: "Countries Represented", style: "bg-pastel-yellow" },
  { title: "2019", desc: "Established", style: "bg-pastel-purple" },
];

export default function Foundation() {
  return (
    <section className="section section-white" style={{ position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <div style={{ display: 'inline-block', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '8px 16px', borderRadius: '30px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '20px' }}>
              Powered by The Women's IP World
            </div>
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              An International Legacy
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              Since 2019, The Women's IP World Annual has celebrated the achievements of women working in intellectual property, publishing stories from over 5,000 professionals across 80+ countries. The Alliance builds upon this foundation, transitioning from an annual publication to a dynamic, year-round community designed to support women at every stage of their careers.
            </p>
          </FadeIn>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {highlights.map((h, i) => (
            <div key={i} className={`pill-container ${h.style}`} style={{ padding: '60px 20px', textAlign: 'center', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
              <h4 className="heading-lg" style={{ marginBottom: '10px', fontSize: '3rem' }}>{h.title}</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{h.desc}</p>
            </div>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
