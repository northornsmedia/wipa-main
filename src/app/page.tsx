import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfiniteMarquee from "@/components/animations/InfiniteMarquee";
import About from "@/components/About";
import MemberBenefits from "@/components/MemberBenefits";
import WhyWipa from "@/components/WhyWipa";
import Features from "@/components/Features";
import Membership from "@/components/Membership";
import EventsLearning from "@/components/EventsLearning";

import CommunityImpact from "@/components/CommunityImpact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's IP Alliance (WIPA) | Global Community",
  description: "Join WIPA, the global community for women in intellectual property. Access mentorship, networking & resources. Founding memberships are open now.",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-charcoal)' }}>
        <InfiniteMarquee images={[
          "/LOGO - ALLIANCE USE (1).png",
          "/LOGO - ALLIANCE USE (2).png",
          "/LOGO - ALLIANCE USE (8).png",
          "/LOGO - ALLIANCE USE (4).png",
          "/LOGO - ALLIANCE USE (5).png",
          "/LOGO - ALLIANCE USE (6).png",
          "/LOGO - ALLIANCE USE (7).png",
          "/LOGO - ALLIANCE USE.png"
        ]} />
        <About />
        <MemberBenefits />
        <WhyWipa />
        <Features />
        <Membership />
        <EventsLearning />

        <CommunityImpact />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
