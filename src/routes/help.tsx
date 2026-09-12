import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { commandSpecs } from "@/lib/terminalCommands";
import { navItems, personal } from "@/data/portfolio";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — Vikash Anand" },
      {
        name: "description",
        content: "Manual page for Vikash Anand's portfolio: terminal commands, keyboard shortcuts and site navigation.",
      },
      { property: "og:title", content: "Help — Vikash Anand" },
      { property: "og:description", content: "Terminal commands, shortcuts and how to navigate this site." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/help" },
    ],
    links: [{ rel: "canonical", href: "/help" }],
  }),
  component: HelpPage,
});

function ManSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8" aria-labelledby={title}>
      <h2 id={title} className="font-mono text-sm font-semibold tracking-widest text-primary">
        {title}
      </h2>
      <div className="mt-3 pl-4 sm:pl-8">{children}</div>
    </section>
  );
}

function HelpPage() {
  return (
    <SiteLayout>
      <PageHeader
        command="$ man vikash-portfolio"
        title="Help"
        description="Everything this site can do — from the keyboard or the mouse."
      />

      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <ManSection title="NAME">
          <p className="font-mono text-sm text-muted-foreground">
            vikash-portfolio — interactive personal portfolio of {personal.name}
          </p>
        </ManSection>

        <ManSection title="DESCRIPTION">
          <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
            A portfolio site with a conventional set of pages and an interactive Linux-style terminal. Everything on
            the site can be reached by clicking, by typing a command in the terminal, or through the command palette.
          </p>
        </ManSection>

        <ManSection title="COMMANDS">
          <dl className="space-y-3">
            {commandSpecs
              .filter((c) => !c.hidden)
              .map((spec) => (
                <div key={spec.name}>
                  <dt className="font-mono text-sm text-foreground">{spec.usage ?? spec.name}</dt>
                  <dd className="pl-6 font-mono text-sm text-muted-foreground">{spec.description}</dd>
                </div>
              ))}
          </dl>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            A few undocumented commands exist. Curiosity is rewarded.
          </p>
        </ManSection>

        <ManSection title="SHORTCUTS">
          <ul className="space-y-2 font-mono text-sm text-muted-foreground">
            <li>Ctrl + K — open the global command palette from any page</li>
            <li>Ctrl + L — clear the terminal</li>
            <li>Tab — autocomplete the current command</li>
            <li>↑ / ↓ — step through command history</li>
            <li>Enter — run the command</li>
          </ul>
        </ManSection>

        <ManSection title="NAVIGATION">
          <ul className="grid gap-2 sm:grid-cols-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="font-mono text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {item.to} — {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </ManSection>

        <ManSection title="SEE ALSO">
          <Link to="/terminal" className="font-mono text-sm text-primary underline-offset-4 hover:underline">
            terminal(1)
          </Link>
        </ManSection>
      </div>
    </SiteLayout>
  );
}
