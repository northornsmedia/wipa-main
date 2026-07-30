import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";

const advantages = [
  "Conference Discounts",
  "University Programmes",
  "Professional Training",
  "Technology Platforms",
  "Industry Publications",
  "Research Resources",
  "Business Services",
  "Career Development",
  "Exclusive Member Offers"
];

export default function ExclusiveAdvantages() {
  return (
    <section className="section section-dark">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              More Than Just <br/> <span style={{ color: 'var(--color-pastel-green)' }}>Membership</span>
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, opacity: 0.9 }}>
              Membership extends beyond networking by providing access to exclusive benefits from carefully selected partner organisations around the world.
            </p>
          </FadeIn>
        </div>

        <StaggerGrid style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
          {advantages.map((adv, i) => (
            <div key={i} className="pill-container bg-charcoal" style={{ padding: '20px 30px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '50px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-white)' }}>{adv}</span>
            </div>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
}
