import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";
import TiltCard from "./animations/TiltCard";
import FloatAnim from "./animations/FloatAnim";

const features = [
  { title: "Community Feed", desc: "Access the Community Feed and Discussion Forums.", style: "bg-pastel-purple span-2 row-span-2", img: "/images/social_feed_mockup_1785398662862.png" },
  { title: "Direct Messaging", desc: "Fully real-time Direct Messaging & Networking Groups.", style: "bg-pastel-yellow span-2", img: "/chat.png" },
  { title: "Global Directory", desc: "Professional Profiles and the Global Member Directory.", style: "bg-charcoal span-2", img: "/images/directory_mockup_1785398601914.png" },
  { title: "Mentorship Hub", desc: "Access the Mentorship Hub and Business Opportunities.", style: "bg-pastel-green span-2", img: "/images/networking_mockup_1785398611398.png" },
  { title: "Resource Library", desc: "Explore the Resource Library with Future AI-Powered Search.", style: "bg-pastel-pink span-2", img: "/images/mentorship_mockup_1785398688205.png" },
  { title: "Job Board", desc: "Discover career opportunities and Member Notifications.", style: "bg-pastel-yellow span-2 row-span-2", img: "/jobs-board.png" },
  { title: "Events & Webinars", desc: "Access the Events Calendar and Webinar Centre.", style: "bg-charcoal span-2", img: "/events.png" },
  { title: "Mobile Access", desc: "Stay connected wherever you are in the world.", style: "bg-pastel-purple span-2" },
];

export default function Features() {
  return (
    <section id="features" className="section section-dark">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '80px', position: 'relative' }}>
          <FadeIn direction="left">
            <h2 className="heading-huge">Your Community.<br/><span style={{ color: 'var(--color-pastel-pink)' }}>Connected</span> All Year Round.</h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginTop: '20px', maxWidth: '700px', lineHeight: 1.6 }}>
              Designed exclusively for Alliance members, our digital platform keeps you connected wherever you are in the world, making networking, collaboration, learning, and professional development accessible throughout the year.
            </p>
          </FadeIn>
          <div style={{ position: 'absolute', bottom: '-20px', right: '-5%', zIndex: 5 }}>
            <img src="/sticker (6).png" alt="Sticker" style={{ width: '220px', objectFit: 'contain', transform: 'rotate(-10deg)' }} />
          </div>
        </div>

        <StaggerGrid className="bento-grid">
          {features.map((f, i) => (
            <TiltCard key={i} className={`bento-card ${f.style}`} style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 className="heading-md" style={{ marginBottom: '15px' }}>{f.title}</h3>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{f.desc}</p>
              </div>
              {f.img && (
                <div style={{ marginTop: '25px', flexGrow: 1, borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--color-black)', minHeight: '140px', position: 'relative' }}>
                  <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                </div>
              )}
            </TiltCard>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
