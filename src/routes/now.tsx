import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Value } from "@/components/Placeholders";
import { now } from "@/data/portfolio";

export const Route = createFileRoute("/now")({
  head: () => ({
    meta: [
      { title: "vikash@portfolio:~$now" },
      {
        name: "description",
        content: "What Vikash Anand is working on, learning, building and exploring right now, plus current goals.",
      },
      { property: "og:title", content: "Now — Vikash Anand" },
      { property: "og:description", content: "Current work, learning, builds, explorations and goals." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/now" },
    ],
    links: [{ rel: "canonical", href: "/now" }],
  }),
  component: NowPage,
});

function NowPage() {
  return (
    <SiteLayout>
      <PageHeader
        command="$ systemctl status vikash"
        title="Now"
        description="A snapshot of what currently has my attention."
      />

      <p className="prompt-label mb-6">
        last updated: <Value value={now.updated} />
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {now.sections.map((section, index) => (
          <section
            key={section.id}
            className="animate-rise rounded-xl border border-border bg-card p-6"
            style={{ animationDelay: `${index * 60}ms` }}
            aria-labelledby={section.id}
          >
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-terminal-success" />
              <h2 id={section.id} className="text-base font-semibold">
                {section.title}
              </h2>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="font-mono text-xs text-primary">
                    ▸
                  </span>
                  <Value value={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SiteLayout>
  );
}
