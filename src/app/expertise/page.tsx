import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";
import StaggerGrid from "@/components/animations/StaggerGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Areas of Expertise | Women's IP Alliance",
  description: "Explore the core topics, practice areas, and professional domains covered by the Women's IP Alliance, from Patents and Trademarks to IP Strategy.",
};

const expertiseCategories = [
  {
    title: "Intellectual Property & Law",
    keywords: [
      "intellectual property", "intellectual property for women", "women in intellectual property", 
      "best intellectual property community", "IP law", "IP law for women", "women in IP law", 
      "IP rights", "IP rights for women", "women in IP rights"
    ]
  },
  {
    title: "Patents & Prosecution",
    keywords: [
      "patents", "patents for women", "women in patents", "best patents community",
      "patent law", "patent law for women", "women in patent law",
      "patent prosecution", "patent prosecution for women", "women in patent prosecution"
    ]
  },
  {
    title: "Trademarks & Copyright",
    keywords: [
      "trademarks", "trademarks for women", "women in trademarks", "best trademarks community",
      "trademark law", "trademark law for women", "women in trademark law",
      "copyright", "copyright for women", "women in copyright", "copyright law"
    ]
  },
  {
    title: "Strategy & Management",
    keywords: [
      "IP strategy", "IP strategy for women", "women in IP strategy",
      "IP portfolio management", "IP portfolio management for women", "women in IP portfolio management"
    ]
  },
  {
    title: "Career & Mentorship",
    keywords: [
      "intellectual property networking", "intellectual property career advice", "intellectual property mentorship",
      "IP law networking", "IP law career advice", "IP law mentorship",
      "patents networking", "patents career advice", "patents mentorship",
      "trademarks networking", "trademarks mentorship", "copyright networking"
    ]
  }
];

export default function ExpertisePage() {
  return (
    <main style={{ backgroundColor: 'var(--color-white)', minHeight: '100vh' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
        <div className="container">
          <FadeIn direction="up">
            <h1 className="heading-huge" style={{ marginBottom: '20px' }}>Areas of Expertise</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', marginBottom: '60px', lineHeight: 1.6 }}>
              The Women's IP Alliance encompasses a broad spectrum of disciplines within the intellectual property ecosystem. Our community supports professionals across these specialized domains, providing networking, mentorship, and career acceleration.
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {expertiseCategories.map((category, index) => (
              <FadeIn key={index} direction="up" delay={0.1 * index}>
                <div style={{ padding: '30px', backgroundColor: 'var(--color-pastel-purple)', borderRadius: '24px', border: '2px solid var(--color-black)', boxShadow: '8px 8px 0px var(--color-black)', height: '100%' }}>
                  <h2 className="heading-md" style={{ marginBottom: '20px' }}>{category.title}</h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {category.keywords.map((keyword, kIndex) => (
                      <li key={kIndex} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '1.05rem', fontWeight: 500 }}>
                        <span style={{ color: 'var(--color-primary)', marginRight: '10px' }}>✦</span>
                        <span style={{ textTransform: 'capitalize' }}>{keyword}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
