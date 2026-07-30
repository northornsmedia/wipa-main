import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";

const values = [
  { title: "Community", desc: "Building strong, supportive networks that span across borders.", style: "bg-pastel-purple" },
  { title: "Empowerment", desc: "Equipping women with resources and opportunities to lead.", style: "bg-pastel-yellow" },
  { title: "Innovation", desc: "Pushing the boundaries of what's possible in IP.", style: "bg-pastel-pink" },
  { title: "Integrity", desc: "Maintaining the highest ethical standards in everything.", style: "bg-pastel-green" },
];

export default function Values() {
  return (
    <section id="values" className="section section-white" style={{ position: 'relative', overflow: 'hidden' }}>
      
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ marginBottom: '80px', textAlign: 'center' }}>
            Core Values
          </h2>
        </FadeIn>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {values.map((v, i) => (
            <div key={i} className={`pill-container ${v.style}`} style={{ padding: '80px 40px', textAlign: 'center', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
              <h4 className="heading-md" style={{ marginBottom: '20px' }}>{v.title}</h4>
              <p style={{ fontSize: '1.1rem' }}>{v.desc}</p>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
