import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Value } from "@/components/Placeholders";
import {
  achievements,
  certifications,
  education,
  experience,
  isPlaceholder,
  personal,
} from "@/data/portfolio";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Vikash Anand" },
      {
        name: "description",
        content:
          "Professional profile of Vikash Anand: cloud and DevOps experience, education, certifications, achievements and resume.",
      },
      { property: "og:title", content: "Profile — Vikash Anand" },
      { property: "og:description", content: "Cloud and DevOps experience, education and resume." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/profile" },
    ],
    links: [{ rel: "canonical", href: "/profile" }],
  }),
  component: ProfilePage,
});

function Section({ command, title, children }: { command: string; title: string; children: React.ReactNode }) {
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section className="mt-14" aria-labelledby={id}>
      <p className="prompt-label text-primary">{command}</p>
      <h2 id={id} className="mt-2 text-2xl font-semibold">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ProfilePage() {
  const resumeReady = !isPlaceholder(personal.resumePath);

  return (
    <SiteLayout>
      <PageHeader command="$ cat ~/profile/README.md" title="Profile" description={personal.about} />

      <Section command="$ cat summary.txt" title="Professional Summary">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{personal.professionalSummary}</p>
      </Section>

      <Section command="$ cat experience.json" title="Experience">
        <div className="space-y-5">
          {experience.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      <Section command="$ cat education.json" title="Education">
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((item) => (
            <article key={item.id} className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold">
                <Value value={item.institution} />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <Value value={item.qualification} /> · <Value value={item.field} />
              </p>
              <p className="prompt-label mt-3">
                <Value value={item.start} /> – <Value value={item.end} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <Value value={item.details} />
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section command="$ ls certifications/" title="Certifications">
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((item) => (
            <article key={item.id} className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold">
                <Value value={item.name} />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <Value value={item.issuer} />
              </p>
              <p className="prompt-label mt-3">
                issued: <Value value={item.issued} />
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section command="$ cat achievements.md" title="Achievements">
        <ul className="space-y-3">
          {achievements.map((item) => (
            <li key={item.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold">
                  <Value value={item.title} />
                </h3>
                <span className="prompt-label">
                  <Value value={item.date} />
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                <Value value={item.description} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section command="$ ./download-resume.sh" title="Resume">
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-6">
          {resumeReady ? (
            <a
              href={personal.resumePath}
              download={personal.resumeFileName}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Resume
            </a>
          ) : (
            <>
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download Resume
              </button>
              <p className="text-sm text-muted-foreground">
                Resume file not added yet — set <code className="font-mono text-xs">personal.resumePath</code> in{" "}
                <code className="font-mono text-xs">src/data/portfolio.ts</code>.
              </p>
            </>
          )}
          <Link to="/contact" className="font-mono text-sm text-primary underline-offset-4 hover:underline">
            or get in touch →
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
