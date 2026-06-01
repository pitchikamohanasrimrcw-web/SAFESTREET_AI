import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CameraOff, Mic, MicOff, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const KEYWORDS = ["help", "i am in danger", "save me", "emergency", "fire", "police", "danger"];

type Alert = { id: string; t: string; kind: "audio" | "motion"; detail: string };

export function LiveDetect() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recognitionRef = useRef<any>(null);
  const motionRafRef = useRef<number | null>(null);
  const prevFrameRef = useRef<ImageData | null>(null);

  const [camOn, setCamOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [motionLevel, setMotionLevel] = useState(0);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) setSupported(false);
    }
  }, []);

  const pushAlert = (a: Omit<Alert, "id" | "t">) => {
    const alert: Alert = { ...a, id: crypto.randomUUID(), t: new Date().toLocaleTimeString() };
    setAlerts((prev) => [alert, ...prev].slice(0, 8));
    toast.error("Emergency detected", { description: a.detail });
    try {
      // Audio alarm — short beep
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine"; o.frequency.value = 880;
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      o.start(); o.stop(ctx.currentTime + 0.65);
    } catch {}
  };

  const startCam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamOn(true);
      runMotionDetection();
    } catch {
      toast.error("Camera permission denied");
    }
  };

  const stopCam = () => {
    const s = videoRef.current?.srcObject as MediaStream | null;
    s?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    if (motionRafRef.current) cancelAnimationFrame(motionRafRef.current);
    prevFrameRef.current = null;
    setCamOn(false);
    setMotionLevel(0);
  };

  const runMotionDetection = () => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    c.width = 160; c.height = 90;

    let lastAlert = 0;
    const tick = () => {
      if (!v.videoWidth) { motionRafRef.current = requestAnimationFrame(tick); return; }
      ctx.drawImage(v, 0, 0, c.width, c.height);
      const frame = ctx.getImageData(0, 0, c.width, c.height);
      if (prevFrameRef.current) {
        let diff = 0;
        const a = frame.data, b = prevFrameRef.current.data;
        for (let i = 0; i < a.length; i += 16) {
          diff += Math.abs(a[i] - b[i]);
        }
        const norm = Math.min(100, (diff / (a.length / 16)) * 1.2);
        setMotionLevel(norm);
        if (norm > 65 && Date.now() - lastAlert > 4000) {
          lastAlert = Date.now();
          pushAlert({ kind: "motion", detail: `Sudden motion anomaly detected (${norm.toFixed(0)}%)` });
        }
      }
      prevFrameRef.current = frame;
      motionRafRef.current = requestAnimationFrame(tick);
    };
    motionRafRef.current = requestAnimationFrame(tick);
  };

  const startMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { toast.error("Speech recognition not supported in this browser"); return; }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (e: any) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        text += e.results[i][0].transcript + " ";
      }
      const lower = text.toLowerCase();
      setTranscript(lower);
      const hit = KEYWORDS.find((k) => lower.includes(k));
      if (hit) {
        pushAlert({ kind: "audio", detail: `Distress keyword detected: "${hit}"` });
        setTranscript("");
      }
    };
    rec.onerror = () => {};
    rec.onend = () => { if (micOn) try { rec.start(); } catch {} };
    rec.start();
    recognitionRef.current = rec;
    setMicOn(true);
  };

  const stopMic = () => {
    try { recognitionRef.current?.stop(); } catch {}
    recognitionRef.current = null;
    setMicOn(false);
    setTranscript("");
  };

  useEffect(() => () => { stopCam(); stopMic(); }, []);

  return (
    <section id="detect" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Live demo</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Camera + Audio detection, in your browser.</h2>
          <p className="mt-3 text-muted-foreground">
            Allow camera/mic to simulate a SafeStreet node. Say <em>"help"</em> or <em>"I am in danger"</em>, or move quickly in front of the lens.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="glass relative overflow-hidden rounded-2xl p-2 neon-border">
            <div className="scanline relative aspect-video overflow-hidden rounded-xl bg-background/60">
              <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />
              {!camOn && (
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-secondary/60 text-primary glow-cyan">
                      <Camera className="h-7 w-7" />
                    </div>
                    <p className="text-sm text-muted-foreground">Camera offline</p>
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />

              {camOn && (
                <>
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-background/70 px-2 py-1 text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-neon-lime pulse-ring" /> CAM-DEMO · LIVE
                  </div>
                  <div className="absolute right-3 top-3 rounded-md bg-background/70 px-2 py-1 text-[11px]">
                    Motion: <span className="font-bold text-primary">{motionLevel.toFixed(0)}%</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 h-1 overflow-hidden rounded bg-background/60">
                    <div className="h-full bg-gradient-to-r from-neon-lime via-accent to-neon-pink transition-all" style={{ width: `${motionLevel}%` }} />
                  </div>
                </>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2 px-1">
              <Button onClick={camOn ? stopCam : startCam} className={camOn ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground glow-cyan"}>
                {camOn ? <><CameraOff className="mr-2 h-4 w-4" /> Stop camera</> : <><Camera className="mr-2 h-4 w-4" /> Start camera</>}
              </Button>
              <Button onClick={micOn ? stopMic : startMic} disabled={!supported} variant="outline" className="border-accent text-accent hover:bg-accent/10">
                {micOn ? <><MicOff className="mr-2 h-4 w-4" /> Stop mic</> : <><Mic className="mr-2 h-4 w-4" /> Start mic</>}
              </Button>
              {!supported && <span className="text-xs text-muted-foreground self-center">Audio detection works in Chrome / Edge</span>}
            </div>

            {transcript && (
              <div className="mt-2 px-1 text-xs text-muted-foreground">
                <span className="text-primary">▸ heard:</span> {transcript}
              </div>
            )}
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Alert feed</h3>
              {alerts.length === 0 ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-neon-lime"><ShieldCheck className="h-3.5 w-3.5" /> All clear</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-neon-pink"><AlertTriangle className="h-3.5 w-3.5" /> {alerts.length} alerts</span>
              )}
            </div>

            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {alerts.length === 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
                    No incidents detected. Try shouting <em>"help"</em> with the mic on, or wave at the camera.
                  </motion.p>
                )}
                {alerts.map((a) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="rounded-lg border border-border bg-secondary/40 p-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-primary">{a.kind === "audio" ? "AUDIO-ALERT" : "MOTION-ALERT"}</span>
                      <span className="text-muted-foreground">{a.t}</span>
                    </div>
                    <div className="mt-1 text-sm">{a.detail}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-wider text-neon-lime">› dispatched to nearest patrol</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
