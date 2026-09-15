/**
 * Local portfolio search service.
 *
 * Deterministic, dependency-free search over the structured data in
 * `src/data/portfolio.ts`. The public surface (`searchPortfolio`) is
 * intentionally narrow so it can later be swapped for, or augmented with,
 * an AI/LLM-backed implementation without touching the UI.
 */
import {
  achievements,
  education,
  experience,
  hobbies,
  now,
  personal,
  projects,
  skillCategories,
  timeline,
  isPlaceholder,
} from "@/data/portfolio";

export type SearchCategory =
  | "Profile"
  | "Experience"
  | "Project"
  | "Skill"
  | "Education"
  | "Hobby"
  | "Achievement"
  | "Timeline"
  | "Now"
  | "Page";

export type SearchResult = {
  id: string;
  title: string;
  category: SearchCategory;
  snippet: string;
  relevance: number;
  route: string;
};

type Doc = {
  id: string;
  title: string;
  category: SearchCategory;
  snippet: string;
  route: string;
  keywords: string[];
  weight: number;
};

const clean = (values: (string | undefined)[]) =>
  values.filter((v): v is string => Boolean(v) && !isPlaceholder(v));

const buildIndex = (): Doc[] => {
  const docs: Doc[] = [];

  docs.push({
    id: "profile",
    title: personal.name,
    category: "Profile",
    snippet: personal.shortIntro,
    route: "/profile",
    keywords: clean([
      personal.name,
      personal.title,
      personal.role,
      personal.company,
      personal.location,
      personal.about,
      personal.professionalSummary,
      "whoami",
      "about",
      "who is vikash",
      "bio",
    ]),
    weight: 1.2,
  });

  for (const exp of experience) {
    docs.push({
      id: `experience-${exp.id}`,
      title: `${exp.role} · ${exp.company}`,
      category: "Experience",
      snippet: exp.summary,
      route: "/profile",
      keywords: clean([
        exp.role,
        exp.company,
        exp.type,
        exp.summary,
        `${exp.start} ${exp.end}`,
        ...exp.responsibilities,
        ...exp.achievements,
        ...exp.technologies,
        "experience",
        "work",
        "job",
      ]),
      weight: 1.1,
    });
  }

  for (const project of projects) {
    docs.push({
      id: `project-${project.id}`,
      title: project.name,
      category: "Project",
      snippet: project.description,
      route: `/projects/${project.id}`,
      keywords: clean([
        project.name,
        project.tagline,
        project.description,
        project.problem,
        project.solution,
        project.architecture,
        ...project.technologies,
        ...project.responsibilities,
        "project",
        "projects",
        "built",
      ]),
      weight: 1.15,
    });
  }

  for (const category of skillCategories) {
    for (const skill of category.skills) {
      docs.push({
        id: `skill-${category.id}-${skill.name}`,
        title: skill.name,
        category: "Skill",
        snippet: `${category.name} — ${category.description}`,
        route: "/skills",
        keywords: clean([
          skill.name,
          category.name,
          category.description,
          "skill",
          "technology",
          "know",
        ]),
        weight: 1,
      });
    }
  }

  for (const item of education) {
    docs.push({
      id: `education-${item.id}`,
      title: isPlaceholder(item.institution) ? "Education" : item.institution,
      category: "Education",
      snippet:
        clean([item.qualification, item.field]).join(" · ") || "Education details coming soon.",
      route: "/profile",
      keywords: clean([
        item.institution,
        item.qualification,
        item.field,
        item.details,
        "education",
        "study",
        "degree",
        "college",
      ]),
      weight: 0.9,
    });
  }

  for (const hobby of hobbies) {
    docs.push({
      id: `hobby-${hobby.id}`,
      title: hobby.title,
      category: "Hobby",
      snippet: hobby.description,
      route: "/hobbies",
      keywords: clean([
        hobby.title,
        hobby.tagline,
        hobby.description,
        hobby.story,
        "hobby",
        "interests",
      ]),
      weight: 0.9,
    });
  }

  for (const item of achievements) {
    docs.push({
      id: `achievement-${item.id}`,
      title: isPlaceholder(item.title) ? "Achievements" : item.title,
      category: "Achievement",
      snippet: isPlaceholder(item.description) ? "Achievements coming soon." : item.description,
      route: "/profile",
      keywords: clean([item.title, item.description, "achievement", "award"]),
      weight: 0.85,
    });
  }

  for (const entry of timeline) {
    docs.push({
      id: `timeline-${entry.id}`,
      title: isPlaceholder(entry.title) ? "Timeline entry" : entry.title,
      category: "Timeline",
      snippet: isPlaceholder(entry.description) ? "Timeline entry coming soon." : entry.description,
      route: entry.route ?? "/timeline",
      keywords: clean([
        entry.title,
        entry.description,
        entry.category,
        entry.date,
        "timeline",
        "milestone",
      ]),
      weight: 0.8,
    });
  }

  for (const section of now.sections) {
    docs.push({
      id: `now-${section.id}`,
      title: section.title,
      category: "Now",
      snippet: clean(section.items)[0] ?? "Updating soon.",
      route: "/now",
      keywords: clean([section.title, ...section.items, "now", "current", "currently"]),
      weight: 0.8,
    });
  }

  const pages: { title: string; route: string; snippet: string }[] = [
    { title: "Home", route: "/", snippet: "Overview and quick facts." },
    { title: "Terminal", route: "/terminal", snippet: "Explore the portfolio with commands." },
    { title: "Profile", route: "/profile", snippet: "About, experience, education, resume." },
    { title: "Projects", route: "/projects", snippet: "Things I have designed and built." },
    { title: "Skills", route: "/skills", snippet: "Technologies grouped by category." },
    { title: "Hobbies", route: "/hobbies", snippet: "Life outside the terminal." },
    { title: "Timeline", route: "/timeline", snippet: "Career and project milestones." },
    { title: "Now", route: "/now", snippet: "What I am doing at the moment." },
    { title: "Contact", route: "/contact", snippet: "Get in touch." },
    { title: "Help", route: "/help", snippet: "Manual page for this site." },
    { title: "Get This Portfolio", route: "/payments", snippet: "Get a portfolio like this one." },
  ];

  for (const page of pages) {
    docs.push({
      id: `page-${page.route}`,
      title: page.title,
      category: "Page",
      snippet: page.snippet,
      route: page.route,
      keywords: [page.title, page.snippet, "page", "go to", "open"],
      weight: 0.7,
    });
  }

  return docs;
};

const index = buildIndex();

/** Words that carry no signal in a natural-language query. */
const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "what",
  "whats",
  "what's",
  "who",
  "whos",
  "who's",
  "does",
  "do",
  "did",
  "is",
  "are",
  "was",
  "were",
  "vikash",
  "anand",
  "he",
  "his",
  "him",
  "about",
  "show",
  "me",
  "tell",
  "give",
  "list",
  "of",
  "on",
  "in",
  "with",
  "for",
  "and",
  "or",
  "to",
  "have",
  "has",
  "any",
  "your",
  "you",
  "know",
  "knows",
  "worked",
  "work",
  "using",
  "use",
  "used",
  "please",
  "can",
  "could",
  "i",
  "see",
  "find",
  "open",
  "search",
  "experience?",
  "projects?",
]);

const tokenize = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9+#./ -]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const CATEGORY_HINTS: { words: string[]; category: SearchCategory }[] = [
  { words: ["project", "projects", "built", "building"], category: "Project" },
  { words: ["skill", "skills", "technology", "technologies", "stack"], category: "Skill" },
  { words: ["experience", "job", "work", "role", "company"], category: "Experience" },
  { words: ["hobby", "hobbies", "interests", "personal"], category: "Hobby" },
  { words: ["education", "degree", "college", "university", "study"], category: "Education" },
  { words: ["timeline", "milestone", "history"], category: "Timeline" },
  { words: ["now", "currently", "current"], category: "Now" },
  { words: ["achievement", "achievements", "award", "awards"], category: "Achievement" },
];

export function searchPortfolio(rawQuery: string, limit = 12): SearchResult[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const allTokens = tokenize(query);
  const hintedCategories = new Set<SearchCategory>();
  for (const hint of CATEGORY_HINTS) {
    if (hint.words.some((w) => allTokens.includes(w))) hintedCategories.add(hint.category);
  }

  const terms = allTokens.filter((t) => !STOP_WORDS.has(t) && t.length > 1);
  const searchTerms = terms.length ? terms : allTokens;

  const scored = index.map((doc) => {
    const haystack = `${doc.title} ${doc.snippet} ${doc.keywords.join(" ")}`.toLowerCase();
    let score = 0;

    for (const term of searchTerms) {
      const title = doc.title.toLowerCase();
      if (title === term) score += 12;
      else if (title.includes(term)) score += 6;

      const occurrences = haystack.split(term).length - 1;
      if (occurrences > 0) score += Math.min(occurrences, 4) * 1.5;
    }

    if (score > 0 && hintedCategories.size && hintedCategories.has(doc.category)) score += 5;
    if (
      score > 0 &&
      !searchTerms.some((t) => !STOP_WORDS.has(t)) &&
      !hintedCategories.has(doc.category)
    )
      score -= 2;

    return { doc, score: score * doc.weight };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .slice(0, limit)
    .map(({ doc, score }) => ({
      id: doc.id,
      title: doc.title,
      category: doc.category,
      snippet: doc.snippet,
      relevance: Math.round(score * 10) / 10,
      route: doc.route,
    }));
}

/** Group results by category, preserving relevance order. */
export function groupResults(results: SearchResult[]) {
  const groups = new Map<SearchCategory, SearchResult[]>();
  for (const result of results) {
    const bucket = groups.get(result.category) ?? [];
    bucket.push(result);
    groups.set(result.category, bucket);
  }
  return [...groups.entries()];
}
