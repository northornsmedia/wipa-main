import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";
import FloatAnim from "./animations/FloatAnim";

const personas = [
  { title: "Legal & IP Practice", desc: "Patent Attorneys, Trademark Professionals, IP Lawyers, and Patent Engineers.", style: "bg-charcoal" },
  { title: "Tech & Innovation", desc: "Technology Professionals, Innovation Leaders, Licensing Specialists, and Researchers.", style: "bg-pastel-pink" },
  { title: "Business & Academia", desc: "Entrepreneurs, Startup Founders, Business Leaders, Academics, University Professionals, and Government Reps.", style: "bg-pastel-yellow" },
  { title: "Emerging Talent", desc: "Students, Alumni, and Future IP Professionals beginning their journey.", style: "bg-pastel-purple" },
];

export default function Audience() {
  return (
    <section id="audience" className="section section-dark">
      <div className="container">
        <div className="mobile-stack mobile-text-center" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '80px' }}>
          
          {/* Mobile Faded Background Sticker */}
          <img src="/sticker (5).png" alt="WIPA members collaboration sticker" className="desktop-hidden" style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%) rotate(15deg)', width: '300px', opacity: 0.15, zIndex: 0, objectFit: 'contain' }} />

          <FadeIn direction="right" style={{ position: 'relative', zIndex: 10 }}>
            <h2 className="heading-huge mobile-text-center">Designed for <br/><span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Every Woman</span><br/><span style={{ fontSize: '3rem', color: 'var(--text-heading)' }}>in Intellectual Property</span></h2>
            <p className="mobile-text-center" style={{ fontSize: '1.2rem', color: 'var(--text-body)', marginTop: '20px', maxWidth: '600px', lineHeight: 1.6, textAlign: 'center' }}>
              Whether you're just beginning your career or leading an international practice, the Alliance has been designed to support every stage of your professional journey.
            </p>
          </FadeIn>
          
          <div className="mobile-hidden">
            <FloatAnim delay={0.2} style={{ position: 'relative', marginTop: '40px', marginRight: '40px' }}>
              <img src="/sticker (5).png" alt="WIPA members collaboration sticker" style={{ width: '280px', objectFit: 'contain', transform: 'rotate(15deg)' }} />
            </FloatAnim>
          </div>
        </div>

        <StaggerGrid className="bento-grid">
          {personas.map((p, i) => (
            <div key={i} className={`bento-card span-2 ${p.style} mobile-text-center`} style={{ border: '1px solid var(--border-card)' }}>
              <h4 className="heading-md mobile-text-center" style={{ marginBottom: '15px', color: 'var(--text-heading)' }}>{p.title}</h4>
              <p className="mobile-text-center" style={{ fontSize: '1.1rem', color: 'var(--text-body)' }}>{p.desc}</p>
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
