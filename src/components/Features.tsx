import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";
import TiltCard from "./animations/TiltCard";
import FloatAnim from "./animations/FloatAnim";

const features = [
  { title: "Community Feed", desc: "Access the Community Feed and Discussion Forums.", hoverDetails: "Post about your latest achievements, share news, and stay updated on what members worldwide are up to.", style: "bg-pastel-purple span-2 row-span-2", img: "/images/social_feed_mockup_1785398662862.png" },
  { title: "Direct Messaging", desc: "Fully real-time Direct Messaging & Networking Groups.", hoverDetails: "Connect instantly with IP professionals worldwide. Build your inner circle and forge meaningful partnerships.", style: "bg-pastel-yellow span-2", img: "/chat.png" },
  { title: "Global Directory", desc: "Professional Profiles and the Global Member Directory.", hoverDetails: "Search and discover experts by specialty, location, or industry. Your next big collaboration starts here.", style: "bg-charcoal span-2", img: "/images/directory_mockup_1785398601914.png" },
  { title: "Mentorship Hub", desc: "Access the Mentorship Hub and Business Opportunities.", hoverDetails: "Accelerate your career through guided pairings. Learn from industry veterans or share your own expertise.", style: "bg-pastel-green span-2", img: "/images/networking_mockup_1785398611398.png" },
  { title: "Resource Library", desc: "Explore the Resource Library with Future AI-Powered Search.", hoverDetails: "Access exclusive templates, legal updates, and research papers powered by an intelligent search engine.", style: "bg-pastel-pink span-2", img: "/images/mentorship_mockup_1785398688205.png" },
  { title: "Job Board", desc: "Discover career opportunities and Member Notifications.", hoverDetails: "Find top-tier opportunities in patents, trademarks, and copyright, or recruit the brightest minds in IP.", style: "bg-pastel-yellow span-2 row-span-2", img: "/jobs-board.png" },
  { title: "Events & Webinars", desc: "Access the Events Calendar and Webinar Centre.", hoverDetails: "RSVP to exclusive roundtables, masterclasses, and local chapter meetups directly from your dashboard.", style: "bg-charcoal span-2", img: "/events.png" },
  { title: "Mobile Access", desc: "Stay connected wherever you are in the world.", hoverDetails: "Take the entire WIPA network with you. Seamlessly connect on iOS and Android devices.", style: "bg-pastel-purple span-2" },
];

export default function Features() {
  return (
    <section id="features" className="section section-dark">
      <style dangerouslySetInnerHTML={{__html: `
        .feature-card {
          position: relative;
        }
        .feature-card-hover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 30px;
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          backdrop-filter: blur(4px);
          z-index: 10;
        }
        .feature-card:hover .feature-card-hover {
          opacity: 1;
        }
      `}} />
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '80px', position: 'relative' }}>
          <FadeIn direction="left">
            <h2 className="heading-huge">Your Community.<br/><span style={{ color: 'var(--color-pastel-pink)' }}>Connected</span> All Year Round.</h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginTop: '20px', maxWidth: '700px', lineHeight: 1.6 }}>
              Designed exclusively for Alliance members, our digital platform keeps you connected wherever you are in the world, making networking, collaboration, learning, and professional development accessible throughout the year.
            </p>
          </FadeIn>
          <div style={{ position: 'absolute', bottom: '-20px', right: '-5%', zIndex: 5 }}>
            <img src="/sticker (6).png" alt="WIPA leadership and learning sticker" style={{ width: '220px', objectFit: 'contain', transform: 'rotate(-10deg)' }} />
          </div>
        </div>

        <StaggerGrid className="bento-grid">
          {features.map((f, i) => (
            <TiltCard key={i} className={`bento-card ${f.style} feature-card`} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ zIndex: 2, position: 'relative' }}>
                <h3 className="heading-md" style={{ marginBottom: '15px' }}>{f.title}</h3>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{f.desc}</p>
              </div>
              {f.img && (
                <div style={{ marginTop: '25px', flexGrow: 1, borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--color-black)', minHeight: '140px', position: 'relative', zIndex: 1 }}>
                  <img src={f.img} alt={`Women's IP Alliance feature: ${f.title}`} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                </div>
              )}
              
              <div className="feature-card-hover">
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 500 }}>
                  {f.hoverDetails}
                </p>
              </div>
            </TiltCard>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
