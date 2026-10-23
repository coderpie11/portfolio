"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ISTClock from "./ISTClock";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home", num: "01" },
  { href: "/about", label: "About", num: "02" },
  { href: "/skills", label: "Skills", num: "03" },
  { href: "/experience", label: "Experience", num: "04" },
  { href: "/projects", label: "Projects", num: "05" },
  { href: "/certifications", label: "Certifications", num: "06" },
  { href: "/blog", label: "Blog", num: "07" },
  { href: "/contact", label: "Contact", num: "08" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur-sm">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8"
        >
          <Link
            href="/"
            data-cursor="magnetic"
            className="font-display text-xl font-bold italic tracking-tight"
            aria-label="Kishlay Choudhary — home"
          >
            KC<span className="text-vermilion">.</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-5 lg:flex xl:gap-6">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor="magnetic"
                    className={`group relative font-mono text-[13px] uppercase tracking-wide transition-colors ${
                      active ? "text-vermilion" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <span className="mr-1 text-[10px] opacity-50">{l.num}</span>
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-vermilion transition-all duration-300 group-hover:w-full ${
                        active ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right cluster: theme toggle (always) + mobile hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-6 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-6 bg-ink"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — rendered OUTSIDE the header, since backdrop-blur on the
          header would create a containing block that breaks fixed positioning. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-paper px-6 pb-10 pt-24 lg:hidden"
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    data-cursor="magnetic"
                    className="flex items-baseline gap-4 border-b border-ink/10 py-4 font-display text-3xl font-semibold italic"
                  >
                    <span className="font-mono text-xs not-italic text-vermilion">
                      {l.num}
                    </span>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex items-center justify-between border-t border-ink/15 pt-6 text-sm text-ink-soft">
              <span>Delhi, India</span>
              <ISTClock />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
