import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Values from '@/components/Values';
import Foundation from '@/components/Foundation';

export const metadata: Metadata = {
  title: 'Community | WIPA',
  description: 'Join the Women\'s IP Alliance community. Discover our values and international legacy.',
};

export default function CommunityPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 10, backgroundColor: 'var(--color-charcoal)' }}>
        <Values />
        <Foundation />
      </div>
      <Footer />
    </main>
  );
}
