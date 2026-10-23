import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProjectRow from "@/components/ProjectRow";

export const metadata: Metadata = pageMetadata({
  title: "AI & Python Backend Projects | Kishlay Choudhary",
  path: "/projects",
  description:
    "The systems I build: AdaptiveRAG — an adaptive hybrid-retrieval pipeline benchmarked with RAGAS — and FunnX.Ai, a multi-LLM chat platform.",
});

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
      <SectionHeading num="04" title="Projects" kicker="Things I've built" />

      {/* Ledger-style list with inline expand */}
      <Reveal className="divide-y divide-ink/15 border-y-2 border-ink">
        <div className="space-y-0 divide-y divide-ink/15">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-ink/40">
          Tap the + to expand the full breakdown · click a title for the
          complete case study
        </p>
      </Reveal>
    </div>
  );
}
