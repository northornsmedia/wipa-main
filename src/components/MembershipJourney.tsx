import FadeIn from "./animations/FadeIn";

const journeySteps = [
  { title: "Join the Alliance", color: "bg-pastel-pink" },
  { title: "Create Your Professional Profile", color: "bg-pastel-yellow" },
  { title: "Meet Members Worldwide", color: "bg-pastel-green" },
  { title: "Attend Exclusive Events", color: "bg-pastel-purple" },
  { title: "Find Mentors & Collaborators", color: "bg-pastel-pink" },
  { title: "Expand Your Global Network", color: "bg-pastel-yellow" },
  { title: "Develop Your Leadership", color: "bg-pastel-green" },
  { title: "Inspire the Next Generation", color: "bg-pastel-purple" },
];

export default function MembershipJourney() {
  return (
    <section className="section section-white" style={{ paddingBottom: 0 }}>
      <div className="container" style={{ textAlign: 'center', paddingBottom: 0 }}>
        
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ marginBottom: '80px' }}>
            Your Journey <br/> <span style={{ color: 'var(--color-accent-purple)' }}>Begins Here</span>
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '40px 0 0 0', display: 'flex', justifyContent: 'center' }}>
            <img src="/roadmap.png" alt="Membership Journey Roadmap" style={{ width: '100%', maxWidth: '1200px', height: 'auto', objectFit: 'contain' }} />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
