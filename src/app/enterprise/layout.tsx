import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Solutions",
  description: "Empower your corporate IP team with WIPA Enterprise Solutions. Bespoke training, centralized management, and unparalleled networking for IP departments.",
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
