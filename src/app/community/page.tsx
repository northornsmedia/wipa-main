import Navbar from "@/components/Navbar";
import Audience from "@/components/Audience";
import HowItHelps from "@/components/HowItHelps";
import MembershipJourney from "@/components/MembershipJourney";
import ExclusiveAdvantages from "@/components/ExclusiveAdvantages";
import Leadership from "@/components/Leadership";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | WIPA",
  description: "Join the Women's IP Alliance community. Discover our values, global leadership, and professional journey support.",
};

export default function CommunityPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 10, backgroundColor: 'var(--color-charcoal)' }}>
        <Audience />
        <HowItHelps />
        <MembershipJourney />
        <ExclusiveAdvantages />
        <Leadership />
      </div>
      <Footer />
    </main>
  );
}
