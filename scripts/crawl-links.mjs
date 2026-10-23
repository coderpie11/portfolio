#!/usr/bin/env node
/**
 * crawl-links.mjs — site-wide link + page health check.
 * Crawls every same-origin page reachable from the seed routes, then validates
 * every discovered link:
 *   - internal (same-origin) links must NOT 404/5xx
 *   - external http(s) links must be well-formed (optionally HEAD-checked)
 *   - mailto:/tel: links must be syntactically valid
 * Exits non-zero if any internal page/link is broken.
 */
const BASE = process.env.BASE || "http://localhost:3001";
const HEAD_EXTERNAL = process.env.HEAD_EXTERNAL === "1";

const seeds = [
  "/", "/about", "/experience", "/projects", "/skills",
  "/certifications", "/blog", "/contact",
];

const origin = new URL(BASE).origin;
const visitedPages = new Set();
const internalLinks = new Set();
const externalLinks = new Set();
const specialLinks = new Set(); // mailto:, tel:
const broken = [];
const pageStatus = [];
const checkedAssets = new Set();

function normalize(href) {
  try {
    return new URL(href, BASE + "/");
  } catch {
    return null;
  }
}

async function fetchPage(path) {
  const url = path.startsWith("http") ? path : BASE + path;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const contentType = res.headers.get("content-type") || "";
    const body = await res.text();
    return { url, status: res.status, contentType, body };
  } catch (e) {
    return { url, status: 0, contentType: "", body: "", error: String(e) };
  }
}

// Build assets / dev-only modules: status-check them but never parse for links.
function isAssetPath(p) {
  return (
    /^\/_next\//.test(p) ||
    /^\/src\//.test(p) ||
    /\.(css|js|mjs|woff2?|ttf|eot|svg|png|jpe?g|webp|avif|ico|map|pdf)(\?|$)/i.test(p) ||
    /@id\//.test(p) ||
    /virtual:/.test(p)
  );
}

function extractAttrs(html) {
  const out = [];
  const re = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) out.push(decodeEntities(m[1]));
  return out;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/gi, "&")
    .replace(/&#38;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function classify(href) {
  if (/^(mailto:|tel:)/i.test(href)) return { kind: "special", value: href };
  if (/^(#|javascript:|data:)/i.test(href)) return { kind: "skip" };
  const u = normalize(href);
  if (!u) return { kind: "malformed", value: href };
  if (u.origin === origin) {
    // keep query for asset checks (e.g. /_next/image?url=..&w=..); pages dedupe on pathname
    const isAsset = isAssetPath(u.pathname + u.search);
    return { kind: "internal", value: isAsset ? u.pathname + u.search : u.pathname, asset: isAsset };
  }
  if (u.protocol === "http:" || u.protocol === "https:") {
    return { kind: "external", value: u.href };
  }
  return { kind: "skip" };
}

async function crawlPage(path) {
  if (visitedPages.has(path)) return;
  visitedPages.add(path);
  const { url, status, body, error } = await fetchPage(path);
  pageStatus.push({ path: url, status, error });
  if (status >= 400) {
    broken.push({ type: "page", target: url, status });
    return;
  }
  for (const attr of extractAttrs(body)) {
    const c = classify(attr);
    if (c.kind === "internal") {
      internalLinks.add(c.value);
      // Only crawl real pages; assets are status-checked once, not parsed.
      if (!c.asset && !visitedPages.has(c.value)) await crawlPage(c.value);
      else if (c.asset && !checkedAssets.has(c.value)) {
        checkedAssets.add(c.value);
        const a = await fetchPage(c.value);
        if (a.status >= 400) broken.push({ type: "asset", target: a.url, status: a.status });
      }
    } else if (c.kind === "external") {
      externalLinks.add(c.value);
    } else if (c.kind === "special") {
      specialLinks.add(c.value);
    } else if (c.kind === "malformed") {
      broken.push({ type: "malformed-link", target: attr, page: url });
    }
  }
}

// 1) crawl all reachable pages
for (const s of seeds) await crawlPage(s);

// 2) verify every internal link resolved (crawl already visited them, but
//    catch links that were collected but not crawled because they 404'd)
for (const link of internalLinks) {
  if (isAssetPath(link)) continue; // already status-checked during crawl
  if (!visitedPages.has(link)) {
    const { url, status } = await fetchPage(link);
    if (status >= 400) broken.push({ type: "internal-link", target: url, status });
  }
}

// 3) validate special links
for (const s of specialLinks) {
  const ok = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+/i.test(s) || /^tel:\+?[0-9\-\s()]{6,}$/i.test(s);
  if (!ok) broken.push({ type: "bad-contact-link", target: s });
}

// 4) optionally HEAD external links (best-effort; many block bots)
const externalResults = [];
if (HEAD_EXTERNAL) {
  for (const e of externalLinks) {
    try {
      const r = await fetch(e, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
      externalResults.push({ url: e, status: r.status });
    } catch (err) {
      externalResults.push({ url: e, status: "ERR" });
    }
  }
}

// report
console.log(`\nPages crawled: ${visitedPages.size}`);
console.log(`Internal links: ${internalLinks.size} · External: ${externalLinks.size} · Contact: ${specialLinks.size}`);
console.log(`\n-- Page status --`);
for (const p of pageStatus) console.log(`  ${p.status || "ERR"}  ${p.path}${p.error ? "  (" + p.error + ")" : ""}`);
if (externalResults.length) {
  console.log(`\n-- External HEAD --`);
  for (const e of externalResults) console.log(`  ${e.status}  ${e.url}`);
}
console.log(`\n-- External links (format OK) --`);
for (const e of externalLinks) console.log(`  ${e}`);
console.log(`\n-- Contact links --`);
for (const s of specialLinks) console.log(`  ${s}`);

if (broken.length) {
  console.log(`\n❌ BROKEN (${broken.length}):`);
  for (const b of broken) console.log(`  ${b.type}: ${b.target}${b.status ? " [" + b.status + "]" : ""}`);
  process.exit(1);
} else {
  console.log(`\n✅ No broken pages or internal links.`);
}
