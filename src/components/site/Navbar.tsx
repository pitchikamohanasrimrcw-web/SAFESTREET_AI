import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#detect", label: "Live Detect" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ theme, onToggleTheme }: { theme: "dark" | "light"; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg neon-border glow-cyan">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-lg font-bold tracking-wide">
            Safe<span className="text-gradient-neon">Street</span> AI
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-primary"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <Button asChild variant="default" className="bg-primary text-primary-foreground glow-cyan hover:opacity-90">
            <a href="#contact">Request demo</a>
          </Button>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="md:hidden" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="glass border-t border-border md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/40 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="flex-1 rounded-md border border-border bg-secondary/40 px-3 py-2 text-xs"
              >
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-xs text-primary-foreground glow-cyan"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
