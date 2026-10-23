import {
  profile,
  projects,
  skillCategories,
} from "@/lib/data";

const siteUrl = "https://coderpie.tech";

/**
 * llms.txt — a concise, spec-style index for LLM / AI-answer engines
 * (ChatGPT, Perplexity, Gemini, Claude, etc.). Generated from the data
 * layer so it never drifts from the site content.
 */
function buildLlms(): string {
  const lines: string[] = [];
  lines.push(`# ${profile.fullName} — ${profile.title} (CoderPie)`);
  lines.push("");
  lines.push(`> ${profile.aboutTeaser}`);
  lines.push("");
  lines.push("## Key facts");
  lines.push(`- Location: ${profile.location}`);
  lines.push(`- Availability: ${profile.availability}`);
  lines.push(
    "- Target roles: Python Backend Engineer · AI / Generative AI Engineer · Agentic AI Engineer",
  );
  lines.push(
    "- Favourite domain: FinTech (equities, IPOs, trading, low-latency financial systems)",
  );
  lines.push(`- Resume: ${siteUrl}/resume.pdf`);
  lines.push("");
  lines.push("## Pages");
  lines.push(`- [About](${siteUrl}/about): Background, approach and story`);
  lines.push(`- [Experience](${siteUrl}/experience): AI research and engineering roles`);
  lines.push(`- [Projects](${siteUrl}/projects): AdaptiveRAG and FunnX.Ai`);
  lines.push(`- [Skills](${siteUrl}/skills): Python, FastAPI, LangChain, LangGraph, RAG, agents`);
  lines.push(`- [Certifications](${siteUrl}/certifications)`);
  lines.push(`- [Blog](${siteUrl}/blog)`);
  lines.push(`- [Contact](${siteUrl}/contact)`);
  lines.push("");
  lines.push("## Projects");
  for (const p of projects) {
    lines.push(`- [${p.name}](${siteUrl}/projects/${p.slug}): ${p.teaser}`);
  }
  lines.push("");
  lines.push("## Skills");
  for (const c of skillCategories) {
    lines.push(`- ${c.name}: ${c.skills.join(", ")}`);
  }
  lines.push("");
  lines.push("## Contact");
  lines.push(`- Email: ${profile.contacts.email}`);
  lines.push(`- GitHub: ${profile.contacts.github}`);
  lines.push(`- LinkedIn: ${profile.contacts.linkedin}`);
  lines.push(`- LeetCode: ${profile.contacts.leetcode}`);
  lines.push(`- Portfolio: ${siteUrl}`);
  lines.push("");
  return lines.join("\n");
}

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlms(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
