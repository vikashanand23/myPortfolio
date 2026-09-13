import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { SkillCard } from "@/components/SkillCard";
import { skillCategories } from "@/data/portfolio";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "vikash@portfolio:~$skills" },
      {
        name: "description",
        content:
          "Technical skills of Vikash Anand across AWS, Kubernetes, Terraform, CI/CD, monitoring, networking, databases and Linux.",
      },
      { property: "og:title", content: "Skills — Vikash Anand" },
      { property: "og:description", content: "AWS, Kubernetes, Terraform, CI/CD, observability and Linux." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <SiteLayout>
      <PageHeader
        command="$ ls ~/skills"
        title="Skills"
        description="Technologies I work with day to day. Select any one to see where I have used it."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {skillCategories.map((category) => (
          <SkillCard key={category.id} category={category} />
        ))}
      </div>
    </SiteLayout>
  );
}
