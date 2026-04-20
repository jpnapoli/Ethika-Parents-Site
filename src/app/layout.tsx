import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethika Parents AI Toolkit",
  description: "A bilingual toolkit helping parents navigate AI and children's digital lives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
