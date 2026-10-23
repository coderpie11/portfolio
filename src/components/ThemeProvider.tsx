"use client";

/**
 * Light/dark theme provider. Persists choice to localStorage, defaults to the
 * OS preference, and toggles the `.dark` class on <html>. A matching
 * <meta name="theme-color"> is kept in sync for mobile browser chrome.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const THEME_META: Record<Theme, string> = {
  light: "#F6F1E7",
  dark: "#13110F",
};

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", THEME_META[theme]);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Dark is the default theme for every first-time visitor.
  const [theme, setTheme] = useState<Theme>("dark");

  // Sync with whatever the pre-hydration inline script already applied.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* ignore storage failures (private mode) */
      }
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
