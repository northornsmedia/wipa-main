import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollProgress from "@/components/animations/ScrollProgress";
import Preloader from "@/components/animations/Preloader";

export const metadata: Metadata = {
  title: "WIPA — Women in Intellectual Property Association",
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
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
