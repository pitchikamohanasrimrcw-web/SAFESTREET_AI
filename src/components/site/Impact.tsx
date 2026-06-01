import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString() + suffix);
  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { v: 12400, s: "+", t: "Streetlights upgraded" },
  { v: 38000, s: "+", t: "Incidents resolved" },
  { v: 62, s: "%", t: "Reduction in response time" },
  { v: 18, s: "", t: "Cities deployed" },
];

export function Impact() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Impact</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Numbers that move the needle.</h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((st) => (
            <div key={st.t} className="glass rounded-2xl p-6 text-center neon-border">
              <div className="font-display text-4xl font-bold text-gradient-neon md:text-5xl">
                <Counter value={st.v} suffix={st.s} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground md:text-sm">{st.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
