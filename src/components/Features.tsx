import StaggerGrid from "./animations/StaggerGrid";
import FadeIn from "./animations/FadeIn";
import TiltCard from "./animations/TiltCard";
import FloatAnim from "./animations/FloatAnim";

const features = [
  { title: "Social Feed", desc: "A dynamic, real-time social feed. LinkedIn, but built for IP.", style: "bg-pastel-purple span-2 row-span-2", img: "/images/social_feed_mockup_1785398662862.png" },
  { title: "Direct Messaging", desc: "Fully real-time private messaging.", style: "bg-pastel-yellow span-2", img: "/images/messaging_mockup_1785398592482.png" },
  { title: "Members Directory", desc: "Find a patent counsel in Tokyo or trademark specialist in NY.", style: "bg-charcoal span-2", img: "/images/directory_mockup_1785398601914.png" },
  { title: "Networking", desc: "Send connection requests and build your circle.", style: "bg-pastel-green span-2", img: "/images/networking_mockup_1785398611398.png" },
  { title: "Mentorship", desc: "Connect experienced IP pros with emerging talent.", style: "bg-pastel-pink span-2", img: "/images/mentorship_mockup_1785398688205.png" },
  { title: "Job Board", desc: "Discover career opportunities for IP professionals.", style: "bg-pastel-yellow span-2 row-span-2", img: "/images/job_board_mockup_1785398621354.png" },
  { title: "Events & Confs", desc: "Virtual webinars, panels, and networking mixers.", style: "bg-charcoal span-2", img: "/images/events_mockup_1785398631503.png" },
  { title: "Pro Profiles", desc: "Showcase your role, experience, education, and projects.", style: "bg-pastel-purple span-2" },
];

export default function Features() {
  return (
    <section id="features" className="section section-dark">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
          <FadeIn direction="left">
            <h2 className="heading-huge">Interactive<br/>Features</h2>
          </FadeIn>
          <FloatAnim delay={0.5} className="sticker" style={{ '--rot': '-20deg', position: 'relative', backgroundColor: 'var(--color-pastel-green)', color: 'var(--color-black)' } as React.CSSProperties}>🚀</FloatAnim>
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
