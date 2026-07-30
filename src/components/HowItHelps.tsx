import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";

const stages = [
  { title: "Early Career", desc: "Develop confidence through mentoring, education, and networking." },
  { title: "Mid-Career", desc: "Expand your international network and unlock new opportunities." },
  { title: "Senior Leaders", desc: "Increase your influence through speaking, mentoring, and leadership initiatives." },
  { title: "Entrepreneurs & Founders", desc: "Promote your business, build partnerships, and connect with clients worldwide." },
];

export default function HowItHelps() {
  return (
    <section className="section section-white" style={{ position: 'relative', overflow: 'hidden' }}>


      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ textAlign: 'center', marginBottom: '80px' }}>
            Supporting <span style={{ backgroundColor: 'var(--color-pastel-yellow)', padding: '0 20px' }}>Every Stage</span><br/>
            of Your Journey
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
