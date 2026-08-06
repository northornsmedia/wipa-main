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
        
        <div id="mobile-blocker" style={{ 
          display: 'none', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          backgroundColor: 'var(--color-pastel-blue, #e6f0fa)', 
          zIndex: 2147483647, 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '40px', 
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <div className="macbook">
            <div className="inner">
              <div className="screen">
                <div className="face-one">
                  <div className="camera"></div>
                  <div className="display">
                    <div className="shade"></div>
                  </div>
                  <span>MacBook Air</span>
                </div>
              </div>
              <div className="macbody">
                <div className="face-one">
                  <div className="touchpad"></div>
                  <div className="keyboard">
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key space"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                    <div className="key f"></div>
                  </div>
                </div>
                <div className="pad one"></div>
                <div className="pad two"></div>
                <div className="pad three"></div>
                <div className="pad four"></div>
              </div>
            </div>
            <div className="shadow"></div>
          </div>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 900, 
            marginBottom: '20px', 
            color: 'var(--color-black)', 
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            textShadow: '3px 3px 0px var(--color-pastel-pink)',
            letterSpacing: '-1px',
            marginTop: '20px'
          }}>
            Desktop<br/>Experience<br/>Required
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--color-charcoal)', 
            maxWidth: '340px', 
            lineHeight: 1.6, 
            fontWeight: 600,
            backgroundColor: 'var(--color-white)',
            padding: '20px',
            borderRadius: '16px',
            border: '3px solid var(--color-black)',
            boxShadow: '6px 6px 0px var(--color-black)',
            marginTop: '10px'
          }}>
            For the best experience, please open this website on your desktop or laptop.
          </p>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            #mobile-blocker {
              display: flex !important;
            }
            body {
              overflow: hidden !important;
            }
          }

          .macbook {
            width: 150px;
            height: 96px;
            position: relative;
            margin: 0 auto 60px auto;
            perspective: 500px;
          }

          .shadow {
            position: absolute;
            width: 60px;
            height: 0px;
            left: 40px;
            top: 160px;
            transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
            box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
            animation: shadow infinite 7s ease;
          }

          .inner {
            z-index: 20;
            position: absolute;
            width: 150px;
            height: 96px;
            left: 0;
            top: 0;
            transform-style: preserve-3d;
            transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
            animation: rotate infinite 7s ease;
          }

          .screen {
            width: 150px;
            height: 96px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 7px;
            background: #ddd;
            transform-style: preserve-3d;
            transform-origin: 50% 93px;
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            animation: lid-screen infinite 7s ease;
            background-image: linear-gradient(45deg, rgba(0,0,0,0.34) 0%,rgba(0,0,0,0) 100%);
            background-position: left bottom;
            background-size: 300px 300px;
            box-shadow: inset 0 3px 7px rgba(255,255,255,0.5);
          }

          .screen .logo {
            position: absolute;
            width: 20px;
            height: 24px;
            left: 50%;
            top: 50%;
            margin: -12px 0 0 -10px;
            transform: rotateY(180deg) translateZ(0.1px);
          }

          .screen .face-one {
            width: 150px;
            height: 96px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 7px;
            background: #d3d3d3;
            transform: translateZ(2px);
            background-image: linear-gradient(45deg,rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
          }

          .screen .face-one .camera {
            width: 3px;
            height: 3px;
            border-radius: 100%;
            background: #000;
            position: absolute;
            left: 50%;
            top: 4px;
            margin-left: -1.5px;
          }

          .screen .face-one .display {
            width: 130px;
            height: 74px;
            margin: 10px;
            background-color: #000;
            background-size: 100% 100%;
            border-radius: 1px;
            position: relative;
            box-shadow: inset 0 0 2px rgba(0,0,0,1);
          }

          .screen .face-one .display .shade {
            position: absolute;
            left: 0;
            top: 0;
            width: 130px;
            height: 74px;
            background: linear-gradient(-135deg, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 47%,rgba(255,255,255,0) 48%);
            animation: screen-shade infinite 7s ease;
            background-size: 300px 200px;
            background-position: 0px 0px;
          }

          .screen .face-one span {
            position: absolute;
            top: 85px;
            left: 57px;
            font-size: 6px;
            color: #666
          }

          .macbody {
            width: 150px;
            height: 96px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 7px;
            background: #cbcbcb;
            transform-style: preserve-3d;
            transform-origin: 50% bottom;
            transform: rotateX(-90deg);
            animation: lid-macbody infinite 7s ease;
            background-image: linear-gradient(45deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
          }

          .macbody .face-one {
            width: 150px;
            height: 96px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 7px;
            transform-style: preserve-3d;
            background: #dfdfdf;
            animation: lid-keyboard-area infinite 7s ease;
            transform: translateZ(-2px);
            background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
          }

          .macbody .touchpad {
            width: 40px;
            height: 31px;
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 4px;
            margin: -44px 0 0 -18px;
            background: #cdcdcd;
            background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
            box-shadow: inset 0 0 3px #888;
          }

          .macbody .keyboard {
            width: 130px;
            height: 45px;
            position: absolute;
            left: 7px;
            top: 41px;
            border-radius: 4px;
            transform-style: preserve-3d;
            background: #cdcdcd;
            background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);
            box-shadow: inset 0 0 3px #777;
            padding: 0 0 0 2px;
          }

          .keyboard .key {
            width: 6px;
            height: 6px;
            background: #444;
            float: left;
            margin: 1px;
            transform: translateZ(-2px);
            border-radius: 2px;
            box-shadow: 0 -2px 0 #222;
            animation: keys infinite 7s ease;
          }

          .key.space {
            width: 45px;
          }

          .key.f {
            height: 3px;
          }

          .macbody .pad {
            width: 5px;
            height: 5px;
            background: #333;
            border-radius: 100%;
            position: absolute;
          }

          .pad.one {
            left: 20px;
            top: 20px;
          }

          .pad.two {
            right: 20px;
            top: 20px;
          }

          .pad.three {
            right: 20px;
            bottom: 20px;
          }

          .pad.four {
            left: 20px;
            bottom: 20px;
          }

          @keyframes rotate {
            0% {
              transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
            }

            5% {
              transform: rotateX(-20deg) rotateY(-20deg) rotateZ(0deg);
            }

            20% {
              transform: rotateX(30deg) rotateY(200deg) rotateZ(0deg);
            }

            25% {
              transform: rotateX(-60deg) rotateY(150deg) rotateZ(0deg);
            }

            60% {
              transform: rotateX(-20deg) rotateY(130deg) rotateZ(0deg);
            }

            65% {
              transform: rotateX(-20deg) rotateY(120deg) rotateZ(0deg);
            }

            80% {
              transform: rotateX(-20deg) rotateY(375deg) rotateZ(0deg);
            }

            85% {
              transform: rotateX(-20deg) rotateY(357deg) rotateZ(0deg);
            }

            87% {
              transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg);
            }

            100% {
              transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg);
            }
          }

          @keyframes lid-screen {
            0% {
              transform: rotateX(0deg);
              background-position: left bottom;
            }

            5% {
              transform: rotateX(50deg);
              background-position: left bottom;
            }

            20% {
              transform: rotateX(-90deg);
              background-position: -150px top;
            }

            25% {
              transform: rotateX(15deg);
              background-position: left bottom;
            }

            30% {
              transform: rotateX(-5deg);
              background-position: right top;
            }

            38% {
              transform: rotateX(5deg);
              background-position: right top;
            }

            48% {
              transform: rotateX(0deg);
              background-position: right top;
            }

            90% {
              transform: rotateX(0deg);
              background-position: right top;
            }

            100% {
              transform: rotateX(0deg);
              background-position: right center;
            }
          }

          @keyframes lid-macbody {
            0% {
              transform: rotateX(-90deg);
            }

            50% {
              transform: rotateX(-90deg);
            }

            100% {
              transform: rotateX(-90deg);
            }
          }

          @keyframes lid-keyboard-area {
            0% {
              background-color: #dfdfdf;
            }

            50% {
              background-color: #bbb;
            }

            100% {
              background-color: #dfdfdf;
            }
          }

          @keyframes screen-shade {
            0% {
              background-position: -20px 0px;
            }

            5% {
              background-position: -40px 0px;
            }

            20% {
              background-position: 200px 0;
            }

            50% {
              background-position: -200px 0;
            }

            80% {
              background-position: 0px 0px;
            }

            85% {
              background-position: -30px 0;
            }

            90% {
              background-position: -20px 0;
            }

            100% {
              background-position: -20px 0px;
            }
          }

          @keyframes keys {
            0% {
              box-shadow: 0 -2px 0 #222;
            }

            5% {
              box-shadow: 1 -1px 0 #222;
            }

            20% {
              box-shadow: -1px 1px 0 #222;
            }

            25% {
              box-shadow: -1px 1px 0 #222;
            }

            60% {
              box-shadow: -1px 1px 0 #222;
            }

            80% {
              box-shadow: 0 -2px 0 #222;
            }

            85% {
              box-shadow: 0 -2px 0 #222;
            }

            87% {
              box-shadow: 0 -2px 0 #222;
            }

            100% {
              box-shadow: 0 -2px 0 #222;
            }
          }

          @keyframes shadow {
            0% {
              transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
              box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
            }

            5% {
              transform: rotateX(80deg) rotateY(10deg) rotateZ(0deg);
              box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
            }

            20% {
              transform: rotateX(30deg) rotateY(-20deg) rotateZ(-20deg);
              box-shadow: 0 0 50px 30px rgba(0,0,0,0.3);
            }

            25% {
              transform: rotateX(80deg) rotateY(-20deg) rotateZ(50deg);
              box-shadow: 0 0 35px 15px rgba(0,0,0,0.1);
            }

            60% {
              transform: rotateX(80deg) rotateY(0deg) rotateZ(-50deg) translateX(30px);
              box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
            }

            100% {
              box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
            }
          }
        `}} />

        {children}
      </body>
    </html>
  );
}
