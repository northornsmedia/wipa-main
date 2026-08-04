import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollProgress from "@/components/animations/ScrollProgress";
import Preloader from "@/components/animations/Preloader";
import DisableImageContextMenu from "@/components/DisableImageContextMenu";
import Analytics from "@/components/Analytics";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.womensipalliance.com"),
  title: {
    default: "WIPA — Women's IP Alliance",
    template: "%s | WIPA"
  },
  description:
    "A global, empowering community to grow your network, leadership, career, patents & knowledge. Connect with women professionals in Patents, Trademarks, Copyright, and Innovation.",
  keywords: ["Women in IP", "Intellectual Property", "Patents", "Trademarks", "Law", "Innovation", "Womens IP Alliance", "WIPA", "Copyright"],
  openGraph: {
    title: "WIPA — Women's IP Alliance",
    description: "A global, empowering community to grow your network, leadership, career, patents & knowledge. Connect with women professionals in Patents, Trademarks, Copyright, and Innovation.",
    url: "https://www.womensipalliance.com",
    siteName: "Women's IP Alliance",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WIPA — Women's IP Alliance",
    description: "A global, empowering community to grow your network, leadership, career, patents & knowledge. Connect with women professionals in Patents, Trademarks, Copyright, and Innovation.",
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
              "url": "https://www.womensipalliance.com/",
              "logo": "https://www.womensipalliance.com/favicon.ico",
              "sameAs": [
                "https://www.linkedin.com/company/womensipalliance"
              ]
            })
          }}
        />
      </head>
      <body>
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
