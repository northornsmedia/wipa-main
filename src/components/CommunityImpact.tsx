import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const stories = [
  { role: "Founding President", quote: "\"Why I Joined the Alliance\"...", style: "bg-pastel-pink" },
  { role: "Regional Representative", quote: "\"Building the future of IP together.\"", style: "bg-pastel-yellow" },
  { role: "Member Spotlight", quote: "\"An incredible international community.\"", style: "bg-pastel-purple" },
  { role: "Early Member", quote: "\"Networking that actually works beyond conferences.\"", style: "bg-pastel-green" }
];

export default function CommunityImpact() {
  return (
    <section className="section section-white">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              Meet the Women Building the <br/> <span style={{ color: 'var(--color-accent-purple)' }}>Future of IP</span>
            </h2>
          </FadeIn>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {stories.map((s, i) => (
            <div key={i} className={`pill-container ${s.style}`} style={{ padding: '40px 25px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                {s.quote}
              </p>
              <div style={{ marginTop: 'auto' }}>
                <h4 className="heading-md" style={{ fontSize: '1.2rem' }}>{s.role}</h4>
              </div>
            </div>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
