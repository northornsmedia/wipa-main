export default function About() {
  return (
    <section id="about" className="section section-white" style={{ position: 'relative' }}>
      <div className="sticker" style={{ '--rot': '10deg', backgroundColor: 'var(--color-pastel-pink)', top: '10%', right: '15%' } as React.CSSProperties}>💡</div>

      <div className="container grid-2" style={{ alignItems: 'center' }}>
        <div>
          <h2 className="heading-lg" style={{ marginBottom: '30px' }}>
            More than a platform.<br/>
            A <span style={{ color: 'var(--color-accent-purple)' }}>movement.</span>
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            WIPA is a thriving global ecosystem where women in IP come together to share knowledge, find mentors, discover career opportunities, and build lifelong professional relationships.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '20px' }}>
          <div className="pill-container bg-pastel-yellow" style={{ padding: '40px 20px', textAlign: 'center', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
            <h4 className="heading-md">Patents</h4>
            <p>Filing & Strategy</p>
          </div>
          <div className="pill-container bg-pastel-purple" style={{ padding: '40px 20px', textAlign: 'center', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)', transform: 'translateY(40px)' }}>
            <h4 className="heading-md">Trademarks</h4>
            <p>Brand Protection</p>
          </div>
        </div>
      </div>
    </section>
  );
}
