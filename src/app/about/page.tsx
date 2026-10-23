import type { Metadata } from "next";
import Image from "next/image";
import { profile, education } from "@/lib/data";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "AI engineer with large-scale RLHF/HITL evaluation on a frontier LLM, builder of production adaptive-RAG and multi-LLM systems, and a FinTech-first Python / GenAI engineer.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
      <SectionHeading num="02" title="About" kicker="Tell me about yourself" />

      <div className="grid gap-12 md:grid-cols-[2fr_3fr]">
        {/* Photo — attached image, cropped 3:4, soft rounded corners */}
        <Reveal>
          <figure>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-ink shadow-card">
              <Image
                src="/profile.jpg"
                alt="Portrait of Kishlay Choudhary"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 380px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              {profile.location} · {profile.hiringScope}
            </figcaption>
          </figure>
        </Reveal>

        {/* Bio */}
        <Reveal delay={0.1}>
          <p className="font-display text-xl italic leading-relaxed text-ink md:text-[1.65rem] md:leading-[1.7]">
            {profile.about}
          </p>
        </Reveal>
      </div>

      {/* Education block — small, at the end */}
      <section className="mt-24">
        <RevealGroup className="rounded-lg border-2 border-ink bg-paper-card p-6 shadow-card md:p-8">
          <RevealItem>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
              Education
            </p>
          </RevealItem>
          <RevealItem>
            <h3 className="mt-3 font-display text-xl font-bold md:text-2xl">
              {education.institution}
            </h3>
          </RevealItem>
          <RevealItem>
            <p className="mt-1 text-ink-soft">{education.degree}</p>
          </RevealItem>
          <RevealItem>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink/50">
              {education.location} · {education.period}
            </p>
          </RevealItem>
        </RevealGroup>
      </section>
    </div>
  );
}
