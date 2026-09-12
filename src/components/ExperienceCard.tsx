import type { Experience } from "@/data/portfolio";
import { Value } from "@/components/Placeholders";

export function ExperienceCard({ item }: { item: Experience }) {
  return (
    <article className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{item.role}</h3>
          <p className="text-sm text-muted-foreground">
            {item.company}
            {item.type ? ` · ${item.type}` : ""}
          </p>
        </div>
        <p className="prompt-label whitespace-nowrap">
          {item.start} – {item.end}
          {item.current && (
            <span className="ml-2 inline-flex items-center gap-1 text-terminal-success">
              <span className="h-1.5 w-1.5 rounded-full bg-terminal-success" aria-hidden />
              current
            </span>
          )}
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h4 className="prompt-label">$ cat responsibilities</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {item.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                <Value value={r} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="prompt-label">$ cat achievements</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {item.achievements.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                <Value value={a} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {item.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
