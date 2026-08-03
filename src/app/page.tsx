import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfiniteMarquee from "@/components/animations/InfiniteMarquee";
import About from "@/components/About";
import Foundation from "@/components/Foundation";
import Audience from "@/components/Audience";
import MemberBenefits from "@/components/MemberBenefits";
import WhyWipa from "@/components/WhyWipa";
import Features from "@/components/Features";
import HowItHelps from "@/components/HowItHelps";
import Values from "@/components/Values";
import MembershipJourney from "@/components/MembershipJourney";
import Membership from "@/components/Membership";
import ExclusiveAdvantages from "@/components/ExclusiveAdvantages";
import Leadership from "@/components/Leadership";
import EventsLearning from "@/components/EventsLearning";
import FAQ from "@/components/FAQ";
import CommunityImpact from "@/components/CommunityImpact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-charcoal)' }}>
        <InfiniteMarquee text="PATENTS • TRADEMARKS • COPYRIGHT • INNOVATION" />
        <About />
        <Foundation />
        <Audience />
        <MemberBenefits />
        <WhyWipa />
        <Features />
        <HowItHelps />
        <Values />
        <MembershipJourney />
        <Membership />
        <ExclusiveAdvantages />
        <Leadership />
        <EventsLearning />
        <FAQ />
        <CommunityImpact />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
