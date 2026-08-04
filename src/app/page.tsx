import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfiniteMarquee from "@/components/animations/InfiniteMarquee";
import About from "@/components/About";
import Audience from "@/components/Audience";
import MemberBenefits from "@/components/MemberBenefits";
import WhyWipa from "@/components/WhyWipa";
import Features from "@/components/Features";
import HowItHelps from "@/components/HowItHelps";
import MembershipJourney from "@/components/MembershipJourney";
import Membership from "@/components/Membership";
import ExclusiveAdvantages from "@/components/ExclusiveAdvantages";
import Leadership from "@/components/Leadership";
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
        <InfiniteMarquee text="PATENTS • TRADEMARKS • COPYRIGHT • INNOVATION" />
        <About />
        <Audience />
        <MemberBenefits />
        <WhyWipa />
        <Features />
        <HowItHelps />
        <MembershipJourney />
        <Membership />
        <ExclusiveAdvantages />
        <Leadership />
        <EventsLearning />

        <CommunityImpact />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
