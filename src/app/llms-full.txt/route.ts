import {
  profile,
  projects,
  skillCategories,
  experiences,
  education,
  certifications,
} from "@/lib/data";

const siteUrl = "https://coderpie.tech";

/**
 * llms-full.txt — the comprehensive, fully-grounded plain-text version of the
 * site for LLM / AI-answer engines that want the whole picture in one fetch.
 * Generated from the same data layer as the site.
 */
function buildFull(): string {
  const o: string[] = [];
  o.push(`# ${profile.fullName} — ${profile.title}`);
  o.push("");
  o.push(profile.tagline);
  o.push("");
  o.push(
    `Portfolio: ${siteUrl} · Location: ${profile.location} · Availability: ${profile.availability}`,
  );
  o.push(
    `Email: ${profile.contacts.email} · GitHub: ${profile.contacts.github} · LinkedIn: ${profile.contacts.linkedin}`,
  );
  o.push("");
  o.push("## About");
  o.push(profile.about);
  o.push("");
  o.push("## Experience");
  for (const e of experiences) {
    o.push("");
    o.push(`### ${e.role} — ${e.company}${e.type ? ` (${e.type})` : ""}`);
    o.push(`${e.period} · ${e.location}`);
    for (const b of e.bullets) o.push(`- ${b.text}`);
  }
  o.push("");
  o.push("## Education");
  o.push(
    `${education.degree} — ${education.institution}, ${education.location} (${education.period})`,
  );
  o.push("");
  o.push("## Projects");
  for (const p of projects) {
    o.push("");
    o.push(`### ${p.name} (${siteUrl}/projects/${p.slug})`);
    o.push(p.teaser);
    o.push(`Stack: ${p.stack.join(", ")}`);
    for (const b of p.bullets) o.push(`- ${b}`);
  }
  o.push("");
  o.push("## Skills");
  for (const c of skillCategories) o.push(`- ${c.name}: ${c.skills.join(", ")}`);
  o.push("");
  o.push("## Certifications");
  for (const c of certifications) o.push(`- ${c.title} — ${c.issuer}`);
  o.push("");
  o.push("## Contact");
  o.push(`- Email: ${profile.contacts.email}`);
  o.push(`- WhatsApp: ${profile.contacts.whatsappHref}`);
  o.push(`- Phone: ${profile.contacts.phoneDisplay}`);
  o.push(`- GitHub: ${profile.contacts.github}`);
  o.push(`- LinkedIn: ${profile.contacts.linkedin}`);
  o.push(`- LeetCode: ${profile.contacts.leetcode}`);
  o.push(`- Resume: ${siteUrl}/resume.pdf`);
  o.push("");
  return o.join("\n");
}

export const dynamic = "force-static";

export function GET() {
  return new Response(buildFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
