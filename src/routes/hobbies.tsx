import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { HobbyCard } from "@/components/HobbyCard";
import { hobbies } from "@/data/portfolio";

export const Route = createFileRoute("/hobbies")({
  head: () => ({
    meta: [
      { title: "vikash@portfolio:~$hobbies" },
      {
        name: "description",
        content:
          "Life outside the terminal: motorcycling, travel and exploration, content creation and building side projects.",
      },
      { property: "og:title", content: "Hobbies — Vikash Anand" },
      {
        property: "og:description",
        content: "Motorcycling, travel, content creation and building things.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/hobbies" },
    ],
    links: [{ rel: "canonical", href: "/hobbies" }],
  }),
  component: HobbiesPage,
});

function HobbiesPage() {
  return (
    <SiteLayout>
      <PageHeader
        command="$ cat ~/life/hobbies"
        title="Hobbies"
        description="What I do when I am away from a keyboard — and sometimes when I am not."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {hobbies.map((hobby) => (
          <HobbyCard key={hobby.id} hobby={hobby} />
        ))}
      </div>
    </SiteLayout>
  );
}
