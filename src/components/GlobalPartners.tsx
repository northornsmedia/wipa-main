import FadeIn from "./animations/FadeIn";
import InfiniteMarquee from "./animations/InfiniteMarquee";

export default function GlobalPartners() {
  return (
    <section className="section section-white" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <FadeIn direction="up">
            <h2 className="heading-huge" style={{ marginBottom: '30px' }}>
              Alliance <br/> <span style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '0 20px' }}>Supporting Partners</span>
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              The Women's IP World Alliance proudly collaborates with conferences, universities, technology providers, professional organisations, and industry partners committed to supporting women across intellectual property.
            </p>
          </FadeIn>
        </div>

      </div>
      
      {/* Partner Logos Marquee (Placeholders) */}
      <div style={{ padding: '40px 0', borderTop: '2px solid var(--color-black)', borderBottom: '2px solid var(--color-black)', backgroundColor: 'var(--color-white)', marginTop: '40px' }}>
         <InfiniteMarquee text="Partner Logo 1 • Partner Logo 2 • Partner Logo 3 • Partner Logo 4 • Partner Logo 5" />
      </div>

    </section>
  );
}
