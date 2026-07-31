export default function About() {
  return (
    <section id="about" className="section section-white" style={{ position: 'relative' }}>
      <div className="sticker" style={{ '--rot': '10deg', backgroundColor: 'var(--color-pastel-pink)', top: '10%', right: '15%' } as React.CSSProperties}>💡</div>

      <div className="container grid-2" style={{ alignItems: 'center' }}>
        <div>
          <h2 className="heading-lg" style={{ marginBottom: '30px' }}>
            More Than a Membership.<br/>
            A Global Community Built for Women in <span style={{ color: 'var(--color-accent-purple)' }}>Intellectual Property.</span>
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6 }}>
            Women have long played a vital role in shaping innovation, protecting brands, advancing technology, and driving the future of intellectual property. Yet opportunities to build lasting international relationships, exchange expertise, and collaborate beyond conferences remain limited.
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6 }}>
            The Women's IP Alliance has been created to bridge that gap.
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6 }}>
            Launching in 2027, the Alliance transforms an annual publication into a year-round international community where members can connect with peers, access world-class learning opportunities, develop professionally, and become part of a collaborative global network designed specifically for women in IP.
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6 }}>
            Whether you are an experienced practitioner, a rising professional, an entrepreneur, an academic, an in-house counsel, or a student beginning your journey, the Alliance provides the environment, opportunities, and connections to help you thrive.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '20px' }}>
          <div className="pill-container bg-pastel-yellow" style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
            <h4 className="heading-md">Connect</h4>
            <p style={{ marginTop: '10px' }}>Build meaningful relationships with women from around the world.</p>
          </div>
          <div className="pill-container bg-pastel-purple" style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
            <h4 className="heading-md">Collaborate</h4>
            <p style={{ marginTop: '10px' }}>Develop cross-border partnerships and referral opportunities.</p>
          </div>
          <div className="pill-container bg-pastel-green" style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
            <h4 className="heading-md">Grow</h4>
            <p style={{ marginTop: '10px' }}>Access education, mentoring, and professional development.</p>
          </div>
          <div className="pill-container bg-pastel-pink" style={{ padding: '30px 20px', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
            <h4 className="heading-md">Lead</h4>
            <p style={{ marginTop: '10px' }}>Increase your visibility and become part of the future of the profession.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
