import FadeIn from "./animations/FadeIn";
import StaggerGrid from "./animations/StaggerGrid";
import TiltCard from "./animations/TiltCard";

const benefits = [
  { title: "Global Network", desc: "Join accomplished professionals spanning multiple jurisdictions.", style: "bg-pastel-pink" },
  { title: "Exclusive Networking Events", desc: "Attend member-only virtual and face-to-face networking events.", style: "bg-pastel-yellow" },
  { title: "Educational Webinars", desc: "Learn directly from internationally recognised industry experts.", style: "bg-pastel-purple" },
  { title: "Mentorship Frameworks", desc: "Support your career through structured mentoring programmes.", style: "bg-pastel-green" },
  { title: "Cross-border Collaboration", desc: "Develop trusted international relationships and referral opportunities.", style: "bg-charcoal" },
  { title: "Professional Visibility", desc: "Increase your profile through interviews, spotlights, publications, and podcasts.", style: "bg-pastel-pink" },
  { title: "Leadership Development", desc: "Build the confidence and skills to become tomorrow's industry leaders.", style: "bg-pastel-yellow" },
  { title: "Speaking Opportunities", desc: "Receive introductions and recommendations for conferences and events.", style: "bg-pastel-purple" },
  { title: "Exclusive Resources", desc: "Access member-only reports, white papers, guides, and industry insights.", style: "bg-pastel-green" },
  { title: "Conference Discounts", desc: "Benefit from preferential rates with selected global conferences.", style: "bg-charcoal" },
  { title: "Partner Offers", desc: "Enjoy exclusive member discounts from carefully selected organisations.", style: "bg-pastel-pink" },
  { title: "Awards & Recognition", desc: "Access future recognition programmes and leadership initiatives.", style: "bg-pastel-yellow" },
];

export default function MemberBenefits() {
  return (
    <section className="section section-dark">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              Membership That Works <span style={{ background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Beyond Conferences</span>
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6, color: 'var(--text-body)', textAlign: 'center' }}>
              Membership provides continuous opportunities to learn, connect, collaborate, and grow through an extensive range of exclusive benefits designed specifically for women working across intellectual property.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="marquee-container" style={{ padding: '10px 0 50px' }}>
        <div className="marquee-content" style={{ animationDuration: '40s', gap: '24px' }}>
          {[...benefits, ...benefits].map((b, i) => (
            <TiltCard key={i} className={`pill-container ${b.style}`} style={{ width: '280px', flexShrink: 0, padding: '25px 35px', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)' }}>
              <h4 className="heading-md" style={{ textAlign: 'center', marginBottom: '15px', fontSize: '1.25rem', color: 'var(--text-heading)' }}>{b.title}</h4>
              <p style={{ textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-body)' }}>{b.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>

    </section>
  );
}
