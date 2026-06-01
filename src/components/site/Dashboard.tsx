import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  RadialBar, RadialBarChart, PolarAngleAxis,
} from "recharts";
import { AlertTriangle, Bell, MapPin, Activity } from "lucide-react";

const initialSeries = Array.from({ length: 24 }, (_, i) => ({
  hr: `${i}:00`,
  alerts: Math.round(8 + Math.sin(i / 2) * 6 + Math.random() * 5),
}));

const radial = [{ name: "Coverage", value: 87, fill: "oklch(0.85 0.18 200)" }];

const incidents = [
  { id: "INC-2031", type: "Distress call", area: "Sector 14", sev: "High" },
  { id: "INC-2032", type: "Crowd anomaly", area: "MG Road", sev: "Med" },
  { id: "INC-2033", type: "Abandoned object", area: "Bus Stand", sev: "Low" },
  { id: "INC-2034", type: "Loud altercation", area: "Pier 7", sev: "High" },
];

const sevColor = (s: string) =>
  s === "High" ? "text-neon-pink" : s === "Med" ? "text-accent" : "text-neon-lime";

export function Dashboard() {
  const [series, setSeries] = useState(initialSeries);

  useEffect(() => {
    const t = setInterval(() => {
      setSeries((s) => {
        const next = [...s.slice(1), {
          hr: s[s.length - 1].hr,
          alerts: Math.max(2, Math.round(s[s.length - 1].alerts + (Math.random() - 0.5) * 6)),
        }];
        return next;
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="dashboard" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Live Dashboard</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Command center, in your browser.</h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Alert intensity (24h)</h3>
                <p className="text-xs text-muted-foreground">Streaming · refreshes every 2s</p>
              </div>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hr" stroke="oklch(0.6 0.02 250)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.02 250)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.18 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="alerts" stroke="oklch(0.85 0.18 200)" fill="url(#g1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">City coverage</h3>
              <MapPin className="h-5 w-5 text-accent" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="65%" outerRadius="100%" data={radial} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar background={{ fill: "oklch(1 0 0 / 0.06)" }} dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="-mt-44 text-center">
              <div className="font-display text-3xl font-bold text-gradient-neon">87%</div>
              <div className="text-xs text-muted-foreground">of registered nodes online</div>
            </div>
            <div className="mt-32 grid grid-cols-3 gap-2 text-center text-xs">
              <div><div className="font-bold text-primary">12.4k</div><div className="text-muted-foreground">Nodes</div></div>
              <div><div className="font-bold text-accent">312</div><div className="text-muted-foreground">Active</div></div>
              <div><div className="font-bold text-neon-pink">7</div><div className="text-muted-foreground">Critical</div></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-5 lg:col-span-3">
            <div className="mb-3 flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Recent incidents</h3>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Area</th>
                    <th className="px-4 py-2 text-left">Severity</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((i) => (
                    <tr key={i.id} className="border-t border-border/60 hover:bg-secondary/20">
                      <td className="px-4 py-3 font-mono text-xs text-primary">{i.id}</td>
                      <td className="px-4 py-3">{i.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{i.area}</td>
                      <td className={`px-4 py-3 font-semibold ${sevColor(i.sev)}`}>
                        <span className="inline-flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5" />{i.sev}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] text-neon-lime">Dispatched</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
