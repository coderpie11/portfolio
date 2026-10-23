"use client";

/**
 * Global keyboard shortcut: pressing `H` (outside text inputs)
 * navigates to /contact from anywhere on the site.
 */
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ContactShortcut() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) return;
      if (!e.key || e.key.toLowerCase() !== "h") return;
      if (pathname === "/contact") return;
      router.push("/contact");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, pathname]);

  return null;
}
