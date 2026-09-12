import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { navItems, personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-raised font-mono text-xs text-primary"
          >
            v&gt;
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-semibold">{personal.name}</span>
            <span className="prompt-label truncate">~/vikash</span>
          </span>
        </Link>

        <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onOpenPalette}
          className="ml-auto flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground lg:ml-2"
          aria-label="Open search palette"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-border bg-background px-1 font-mono text-[10px] sm:inline">
            Ctrl K
          </kbd>
        </button>

        <button
          type="button"
          className="rounded-md border border-border p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border/70 bg-background transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[32rem]" : "max-h-0",
        )}
      >
        <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-1 px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 font-mono text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
