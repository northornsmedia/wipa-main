import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const leaders = [
  { role: "Founder & CEO", style: "bg-pastel-pink" },
  { role: "Alliance President", style: "bg-pastel-yellow" },
  { role: "Advisory Board", style: "bg-pastel-green" },
  { role: "Regional Representatives", style: "bg-pastel-purple" },
  { role: "Community Ambassadors", style: "bg-pastel-pink" }
];

export default function Leadership() {
  return (
    <section className="section section-white">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              Led by Respected <br/> <span style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '0 20px' }}>Global IP Leaders</span>
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              The Alliance is guided by experienced professionals who share a common vision of empowering women through collaboration, education, and leadership.
            </p>
          </FadeIn>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {leaders.map((l, i) => (
            <div key={i} className={`pill-container ${l.style}`} style={{ padding: '40px 20px', textAlign: 'center', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
              <h4 className="heading-md">{l.role}</h4>
            </div>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
