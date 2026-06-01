import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2, Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type FormState = { name: string; email: string; organization: string; message: string };

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", organization: "", message: "" });

  const submit = useMutation({
    mutationFn: async (data: FormState) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to send message");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Message transmitted", { description: "Our team will reach out within 24 hours." });
      setForm({ name: "", email: "", organization: "", message: "" });
    },
    onError: (e: Error) => toast.error("Could not send", { description: e.message }),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.length > 100) return toast.error("Please enter a valid name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast.error("Please enter a valid email");
    if (!form.message.trim() || form.message.length > 2000) return toast.error("Message must be 1–2000 chars");
    submit.mutate(form);
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Contact</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Let's make your city safer.</h2>
            <p className="mt-4 text-muted-foreground">
              Pilot SafeStreet AI on a single block or roll it out citywide. Our team replies within one business day.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-secondary/60 text-primary glow-cyan"><Mail className="h-4 w-4" /></span>
                surakshavision123@gmail.com
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-secondary/60 text-accent"><Phone className="h-4 w-4" /></span>
                +91 80 0000 1234
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-secondary/60 text-neon-lime"><MapPin className="h-4 w-4" /></span>
                Bengaluru · Bangalore · Remote
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6 neon-border"
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" maxLength={100} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-background/50" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" maxLength={255} required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 bg-background/50" />
                </div>
                <div>
                  <Label htmlFor="org">Organization</Label>
                  <Input id="org" maxLength={150} value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="mt-1.5 bg-background/50" />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} maxLength={2000} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 bg-background/50" />
              </div>
              <Button type="submit" disabled={submit.isPending} className="bg-primary text-primary-foreground glow-cyan disabled:opacity-60">
                {submit.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Transmitting…</> : <><Send className="mr-2 h-4 w-4" /> Send message</>}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
