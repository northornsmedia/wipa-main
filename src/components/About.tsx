import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="section section-white" style={{ position: 'relative' }}>
      <div className="sticker" style={{ '--rot': '10deg', backgroundColor: 'var(--color-pastel-pink)', top: '10%', right: '15%' } as React.CSSProperties}>💡</div>

      <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="heading-lg" style={{ marginBottom: '30px' }}>
          More Than a Membership.<br/>
          A Global Community Built for Women in <span style={{ color: 'var(--color-accent-purple)' }}>Intellectual Property.</span>
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', lineHeight: 1.6 }}>
          Women have long played a vital role in shaping innovation, protecting brands, advancing technology, and driving the future of intellectual property. Yet opportunities to build lasting international relationships, exchange expertise, and collaborate beyond conferences remain limited. The Women's IP Alliance has been created to bridge that gap.
        </p>
        <Link href="/about" className="btn btn-accent">
          Discover Our Mission
        </Link>
      </div>
    </section>
  );
}
