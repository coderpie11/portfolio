import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  robots: { index: false, follow: false },
  description:
    "Notes on LLM evaluation, RAG pipelines and agentic systems — writing soon. Coming soon.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-5 pt-14 md:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cobalt">
        06 — Blog
      </p>
      <h1 className="sr-only">Blog</h1>

      {/* Calm editorial "Coming Soon..." — gentle float + sequential dots;
          grain intensifies on this page via the Grain component. */}
      <div className="relative mt-10 text-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[9rem] italic leading-none text-vermilion/10 md:text-[14rem]"
        >
          &ldquo;
        </span>
        <p className="coming-soon-float text-center font-display text-[13vw] font-black italic leading-[1.05] tracking-tight text-ink md:text-8xl">
          <span className="font-normal not-italic text-ink-soft">~ </span>
          Coming
          <br className="sm:hidden" />{" "}
          <span className="text-vermilion">Soon</span>
          <span className="coming-dot text-vermilion">.</span>
          <span className="coming-dot d2 text-vermilion">.</span>
          <span className="coming-dot d3 text-vermilion">.</span>
        </p>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 right-1/4 font-display text-[9rem] italic leading-none text-vermilion/10 md:text-[14rem]"
        >
          &rdquo;
        </span>
      </div>

      <p className="mt-20 max-w-md text-center font-mono text-xs uppercase tracking-wider text-ink-soft">
        Field notes on LLM evaluation, RAG pipelines and agentic systems
      </p>
    </div>
  );
}
