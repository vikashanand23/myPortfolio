import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { experience, projects, type Skill, type SkillCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function Usage({ skill }: { skill: Skill }) {
  const usedInExperience = experience.filter((e) => skill.experienceIds?.includes(e.id));
  const usedInProjects = projects.filter((p) => skill.projectIds?.includes(p.id));

  if (!usedInExperience.length && !usedInProjects.length) {
    return <p className="text-xs text-muted-foreground">Usage details coming soon.</p>;
  }

  return (
    <div className="space-y-2">
      <p className="prompt-label">Where I&apos;ve used this</p>
      <ul className="space-y-1 text-xs text-muted-foreground">
        {usedInExperience.map((e) => (
          <li key={e.id}>
            <Link to="/profile" className="underline-offset-4 hover:text-primary hover:underline">
              {e.role} · {e.company}
            </Link>
          </li>
        ))}
        {usedInProjects.map((p) => (
          <li key={p.id}>
            <Link
              to="/projects/$projectId"
              params={{ projectId: p.id }}
              className="underline-offset-4 hover:text-primary hover:underline"
            >
              Project · {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillCard({ category }: { category: SkillCategory }) {
  const [active, setActive] = useState<string | null>(null);
  const activeSkill = category.skills.find((s) => s.name === active) ?? null;

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-base font-semibold">{category.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <button
              type="button"
              aria-pressed={active === skill.name}
              onClick={() => setActive((v) => (v === skill.name ? null : skill.name))}
              className={cn(
                "rounded-md border px-2.5 py-1 font-mono text-xs transition-colors",
                active === skill.name
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {skill.name}
            </button>
          </li>
        ))}
      </ul>

      {activeSkill && (
        <div className="animate-rise mt-4 rounded-lg border border-border bg-surface p-4">
          <p className="font-mono text-xs text-primary">$ grep -r &quot;{activeSkill.name}&quot; ~/portfolio</p>
          <div className="mt-3">
            <Usage skill={activeSkill} />
          </div>
        </div>
      )}
    </section>
  );
}
