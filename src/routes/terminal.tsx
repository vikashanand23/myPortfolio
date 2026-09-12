import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { Terminal } from "@/components/Terminal";

export const Route = createFileRoute("/terminal")({
  head: () => ({
    meta: [
      { title: "Terminal — Vikash Anand" },
      {
        name: "description",
        content:
          "An interactive Linux-style terminal for exploring Vikash Anand's portfolio. Type help, find kubernetes, or project grimmspot.",
      },
      { property: "og:title", content: "Terminal — Vikash Anand" },
      { property: "og:description", content: "Explore the portfolio with commands: help, whoami, projects, find." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terminal" },
    ],
    links: [{ rel: "canonical", href: "/terminal" }],
  }),
  component: TerminalPage,
});

function TerminalPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main className="flex flex-1 flex-col px-3 pb-4 pt-3 sm:px-6 sm:pb-6">
        <h1 className="sr-only">Interactive terminal</h1>
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
          <Terminal onOpenPalette={() => setPaletteOpen(true)} />
        </div>
      </main>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
