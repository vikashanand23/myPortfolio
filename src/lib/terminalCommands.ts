/**
 * Terminal command engine.
 *
 * Pure functions: a command string in, structured output lines out.
 * No React, no DOM — so the same engine can back the terminal page,
 * tests, or (later) an AI-assisted answer layer.
 */
import {
  achievements,
  certifications,
  education,
  experience,
  hobbies,
  isPlaceholder,
  now,
  personal,
  projects,
  skillCategories,
  socials,
  timeline,
  PLACEHOLDER,
} from "@/data/portfolio";
import { searchPortfolio } from "@/lib/portfolioSearch";

export type TerminalLine =
  | { kind: "text"; text: string; dim?: boolean }
  | { kind: "heading"; text: string }
  | { kind: "kv"; key: string; value: string }
  | { kind: "bullet"; text: string }
  | { kind: "error"; text: string }
  | { kind: "success"; text: string }
  | { kind: "link"; text: string; route: string }
  | { kind: "external"; text: string; url: string }
  | { kind: "spacer" };

export type CommandResult = {
  lines: TerminalLine[];
  /** Special side effects the UI performs. */
  action?: { type: "clear" } | { type: "navigate"; route: string } | { type: "openPalette" };
};

export type CommandSpec = {
  name: string;
  usage?: string;
  description: string;
  hidden?: boolean;
};

export const commandSpecs: CommandSpec[] = [
  { name: "help", description: "Show available commands." },
  { name: "clear", description: "Clear the terminal (Ctrl+L)." },
  { name: "whoami", description: "Who is behind this portfolio." },
  { name: "about", description: "Short introduction." },
  { name: "profile", description: "Professional profile summary." },
  { name: "experience", description: "Work experience." },
  { name: "projects", description: "List projects." },
  { name: "project", usage: "project <name>", description: "Details for a single project." },
  { name: "skills", description: "Technical skills by category." },
  { name: "education", description: "Education history." },
  { name: "certifications", description: "Certifications." },
  { name: "achievements", description: "Achievements." },
  { name: "hobbies", description: "Life outside work." },
  { name: "timeline", description: "Career and project milestones." },
  { name: "now", description: "What I am doing right now." },
  { name: "contact", description: "Ways to get in touch." },
  { name: "resume", description: "Download the resume." },
  { name: "location", description: "Where I am based." },
  { name: "github", description: "GitHub profile." },
  { name: "linkedin", description: "LinkedIn profile." },
  { name: "find", usage: "find <term>", description: "Search the whole portfolio." },
  { name: "open", usage: "open <term>", description: "Jump to the best matching page." },
  { name: "ls", description: "List sections." },
  { name: "pwd", description: "Print working directory." },
  { name: "date", description: "Current date and time." },
  { name: "neofetch", description: "System summary.", hidden: true },
  { name: "sudo", description: "Elevated requests.", hidden: true },
];

export const commandNames = commandSpecs.map((c) => c.name);

const text = (t: string, dim = false): TerminalLine => ({ kind: "text", text: t, dim });
const spacer = (): TerminalLine => ({ kind: "spacer" });
const heading = (t: string): TerminalLine => ({ kind: "heading", text: t });
const bullet = (t: string): TerminalLine => ({ kind: "bullet", text: t });
const kv = (key: string, value: string): TerminalLine => ({ kind: "kv", key, value });

const value = (v: string) => (isPlaceholder(v) ? PLACEHOLDER : v);

const sections = [
  "profile",
  "experience",
  "projects",
  "skills",
  "education",
  "hobbies",
  "timeline",
  "now",
  "contact",
  "help",
];

function helpOutput(): TerminalLine[] {
  const lines: TerminalLine[] = [heading("AVAILABLE COMMANDS"), spacer()];
  for (const spec of commandSpecs.filter((c) => !c.hidden)) {
    lines.push(kv(spec.usage ?? spec.name, spec.description));
  }
  lines.push(spacer());
  lines.push(text("Tab completes · ↑/↓ history · Ctrl+L clears · Ctrl+K opens the palette", true));
  lines.push(text("You can also ask things like: what does vikash know about kubernetes?", true));
  return lines;
}

function profileOutput(): TerminalLine[] {
  return [
    heading(personal.name.toUpperCase()),
    kv("Role", personal.role),
    kv("Title", personal.title),
    kv("Company", personal.company),
    kv("Location", value(personal.location)),
    kv("Hometown", value(personal.hometown)),
    kv("Experience", personal.yearsOfExperience),
    kv("Focus", personal.focus),
    spacer(),
    text(personal.professionalSummary),
    spacer(),
    { kind: "link", text: "Open full profile →", route: "/profile" },
  ];
}

function experienceOutput(): TerminalLine[] {
  const lines: TerminalLine[] = [heading("EXPERIENCE")];
  for (const exp of experience) {
    lines.push(spacer());
    lines.push(text(`${exp.role} — ${exp.company}`));
    lines.push(text(`${exp.start} – ${exp.end}${exp.type ? ` · ${exp.type}` : ""}`, true));
    lines.push(text(exp.summary));
    for (const item of exp.responsibilities) lines.push(bullet(value(item)));
    lines.push(text(`tech: ${exp.technologies.join(", ")}`, true));
  }
  lines.push(spacer());
  lines.push({ kind: "link", text: "Open profile →", route: "/profile" });
  return lines;
}

function projectsOutput(): TerminalLine[] {
  const lines: TerminalLine[] = [heading("PROJECTS")];
  for (const project of projects) {
    lines.push(spacer());
    lines.push(text(`${project.name} — ${project.tagline}`));
    lines.push(text(project.description, true));
    lines.push(text(`tech: ${project.technologies.join(", ")}`, true));
    lines.push({ kind: "link", text: `open ${project.id} →`, route: `/projects/${project.id}` });
  }
  lines.push(spacer());
  lines.push(text("Tip: project <name> for full details.", true));
  return lines;
}

function projectDetail(name: string): TerminalLine[] {
  const query = name.toLowerCase().trim();
  const project =
    projects.find((p) => p.id.toLowerCase() === query) ??
    projects.find((p) => p.name.toLowerCase() === query) ??
    projects.find((p) => p.name.toLowerCase().includes(query));

  if (!project) {
    return [
      { kind: "error", text: `No project matching "${name}".` },
      text(`Known projects: ${projects.map((p) => p.id).join(", ")}`, true),
    ];
  }

  const lines: TerminalLine[] = [
    heading(project.name.toUpperCase()),
    text(project.tagline, true),
    spacer(),
    kv("Status", value(project.status)),
    kv("Year", value(project.year)),
    spacer(),
    text("Problem"),
    text(project.problem, true),
    spacer(),
    text("Solution"),
    text(project.solution, true),
    spacer(),
    text("Architecture"),
    text(project.architecture, true),
    spacer(),
    text(`tech: ${project.technologies.join(", ")}`, true),
    spacer(),
    { kind: "link", text: "Open project page →", route: `/projects/${project.id}` },
  ];
  return lines;
}

function skillsOutput(): TerminalLine[] {
  const lines: TerminalLine[] = [heading("SKILLS")];
  for (const category of skillCategories) {
    lines.push(spacer());
    lines.push(text(category.name));
    lines.push(text(category.skills.map((s) => s.name).join("  ·  "), true));
  }
  lines.push(spacer());
  lines.push({ kind: "link", text: "Open skills →", route: "/skills" });
  return lines;
}

function listOutput(items: string[], title: string, route: string): TerminalLine[] {
  const lines: TerminalLine[] = [heading(title)];
  for (const item of items) lines.push(bullet(value(item)));
  lines.push(spacer());
  lines.push({ kind: "link", text: `Open ${title.toLowerCase()} →`, route });
  return lines;
}

function contactOutput(): TerminalLine[] {
  const lines: TerminalLine[] = [heading("CONTACT")];
  for (const social of socials) {
    lines.push(kv(social.label, value(social.url)));
  }
  lines.push(kv("Location", value(personal.location)));
  lines.push(spacer());
  lines.push({ kind: "link", text: "Open contact page →", route: "/contact" });
  return lines;
}

function findOutput(term: string): TerminalLine[] {
  if (!term.trim()) {
    return [{ kind: "error", text: "usage: find <term>" }];
  }
  const results = searchPortfolio(term);
  if (!results.length) {
    return [
      text(`No matches for "${term}".`),
      text("Try: kubernetes, aws, terraform, grimmspot, experience, projects", true),
    ];
  }

  const lines: TerminalLine[] = [
    text(`Found ${results.length} match${results.length === 1 ? "" : "es"}`),
    spacer(),
  ];
  let currentCategory = "";
  for (const result of results) {
    if (result.category !== currentCategory) {
      currentCategory = result.category;
      lines.push(heading(`[${result.category.toUpperCase()}]`));
    }
    lines.push({ kind: "link", text: `${result.title} — ${result.snippet}`, route: result.route });
  }
  lines.push(spacer());
  lines.push(text(`Type "open ${term.trim().split(/\s+/)[0] ?? term}" or click a result.`, true));
  return lines;
}

function neofetchOutput(): TerminalLine[] {
  return [
    heading(`${personal.terminalUser.toUpperCase()}@${personal.terminalHost.toUpperCase()}`),
    text("--------------------------------", true),
    kv("Role", personal.role),
    kv("Focus", personal.focus),
    kv("Projects", String(projects.length)),
    kv("Skills", String(skillCategories.reduce((n, c) => n + c.skills.length, 0))),
    kv("Location", value(personal.location)),
    kv("Uptime", personal.yearsOfExperience),
    kv("Shell", "portfolio-sh 1.0"),
    kv("Status", "Building"),
  ];
}

function sudoOutput(rest: string): TerminalLine[] {
  const arg = rest.toLowerCase().trim();
  if (arg.startsWith("hire")) {
    return [
      text("Checking permissions..."),
      { kind: "success", text: "✓ Technical skills" },
      { kind: "success", text: "✓ Cloud experience" },
      { kind: "success", text: "✓ DevOps experience" },
      { kind: "success", text: "✓ Problem solving" },
      spacer(),
      text("sudo: hiring request forwarded to recruiter ;)"),
      { kind: "link", text: "Get in touch →", route: "/contact" },
    ];
  }
  if (arg.startsWith("rm")) {
    return [{ kind: "error", text: "sudo: nice try. This filesystem is read-only." }];
  }
  return [
    text(`${personal.terminalUser} is not in the sudoers file. This incident has been logged.`),
  ];
}

const naturalLanguage = (input: string) =>
  /\s/.test(input.trim()) && !commandNames.includes(input.trim().split(/\s+/)[0] ?? "");

export function runCommand(rawInput: string): CommandResult {
  const input = rawInput.trim();
  if (!input) return { lines: [] };

  const parts = input.split(/\s+/);
  const command = parts[0] ?? "";
  const args = parts.slice(1).join(" ");
  const cmd = command.toLowerCase();

  switch (cmd) {
    case "help":
      return { lines: helpOutput() };
    case "clear":
      return { lines: [], action: { type: "clear" } };
    case "whoami":
      return {
        lines: [
          text(personal.name),
          text(`${personal.role} @ ${personal.company}`, true),
          text(personal.shortIntro),
        ],
      };
    case "about":
      return { lines: [heading("ABOUT"), text(personal.about)] };
    case "profile":
      return { lines: profileOutput() };
    case "experience":
      return { lines: experienceOutput() };
    case "projects":
      return { lines: projectsOutput() };
    case "project":
      return args
        ? { lines: projectDetail(args) }
        : {
            lines: [
              { kind: "error", text: "usage: project <name>" },
              text(`e.g. project ${projects[0]?.id ?? "grimmspot"}`, true),
            ],
          };
    case "skills":
      return { lines: skillsOutput() };
    case "education":
      return {
        lines: listOutput(
          education.map((e) =>
            isPlaceholder(e.institution)
              ? PLACEHOLDER
              : `${e.qualification}, ${e.institution} (${e.start}–${e.end})`,
          ),
          "EDUCATION",
          "/profile",
        ),
      };
    case "certifications":
      return {
        lines: listOutput(
          certifications.map((c) =>
            isPlaceholder(c.name) ? PLACEHOLDER : `${c.name} — ${c.issuer}`,
          ),
          "CERTIFICATIONS",
          "/profile",
        ),
      };
    case "achievements":
      return {
        lines: listOutput(
          achievements.map((a) =>
            isPlaceholder(a.title) ? PLACEHOLDER : `${a.title} — ${a.description}`,
          ),
          "ACHIEVEMENTS",
          "/profile",
        ),
      };
    case "hobbies":
      return {
        lines: listOutput(
          hobbies.map((h) => `${h.title} — ${h.description}`),
          "HOBBIES",
          "/hobbies",
        ),
      };
    case "timeline":
      return {
        lines: listOutput(
          timeline.map((t) => (isPlaceholder(t.title) ? PLACEHOLDER : `${t.date} · ${t.title}`)),
          "TIMELINE",
          "/timeline",
        ),
      };
    case "now": {
      const lines: TerminalLine[] = [heading("NOW"), text(`updated: ${value(now.updated)}`, true)];
      for (const section of now.sections) {
        lines.push(spacer());
        lines.push(text(section.title));
        for (const item of section.items) lines.push(bullet(value(item)));
      }
      lines.push(spacer());
      lines.push({ kind: "link", text: "Open now page →", route: "/now" });
      return { lines };
    }
    case "contact":
      return { lines: contactOutput() };
    case "resume": {
      if (isPlaceholder(personal.resumePath)) {
        return {
          lines: [
            text("Resume file not configured yet."),
            text("Set `personal.resumePath` in src/data/portfolio.ts.", true),
            { kind: "link", text: "Contact instead →", route: "/contact" },
          ],
        };
      }
      return {
        lines: [
          text("Fetching resume..."),
          {
            kind: "external",
            text: `Download ${personal.resumeFileName}`,
            url: personal.resumePath,
          },
        ],
      };
    }
    case "location":
      return {
        lines: [kv("Location", value(personal.location)), kv("Hometown", value(personal.hometown))],
      };
    case "github":
    case "linkedin": {
      const social = socials.find((s) => s.id === cmd);
      if (!social || isPlaceholder(social.url)) {
        return {
          lines: [
            text(`${cmd} link not configured yet.`),
            text("Add it in src/data/portfolio.ts.", true),
          ],
        };
      }
      return { lines: [{ kind: "external", text: social.url, url: social.url }] };
    }
    case "ls":
      return { lines: [text(sections.join("   "))] };
    case "pwd":
      return { lines: [text(`/home/${personal.terminalUser}/portfolio`)] };
    case "date":
      return { lines: [text(new Date().toString())] };
    case "find":
    case "search":
      return { lines: findOutput(args) };
    case "open": {
      const [first] = searchPortfolio(args || "home", 1);
      if (!first) return { lines: [{ kind: "error", text: `Nothing to open for "${args}".` }] };
      return {
        lines: [text(`Opening ${first.title}...`)],
        action: { type: "navigate", route: first.route },
      };
    }
    case "neofetch":
      return { lines: neofetchOutput() };
    case "sudo":
      return { lines: sudoOutput(args) };
    case "exit":
    case "quit":
      return { lines: [text("There is no exit. Only more infrastructure.")] };
    case "echo":
      return { lines: [text(args)] };
    default: {
      if (naturalLanguage(input)) {
        const results = searchPortfolio(input);
        if (results.length) {
          return {
            lines: [
              text(`Interpreting as a search for "${input}"`, true),
              spacer(),
              ...findOutput(input),
            ],
          };
        }
      }
      return {
        lines: [
          { kind: "error", text: `Command not found: ${command}` },
          text("Type 'help' to see available commands.", true),
        ],
      };
    }
  }
}

/** Autocomplete suggestions for the current input. */
export function suggest(input: string): string[] {
  const value = input.trimStart().toLowerCase();
  if (!value || value.includes(" ")) return [];
  return commandNames.filter((name) => name.startsWith(value) && name !== value).slice(0, 6);
}

export const welcomeLines: TerminalLine[] = [
  heading(`Welcome to ${personal.name}'s interactive portfolio.`),
  text(`${personal.role} · ${personal.focus}`, true),
  spacer(),
  text("Type 'help' to see available commands, or ask a question like:"),
  text("  what does vikash know about kubernetes?", true),
  spacer(),
];
