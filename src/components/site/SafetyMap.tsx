import { motion } from "framer-motion";
import { useState } from "react";

type Pin = { id: string; x: number; y: number; label: string; sev: "low" | "med" | "high" };

const pins: Pin[] = [
  { id: "p1", x: 22, y: 35, label: "Sector 14 — Distress", sev: "high" },
  { id: "p2", x: 48, y: 22, label: "MG Road — Crowd anomaly", sev: "med" },
  { id: "p3", x: 70, y: 55, label: "Pier 7 — Loud altercation", sev: "high" },
  { id: "p4", x: 35, y: 70, label: "Park Lane — All clear", sev: "low" },
  { id: "p5", x: 82, y: 30, label: "Bus Stand — Object", sev: "low" },
  { id: "p6", x: 60, y: 78, label: "5th Ave — Patrol active", sev: "med" },
];

const sevDot: Record<Pin["sev"], string> = {
  high: "bg-neon-pink shadow-[0_0_20px_oklch(0.72_0.27_0/0.8)]",
  med: "bg-accent shadow-[0_0_20px_oklch(0.7_0.25_300/0.7)]",
  low: "bg-neon-lime shadow-[0_0_20px_oklch(0.88_0.22_130/0.7)]",
};

export function SafetyMap() {
  const [active, setActive] = useState<Pin | null>(null);
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Interactive map</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">A heartbeat for every block.</h2>
          <p className="mt-3 text-muted-foreground">Hover the pulses to inspect live activity across the grid.</p>
        </div>

        <div className="mt-12 glass relative overflow-hidden rounded-2xl p-2 neon-border">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-background/40">
            <div className="absolute inset-0 grid-bg opacity-40" />
            {/* fake roads */}
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 56" preserveAspectRatio="none">
              <path d="M0 18 L100 22" stroke="oklch(0.85 0.18 200)" strokeWidth="0.2" />
              <path d="M0 38 L100 34" stroke="oklch(0.85 0.18 200)" strokeWidth="0.2" />
              <path d="M25 0 L28 56" stroke="oklch(0.7 0.25 300)" strokeWidth="0.2" />
              <path d="M55 0 L60 56" stroke="oklch(0.7 0.25 300)" strokeWidth="0.2" />
              <path d="M80 0 L82 56" stroke="oklch(0.7 0.25 300)" strokeWidth="0.2" />
            </svg>

            {pins.map((p) => (
              <button
                key={p.id}
                onMouseEnter={() => setActive(p)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(p)}
                className="absolute"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
              >
                <span className={`relative grid h-3 w-3 place-items-center rounded-full ${sevDot[p.sev]}`}>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50" />
                </span>
              </button>
            ))}

            {active && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute glass z-10 rounded-lg border border-border px-3 py-2 text-xs"
                style={{ left: `${active.x}%`, top: `${active.y}%`, transform: "translate(-50%, -180%)" }}
              >
                <div className="font-semibold">{active.label}</div>
                <div className="text-muted-foreground">Severity: {active.sev.toUpperCase()}</div>
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${sevDot.high}`} /> High</span>
            <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${sevDot.med}`} /> Medium</span>
            <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${sevDot.low}`} /> Low / Patrol</span>
          </div>
        </div>
      </div>
    </section>
  );
}
