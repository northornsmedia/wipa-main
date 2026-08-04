import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollProgress from "@/components/animations/ScrollProgress";
import Preloader from "@/components/animations/Preloader";
import DisableImageContextMenu from "@/components/DisableImageContextMenu";
import Analytics from "@/components/Analytics";
import SchemaBreadcrumbs from "@/components/SchemaBreadcrumbs";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.womensipalliance.com"),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "WIPA | Women's IP Alliance",
    template: "%s | WIPA"
  },
  description:
    "Join WIPA, the global community for women in intellectual property. Access mentorship, networking & resources. Founding memberships are open now.",
  keywords: [
    "Women's IP Alliance", "WIPA", "Women in intellectual property", "Intellectual property for women",
    "IP law for women", "Women in IP law", "Patents for women", "Women in patents",
    "Trademarks for women", "Women in trademarks", "Copyright for women", "Women in copyright",
    "IP strategy for women", "Women in IP strategy", "Patent prosecution for women",
    "WIPA founding member", "Women's IP World Annual", "IP community"
  ],
  openGraph: {
    title: "Women's IP Alliance (WIPA) | Global Community",
    description: "Join WIPA, the global community for women in intellectual property. Access mentorship, networking & resources.",
    url: "https://www.womensipalliance.com",
    siteName: "Women's IP Alliance",
    images: [
      {
        url: '/og-image.jpg', // Ensure you have an og-image in public
        width: 1200,
        height: 630,
        alt: 'WIPA - The Global Community for Women in Intellectual Property',
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Women's IP Alliance (WIPA) | Global Community",
    description: "Join WIPA, the global community for women in intellectual property.",
    images: ['/og-image.jpg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Women's IP Alliance",
              "url": "https://www.womensipalliance.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.womensipalliance.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Women's IP Alliance",
              "alternateName": "WIPA",
              "url": "https://www.womensipalliance.com/",
              "logo": "https://www.womensipalliance.com/WIPALOGO.png",
              "description": "The Women's IP Alliance is an international membership community for women across intellectual property, patents, trademarks, copyright, innovation, technology, law, academia, and entrepreneurship.",
              "sameAs": [
                "https://facebook.com/WomensIPWorld",
                "https://instagram.com/womensip",
                "https://x.com/WomensIPWorld1",
                "https://linkedin.com/company/the-women-s-ip-world-annual"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+44-203-813-0457",
                  "contactType": "customer service",
                  "areaServed": "GB"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-90545-75950",
                  "contactType": "customer service",
                  "areaServed": "IN"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <SchemaBreadcrumbs />
        <DisableImageContextMenu />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
