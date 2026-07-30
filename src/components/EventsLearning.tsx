import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const events = [
  "Educational Webinars",
  "Networking Meetups",
  "Leadership Workshops",
  "Panel Discussions",
  "Industry Roundtables",
  "Partner Events",
  "Annual Conference",
  "Awards & Gala Dinner"
];

export default function EventsLearning() {
  return (
    <section className="section section-dark">
      <div className="container">
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              <span style={{ color: 'var(--color-pastel-pink)' }}>Learn.</span> <span style={{ color: 'var(--color-pastel-yellow)' }}>Connect.</span> <span style={{ color: 'var(--color-pastel-green)' }}>Collaborate.</span>
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, opacity: 0.9 }}>
              Members benefit from a year-round calendar of events designed to encourage continuous learning and meaningful international networking.
            </p>
          </FadeIn>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {events.map((evt, i) => (
            <div key={i} className="pill-container bg-charcoal" style={{ padding: '30px 20px', border: '2px solid rgba(255,255,255,0.2)' }}>
              <h4 className="heading-md" style={{ color: 'var(--color-white)', textAlign: 'center' }}>{evt}</h4>
            </div>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
