import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "kishlay-portfolio",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-19",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // Groq key for the AI chatbot. Resolved from `.dev.vars` locally and from
      // the Cloudflare secret (GROQ_API_KEY) in production — never committed.
      GROQ_API_KEY: bindings.secret(),
    },
  }),
});
