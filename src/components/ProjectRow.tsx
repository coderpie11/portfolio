"use client";

/**
 * Expandable project card for the /projects grid — plus icon reveals the
 * full bullet breakdown inline; the title links to the detail page. Card
 * styling mirrors the Experience entries for a consistent, boxed look.
 */
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/data";

export default function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border-2 border-ink bg-paper-card shadow-card">
      <div className="grid grid-cols-1 gap-3 p-6 md:grid-cols-[auto_1fr_auto] md:gap-6 md:p-8">
        <div className="flex items-center gap-4 md:block">
          <span className="font-display text-4xl font-black italic text-ink/15 md:mt-1 md:text-5xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div>
          <Link
            href={`/projects/${project.slug}`}
            data-cursor="magnetic"
            className="group inline-block"
          >
            <h3 className="font-display text-2xl font-bold italic group-hover:text-vermilion md:text-4xl">
              {project.name}
            </h3>
          </Link>
          <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
            {project.teaser}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-ink/25 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Plus toggle */}
        <div className="flex items-start gap-3 md:justify-end">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? `Collapse ${project.name} details` : `Expand ${project.name} details`}
            data-cursor="magnetic"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-xl leading-none transition-colors hover:bg-cobalt hover:text-paper"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              className="block"
              aria-hidden="true"
            >
              +
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mx-6 mb-6 mt-1 border-t border-ink/15 pt-6 md:mx-8">
              <ol className="space-y-4">
                {project.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                    className="flex gap-4"
                  >
                    <span className="mt-1 font-mono text-[11px] text-cobalt">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-ink-soft">{b}</p>
                  </motion.li>
                ))}
              </ol>
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="magnetic"
                className="mt-5 inline-block font-mono text-sm text-vermilion underline-offset-4 hover:underline"
              >
                Open the full case study →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
