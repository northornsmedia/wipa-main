import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlansPageContent from "@/components/PlansPageContent";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Membership Plans',
  description: 'Join WIPA with our flexible membership plans tailored for IP Professionals, Entrepreneurs, and Students. Exclusive benefits and networking opportunities await.',
};

const plans = [
  { 
    name: "IP Professional\nMembership", 
    price: "£395",
    monthlyPrice: "£50",
    limit: "Rate-limited for the first 300 founding members worldwide",
    desc: "For lawyers, patent attorneys, trade mark attorneys, IP practitioners, consultants, and other intellectual property professionals.", 
    standardPrice: "Standard Membership Rate: £695/year (effective once all 300 Founding Membership places have been secured).",
    style: "bg-pastel-green"
  },
  { 
    name: "Entrepreneur\nMembership\n(for Start Ups only)",
    price: "£295",
    monthlyPrice: "£42",
    limit: "Rate-limited for the first 200 Startup Founding members worldwide",
    desc: "Open to law firms and IP businesses incorporated or registered within the past 24 months.",
    standardPrice: "Standard Membership Rate: £495/year (effective once all 200 Founding Membership places have been secured).",
    style: "bg-pastel-purple"
  },
  { 
    name: "Student\nMembership", 
    price: "£99",
    monthlyPrice: "£12",
    limit: "Rate-limited for the first 200 founding members worldwide",
    desc: "For students, graduates, researchers, and early-career professionals pursuing careers in intellectual property, innovation, law, technology, or related disciplines.", 
    standardPrice: "Standard Membership Rate: £149/year (effective once all 200 Founding Membership places have been secured).",
    style: "bg-pastel-pink"
  },
  { 
    name: "Enterprise\nMembership", 
    subtitle: "(IP Professional Teams)",
    price: "£1,745",
    monthlyPrice: "£175",
    hideLimitOnMonthly: true,
    hideOnMonthly: true,
    limit: "5 Founding Memberships at £349/per membership + 1 FREE Membership – An Exclusive Saving of £625",
    desc: "Perfect for law firms, corporate IP departments, universities, innovation teams, and organisations looking to provide membership benefits to multiple professionals while securing Founding Member status for their team.", 
    standardPrice: "Standard Price After Launch: £2,780/year",
    style: "bg-pastel-yellow"
  },
  { 
    name: "In-House Counsel\nMembership", 
    price: "FREE",
    monthlyPrice: "FREE",
    limit: "COMPLIMENTARY FOR THE FIRST YEAR FOR THE FIRST 200 FOUNDING IN-HOUSE COUNSEL MEMBERS WORLDWIDE",
    desc: "For women leading intellectual property within corporate legal departments, The Women's IP Alliance connects you with a global community of trusted peers, industry leaders, and IP experts.", 
    standardPrice: "Standard Membership & Annual Renewal: £99/year (Effective once all 200 Founding In-House Counsel Membership places have been allocated.)",
    style: "bg-pastel-orange"
  },
];

export default function PlansPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-charcoal)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "IP Professional Membership",
              "description": "For lawyers, patent attorneys, trade mark attorneys, and IP practitioners.",
              "offers": {
                "@type": "Offer",
                "price": "395.00",
                "priceCurrency": "GBP",
                "availability": "https://schema.org/InStock"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Student Membership",
              "description": "For full-time or part-time students exploring a career in intellectual property.",
              "offers": {
                "@type": "Offer",
                "price": "120.00",
                "priceCurrency": "GBP",
                "availability": "https://schema.org/InStock"
              }
            }
          ])
        }}
      />
      <Navbar />
      <PlansPageContent plans={plans} />
      <Footer />
    </main>
  );
}
