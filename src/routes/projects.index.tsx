import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "vikash@portfolio:~$projects" },
      {
        name: "description",
        content: "Projects designed and built by Vikash Anand, including GrimmSpot, a map-based local discovery platform.",
      },
      { property: "og:title", content: "Projects — Vikash Anand" },
      { property: "og:description", content: "Things I have designed, built and shipped." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteLayout>
      <PageHeader
        command="$ ls ~/projects"
        title="Projects"
        description="Things I have designed, built and kept running — with the problem, the approach and the stack behind each one."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SiteLayout>
  );
}
