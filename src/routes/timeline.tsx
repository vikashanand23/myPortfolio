import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Timeline } from "@/components/Timeline";
import { timeline } from "@/data/portfolio";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "vikash@portfolio:~$timeline" },
      {
        name: "description",
        content: "A chronological view of Vikash Anand's career, education, projects and technical milestones.",
      },
      { property: "og:title", content: "Timeline — Vikash Anand" },
      { property: "og:description", content: "Career, education, projects and technical milestones." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/timeline" },
    ],
    links: [{ rel: "canonical", href: "/timeline" }],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <SiteLayout>
      <PageHeader
        command="$ git log --oneline --graph"
        title="Timeline"
        description="Milestones in career, projects and technical growth — newest first."
      />
      <Timeline entries={timeline} />
    </SiteLayout>
  );
}
