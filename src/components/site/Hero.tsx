import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Activity, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-accent/30 blur-[120px]" />
      <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Live AI surveillance · v2.4
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl">
            Streetlights that <span className="text-gradient-neon">see, hear</span> and{" "}
            <span className="text-gradient-neon">act</span>.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            SafeStreet AI transforms ordinary streetlights into intelligent public-safety nodes —
            detecting violence, accidents and distress in real time, then dispatching responders in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground glow-cyan">
              <a href="#detect"><Zap className="mr-2 h-4 w-4" /> Try live detection</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
              <a href="#dashboard"><Activity className="mr-2 h-4 w-4" /> See the dashboard</a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-left">
            {[
              { k: "12,400+", v: "Nodes deployed" },
              { k: "< 2.4s", v: "Avg dispatch" },
              { k: "98.7%", v: "Detection precision" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-gradient-neon md:text-2xl">{s.k}</div>
                <div className="text-[11px] text-muted-foreground md:text-xs">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="glass relative overflow-hidden rounded-2xl p-1 neon-border">
            <div className="scanline relative aspect-[16/9] overflow-hidden rounded-xl bg-background/60">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="relative border border-border/40">
                    <div className="absolute left-2 top-2 rounded-sm bg-background/70 px-1.5 py-0.5 text-[10px] text-primary">
                      CAM-{(i + 1).toString().padStart(2, "0")}
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-sm bg-background/70 px-1.5 py-0.5 text-[10px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-lime pulse-ring" />
                      LIVE
                    </div>
                    <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
