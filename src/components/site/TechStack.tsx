import { motion } from "framer-motion";

const stack = [
  "PyTorch", "YOLOv8", "Whisper", "OpenCV", "TensorRT", "Edge TPU",
  "WebRTC", "Kafka", "PostgreSQL", "Supabase", "React", "Tailwind",
  "Framer Motion", "Node.js", "FastAPI", "Docker",
];

export function TechStack() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Tech stack</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Built on the edge, scaled in the cloud.</h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {stack.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className="glass rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
