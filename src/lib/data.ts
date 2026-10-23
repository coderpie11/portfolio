/**
 * Single source of truth for all site content.
 * Every component and the chatbot API route pull from this file.
 * Content is taken verbatim from the build prompt + attached resume.
 */

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ExperienceBullet {
  text: string;
  tags: string[];
}

export interface Project {
  slug: string;
  name: string;
  teaser: string;
  stack: string[];
  bullets: string[];
  /** Optional external link — supported by design, intentionally left unused. */
  url?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  /** Optional verification link — supported by design, intentionally left unused. */
  url?: string;
}

export interface Stat {
  value: number;
  display: string;
  suffix: string;
  decimals: number;
  label: string;
}

export const profile = {
  firstName: "KISHLAY",
  lastName: "CHOUDHARY",
  fullName: "Kishlay Choudhary",
  title: "AI Engineer",
  tagline: "I evaluate how AI reasons, then build the systems that put it to work.",
  availability: "Immediate Joiner",
  location: "Delhi, India",
  hiringScope: "Delhi | Pan India + Remote",
  about:
    "I'm an AI engineer based in Delhi. I previously worked as a Research Associate at Keywords Studios from August 2025 to August 2026, where I ran large-scale RLHF and human-in-the-loop evaluation on a frontier foundation LLM — tracing chain-of-thought reasoning, auditing multi-agent behavior, and hunting down the failure modes that separate a good model from a trustworthy one. Beyond that, I build AI systems myself: AdaptiveRAG, a production-grade hybrid retrieval pipeline benchmarked with real RAGAS scores, and FunnX.Ai, a multi-LLM chat platform. I graduated in Computer Science from MGM College in 2025, and I'm currently looking for my next role as a Python backend or AI/GenAI engineer — ideally one where I keep doing both: understanding how these systems fail, and building the ones that don't.",
  aboutTeaser:
    "AI engineer who ran large-scale RLHF/HITL evaluation on a frontier LLM — and now builds the hybrid-retrieval and multi-LLM systems.",
  contacts: {
    email: "kishlaychoudhary1233@gmail.com",
    emailHref: "mailto:kishlaychoudhary1233@gmail.com",
    whatsappHref: "https://wa.me/919990687453",
    phoneHref: "tel:+919990687453",
    phoneDisplay: "+91 99906 87453",
    github: "https://github.com/thecoderji",
    leetcode: "https://leetcode.com/u/thecoderji/",
    linkedin: "https://www.linkedin.com/in/kishlaychoudhary/",
  },
  resumePath: "/resume.pdf",
};

export const heroMarqueeKeywords = [
  "LLM Orchestration",
  "RAG Pipelines",
  "Agentic AI",
  "Multi-Agent Systems",
  "RLHF",
  "Hybrid Retrieval",
  "Python Backend",
];

export const footerMarqueeText = "Available for roles · Immediate Joiner";

export const stats: Stat[] = [
  { value: 120, display: "120+", suffix: "+", decimals: 0, label: "Daily Eval Cycles" },
  { value: 0.91, display: "0.91", suffix: "", decimals: 2, label: "RAGAS Faithfulness Score" },
  { value: 10, display: "10M", suffix: "M", decimals: 0, label: "Token Context Evaluated" },
  { value: 2, display: "2", suffix: "", decimals: 0, label: "AI Systems Shipped" },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Backend",
    skills: [
      "Python",
      "Java",
      "FastAPI",
      "Flask",
      "Pydantic",
      "Streamlit",
      "REST APIs",
      "JSON",
      "SSE Streaming",
      "Gunicorn",
    ],
  },
  {
    name: "AI & LLM Systems",
    skills: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "OpenAI API",
      "Gemini API",
      "Claude API",
      "Groq",
      "OpenRouter",
      "Mistral AI",
      "Prompt Engineering",
      "Embeddings",
      "RAG Pipelines",
      "Semantic Search",
      "Hybrid Retrieval",
      "BM25",
      "Reciprocal Rank Fusion",
      "Cross-Encoder Reranking",
      "Agentic AI",
      "AI Agents",
      "Tool Calling",
      "Function Calling",
      "Multi-Agent Systems",
      "RLHF",
      "HITL",
      "MCP",
      "RAGAS",
    ],
  },
  {
    name: "Databases & Caching",
    skills: [
      "PostgreSQL (Neon)",
      "Redis",
      "Qdrant",
      "FAISS",
      "Pinecone",
      "ChromaDB",
      "Semantic Caching",
    ],
  },
  {
    name: "Developer Tools",
    skills: [
      "Docker",
      "Git",
      "Agile",
      "LLMOps",
      "Observability",
      "LangFuse",
      "OpenTelemetry",
    ],
  },
  {
    name: "Data & Core Concepts",
    skills: [
      "NumPy",
      "Pandas",
      "System Design",
      "DSA",
      "LLM Architecture (Transformers, Attention Mechanism)",
      "AI Safety & Governance",
      "AI Alignment",
    ],
  },
];

/** Preview pills shown on the Home page. */
export const featuredSkills = [
  "Python",
  "FastAPI",
  "RAG Pipelines",
  "RLHF",
  "Qdrant",
  "LangChain",
];

export interface ExperienceEntryData {
  role: string;
  company: string;
  period: string;
  location: string;
  type?: string;
  stackTags?: string[];
  bullets: ExperienceBullet[];
}

export const experiences: ExperienceEntryData[] = [
  {
    role: "Research Associate - AI",
    company: "Keywords Studios",
    period: "August 2025 – August 2026",
    location: "Gurugram, Haryana",
    bullets: [
    {
      text: "Evaluated a flagship enterprise-scale foundation LLM (NDA-restricted engagement) and a 2-month humanoid-robotics alignment project for Mecka AI, both inside a multi-agent, RLHF/HITL evaluation framework.",
      tags: ["RLHF", "HITL", "Multi-Agent"],
    },
    {
      text: "Ran 120+ RLHF/HITL evaluation cycles daily (500–600 weekly) across varied prompting strategies — vague/zero-shot prompts, few-shot prompts with 3–4 worked examples, and JSON-schema-structured prompts.",
      tags: ["RLHF", "HITL", "Prompt Engineering"],
    },
    {
      text: "Designed chain-of-thought evaluation protocols, tracking a reasoning-fidelity metric that consistently crossed a 50% baseline and contributing to an observed ~30% interpretability gain from step-by-step reasoning.",
      tags: ["Chain-of-Thought", "Evaluation"],
    },
    {
      text: "Monitored multi-agent execution graphs of 2–10 concurrently running agents, building state-tracking and observation-action loop monitoring to catch behavioral drift over time.",
      tags: ["Multi-Agent", "LangGraph"],
    },
    {
      text: "Audited agent-to-agent communication across parallel runs, assessing inter-agent dialogue quality and flagging coordination breakdowns before they propagated downstream.",
      tags: ["Multi-Agent", "Observability"],
    },
    {
      text: "Evaluated an ETL-style ingestion pipeline (web extraction → chunk/token transformation → vector-store load) feeding a ~10M-token context window, validating throughput and latency behavior — observed reductions approaching 40% from context and token-efficiency work.",
      tags: ["RAG Pipelines", "Vector Stores"],
    },
    {
      text: "Enforced JSON-schema-based tool-call validation and structured-output governance, reducing token overhead and preventing malformed-output failures across evaluation cycles.",
      tags: ["Tool Calling", "Structured Outputs"],
    },
    {
      text: 'Evaluated a persistent-context/session-memory mechanism letting the model retain a standing user/task profile across sessions, including testing an explicit "reset-context" override that suppressed prior-session recall on demand.',
      tags: ["Memory", "LLMOps"],
    },
    {
      text: "Conducted AI-safety and content-moderation review — flagging harmful, self-harm-related, sexual, and discriminatory content to strengthen production guardrails — while coordinating cross-timezone reporting as the primary India-US liaison for a 5-person research pod; ranked top-5 performer for 3 consecutive months, #1 in March 2026.",
      tags: ["AI Safety", "Guardrails"],
    },
    {
      text: "Applied the same evaluation discipline to a focused 2-month engagement for Mecka AI, judging a sequential multi-model pipeline for humanoid robots (industrial-automation and companion-class units) where each model's output doubled as the next model's input and an implicit quality review.",
      tags: ["Multi-Model Pipelines", "Robotics"],
    },
  ],
  },
  {
    role: "AI/ML Engineer Trainee",
    company: "Frisson Devhub",
    type: "Internship",
    period: "May 2025 – June 2025",
    location: "Noida, Uttar Pradesh",
    stackTags: ["Python", "Machine Learning", "Deep Learning", "Neural Networks"],
    bullets: [
      {
        text: "Gained practical exposure to Python, Machine Learning, Deep Learning, and Neural Networks through hands-on assignments and project simulations.",
        tags: ["Python", "Deep Learning", "Neural Networks"],
      },
      {
        text: "Assisted in AI model development and deployment tasks, building a strong foundation in real-world AI workflows under professional mentorship.",
        tags: ["Machine Learning", "Deployment"],
      },
    ],
  },
];

/** Most recent role, used by the Home highlight. */
export const experience = {
  ...experiences[0],
  standout:
    "Ran 120+ RLHF/HITL evaluation cycles daily on a flagship enterprise foundation LLM — ranked top-5 for 3 consecutive months, #1 in March 2026.",
};

export const education = {
  institution: "Mahatma Gandhi MGM's College of Engineering and Technology",
  degree: "Bachelor in Technology, Computer Science & Engineering",
  period: "Nov. 2021 – June 2025",
  location: "Noida, U.P.",
};

export const projects: Project[] = [
  {
    slug: "adaptive-rag",
    name: "AdaptiveRAG",
    teaser:
      "An adaptive RAG system that classifies query complexity in real time and routes to a hybrid dense+sparse retrieval pipeline — 0.91 RAGAS faithfulness score.",
    stack: [
      "Python",
      "FastAPI",
      "React/Vite/Tailwind",
      "Mistral AI",
      "Qdrant",
      "Redis",
      "PostgreSQL (Neon)",
      "Clerk",
      "Heroku",
    ],
    bullets: [
      "Architected an adaptive RAG system that classifies incoming queries in real time as simple, complex, or out-of-domain via an LLM-based classifier, then dynamically routes each to a tailored retrieval/generation pipeline.",
      "Built a hybrid retrieval layer combining dense vector search (Mistral 1024-dim embeddings, Qdrant disk-based HNSW index) with BM25 sparse keyword matching, fused via Reciprocal Rank Fusion for balanced semantic and lexical relevance.",
      "Added cross-encoder reranking (ms-marco-MiniLM-L-2-v2) as a second-stage precision layer over top retrieval candidates before generation.",
      "Designed an agentic query-decomposition module that breaks multi-hop/comparative questions into sub-questions, retrieves context per sub-question, and synthesizes a unified answer.",
      "Implemented a Redis-backed semantic cache (cosine similarity >0.92, configurable TTL) to short-circuit repeated/similar queries, cutting redundant LLM calls and reducing response latency.",
      "Integrated a Tavily-powered web-search fallback for out-of-knowledge queries, Clerk-based auth (Google SSO) with per-user session/document isolation, and PostgreSQL (Neon) for persistent chat history.",
      "Instrumented the full pipeline with LangFuse and OpenTelemetry for distributed tracing, token-usage tracking, and per-stage latency breakdowns.",
      "Built and ran an automated RAGAS evaluation suite achieving 0.91 faithfulness, 0.87 answer relevancy, 0.86 context precision, 0.79 context recall, and a 0.86 composite score — exposed via a FastAPI + async SSE-streaming API and a React/Vite/Tailwind frontend.",
    ],
  },
  {
    slug: "funnx-ai",
    name: "FunnX.Ai",
    teaser:
      "A multi-LLM chat platform unifying Gemini and DeepSeek with a real-time 'Try Both' side-by-side comparison mode.",
    stack: [
      "Python",
      "Flask",
      "Streamlit",
      "Google Gemini API",
      "OpenRouter",
      "Gunicorn",
      "Render.com",
    ],
    bullets: [
      "Built a full-stack, open-source multi-LLM chat platform unifying Google Gemini and DeepSeek behind one workspace, removing the need to juggle multiple provider tabs or subscriptions.",
      "Engineered a Flask REST API backend paired with a Streamlit frontend, structured for clean separation between inference orchestration and the chat UI layer.",
      'Implemented a "Try Both" parallel-inference mode dispatching a single prompt concurrently to Gemini (Google Generative AI API) and DeepSeek (OpenRouter), returning both responses for real-time side-by-side comparison.',
      "Designed seamless mid-conversation model switching with session-state handling that preserves conversation context when the active model changes.",
      'Built a "Research Mode" — a distinct system-prompt configuration tuned for in-depth, multi-step analytical and academic-style responses.',
      "Implemented lightweight session-based authentication (simulated Google sign-in) to persist user sessions without heavyweight auth infrastructure.",
      "Managed configuration via environment-based secrets (python-dotenv) for provider API keys, keeping credentials out of source control.",
      "Deployed on Render.com with Gunicorn as the WSGI server, with a documented local dev setup (virtualenv, requirements.txt, dual-terminal Flask + Streamlit workflow) for open-source contributors under the MIT license.",
    ],
  },
];

export const certifications: Certification[] = [
  { title: "Full Stack Generative and Agentic AI with Python", issuer: "Udemy" },
  { title: "Supervised Machine Learning: Regression and Classification", issuer: "Coursera" },
  { title: "FastAPI with GenAI and AgenticAI project - From Basic to AI", issuer: "Udemy" },
  { title: "Python Programming Bootcamp", issuer: "Udemy" },
];

/**
 * Grounded context for the chatbot system prompt.
 */
export function buildChatbotContext(): string {
  const skillLines = skillCategories
    .map((c) => `${c.name}: ${c.skills.join(", ")}`)
    .join("\n");
  const expSections = experiences
    .map(
      (e) =>
        `— ${e.role} at ${e.company}${e.type ? ` (${e.type})` : ""} (${e.period}, ${e.location}):\n${e.bullets.map((b, i) => `  ${i + 1}. ${b.text}`).join("\n")}`
    )
    .join("\n\n");
  const projectLines = projects
    .map((p) => `${p.name} — ${p.teaser}\nStack: ${p.stack.join(", ")}\n${p.bullets.map((b) => `• ${b}`).join("\n")}`)
    .join("\n\n");
  const certLines = certifications.map((c) => `${c.title} — ${c.issuer}`).join("\n");

  return `You are a chatbot representing ${profile.fullName}, an ${profile.title}.
Answer questions about him based ONLY on the following information. Be warm, concise and conversational. If asked about fit for a job description, map his real experience to the requirements honestly without exaggeration. Never invent numbers or facts not listed here. If something is not covered, say so and suggest contacting him directly (${profile.contacts.email}).

ABOUT:
${profile.about}

LOCATION: ${profile.location}. Availability: ${profile.availability}.

EXPERIENCE:
${expSections}

EDUCATION:
${education.degree}, ${education.institution}, ${education.location} (${education.period})

PROJECTS:
${projectLines}

SKILLS:
${skillLines}

CERTIFICATIONS:
${certLines}`;
}
