import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">About</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              We don't add cameras to the city. <span className="text-gradient-neon">We give the city eyes.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              SafeStreet AI is a public-safety platform that retrofits existing streetlights with edge AI —
              fusing computer vision and audio analysis to detect violence, accidents, and distress in real time.
            </p>
            <p className="mt-3 text-muted-foreground">
              Once an emergency is recognized, we trigger SOS alerts, capture verified evidence and route the
              incident to the nearest patrol, hospital or control room — all in under three seconds.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["Edge-first", "All inference runs on the pole."],
                ["Privacy native", "Faces blurred before bytes leave the node."],
                ["Plug & play", "Fits any standard streetlight."],
                ["Open API", "Integrates with city control rooms."],
              ].map(([t, d]) => (
                <div key={t} className="glass rounded-xl p-4">
                  <div className="text-sm font-semibold text-primary">{t}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
            <div className="glass float relative aspect-square overflow-hidden rounded-3xl p-6 neon-border">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative grid h-full place-items-center">
                <div className="relative">
                  <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/20 blur-3xl" />
                  <svg viewBox="0 0 200 200" className="h-64 w-64">
                    <defs>
                      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.85 0.18 200)" />
                        <stop offset="100%" stopColor="oklch(0.7 0.25 300)" />
                      </linearGradient>
                    </defs>
                    {/* streetlight pole */}
                    <line x1="100" y1="60" x2="100" y2="180" stroke="url(#lg)" strokeWidth="3" />
                    <line x1="100" y1="60" x2="155" y2="60" stroke="url(#lg)" strokeWidth="3" />
                    <circle cx="155" cy="60" r="10" fill="url(#lg)" />
                    {/* signal rings */}
                    {[20, 40, 60, 80].map((r, i) => (
                      <circle key={i} cx="155" cy="60" r={r} fill="none" stroke="oklch(0.85 0.18 200)" strokeOpacity={0.5 - i * 0.1} strokeWidth="1">
                        <animate attributeName="r" from={r} to={r + 20} dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                        <animate attributeName="opacity" from="0.5" to="0" dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                      </circle>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
