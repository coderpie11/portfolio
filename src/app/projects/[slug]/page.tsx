import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return pageMetadata({
    title: project
      ? `${project.name} | AI Engineering Project | Kishlay Choudhary`
      : "Project | Kishlay Choudhary",
    description: project?.teaser ?? "AI and Python backend engineering project by Kishlay Choudhary.",
    path: project ? `/projects/${project.slug}` : "/projects",
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 pt-14 md:px-8 md:pt-20">
      <Reveal>
        <Link
          href="/projects"
          data-cursor="magnetic"
          className="font-mono text-xs uppercase tracking-wider text-ink-soft underline-offset-4 hover:text-vermilion hover:underline"
        >
          ← All projects
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-6 font-display text-5xl font-black italic tracking-tight md:text-7xl">
          {project.name}
          <span className="text-vermilion">.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl font-display text-lg italic leading-relaxed text-ink-soft md:text-xl">
          {project.teaser}
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <ul className="mt-8 flex flex-wrap gap-2 border-b-2 border-ink pb-8">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border-2 border-ink bg-paper-card px-3.5 py-1 font-mono text-[11px] uppercase tracking-wide text-ink shadow-card-sm"
            >
              {s}
            </li>
          ))}
        </ul>
      </Reveal>

      <RevealGroup className="mt-10 space-y-7">
        {project.bullets.map((b, i) => (
          <RevealItem key={i}>
            <div className="flex gap-5">
              <span className="mt-1.5 font-mono text-[11px] text-cobalt">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed text-ink md:text-lg">{b}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-16 border-t border-ink/15 pt-8">
        <Link
          href="/contact"
          data-cursor="magnetic"
          className="inline-block font-mono text-sm text-vermilion underline-offset-4 hover:underline"
        >
          Want to talk about this build? Hire Me →
        </Link>
      </Reveal>
    </div>
  );
}
