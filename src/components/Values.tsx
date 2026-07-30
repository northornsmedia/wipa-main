import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";

const values = [
  { title: "Community", style: "bg-pastel-purple" },
  { title: "Collaboration", style: "bg-pastel-yellow" },
  { title: "Leadership", style: "bg-pastel-pink" },
  { title: "Innovation", style: "bg-pastel-green" },
  { title: "Integrity", style: "bg-charcoal" },
  { title: "Diversity", style: "bg-pastel-purple" },
  { title: "Inclusion", style: "bg-pastel-yellow" },
  { title: "Excellence", style: "bg-pastel-pink" },
];

export default function Values() {
  return (
    <section id="values" className="section section-white" style={{ position: 'relative', overflow: 'hidden' }}>
      
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ marginBottom: '80px', textAlign: 'center' }}>
            The Principles That <br/>
            <span style={{ color: 'var(--color-accent-purple)' }}>Unite Our Community</span>
          </h2>
        </FadeIn>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {values.map((v, i) => (
            <div key={i} className={`pill-container ${v.style}`} style={{ padding: '40px 20px', textAlign: 'center', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
              <h4 className="heading-md" style={{ color: v.style === 'bg-charcoal' ? 'var(--color-white)' : 'var(--color-black)' }}>{v.title}</h4>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
