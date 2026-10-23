# CoderPie — Completion & Verification Report

**Site:** https://coderpie.tech
**Repo:** https://github.com/coderpie11/portfolio
**Deploy target:** Cloudflare Workers — `kishlay-portfolio`
**Last verified:** 2026-10-23

---

## ✅ Status: COMPLETE

Everything planned has been built, deployed to production, and verified live.

---

## 1. The site (Next.js 16 + React 19 via vinext → Cloudflare Workers)

- **Brand:** CoderPie / Kishlay Choudhary — AI Engineer.
- **Custom domain:** `coderpie.tech` live (apex → `kishlay-portfolio`). `www` not configured (optional).
- **Full site:** Home (stacked "active cards" + Bento), Experience, Projects (+ detail pages),
  About, Skills, Certifications, Blog, Contact (working form), Chatbot, Resume, footer.
- **Design system:** Fraunces / Space Grotesk / JetBrains Mono; warm-paper + teal palette;
  grain, reveal-on-scroll, magnetic cursor, IST clock, count-ups, marquee, hire-me button.

## 2. SEO (rankings)

- **Metadata:** titles, descriptions, canonical, OpenGraph, Twitter cards, robots directives.
- **Structured data (JSON-LD):** Person (with sameAs), WebSite + SearchAction, BreadcrumbList,
  FAQPage, ItemList (skills), ProfilePage.
- **`/llms.txt` + `/llms-full.txt`** for AI/LLM answer engines (generated from the data layer).
- **`/robots.txt`** (allows crawling, disallows `/api/`, declares sitemap) and **`/sitemap.xml`** (10 HTML routes; the resume is the file `/resume.pdf`).
- **Geo** meta targeting India.
- **Target terms covered** in HTML: coderpie, coderpie.tech, coderpy, AI engineer,
  Kishlay Choudhary, Qoder Py, Python Kishlay Choudhary.
- **Verified:** all markers present in the served homepage HTML.

## 3. "Qoder Py" chatbot (Gemini-style)

- Bottom-right floating assistant; intent-aware answers (experience, skills, projects,
  contact/hiring, rates, availability, education, certifications, strengths, general).
- Model fallback chain on Groq: `openai/gpt-oss-20b` → `openai/gpt-oss-120b`.
- Empty-query guard; graceful error handling; renders `error` messages in the UI.
- **Verified live:** single question → HTTP 200, correct on-brand answer.

## 4. Rate limiting on `/api/chat` (added this session)

- **Global, KV-backed** counter: **20 requests / 60s per client IP** → HTTP **429** + `Retry-After`.
- Namespace `coderpie-rate-limit` (`RATE_LIMIT` binding) created and wired in `cloudflare.config.ts`.
- In-memory fallback kept for local dev when no KV is present.
- **Why KV, not in-memory:** Workers isolates don't share memory, so an in-memory counter
  is per-isolate and never trips in production. KV makes it global.
- **Verified live:** flood of 30 → first **429 at request #22** and held; normal chat unaffected.

## 5. CI/CD — automatic deploy on every push to `main` (added this session)

- **Workflow:** `.github/workflows/deploy.yml`
- **Pipeline:** validate secrets → checkout → setup Node 22 → `npm ci` → **`tsc --noEmit` gate**
  → `npm run deploy` (build + upload + set `GROQ_API_KEY` secret).
- **Fully automatic** (no manual approval gate by design).
- **Verified:** run on commit `f9475e6` → **SUCCESS**, all steps green, deployed new Worker
  versions (`cf_cli` source) within seconds of the push.

---

## 6. Search visibility (Google / AI answers) — honest status

**Current reality:** a brand-new domain has **no authority yet**, so it will not rank on page 1
for competitive or other-companies'-brand terms. Verified via live search:
- Searching *"coderpie.tech Kishlay Choudhary AI engineer"* → the site is **not indexed/ranked yet**
  (LinkedIn and unrelated sites rank instead).
- *"Wispr Flow"* and *"Codeup"* are **other companies' established brands** (Wispr Flow even has a
  Wikipedia page). No site ranks for them without being them — **do not target these.**

**What actually moves the needle (in order of impact):**
1. **Google Search Console** (only you can do it): add property `https://coderpie.tech`, verify,
   submit `sitemap.xml`, then **URL-inspect → Request Indexing** on `/` and key pages. Biggest lever.
2. **Bing Webmaster Tools** — import from GSC (also feeds ChatGPT search).
3. **Backlinks / authority:** put `https://coderpie.tech` in your GitHub profile, LinkedIn (About +
   Featured), X/Twitter bio, resume header, email signature, dev.to / Hashnode author bio.
4. **Own your brand:** rank for *"Kishlay Choudhary"*, *"CoderPie"*, *"coderpie.tech"* first — these
   are winnable in days. Broader terms ("AI engineer India", "RAG developer") take weeks–months.
5. **Time + content:** publish real blog posts / project write-ups; authority compounds.

**Already done on-site:** titles/descriptions, canonical, OpenGraph/Twitter, JSON-LD (Person,
WebSite, Breadcrumb, FAQ, ItemList, ProfilePage), `robots.txt`, `sitemap.xml`, `llms.txt`,
`llms-full.txt`, geo meta. The technical layer is correct; the gap is **indexing + authority**,
which is why the steps above matter more than any code change.

---

## How to deploy from now on

Just **push to `main`**:

```
git add -A
git commit -m "your change"
git push
```

GitHub Actions builds, type-checks, deploys to Cloudflare, and re-sets the Groq secret
automatically. No manual deploy needed.

---

## Where to see your live site & deploys in Cloudflare

1. Go to **dash.cloudflare.com → Workers & Pages**.
2. Click **`kishlay-portfolio`** (the row showing `coderpie.tech`).
3. Inside you'll see:
   - **Deployments / Versions** — every deploy (the ones your GitHub Actions triggers).
   - **Settings → Triggers / Domains** — `coderpie.tech` custom domain.
   - **Settings → Variables / Secrets / Bindings** — `GROQ_API_KEY` secret, `RATE_LIMIT` KV,
     `ASSETS`, `IMAGES`.

---

## Required GitHub Secrets (Settings → Secrets and variables → Actions)

| Name | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Deploy to Workers + create KV namespace |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account |
| `GROQ_API_KEY` | Chatbot LLM |

All three are set and verified working.

---

## 🔧 Remaining items

1. ~~Retire the stale `portfolio` Worker~~ ✅ **DONE** — deleted. Only `kishlay-portfolio` remains;
   GitHub Actions (API-based) is now the single, clean deploy path.

2. **Google Search Console + backlinks** (see section 6) — the highest-impact thing left, and it
   needs a few clicks in your Google account. This is what will get you ranking.

3. **Roll the Cloudflare API token** (when you have time).
   - The token was pasted into chat, so treat it as compromised.
   - **dash.cloudflare.com → My Profile → API Tokens → your token → Roll**, then update the
     `CLOUDFLARE_API_TOKEN` GitHub secret with the new value.

4. **Content / polish (optional):**
   - Add real **GitHub repo links** to projects.
   - Add **project media** (screenshots / GIFs / POCs).
   - Publish a couple of genuine **blog** write-ups (helps authority + keywords).

---

**Bottom line:** The site, SEO technical layer, chatbot, rate limiting, `llms.txt`, and automatic
CI/CD are all **done, deployed, and verified in production**, and the duplicate Worker is retired.
The only real growth lever left is **getting indexed + building authority** (Google Search Console
+ backlinks), which takes a few minutes of setup and then time.
