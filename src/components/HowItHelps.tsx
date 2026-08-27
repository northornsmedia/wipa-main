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
            Supporting <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', padding: '0 10px' }}>Every Stage</span><br/>
            of Your Journey
          </h2>
        </FadeIn>

        <StaggerGrid className="bento-grid">
          {stages.map((s, i) => (
            <div key={i} className="bento-card span-2 mobile-text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)' }}>
              <h3 className="heading-md mobile-text-center" style={{ marginBottom: '15px', color: 'var(--text-heading)' }}>{s.title}</h3>
              <p className="mobile-text-center" style={{ fontSize: '1.1rem', color: 'var(--text-body)' }}>{s.desc}</p>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
