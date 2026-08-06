import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";

export const metadata = {
  title: 'Coming Soon | Women\'s IP Alliance',
  description: 'This feature is coming soon.',
};

export default function ComingSoonPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-white)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <section style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '120px 20px', position: 'relative', zIndex: 10, backgroundColor: 'var(--color-pastel-yellow)', backgroundImage: 'radial-gradient(var(--color-black) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        
        <FadeIn direction="up" delay={0.1}>
          <div style={{ 
            backgroundColor: 'var(--color-white)', 
            border: '3px solid var(--color-black)',
            borderRadius: '40px',
            padding: '80px 40px',
            maxWidth: '900px',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            
            <div style={{ display: 'inline-block', backgroundColor: 'var(--color-pastel-pink)', color: 'var(--color-black)', padding: '8px 24px', borderRadius: '30px', fontWeight: 900, fontSize: '1rem', marginBottom: '30px', letterSpacing: '1px', textTransform: 'uppercase', border: '2px solid var(--color-black)', boxShadow: '4px 4px 0px var(--color-black)' }}>
              Under Construction
            </div>

            <div style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', width: '100%', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px', color: 'var(--color-black)' }}>
              Coming <br/> Soon
            </div>
            
            <p style={{ fontSize: '1.3rem', color: 'var(--color-charcoal)', marginBottom: '50px', lineHeight: 1.6, fontWeight: 500, maxWidth: '600px' }}>
              We're crafting an exceptional experience. This section is currently in development, but you can secure your spot in the Alliance today.
            </p>
            
            <Link href="/waiting-list" style={{ textDecoration: 'none' }}>
              <button 
                className="btn-wipa"
                style={{ 
                  backgroundColor: 'var(--color-pastel-green)',
                  color: 'var(--color-black)',
                  padding: '20px 45px', 
                  fontSize: '1.2rem', 
                  borderRadius: '50px', 
                  fontWeight: 900, 
                  cursor: 'pointer',
                  border: '3px solid var(--color-black)',
                  boxShadow: '6px 6px 0px var(--color-black)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Join the Waiting List
              </button>
            </Link>

          </div>
        </FadeIn>
        
      </section>
      
      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        .btn-wipa:hover {
          transform: translate(-4px, -4px);
          box-shadow: 10px 10px 0px var(--color-black) !important;
        }
        .btn-wipa:active {
          transform: translate(4px, 4px);
          box-shadow: 2px 2px 0px var(--color-black) !important;
        }
      `}} />
    </main>
  );
}
