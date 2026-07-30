import Link from "next/link";

export default function Navbar() {
  return (
    <header className="section-white" style={{ position: 'relative', zIndex: 100, padding: '20px 0' }}>
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.05em' }}>
          WIPA<span style={{ color: 'var(--color-accent-purple)' }}>*</span>
        </Link>

        <div className="nav-links" style={{ display: 'flex', gap: '3rem', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase' }}>
          <Link href="#about">About</Link>
          <Link href="#features">Platform</Link>
          <Link href="#audience">Community</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="https://wipa.vercel.app" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase' }}>Sign In</Link>
          <Link href="https://wipa.vercel.app" className="btn btn-accent" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
