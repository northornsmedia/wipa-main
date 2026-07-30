export default function WhyWipa() {
  return (
    <section className="section section-white" style={{ borderBottom: 'none' }}>
      <div className="container">
        <h2 className="heading-huge" style={{ textAlign: 'center', marginBottom: '80px' }}>
          Closing the <br/>
          <span style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '0 20px' }}>Gender Gap</span>
        </h2>

        <div className="bento-grid">
          <div className="bento-card span-2 bg-pastel-pink">
            <h3 className="heading-md" style={{ marginBottom: '15px' }}>Patent Filings</h3>
            <p style={{ fontSize: '1.1rem' }}>Women remain underrepresented in patent filings and prosecution roles globally.</p>
          </div>
          <div className="bento-card span-2 bg-pastel-green">
            <h3 className="heading-md" style={{ marginBottom: '15px' }}>Partnership Roles</h3>
            <p style={{ fontSize: '1.1rem' }}>IP partnership roles at major law firms still have a significant gender imbalance.</p>
          </div>
          <div className="bento-card span-2 bg-charcoal">
            <h3 className="heading-md" style={{ marginBottom: '15px' }}>Deep Tech Founders</h3>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>Startup founder positions in deep tech are overwhelmingly held by men.</p>
          </div>
          <div className="bento-card span-2 bg-pastel-yellow">
            <h3 className="heading-md" style={{ marginBottom: '15px' }}>IP Leadership</h3>
            <p style={{ fontSize: '1.1rem' }}>Leadership positions in IP organizations and standards bodies lack gender parity.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
