import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const replies: { match: RegExp; reply: string }[] = [
  { match: /price|cost|pricing/i, reply: "Pilots start at ₹0 for the first 10 nodes. City-scale plans are quoted per square km." },
  { match: /privacy|gdpr|dpdp/i, reply: "Faces are blurred on-device. Only verified threats leave the node. We're GDPR & DPDP compliant." },
  { match: /install|deploy|setup/i, reply: "Our retrofit module clips into any standard streetlight in under 8 minutes — no civil work required." },
  { match: /demo|trial/i, reply: "Hit 'Try live detection' above to see camera + audio alerting in your browser, or message us for a city pilot." },
  { match: /help|sos|emergency/i, reply: "Detected. In a real deployment this would dispatch the nearest patrol with a 3-second evidence clip." },
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi, I'm Sentinel — SafeStreet's AI assistant. Ask me anything about deployment, privacy, or pricing." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const t = input.trim();
    if (!t) return;
    const next: Msg[] = [...msgs, { role: "user", text: t }];
    const r = replies.find((r) => r.match.test(t))?.reply ??
      "Great question — our team can walk you through this on a quick call. Drop a note in the contact form below.";
    setMsgs([...next, { role: "bot", text: r }]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chatbot"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground glow-cyan pulse-ring"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="glass fixed bottom-24 right-6 z-50 flex h-[460px] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl neon-border"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-secondary/60 text-primary"><Bot className="h-4 w-4" /></div>
              <div>
                <div className="text-sm font-semibold">Sentinel AI</div>
                <div className="text-[10px] text-neon-lime">● online</div>
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary/60"
                  }`}>{m.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing, privacy…"
                className="flex-1 rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button type="submit" className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground"><Send className="h-4 w-4" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
