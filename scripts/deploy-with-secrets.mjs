#!/usr/bin/env node
/**
 * deploy-with-secrets.mjs
 * -----------------------------------------------------------------------------
 * Wires the GROQ_API_KEY chatbot secret into the Cloudflare deploy so the AI
 * chatbot works in production without a manual dashboard step.
 *
 * What it does:
 *   1. Resolves the Groq key from the environment (CI secret) or, locally, from
 *      `.dev.vars` / `.env.local`. The value is NEVER printed, logged or written
 *      to any file by this script.
 *   2. Runs the normal vinext build + deploy (`vinext-cloudflare deploy`).
 *   3. Pushes the key to the deployed Worker as a true Cloudflare secret_text
 *      binding via the `cf` CLI (`workers secrets update`).
 *
 * Usage:
 *   node scripts/deploy-with-secrets.mjs              # deploy + push secret
 *   node scripts/deploy-with-secrets.mjs --secret-only # push secret only
 *   node scripts/deploy-with-secrets.mjs --skip-build  # deploy already-built output
 *
 * Env:
 *   GROQ_API_KEY       (required if not present in .dev.vars / .env.local)
 *   CF_WORKER_NAME     (optional, defaults to the name in cloudflare.config.ts)
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const SECRET_ONLY = args.includes("--secret-only");
const SKIP_BUILD = args.includes("--skip-build");

/** Read a single KEY=value from an dotenv-style file, ignoring comments. */
function readKeyFromFile(file, key) {
  try {
    const raw = readFileSync(resolve(ROOT, file), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const k = trimmed.slice(0, eq).trim();
      if (k !== key) continue;
      let v = trimmed.slice(eq + 1).trim();
      // strip matching surrounding quotes
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      return v;
    }
  } catch {
    /* file may not exist — that's fine */
  }
  return undefined;
}

/** Read the Worker name declared in cloudflare.config.ts. */
function readWorkerName() {
  if (process.env.CF_WORKER_NAME) return process.env.CF_WORKER_NAME;
  try {
    const cfg = readFileSync(resolve(ROOT, "cloudflare.config.ts"), "utf8");
    const m = cfg.match(/name:\s*["']([^"']+)["']/);
    if (m) return m[1];
  } catch {
    /* fall through */
  }
  return undefined;
}

// --- Resolve the secret WITHOUT ever echoing it ------------------------------
const apiKey =
  process.env.GROQ_API_KEY ||
  readKeyFromFile(".dev.vars", "GROQ_API_KEY") ||
  readKeyFromFile(".env.local", "GROQ_API_KEY");

if (!apiKey) {
  console.error(
    "✖ GROQ_API_KEY not found in the environment, .dev.vars or .env.local.\n" +
      "  Set it before deploying (see .env.example). The chatbot needs it in production."
  );
  process.exit(1);
}
if (apiKey === "your_key_here" || !apiKey.startsWith("gsk_")) {
  console.error(
    "✖ GROQ_API_KEY does not look like a valid Groq key (expected it to start with 'gsk_'). Aborting."
  );
  process.exit(1);
}

const workerName = readWorkerName();
if (!workerName) {
  console.error(
    "✖ Could not determine the Worker name. Set CF_WORKER_NAME or fix cloudflare.config.ts."
  );
  process.exit(1);
}

// The `cf` CLI is invoked via `npx cf` so we do not depend on a global install
// and avoid Windows cmd mishandling the project path (it contains spaces).

function run(cmd, cmdArgs, { inherit = true } = {}) {
  const res = spawnSync(cmd, cmdArgs, {
    cwd: ROOT,
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });
  if (res.error) throw res.error;
  return res;
}

// --- Step 1: build + deploy (unless --secret-only) ---------------------------
if (!SECRET_ONLY) {
  const deployArgs = ["deploy"];
  if (SKIP_BUILD) deployArgs.push("--skip-build");
  console.log(`▸ Deploying Worker "${workerName}" via vinext-cloudflare…`);
  const deploy = run("npx", ["vinext-cloudflare", ...deployArgs]);
  if (deploy.status !== 0) {
    console.error("✖ Deploy failed. Aborting before pushing the secret.");
    process.exit(deploy.status ?? 1);
  }
}

// --- Step 2: push the secret to the deployed Worker --------------------------
// We pass the value via spawn args (no shell interpolation, never logged). The
// cf CLI stores it server-side as a secret_text binding.
console.log(`▸ Setting GROQ_API_KEY secret on Worker "${workerName}"…`);
// Invoke via `npx cf` (not the absolute .cmd path) to avoid Windows cmd
// truncating the project path at the space in "Portfolio 2 Quoder".
const secretRes = run("npx", [
  "cf",
  "workers",
  "secrets",
  "update",
  "GROQ_API_KEY",
  "--worker",
  workerName,
  "--type",
  "secret_text",
  "--text",
  apiKey,
]);

if (secretRes.status !== 0) {
  console.error(
    "✖ Failed to set the GROQ_API_KEY secret. You may need to authenticate first:\n" +
      "    npx cf login\n" +
      "  Or set it in the Cloudflare dashboard (Workers → " +
      workerName +
      " → Settings → Variables/Secrets)."
  );
  process.exit(secretRes.status ?? 1);
}

console.log("✔ GROQ_API_KEY secret is live. Chatbot is configured for production.");
