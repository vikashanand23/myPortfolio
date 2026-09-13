import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, TerminalSquare } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SafeImage, Value } from "@/components/Placeholders";
import { ProjectCard } from "@/components/ProjectCard";
import { isPlaceholder, personal, projects, quickFacts, socials } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "vikash@portfolio:~$home" },
      {
        name: "description",
        content:
          "Cloud and DevOps Engineer working with AWS, Kubernetes, Terraform and automation. Explore the portfolio — or the interactive terminal.",
      },
      { property: "og:title", content: "Vikash Anand | Cloud & DevOps Engineer" },
      {
        property: "og:description",
        content: "AWS, Kubernetes, Terraform and automation — plus an interactive Linux-style terminal.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: personal.name,
          jobTitle: personal.role,
          description: personal.shortIntro,
          address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);
  const links = socials.filter((s) => !isPlaceholder(s.url));

  return (
    <SiteLayout>
      <section className="relative">
        <div className="grid-backdrop pointer-events-none absolute inset-x-0 -top-24 h-80" aria-hidden />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="animate-rise">
            <p className="prompt-label text-primary">$ whoami</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{personal.name}</h1>
            <p className="mt-2 text-lg text-primary">{personal.title}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{personal.shortIntro}</p>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <dt className="prompt-label">Location</dt>
                <dd className="mt-0.5">
                  <Value value={personal.location} />
                </dd>
              </div>
              <div>
                <dt className="prompt-label">Hometown</dt>
                <dd className="mt-0.5">
                  <Value value={personal.hometown} />
                </dd>
              </div>
              <div>
                <dt className="prompt-label">Experience</dt>
                <dd className="mt-0.5">{personal.yearsOfExperience}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Explore My Profile
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/terminal"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/60"
              >
                <TerminalSquare className="h-4 w-4" aria-hidden />
                Open Terminal
              </Link>
            </div>

            {links.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                {links.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="animate-rise mx-auto w-full max-w-xs" style={{ animationDelay: "120ms" }}>
            <div className="rounded-2xl border border-border bg-card p-3">
              <SafeImage
                src={personal.profileImage}
                alt={`Portrait of ${personal.name}`}
                aspect="aspect-[4/5]"
                className="rounded-xl"
              />
              <p className="prompt-label mt-3 px-1">~/profile/photo.jpg</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="quick-info">
        <h2 id="quick-info" className="prompt-label text-primary">
          $ cat ~/profile/quick-info
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickFacts.map((fact) => (
            <li
              key={fact.label}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <p className="prompt-label">{fact.label}</p>
              <p className="mt-2 text-base">
                <Value value={fact.value} />
              </p>
            </li>
          ))}
        </ul>
      </section>

      {featured.length > 0 && (
        <section className="mt-20" aria-labelledby="featured-projects">
          <div className="flex items-end justify-between gap-4">
            <h2 id="featured-projects" className="prompt-label text-primary">
              $ ls ~/projects --featured
            </h2>
            <Link to="/projects" className="font-mono text-sm text-muted-foreground hover:text-primary">
              all projects →
            </Link>
          </div>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
