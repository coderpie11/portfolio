import type { Metadata } from "next";
import { projects } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProjectRow from "@/components/ProjectRow";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
  description:
    "The systems I build: AdaptiveRAG — an adaptive hybrid-retrieval pipeline benchmarked with RAGAS — and FunnX.Ai, a multi-LLM chat platform.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
      <SectionHeading num="05" title="Projects" kicker="Things I've built" />

      {/* Boxed project cards */}
      <div className="space-y-8">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectRow project={p} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-ink/40">
          Tap the + to expand the full breakdown · click a title for the
          complete case study
        </p>
      </Reveal>
    </div>
  );
}
