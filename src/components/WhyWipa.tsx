export default function WhyWipa() {
  return (
    <section className="section section-white" style={{ borderBottom: 'none' }}>
      <div className="container">
        <h2 className="heading-huge" style={{ textAlign: 'center', marginBottom: '30px' }}>
          Become a <br/>
          <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', padding: '0 10px' }}>Founding Member</span>
        </h2>
        
        <p style={{ textAlign: 'center', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 60px auto', lineHeight: 1.6, color: 'var(--text-body)' }}>
          The launch of the Women's IP Alliance represents a unique opportunity to become part of something from the very beginning. As a Founding Member, you will not simply join a community—you will help shape it. You'll receive exclusive launch benefits, gain early access to the platform, and be recognised as one of the professionals who supported the creation of an international community dedicated to advancing women across intellectual property.
        </p>

        <div className="bento-grid">
          <div className="bento-card span-2 bg-pastel-pink">
            <h3 className="heading-md" style={{ marginBottom: '15px' }}>Exclusive Pricing</h3>
            <ul style={{ fontSize: '1.1rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Exclusive introductory membership pricing</li>
              <li>Membership renewal on the same rate</li>
            </ul>
          </div>
          <div className="bento-card span-2 bg-pastel-green">
            <h3 className="heading-md" style={{ marginBottom: '15px' }}>Priority Access</h3>
            <ul style={{ fontSize: '1.1rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Priority access to the digital platform</li>
              <li>Early invitations to platform demonstrations</li>
            </ul>
          </div>
          <div className="bento-card span-2 bg-charcoal">
            <h3 className="heading-md" style={{ marginBottom: '15px' }}>Shape the Future</h3>
            <ul style={{ fontSize: '1.1rem', color: 'var(--text-body)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Opportunity to help shape future initiatives</li>
              <li>Official Founding Member recognition</li>
            </ul>
          </div>
          <div className="bento-card span-2 bg-pastel-yellow">
            <h3 className="heading-md" style={{ marginBottom: '15px' }}>Exclusive Content</h3>
            <ul style={{ fontSize: '1.1rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Early access to educational programmes</li>
              <li>Exclusive launch announcements</li>
              <li>Limited availability</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
