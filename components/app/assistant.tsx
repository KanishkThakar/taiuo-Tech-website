"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ScanFace, Send, Sparkles, SunMoon, X } from "lucide-react";
import { useTheme } from "@/components/app/theme";
import {
  ASSISTANT_SUGGESTIONS,
  matchAnswer,
  type AssistantAction,
  type AssistantReply,
} from "@/lib/product/assistant";

interface Msg {
  id: number;
  role: "user" | "assistant";
  text: string;
  actions?: AssistantAction[] | undefined;
}

interface AssistantCtx {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = createContext<AssistantCtx | null>(null);

export function useAssistant(): AssistantCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAssistant must be used within <AssistantProvider>");
  return ctx;
}

const GREETING: Msg = {
  id: 0,
  role: "assistant",
  text: "Hi — I'm your Taiuo guide. Ask me about scans, your score, privacy, or how to improve. I answer from a built-in guide, so nothing you type leaves your device.",
};

export function AssistantProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { resolved, setChoice } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || thinking) return;
    setInput("");
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: q }]);
    setThinking(true);
    const reply: AssistantReply = matchAnswer(q);
    // brief delay so the reply reads as a considered response, not an instant lookup
    timer.current = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", text: reply.text, actions: reply.actions },
      ]);
      setThinking(false);
    }, 450);
  };

  const runAction = (a: AssistantAction) => {
    if (a.kind === "theme") setChoice(resolved === "dark" ? "light" : "dark");
    else if (a.kind === "scan") {
      setOpen(false);
      router.push("/scan");
    } else if (a.kind === "route" && a.href) {
      setOpen(false);
      router.push(a.href);
    }
  };

  const actionIcon = (a: AssistantAction) =>
    a.kind === "theme" ? SunMoon : a.kind === "scan" ? ScanFace : ArrowRight;

  return (
    <Ctx.Provider value={{ open, setOpen }}>
      {children}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close assistant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[91] flex w-full max-w-[420px] flex-col border-l border-line bg-surface"
              role="dialog"
              aria-label="Taiuo assistant"
            >
              <header className="flex items-center justify-between border-b border-line px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-sage-base/15 text-[color:var(--sage-accent)]">
                    <Sparkles className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Assistant</p>
                    <p className="text-[11px] text-faint">Built-in guide · private</p>
                  </div>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="icon-btn" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {messages.map((m) => (
                  <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                    <div className={m.role === "user" ? "max-w-[80%]" : "w-full"}>
                      <div
                        className={
                          m.role === "user"
                            ? "rounded-2xl rounded-br-md bg-[#181e1d] px-3.5 py-2.5 text-[14px] text-white"
                            : "rounded-2xl rounded-bl-md bg-surface-2 px-3.5 py-2.5 text-[14px] leading-relaxed text-ink"
                        }
                      >
                        {m.text}
                      </div>
                      {m.actions && m.actions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {m.actions.map((a) => {
                            const Icon = actionIcon(a);
                            return (
                              <button
                                key={a.label}
                                onClick={() => runAction(a)}
                                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-sage-base/50"
                              >
                                <Icon className="h-3.5 w-3.5 text-sage-mid" strokeWidth={2} />
                                {a.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {thinking && (
                  <div className="flex gap-1 px-1" aria-label="Assistant is typing">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-faint"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}

                {messages.length === 1 && (
                  <div className="grid gap-2 pt-1">
                    {ASSISTANT_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => ask(s)}
                        className="rounded-xl border border-line px-3.5 py-2.5 text-left text-[13.5px] text-body transition-colors hover:border-sage-base/50 hover:text-ink"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
                className="border-t border-line p-3"
              >
                <div className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-1.5 focus-within:border-sage-mid">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about using Taiuo…"
                    aria-label="Ask the assistant"
                    className="flex-1 bg-transparent py-1.5 text-[14px] text-ink outline-none placeholder:text-faint"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || thinking}
                    aria-label="Send"
                    className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-[#181e1d] text-white transition-opacity disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
