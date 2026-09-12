import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { SafeImage } from "@/components/Placeholders";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <SafeImage
        src={project.screenshots[0]?.src ?? ""}
        alt={project.screenshots[0]?.alt ?? `${project.name} preview`}
        aspect="aspect-[16/9]"
        className="rounded-none border-0 border-b border-border"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <span className="prompt-label whitespace-nowrap">{project.status}</span>
        </div>
        <p className="mt-1 text-sm text-primary">{project.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <Link
          to="/projects/$projectId"
          params={{ projectId: project.id }}
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-primary underline-offset-4 hover:underline"
        >
          cat {project.id}.md
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
