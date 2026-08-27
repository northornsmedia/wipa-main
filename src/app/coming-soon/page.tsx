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
    <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <section style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '120px 20px', position: 'relative', zIndex: 10, backgroundColor: 'var(--bg-primary)' }}>
        
        <FadeIn direction="up" delay={0.1}>
          <div style={{ 
            backgroundColor: 'var(--bg-card)', 
            border: '1px solid var(--border-card)',
            borderRadius: '40px',
            padding: '80px 40px',
            maxWidth: '900px',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'var(--shadow-card)'
          }}>
            
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: 'var(--text-heading)', border: '1px solid rgba(236, 72, 153, 0.35)', padding: '8px 24px', borderRadius: '30px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '30px', letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)' }}>
              Under Construction
            </div>

            <div style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', width: '100%', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(90deg, #ff3b5c 0%, #f97316 38%, #d946ef 75%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Coming <br/> Soon
            </div>
            
            <p style={{ fontSize: '1.3rem', color: 'var(--text-body)', marginBottom: '50px', lineHeight: 1.6, fontWeight: 500, maxWidth: '600px' }}>
              We're crafting an exceptional experience. This section is currently in development, but you can secure your spot in the Alliance today.
            </p>
            
            <Link href="/waiting-list" style={{ textDecoration: 'none' }}>
              <button 
                className="btn btn-accent"
                style={{ 
                  padding: '20px 45px', 
                  fontSize: '1.2rem', 
                  borderRadius: '50px', 
                  fontWeight: 900, 
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                JOIN THE WAITING LIST NOW
              </button>
            </Link>

          </div>
        </FadeIn>
        
      </section>
      
      <Footer />
    </main>
  );
}
