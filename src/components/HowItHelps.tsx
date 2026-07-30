import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";

const stages = [
  { title: "Early in Your Career?", desc: "Access mentorship, curated learning, and a vibrant community of professionals." },
  { title: "Mid-Career Professional?", desc: "Expand your network. Discover opportunities through the Job Board and build visibility." },
  { title: "A Leader in IP?", desc: "Mentor the next generation, speak at events, and help shape the future." },
  { title: "A Startup Founder?", desc: "Connect with IP professionals who can protect your innovations from day one." },
];

export default function HowItHelps() {
  return (
    <section className="section section-white" style={{ position: 'relative', overflow: 'hidden' }}>


      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ textAlign: 'center', marginBottom: '80px' }}>
            Support at <br/> <span style={{ backgroundColor: 'var(--color-pastel-yellow)', padding: '0 20px' }}>Every Stage.</span>
          </h2>
        </FadeIn>

        <StaggerGrid className="bento-grid">
          {stages.map((s, i) => (
            <div key={i} className="bento-card span-2" style={{ backgroundColor: 'var(--color-white)', boxShadow: '8px 8px 0px var(--color-charcoal)' }}>
              <h3 className="heading-md" style={{ marginBottom: '15px' }}>{s.title}</h3>
              <p style={{ fontSize: '1.1rem' }}>{s.desc}</p>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
