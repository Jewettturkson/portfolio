import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jewettturkson.vercel.app"),
  title: {
    default: "Jewett Turkson · Full-Stack Developer",
    template: "%s | Jewett Turkson",
  },
  description:
    "Full-stack developer who ships AI-powered products. CS @ Wilmington University '28. CTO at ENTURK, founder of nkae. Open to software engineering internships.",
  openGraph: {
    title: "Jewett Turkson · Full-Stack Developer",
    description:
      "Full-stack developer who ships AI-powered products. Builder of TurkNode and nkae.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Jewett Turkson · Full-Stack Developer",
    description: "Full-stack developer who ships AI-powered products.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
