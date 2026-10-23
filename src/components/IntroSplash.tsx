"use client";

/**
 * First-visit-only intro splash. A pre-paint inline script (see layout.tsx)
 * adds the `show-intro` class to <html> when the visitor has not seen it
 * before, so the KC mark covers the page immediately — no content flash.
 * This component just runs the timed reveal, then records that it has been
 * seen so it never repeats on later visits or in-site navigation.
 */
import { useEffect } from "react";

export default function IntroSplash() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("show-intro")) return;

    // Mark seen immediately so leaving mid-animation won't replay it.
    try {
      localStorage.setItem("kc-intro-seen", "1");
    } catch {
      /* private mode — ignore */
    }

    document.body.style.overflow = "hidden";
    const leave = window.setTimeout(
      () => root.classList.add("intro-leaving"),
      1450
    );
    const done = window.setTimeout(() => {
      root.classList.remove("show-intro", "intro-leaving");
      document.body.style.overflow = "";
    }, 2050);

    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="intro-overlay" aria-hidden="true">
      <span className="intro-mark">
        KC<span className="dot">.</span>
      </span>
    </div>
  );
}
