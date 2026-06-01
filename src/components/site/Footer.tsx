import { Shield, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg neon-border glow-cyan"><Shield className="h-5 w-5 text-primary" /></div>
              <span className="font-display text-lg font-bold">Safe<span className="text-gradient-neon">Street</span> AI</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Smart-city public safety, powered by edge AI. Turning streetlights into intelligent guardians.
            </p>
            <div className="mt-4 flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary">Features</a></li>
              <li><a href="#dashboard" className="hover:text-primary">Dashboard</a></li>
              <li><a href="#detect" className="hover:text-primary">Live demo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary">About</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} SafeStreet AI. All rights reserved.</span>
          <span>Made for safer streets.</span>
        </div>
      </div>
    </footer>
  );
}
