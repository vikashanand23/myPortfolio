import { useEffect, useState, type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";

export function SiteLayout({
  children,
  fullBleed = false,
}: {
  children: ReactNode;
  fullBleed?: boolean;
}) {
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main" className="flex-1">
        {fullBleed ? (
          children
        ) : (
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">{children}</div>
        )}
      </main>
      {!fullBleed && <Footer />}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}

export function PageHeader({
  command,
  title,
  description,
}: {
  command: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="animate-rise mb-10 max-w-3xl">
      <p className="prompt-label text-primary">{command}</p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
