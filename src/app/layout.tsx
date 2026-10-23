import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Grain from "@/components/Grain";
import MagneticCursor from "@/components/MagneticCursor";
import ContactShortcut from "@/components/ContactShortcut";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HireMeButton from "@/components/HireMeButton";
import Chatbot from "@/components/Chatbot";
import { MotionConfig } from "framer-motion";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coderpie.tech"),
  title: {
    default: "Kishlay Choudhary | AI Engineer & Python Backend Developer | CoderPie",
    template: "%s | Kishlay Choudhary",
  },
  description:
    "Kishlay Choudhary is an AI Engineer and Python Backend Developer in Delhi. Explore CoderPie projects in RAG, LLM evaluation, multi-agent systems, and Python backend engineering.",
  keywords: [
    "Kishlay Choudhary",
    "CoderPie",
    "coderpie tech",
    "AI Engineer",
    "Python Backend Developer",
    "RAG Engineer",
    "LLM Engineer",
  ],
  authors: [{ name: "Kishlay Choudhary", url: "https://coderpie.tech" }],
  creator: "Kishlay Choudhary",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://coderpie.tech",
    siteName: "CoderPie",
    title: "Kishlay Choudhary | AI Engineer & Python Backend Developer",
    description:
      "Portfolio of Kishlay Choudhary: AI Engineer and Python Backend Developer building RAG, LLM, and multi-agent systems.",
  },
  twitter: {
    card: "summary",
    title: "Kishlay Choudhary | AI Engineer & Python Backend Developer",
    description:
      "Portfolio of Kishlay Choudhary: AI Engineer and Python Backend Developer building RAG, LLM, and multi-agent systems.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F1E7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Kishlay Choudhary",
        jobTitle: "AI Engineer and Python Backend Developer",
        url: "https://coderpie.tech",
        image: "https://coderpie.tech/profile.jpg",
        sameAs: [
          "https://github.com/thecoderji",
          "https://www.linkedin.com/in/kishlaychoudhary/",
          "https://leetcode.com/u/thecoderji/",
        ],
        knowsAbout: [
          "Artificial intelligence",
          "Python backend development",
          "Retrieval-augmented generation",
          "Large language model evaluation",
          "Multi-agent systems",
        ],
      },
      {
        "@type": "WebSite",
        name: "CoderPie",
        alternateName: ["coderpie", "coderpie tech"],
        url: "https://coderpie.tech",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body className="font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <MotionConfig reducedMotion="user">
          <Grain />
          <MagneticCursor />
          <ContactShortcut />
          <Nav />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <HireMeButton />
          <Chatbot />
        </MotionConfig>
      </body>
    </html>
  );
}
