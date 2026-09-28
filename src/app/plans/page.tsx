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
    limit: "Exclusive Founding Member rate available for our inaugural launch.",
    desc: "For lawyers, patent attorneys, trade mark attorneys, IP practitioners, consultants, and other intellectual property professionals.", 
    standardPrice: "Standard Membership Rate: £695/year",
    style: "bg-pastel-green"
  },
  { 
    name: "Entrepreneur\nMembership\n(for Start Ups only)",
    price: "£295",
    monthlyPrice: "£42",
    limit: "Exclusive Founding Member rate available for our inaugural launch.",
    desc: "Open to law firms and IP businesses incorporated or registered within the past 24 months.",
    standardPrice: "Standard Membership Rate: £495/year",
    style: "bg-pastel-purple"
  },
  { 
    name: "Student\nMembership", 
    price: "£99",
    monthlyPrice: "£12",
    limit: "Exclusive Founding Member rate available for our inaugural launch.",
    desc: "For students, graduates, researchers, and early-career professionals pursuing careers in intellectual property, innovation, law, technology, or related disciplines.", 
    standardPrice: "Standard Membership Rate: £149/year",
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
    limit: "Complimentary First-Year Membership for Inaugural Founding In-House Counsel Members Worldwide",
    desc: "For women leading intellectual property within corporate legal departments, The Women's IP Alliance connects you with a global community of trusted peers, industry leaders, and IP experts.", 
    standardPrice: "Standard Membership & Annual Renewal: £99/year",
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
