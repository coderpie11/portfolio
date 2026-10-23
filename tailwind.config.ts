import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "rgb(var(--c-paper) / <alpha-value>)",
          deep: "rgb(var(--c-paper-deep) / <alpha-value>)",
          card: "rgb(var(--c-paper-card) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          soft: "rgb(var(--c-ink-soft) / <alpha-value>)",
        },
        vermilion: "rgb(var(--c-vermilion) / <alpha-value>)",
        cobalt: "rgb(var(--c-cobalt) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-grotesk)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "4px 4px 0 0 rgb(var(--c-shadow) / 0.9)",
        "card-sm": "2px 2px 0 0 rgb(var(--c-shadow) / 0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
