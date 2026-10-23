import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact Kishlay Choudhary | AI & Python Backend Engineer",
  path: "/contact",
  description:
    "Hire an AI engineer who both evaluates and builds. Immediate joiner, open to Python backend and AI/GenAI roles — Pan India + Remote.",
});

const channels = [
  { label: "Email", value: profile.contacts.email, href: profile.contacts.emailHref },
  { label: "WhatsApp", value: "Chat on WhatsApp", href: profile.contacts.whatsappHref },
  { label: "Call", value: profile.contacts.phoneDisplay, href: profile.contacts.phoneHref },
  { label: "GitHub", value: "thecoderji", href: profile.contacts.github },
  { label: "LeetCode", value: "thecoderji", href: profile.contacts.leetcode },
  { label: "LinkedIn", value: "kishlaychoudhary", href: profile.contacts.linkedin },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
      <SectionHeading num="07" title="Contact" kicker="Let's build something" />

      <div className="grid gap-14 lg:grid-cols-[5fr_7fr]">
        {/* A. Direct channels */}
        <div>
          <Reveal>
            <p className="max-w-md font-display text-xl italic leading-relaxed text-ink-soft">
              Currently an {profile.availability.toLowerCase()} — open to
              Python backend and AI/GenAI engineering roles.
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-cobalt">
              {profile.hiringScope}
            </p>
          </Reveal>

          <RevealGroup className="mt-10 divide-y divide-ink/15 border-y-2 border-ink">
            {channels.map((c) => (
              <RevealItem key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor="magnetic"
                  className="group flex items-baseline justify-between py-4 transition-colors hover:text-vermilion"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45 group-hover:text-vermilion">
                    {c.label}
                  </span>
                  <span className="text-sm font-medium underline-offset-4 group-hover:underline">
                    {c.value}
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* B. Formspree form */}
        <Reveal delay={0.1}>
          <div className="rounded-lg border-2 border-ink bg-paper-card p-6 shadow-card md:p-9">
            <h3 className="font-display text-2xl font-bold italic">
              Send a message
            </h3>
            <p className="mb-7 mt-2 font-mono text-[11px] uppercase tracking-wider text-ink/45">
              Or just press <kbd className="rounded border border-ink/30 bg-paper px-1.5 py-0.5">H</kbd> from anywhere
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
