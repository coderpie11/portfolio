import type { Metadata } from "next";
import { skillCategories } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SkillsTabs from "@/components/SkillsTabs";

export const metadata: Metadata = {
  title: "Skills",
  alternates: { canonical: "/skills" },
  description:
    "The toolkit behind the work — Python and FastAPI backends, RAG and multi-agent LLM systems, vector databases and LLMOps.",
};

const totalSkills = skillCategories.reduce((n, c) => n + c.skills.length, 0);

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
      <SectionHeading num="03" title="Skills" kicker="What I work with" />

      <Reveal>
        <p className="mb-10 max-w-2xl font-display text-xl italic leading-relaxed text-ink-soft md:text-2xl">
          {totalSkills} tools and technologies across {skillCategories.length}{" "}
          categories — spanning backend engineering, LLM and retrieval systems,
          data stores and the LLMOps used to keep them honest.
        </p>
      </Reveal>

      <SkillsTabs />
    </div>
  );
}
