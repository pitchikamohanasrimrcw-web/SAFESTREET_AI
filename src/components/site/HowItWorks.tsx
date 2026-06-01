import { motion } from "framer-motion";

const steps = [
  { n: "01", t: "Sense", d: "Edge cameras + mic arrays inside each streetlight stream encrypted signals into local AI." },
  { n: "02", t: "Reason", d: "Multimodal models fuse audio + video to classify incidents and rank severity." },
  { n: "03", t: "Verify", d: "A second model cross-checks against historical baselines to suppress false alarms." },
  { n: "04", t: "Dispatch", d: "SOS payload — location, evidence clip, severity — is pushed to the nearest responder." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">How it works</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">From signal to siren in under 3 seconds.</h2>
            <p className="mt-4 text-muted-foreground">Every node runs the full perception → decision → dispatch loop locally. The cloud only sees what matters.</p>
          </div>

          <ol className="relative space-y-5 border-l border-border pl-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass relative rounded-xl p-5"
              >
                <span className="absolute -left-[34px] top-5 grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground glow-cyan">
                  {s.n.slice(-1)}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-xs text-primary">{s.n}</span>
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
