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
    <section className="section section-dark" style={{ paddingTop: '40px' }}>
      <div className="container">
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              <span style={{ color: '#ff3b5c' }}>Learn.</span> <span style={{ color: '#f97316' }}>Connect.</span> <span style={{ color: '#10b981' }}>Collaborate.</span>
            </h2>
            <p className="mobile-text-center" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, color: 'var(--text-body)', textAlign: 'center' }}>
              Members benefit from a year-round calendar of events designed to encourage continuous learning and meaningful international networking.
            </p>
          </FadeIn>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {events.map((evt, i) => (
            <div key={i} className="pill-container bg-charcoal" style={{ padding: '30px 20px', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)' }}>
              <h4 className="heading-md" style={{ color: 'var(--text-heading)', textAlign: 'center' }}>{evt}</h4>
            </div>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
