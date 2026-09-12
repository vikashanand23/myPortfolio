import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isPlaceholder, personal, socials } from "@/data/portfolio";

function useUptime() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

export function Footer() {
  const uptime = useUptime();
  const links = socials.filter((s) => ["github", "linkedin", "email"].includes(s.id));

  return (
    <footer className="mt-24 border-t border-border/70 bg-surface/50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-base font-semibold">{personal.name}</p>
          <p className="text-sm text-muted-foreground">{personal.title}</p>
          <p className="prompt-label mt-4">
            $ uptime
            <span className="ml-2 inline-flex items-center gap-1.5 text-terminal-success">
              <span className="h-1.5 w-1.5 rounded-full bg-terminal-success" aria-hidden />
              Portfolio online · {uptime}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="prompt-label">$ ls ~/links</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((social) =>
              isPlaceholder(social.url) ? (
                <li key={social.id} className="text-muted-foreground">
                  {social.label} <span className="font-mono text-xs">(not configured)</span>
                </li>
              ) : (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {social.label}
                  </a>
                </li>
              ),
            )}
            <li>
              <Link to="/terminal" className="text-muted-foreground transition-colors hover:text-primary">
                Terminal
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 py-4">
        <p className="mx-auto w-full max-w-6xl px-4 font-mono text-xs text-muted-foreground sm:px-6">
          Built with React • TypeScript • ❤️
        </p>
      </div>
    </footer>
  );
}
