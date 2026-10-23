import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/components/MagneticCursor";
import ContactShortcut from "@/components/ContactShortcut";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HireMeButton from "@/components/HireMeButton";
import Chatbot from "@/components/Chatbot";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionConfig } from "framer-motion";
import { profile, projects, education } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Google Search Console site verification.
// Paste the content of the <meta name="google-site-verification"> tag that Google
// gives you between the quotes, then push — CI deploys it automatically.
// Leave "" to omit the tag entirely (current behaviour).
const GOOGLE_SITE_VERIFICATION = "";

export const metadata: Metadata = {
  metadataBase: new URL("https://coderpie.tech"),
  title: {
    default:
      "Kishlay Choudhary — AI Engineer & Python Backend Developer | CoderPie",
    template: "%s — Kishlay Choudhary | CoderPie",
  },
  description:
    "Kishlay Choudhary (CoderPie) is a Delhi-based AI Engineer and Python Backend Developer building FastAPI backends, RAG pipelines, agentic AI and LLM systems. Explore projects like AdaptiveRAG and FunnX.Ai, and hire an engineer for Python, AI/GenAI and FinTech roles.",
  applicationName: "CoderPie",
  keywords: [
    "Kishlay Choudhary",
    "Kishlay Choudhary AI",
    "Kishlay Choudhary AI Engineer",
    "Python Kishlay Choudhary",
    "CoderPie",
    "coderpie.tech",
    "coder pie",
    "coderpy",
    "qoder py",
    "AI Engineer",
    "AI Engineer Delhi",
    "Python Backend Developer",
    "Python Developer Delhi",
    "GenAI Engineer",
    "Generative AI Engineer",
    "Agentic AI Engineer",
    "RAG Engineer",
    "LLM Engineer",
    "LangChain",
    "LangGraph",
    "FastAPI Developer",
    "FinTech Engineer",
    "Machine Learning Engineer India",
    "Python AI engineer portfolio",
  ],
  creator: "Kishlay Choudhary",
  publisher: "Kishlay Choudhary",
  category: "technology",
  verification: {
    google: GOOGLE_SITE_VERIFICATION || undefined,
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://coderpie.tech",
    siteName: "CoderPie — Kishlay Choudhary",
    locale: "en_US",
    title: "Kishlay Choudhary — AI Engineer & Python Backend Developer",
    description:
      "Delhi-based AI Engineer and Python Backend Developer building FastAPI backends, RAG, agentic AI and LLM systems. Projects: AdaptiveRAG, FunnX.Ai.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Kishlay Choudhary — AI Engineer & Python Backend Developer (CoderPie)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@coderpie",
    creator: "@coderpie",
    title: "Kishlay Choudhary — AI Engineer & Python Backend Developer",
    description:
      "Delhi-based AI Engineer and Python Backend Developer building FastAPI backends, RAG, agentic AI and LLM systems.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: true, address: true, telephone: true },
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
        "@id": "https://coderpie.tech/#person",
        name: profile.fullName,
        alternateName: ["CoderPie", "coderpie"],
        jobTitle: profile.title,
        description: profile.aboutTeaser,
        url: "https://coderpie.tech",
        image: "https://coderpie.tech/profile.jpg",
        email: `mailto:${profile.contacts.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Delhi",
          addressRegion: "Delhi",
          addressCountry: "IN",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: education.institution,
        },
        knowsAbout: [
          "Artificial intelligence",
          "Python backend development",
          "FastAPI",
          "REST APIs",
          "Retrieval-augmented generation",
          "LangChain",
          "LangGraph",
          "AI agents",
          "Large language model evaluation",
          "Multi-agent systems",
          "Generative AI",
          "FinTech",
          "Qdrant",
          "Redis",
          "PostgreSQL",
          "Docker",
        ],
        knowsLanguage: ["en", "hi"],
        sameAs: [
          profile.contacts.github,
          profile.contacts.linkedin,
          profile.contacts.leetcode,
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://coderpie.tech/#website",
        url: "https://coderpie.tech",
        name: "CoderPie",
        alternateName: ["coderpie", "coderpie tech"],
        description:
          "Portfolio of Kishlay Choudhary — AI Engineer and Python Backend Developer.",
        inLanguage: "en",
        publisher: { "@id": "https://coderpie.tech/#person" },
      },
      {
        "@type": "ItemList",
        "@id": "https://coderpie.tech/#projects",
        name: "Projects by Kishlay Choudhary",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `https://coderpie.tech/projects/${p.slug}`,
        })),
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body className="font-body text-ink antialiased">
        {/* Apply persisted/system theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark'}if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
        {/* First-visit-only intro splash on the home page, before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!localStorage.getItem('kc-intro-seen')&&location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('show-intro')}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <MagneticCursor />
            <ContactShortcut />
            <Nav />
            <main id="main" className="min-h-screen">
              {children}
            </main>
            <Footer />
            <HireMeButton />
            <Chatbot />
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
