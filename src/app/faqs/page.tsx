import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { faqSchema } from "./faqData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Women's IP Alliance",
  description: "Frequently Asked Questions about the Women's IP Alliance membership, launch, events, and community features.",
};

export default function FAQsPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-white)', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <FAQ />
      </div>
      
      <Footer />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </main>
  );
}
