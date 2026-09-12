import { Link } from "@tanstack/react-router";
import type { TimelineEntry } from "@/data/portfolio";
import { isPlaceholder } from "@/data/portfolio";
import { Value } from "@/components/Placeholders";
import { toRoute } from "@/lib/routes";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const sorted = [...entries].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  return (
    <ol className="relative space-y-6 border-l border-border pl-6 sm:pl-8">
      {sorted.map((entry, index) => (
        <li
          key={entry.id}
          className="animate-rise relative"
          style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
        >
          <span
            aria-hidden
            className="absolute -left-[1.68rem] top-2 h-2.5 w-2.5 rounded-full border border-primary bg-background sm:-left-[2.18rem]"
          />
          <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
            <div className="flex flex-wrap items-center gap-3">
              <span className="prompt-label text-primary">
                {isPlaceholder(entry.date) ? "date tbd" : entry.date}
              </span>
              <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                {entry.category}
              </span>
            </div>
            <h3 className="mt-2 text-base font-semibold">
              <Value value={entry.title} />
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              <Value value={entry.description} />
            </p>
            {entry.route && (
              <Link
                to={toRoute(entry.route)}
                className="mt-3 inline-block font-mono text-xs text-primary underline-offset-4 hover:underline"
              >
                open →
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
