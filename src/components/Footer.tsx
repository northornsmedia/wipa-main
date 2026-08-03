import Link from "next/link";
import DoodleSocials from "./DoodleSocials";

export default function Footer() {
  return (
    <footer className="section-white" style={{ padding: '100px 0 40px', borderBottom: 'none' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '80px' }}>
        
        {/* Logo & About */}
        <div>
          <Link href="/" style={{ display: 'block', marginBottom: '20px' }}>
            <img src="/WIPALOGO.png" alt="WIPA Logo" style={{ height: '60px', width: 'auto' }} />
          </Link>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>
            Women's IP Alliance — Empowering women in Patents, Trademarks, Copyright, and Innovation.
          </p>
          <div style={{ marginTop: '20px', fontWeight: 600 }}>
            <a href="mailto:info@northonsprmarketing.com" style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>info@northonsprmarketing.com</a>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <h4 style={{ marginBottom: '24px', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: 0 }}>
              <li><Link href="#features" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Social Feed</Link></li>
              <li><Link href="#features" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Members Directory</Link></li>
              <li><Link href="#features" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Job Board</Link></li>
              <li><Link href="#features" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Mentorship</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Support</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: 0 }}>
              <li><Link href="#" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Help Center</Link></li>
              <li><Link href="#" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Contact Us</Link></li>
              <li><Link href="#" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* UK Office */}
        <div>
          <h4 style={{ marginBottom: '24px', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>United Kingdom Office</h4>
          <address style={{ fontStyle: 'normal', fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9 }}>
            60 Castle Street, Dover,<br/>
            CT16 1PJ, United Kingdom<br/><br/>
            <a href="tel:+4402038130457" style={{ fontWeight: 600 }}>+ 44 (0)203-813-0457</a>
          </address>
        </div>

        {/* India Office */}
        <div>
          <h4 style={{ marginBottom: '24px', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>India Office</h4>
          <address style={{ fontStyle: 'normal', fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9 }}>
            E-606, Prahlad Nagar Trade Center (PNTC),<br/>
            Times Of India Press Rd, Satellite, Shyamal,<br/>
            Ahmedabad, Gujarat, India, 380015<br/><br/>
            <a href="tel:+919054575950" style={{ fontWeight: 600 }}>+ 91 90545 75950</a>
          </address>
        </div>

      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--color-black)', paddingTop: '40px', fontSize: '1rem', fontWeight: 600 }}>
        <span>© 2026 WIPA. All rights reserved.</span>
        <DoodleSocials />
        <span>Built for women in IP.</span>
      </div>
    </footer>
  );
}
