import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollProgress from "@/components/animations/ScrollProgress";
import Preloader from "@/components/animations/Preloader";
import DisableImageContextMenu from "@/components/DisableImageContextMenu";
import Analytics from "@/components/Analytics";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "WIPA — Women's IP Alliance",
  description:
    "A global, empowering community to grow your network, leadership, career, patents & knowledge. Connect with women professionals in Patents, Trademarks, Copyright, and Innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
