"use client";

/**
 * Floating chatbot — editorial-styled panel, Groq-backed replies
 * grounded in lib/data.ts via /api/chat.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Hey — I'm Kishlay's AI twin. I can walk you through his Python + FastAPI backends, his adaptive-RAG and multi-LLM systems, and the year he spent evaluating agent workflows at Keywords Studios. Want to know if he fits a role? Paste the JD and I'll give you an honest read.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [open, messages, loading]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Sorry — something glitched. Try again in a moment.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Network hiccup — couldn't reach the chatbot. Please try again, or use the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor="magnetic"
        aria-label={open ? "Close chatbot" : "Open chatbot — ask about Kishlay"}
        aria-expanded={open}
        whileHover={{ y: -2 }}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border-2 border-ink bg-cobalt px-3.5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-paper shadow-card-sm md:bottom-6 md:right-6 md:px-4"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -12, y: 4 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, rotate: 12, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2.5"
          >
            {open ? (
              <>
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
                <span>Close</span>
              </>
            ) : (
              <>
                {/* Chat bubble with a spark — reads clearly as a chatbot */}
                <span className="relative">
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span
                    aria-hidden="true"
                    className="absolute -right-1.5 -top-1.5 text-[10px] leading-none text-vermilion"
                  >
                    ✦
                  </span>
                </span>
                <span className="hidden sm:inline">Ask me about Kishlay</span>
                <span className="sm:hidden">Ask Kishlay</span>
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Chat with Kishlay's assistant"
            className="fixed bottom-24 right-4 left-4 z-50 flex h-[min(65dvh,520px)] flex-col overflow-hidden rounded-xl border-2 border-ink bg-paper shadow-card md:bottom-24 md:left-auto md:right-6 md:h-[480px] md:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-3">
              <p className="font-display text-sm font-bold italic text-paper">
                Ask Kishlay<span className="text-vermilion">.</span>
              </p>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-lg border px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/25 bg-paper-card text-ink"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-lg border border-ink/25 bg-paper-card px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-ink/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.7,
                          delay: d * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={send}
              className="flex items-center gap-2 border-t-2 border-ink bg-paper-card px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything, or paste a JD…"
                aria-label="Message"
                className="flex-1 rounded-md border border-ink/25 bg-paper px-3 py-2.5 text-sm focus:border-cobalt focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                data-cursor="magnetic"
                aria-label="Send message"
                className="rounded-md border-2 border-ink bg-vermilion px-3.5 py-2 font-mono text-xs font-semibold uppercase text-paper transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-50"
              >
                Send ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
