import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * Custom 404 — replaces Next's stock template (which broke dark-mode
 * contrast). Rendered inside the root layout, so Nav, Footer, marquee,
 * hire-me pill and chatbot stay intact. All colors come from the site's
 * own tokens (paper/ink/cobalt/vermilion are set explicitly, so they
 * remain readable under prefers-color-scheme: dark as well as light).
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cobalt">
          404 — Page not found
        </p>

        <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight text-ink md:text-7xl">
          This page{" "}
          <span className="italic text-vermilion">checked out early.</span>
        </h1>

        <p className="mt-5 max-w-xl text-ink-soft">
          The link you followed doesn&apos;t exist — or the page moved. The
          rest of the portfolio is exactly where you left it.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/"
            data-cursor="magnetic"
            className="rounded-full border-2 border-ink bg-paper-card px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink shadow-card-sm transition-transform hover:-translate-y-0.5"
          >
            ← Back home
          </Link>
          <Link
            href="/projects"
            data-cursor="magnetic"
            className="font-mono text-sm text-vermilion underline-offset-4 hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
