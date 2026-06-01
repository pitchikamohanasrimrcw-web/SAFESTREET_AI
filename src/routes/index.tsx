import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Dashboard } from "@/components/site/Dashboard";
import { TechStack } from "@/components/site/TechStack";
import { Impact } from "@/components/site/Impact";
import { SafetyMap } from "@/components/site/SafetyMap";
import { LiveDetect } from "@/components/site/LiveDetect";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Chatbot } from "@/components/site/Chatbot";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const stored = (localStorage.getItem("ss-theme") as "dark" | "light") || "dark";
    setTheme(stored);
  }, []);
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("ss-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Dashboard />
        <TechStack />
        <Impact />
        <SafetyMap />
        <LiveDetect />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
