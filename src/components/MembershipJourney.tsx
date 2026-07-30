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
    <section className="section section-white">
      <div className="container" style={{ textAlign: 'center' }}>
        
        <FadeIn direction="up">
          <h2 className="heading-huge" style={{ marginBottom: '80px' }}>
            Your Journey <br/> <span style={{ color: 'var(--color-accent-purple)' }}>Begins Here</span>
          </h2>
        </FadeIn>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '20px 0' }}>
          {/* Center Dashed Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '4px',
            borderLeft: '4px dashed var(--color-black)',
            transform: 'translateX(-50%)',
            zIndex: 0,
            opacity: 0.3
          }} />

          {journeySteps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <FadeIn key={i} direction={isLeft ? "right" : "left"} delay={i * 0.1}>
                <div style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '40px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  
                  {/* Left Side Content */}
                  {isLeft && (
                    <div style={{ width: '50%', paddingRight: '40px', textAlign: 'right' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-black)' }}>{step.title}</div>
                    </div>
                  )}

                  {/* Center Node */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '3px solid var(--color-black)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.2rem'
                  }} className={step.color}>
                    {i + 1}
                  </div>

                  {/* Right Side Content */}
                  {!isLeft && (
                    <div style={{ width: '50%', paddingLeft: '40px', textAlign: 'left' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-black)' }}>{step.title}</div>
                    </div>
                  )}

                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
