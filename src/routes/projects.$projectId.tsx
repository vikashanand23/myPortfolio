import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { SafeImage, Value } from "@/components/Placeholders";
import { isPlaceholder, projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project unavailable — Vikash Anand" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `vikash@portfolio:~$/${project.name}` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.name} — Project by Vikash Anand` },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${project.id}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${project.id}` }],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <SiteLayout>
      <PageHeader
        command="$ cat project"
        title="Project not found"
        description="That project does not exist (yet)."
      />
      <Link
        to="/projects"
        className="font-mono text-sm text-primary underline-offset-4 hover:underline"
      >
        ← back to projects
      </Link>
    </SiteLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="prompt-label text-primary">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <SiteLayout>
      <PageHeader
        command={`$ cat ~/projects/${project.id}.md`}
        title={project.name}
        description={project.tagline}
      />

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-muted-foreground">
          status: {project.status}
        </span>
        <span className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-muted-foreground">
          year: {isPlaceholder(project.year) ? "tbd" : project.year}
        </span>
        {!isPlaceholder(project.githubUrl) && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm hover:border-primary/60"
          >
            <Github className="h-4 w-4" aria-hidden /> GitHub
          </a>
        )}
        {!isPlaceholder(project.liveUrl) && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm hover:border-primary/60"
          >
            <ExternalLink className="h-4 w-4" aria-hidden /> Live demo
          </a>
        )}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Block title="$ cat problem.md">{project.problem}</Block>
        <Block title="$ cat solution.md">{project.solution}</Block>
        <Block title="$ cat architecture.md">{project.architecture}</Block>
        <Block title="$ cat responsibilities.md">
          <ul className="space-y-1.5">
            {project.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                <Value value={item} />
              </li>
            ))}
          </ul>
        </Block>
        <Block title="$ cat stack.txt">
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="$ cat results.md">
          <ul className="space-y-1.5">
            {project.results.map((item, i) => (
              <li key={i}>
                <Value value={item} />
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <section className="mt-12" aria-labelledby="screenshots">
        <h2 id="screenshots" className="prompt-label text-primary">
          $ ls screenshots/
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {project.screenshots.map((shot) => (
            <SafeImage key={shot.src} src={shot.src} alt={shot.alt} aspect="aspect-[16/10]" />
          ))}
        </div>
      </section>

      {project.architectureDiagram && (
        <section className="mt-12" aria-labelledby="diagram">
          <h2 id="diagram" className="prompt-label text-primary">
            $ open architecture-diagram
          </h2>
          <div className="mt-4">
            <SafeImage
              src={project.architectureDiagram.src}
              alt={project.architectureDiagram.alt}
              aspect="aspect-[16/9]"
            />
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link
          to="/projects"
          className="font-mono text-sm text-primary underline-offset-4 hover:underline"
        >
          ← back to projects
        </Link>
      </div>
    </SiteLayout>
  );
}
