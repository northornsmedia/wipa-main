import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfiniteMarquee from "@/components/animations/InfiniteMarquee";
import About from "@/components/About";
import WhyWipa from "@/components/WhyWipa";
import Features from "@/components/Features";
import Values from "@/components/Values";
import Audience from "@/components/Audience";
import HowItHelps from "@/components/HowItHelps";
import Membership from "@/components/Membership";
import TechStack from "@/components/TechStack";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <InfiniteMarquee text="PATENTS • TRADEMARKS • COPYRIGHT • DEEP TECH • INNOVATION" />
      <About />
      <Audience />
      <WhyWipa />
      <Features />
      <HowItHelps />
      <Values />
      <TechStack />
      <Membership />
      <CTA />
      <Footer />
    </main>
  );
}
