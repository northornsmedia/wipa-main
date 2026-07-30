import FadeIn from "./animations/FadeIn";

const journeySteps = [
  "Join the Alliance",
  "Create Your Professional Profile",
  "Meet Members Worldwide",
  "Attend Exclusive Events",
  "Find Mentors & Collaborators",
  "Expand Your Global Network",
  "Develop Your Leadership",
  "Inspire the Next Generation",
];

export default function MembershipJourney() {
  return (
    <section className="section section-white">
      <div className="container" style={{ textAlign: 'center' }}>
        
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ marginBottom: '60px' }}>
            Your Journey <br/> <span style={{ color: 'var(--color-accent-purple)' }}>Begins Here</span>
          </h2>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {journeySteps.map((step, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                padding: '15px 30px', 
                backgroundColor: 'var(--color-pastel-yellow)', 
                border: '2px solid var(--color-black)', 
                boxShadow: '4px 4px 0px var(--color-black)',
                borderRadius: '8px'
              }}>
                {step}
              </div>
              {i < journeySteps.length - 1 && (
                <div style={{ fontSize: '2rem', color: 'var(--color-black)' }}>↓</div>
              )}
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
