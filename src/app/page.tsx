import Link from "next/link";
import { profile, heroMarqueeKeywords, featuredSkills, experience, experiences, projects, certifications, education } from "@/lib/data";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import IntroSplash from "@/components/IntroSplash";
import SectionHeading from "@/components/SectionHeading";
import SkillsTabs from "@/components/SkillsTabs";
import ExperienceEntry from "@/components/ExperienceEntry";
import ProjectRow from "@/components/ProjectRow";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  const currentRole = {
    role: experience.role,
    company: experience.company,
    period: experience.period,
  };

  return (
    <>
      <IntroSplash />

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

      <div className="mx-auto hidden max-w-6xl px-5 md:px-8 lg:block">
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
            href="/skills"
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
              05 — Featured Projects
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
      </div>

      {/* ---------- Mobile single-page: every section inline, no navigation ---------- */}
      <div className="mx-auto max-w-6xl px-5 pb-10 lg:hidden">
        {/* About + Education */}
        <section className="mt-16">
          <SectionHeading num="02" title="About" kicker="Tell me about yourself" />
          <p className="font-display text-lg italic leading-relaxed text-ink">
            {profile.about}
          </p>
          <div className="mt-6 rounded-lg border-2 border-ink bg-paper-card p-5 shadow-card">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
              Education
            </p>
            <h3 className="mt-2 font-display text-lg font-bold">
              {education.institution}
            </h3>
            <p className="mt-1 text-sm text-ink-soft">{education.degree}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink/50">
              {education.location} · {education.period}
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-16">
          <SectionHeading num="03" title="Skills" kicker="What I work with" />
          <SkillsTabs />
        </section>

        {/* Experience */}
        <section className="mt-16">
          <SectionHeading num="04" title="Experience" kicker="Where I've worked" />
          <div className="space-y-6">
            {experiences.map((entry) => (
              <ExperienceEntry
                key={`${entry.company}-${entry.period}`}
                entry={entry}
              />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-16">
          <SectionHeading num="05" title="Projects" kicker="Things I've built" />
          <div className="space-y-6">
            {projects.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mt-16">
          <SectionHeading
            num="06"
            title="Certifications"
            kicker="Coursework & credentials"
          />
          <div className="space-y-4">
            {certifications.map((c, i) => (
              <div
                key={c.title}
                className="rounded-lg border-2 border-ink bg-paper-card p-5 shadow-card"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
                  Certificate {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold italic leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-ink-soft">
                  {c.issuer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16">
          <SectionHeading num="08" title="Contact" kicker="Let's build something" />
          <div className="divide-y divide-ink/15 border-y-2 border-ink">
            {[
              { label: "Email", value: profile.contacts.email, href: profile.contacts.emailHref },
              { label: "WhatsApp", value: "Chat on WhatsApp", href: profile.contacts.whatsappHref },
              { label: "Call", value: profile.contacts.phoneDisplay, href: profile.contacts.phoneHref },
              { label: "GitHub", value: "coderpie11", href: profile.contacts.github },
              { label: "LeetCode", value: "coderpie", href: profile.contacts.leetcode },
              { label: "LinkedIn", value: "kishlaychoudhary", href: profile.contacts.linkedin },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-baseline justify-between py-3.5"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
                  {c.label}
                </span>
                <span className="text-sm font-medium">{c.value}</span>
              </a>
            ))}
          </div>
          <div className="mt-8 rounded-lg border-2 border-ink bg-paper-card p-5 shadow-card">
            <h3 className="font-display text-xl font-bold italic">
              Send a message
            </h3>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
