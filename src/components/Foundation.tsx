import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const highlights = [
  { title: "International Community", style: "bg-pastel-pink" },
  { title: "Global Recognition", style: "bg-pastel-yellow" },
  { title: "Industry Credibility", style: "bg-pastel-purple" },
  { title: "Professional Excellence", style: "bg-pastel-green" },
  { title: "Trusted Network", style: "bg-charcoal" },
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
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              The Women's IP Alliance has been developed by the team behind The Women's IP World Annual—the world's leading publication celebrating women across intellectual property.
            </p>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              For years, the publication has connected outstanding professionals from every region, showcasing leadership, celebrating achievement, and promoting diversity across patents, trade marks, innovation, technology, academia, and law.
            </p>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              The Alliance extends this trusted global network beyond an annual publication, creating a vibrant year-round ecosystem where relationships continue to grow long after conferences and publications are complete.
            </p>
          </FadeIn>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {highlights.map((h, i) => (
            <div key={i} className={`pill-container ${h.style}`} style={{ padding: '40px 20px', textAlign: 'center', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h4 className="heading-md" style={{ color: h.style === 'bg-charcoal' ? 'var(--color-white)' : 'var(--color-black)' }}>{h.title}</h4>
            </div>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
