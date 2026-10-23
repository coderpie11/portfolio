import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { certifications } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "AI, Machine Learning & Python Certifications | Kishlay Choudhary",
  path: "/certifications",
  description:
    "Certifications in generative and agentic AI, machine learning, FastAPI and Python — coursework behind the craft.",
});

export default function CertificationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
      <SectionHeading
        num="05"
        title="Certifications"
        kicker="Coursework & credentials"
      />

      {/* Optional `url` field exists on the data objects (unused by design —
          links can be added later without a rebuild). */}
      <RevealGroup className="grid gap-6 md:grid-cols-2">
        {certifications.map((c, i) => (
          <RevealItem key={c.title}>
            <article className="flex h-full flex-col justify-between rounded-lg border-2 border-ink bg-paper-card p-6 shadow-card transition-transform hover:-translate-y-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
                Certificate {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-xl font-bold italic leading-snug md:text-2xl">
                {c.title}
              </h3>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider text-ink-soft">
                {c.issuer}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
