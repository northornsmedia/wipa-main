import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";
import FloatAnim from "./animations/FloatAnim";

const personas = [
  { title: "Legal & IP Practice", desc: "Patent Attorneys, Trademark Professionals, IP Lawyers, In-house Counsel, and Patent Engineers.", style: "bg-charcoal" },
  { title: "Tech & Innovation", desc: "Technology Professionals, Innovation Leaders, Licensing Specialists, and Researchers.", style: "bg-pastel-pink" },
  { title: "Business & Academia", desc: "Entrepreneurs, Startup Founders, Business Leaders, Academics, University Professionals, and Government Reps.", style: "bg-pastel-yellow" },
  { title: "Emerging Talent", desc: "Students, Alumni, and Future IP Professionals beginning their journey.", style: "bg-pastel-purple" },
];

export default function Audience() {
  return (
    <section id="audience" className="section section-dark">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '80px' }}>
          <FadeIn direction="right">
            <h2 className="heading-huge">Designed for <br/><span style={{ color: 'var(--color-pastel-pink)' }}>Every Woman</span><br/><span style={{ fontSize: '3rem' }}>in Intellectual Property</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginTop: '20px', maxWidth: '600px', lineHeight: 1.6 }}>
              Whether you're just beginning your career or leading an international practice, the Alliance has been designed to support every stage of your professional journey.
            </p>
          </FadeIn>
          <FloatAnim delay={0.2} style={{ position: 'relative', marginTop: '40px', marginRight: '40px' }}>
            <img src="/sticker (5).png" alt="Sticker" style={{ width: '280px', objectFit: 'contain', transform: 'rotate(15deg)' }} />
          </FloatAnim>
        </div>

        <StaggerGrid className="bento-grid">
          {personas.map((p, i) => (
            <div key={i} className={`bento-card span-2 ${p.style}`} style={{ border: p.style === 'bg-charcoal' ? '2px solid rgba(255,255,255,0.2)' : '2px solid var(--color-black)' }}>
              <h4 className="heading-md" style={{ marginBottom: '15px' }}>{p.title}</h4>
              <p style={{ fontSize: '1.1rem', opacity: p.style === 'bg-charcoal' ? 0.8 : 1 }}>{p.desc}</p>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
