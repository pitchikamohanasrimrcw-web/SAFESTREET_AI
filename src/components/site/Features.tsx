import { motion } from "framer-motion";
import {
  Camera, Mic, Siren, Brain, Radio, ShieldAlert, MapPin, Cpu,
} from "lucide-react";

const features = [
  { icon: Camera, title: "AI Vision Surveillance", desc: "Computer-vision models detect fights, falls, crowd panic and abandoned objects across thousands of feeds." },
  { icon: Mic, title: "Audio Distress Detection", desc: "On-device speech models flag keywords like 'help', 'save me' and gunshots within milliseconds." },
  { icon: Siren, title: "Instant SOS Dispatch", desc: "Verified incidents auto-route to the nearest patrol, hospital or control room with live evidence." },
  { icon: Brain, title: "Anomaly Intelligence", desc: "Behavior baselines per street, per hour. Anything unusual is surfaced — never the routine." },
  { icon: Radio, title: "Real-time Mesh", desc: "Edge nodes coordinate over a low-latency mesh so a single light becomes a citywide network." },
  { icon: ShieldAlert, title: "Private by Design", desc: "Faces blurred at the edge. Only verified threats leave the device. GDPR & DPDP compliant." },
  { icon: MapPin, title: "Geo Heatmaps", desc: "Predictive risk maps show where to deploy patrols before an incident happens." },
  { icon: Cpu, title: "Plug-in to Any Pole", desc: "Retrofit module fits standard streetlight housings — no civil work, online in minutes." },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Capabilities</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">A safety stack for the smart city</h2>
          <p className="mt-3 text-muted-foreground">Eight layers of detection, decisioning and dispatch — running on the lights you already own.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass group relative overflow-hidden rounded-2xl p-5"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl transition-all group-hover:bg-primary/20" />
              <div className="relative">
                <div className="mb-4 inline-grid h-10 w-10 place-items-center rounded-lg bg-secondary/60 text-primary glow-cyan">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
