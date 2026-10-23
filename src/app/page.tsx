import Link from "next/link";
import { profile, heroMarqueeKeywords, featuredSkills, stats, experience, projects } from "@/lib/data";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CountUp from "@/components/CountUp";

export default function HomePage() {
  const currentRole = {
    role: experience.role,
    company: experience.company,
    period: experience.period,
  };

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pt-24">
        {/* Background tilted marquee */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-4%] top-[38%] hidden -rotate-2 opacity-[0.13] md:block"
        >
          <Marquee items={heroMarqueeKeywords} />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
              Portfolio · Vol. 01 — {new Date().getFullYear()}
            </p>
          </Reveal>

          <div className="relative">
            <h1 className="font-display leading-[0.9]">
              <Reveal delay={0.05}>
                <span className="block text-[min(13vw,3.25rem)] font-black tracking-tight text-ink md:text-[min(13.2vw,8.5rem)]">
                  {profile.firstName}
                </span>
              </Reveal>
              <Reveal delay={0.15}>
                <span className="block whitespace-nowrap text-[min(13vw,3.25rem)] font-black italic tracking-tight text-vermilion md:whitespace-normal md:text-[min(13.2vw,8.5rem)]">
                  {profile.lastName}
                </span>
              </Reveal>
            </h1>
          </div>

          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl font-display text-xl italic text-ink-soft md:text-2xl">
              &ldquo;{profile.tagline}&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermilion opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vermilion" />
                </span>
                {profile.availability}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                data-cursor="magnetic"
                className="rounded-full border-2 border-ink bg-ink px-7 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-paper shadow-card-sm transition-transform hover:-translate-y-0.5"
              >
                Hire Me
              </Link>
              <a
                href={profile.resumePath}
                download="Kishlay Choudhary AI Engineer Resume.pdf"
                data-cursor="magnetic"
                className="rounded-full border-2 border-ink bg-paper px-7 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink shadow-card-sm transition-transform hover:-translate-y-0.5 hover:bg-cobalt hover:text-paper"
              >
                Download Resume/CV ↓
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Foreground tilted keyword marquee ---------- */}
      <div aria-hidden="true" className="my-4 -rotate-1">
        <Marquee items={heroMarqueeKeywords} />
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* ---------- About teaser ---------- */}
        <Reveal className="mt-20 border-t border-ink/15 pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
            02 — About
          </p>
          <p className="mt-4 max-w-2xl font-display text-2xl italic leading-snug md:text-3xl">
            {profile.aboutTeaser}
          </p>
          <Link
            href="/about"
            data-cursor="magnetic"
            className="mt-4 inline-block font-mono text-sm text-vermilion underline-offset-4 hover:underline"
          >
            Read more →
          </Link>
        </Reveal>

        {/* ---------- Skills preview ---------- */}
        <Reveal className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
            Toolkit
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {featuredSkills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-ink/30 bg-paper-card px-4 py-1.5 font-mono text-xs text-ink-soft"
              >
                {s}
              </li>
            ))}
          </ul>
          <Link
            href="/about#skills"
            data-cursor="magnetic"
            className="mt-4 inline-block font-mono text-sm text-vermilion underline-offset-4 hover:underline"
          >
            View all skills →
          </Link>
        </Reveal>

        {/* ---------- Experience highlight ---------- */}
        <Reveal className="mt-16 rounded-lg border-2 border-ink bg-paper-card p-6 shadow-card md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
            Most recently
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">
            {currentRole.role}{" "}
            <span className="font-normal italic text-ink-soft">
              @ {currentRole.company}
            </span>
          </h3>
          <p className="mt-3 max-w-2xl text-ink-soft">{experience.standout}</p>
          <Link
            href="/experience"
            data-cursor="magnetic"
            className="mt-4 inline-block font-mono text-sm text-vermilion underline-offset-4 hover:underline"
          >
            View full experience →
          </Link>
        </Reveal>

        {/* ---------- Featured projects ---------- */}
        <section className="mt-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
              04 — Featured Projects
            </p>
          </Reveal>
          <RevealGroup className="mt-6 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <RevealItem key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  data-cursor="magnetic"
                  className="group block h-full rounded-lg border-2 border-ink bg-paper-card p-6 shadow-card transition-transform hover:-translate-y-1"
                >
                  <h3 className="font-display text-2xl font-bold italic group-hover:text-vermilion">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {p.teaser}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-ink/40">
                    {p.stack.slice(0, 4).join(" · ")}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <Link
              href="/projects"
              data-cursor="magnetic"
              className="mt-6 inline-block font-mono text-sm text-vermilion underline-offset-4 hover:underline"
            >
              View all projects →
            </Link>
          </Reveal>
        </section>

        {/* ---------- Count-up stats ---------- */}
        <RevealGroup className="mt-24 grid grid-cols-2 gap-10 border-t-2 border-ink pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <CountUp stat={s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
