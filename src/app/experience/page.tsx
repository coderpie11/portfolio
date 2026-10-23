import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ExperienceEntry from "@/components/ExperienceEntry";
import { experiences } from "@/lib/data";

export const metadata: Metadata = pageMetadata({
  title: "AI Engineering Experience | Kishlay Choudhary",
  path: "/experience",
  description:
    "Former Research Associate - AI at Keywords Studios (Aug 2025 – Aug 2026) and AI/ML Engineer Trainee at Frisson Devhub — large-scale RLHF/HITL evaluation, multi-agent auditing and hands-on model work.",
});

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
      <SectionHeading num="03" title="Experience" kicker="Where I've worked" />
      <div className="space-y-8">
        {experiences.map((entry, i) => (
          <Reveal key={`${entry.company}-${entry.period}`} delay={i * 0.08}>
            <ExperienceEntry entry={entry} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-ink/40">
          Tap a row to expand the full breakdown · every role, deep-dive
          threads
        </p>
      </Reveal>
    </div>
  );
}
