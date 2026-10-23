import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "kishlay-portfolio",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-19",
    // nodejs_compat is required by vinext/Next; global_fetch_strictly_public
    // matches the existing production Worker so the deploy is non-destructive.
    compatibilityFlags: ["nodejs_compat", "global_fetch_strictly_public"],
    // Keep the live custom domain attached to this Worker. Without this the
    // deploy would drop coderpie.tech and take the site offline.
    domains: ["coderpie.tech"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // Cloudflare Images binding (edge image optimization) — matches prod.
      IMAGES: bindings.images(),
      // Groq key for the AI chatbot. Resolved from `.dev.vars` locally and from
      // the Cloudflare secret (GROQ_API_KEY) in production — never committed.
      GROQ_API_KEY: bindings.secret(),
    },
  }),
});
