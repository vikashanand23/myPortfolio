# Vikash Anand — Interactive Portfolio

A premium, professional portfolio with one signature twist: a fully interactive Linux-style terminal page. Regular pages stay clean and recruiter-friendly, with only subtle terminal touches (`~/projects`, `$ whoami` labels, monospace accents).

## Pages

- **Home** `/` — hero with photo placeholder, name, title, one-line intro, location, hometown, experience, two buttons ("Explore My Profile", "Open Terminal"), plus elegant quick-info cards.
- **Terminal** `/terminal` — immersive full-screen terminal: typing animation, blinking cursor, command history (arrow keys), Tab autocomplete, inline suggestions, friendly "command not found" message.
- **Profile** `/profile` — About, Professional Summary, Experience timeline (Avis Budget Group roles as given), Education, Certifications, Achievements, Download Resume button.
- **Projects** `/projects` + detail page per project — GrimmSpot first, with problem/solution/architecture/tech/links and image placeholders.
- **Skills** `/skills` — grouped by category; clicking a skill reveals "Where I've used this" linked to experience and projects.
- **Hobbies** `/hobbies` — image carousel per hobby, milestones, status; placeholders for your photos.
- **Timeline** `/timeline` — chronological milestones, animated reveal, vertical on mobile.
- **Now** `/now` — dashboard of what you're working on, learning, building, exploring, goals.
- **Contact** `/contact` — contact details, front-end-only form, resume and terminal buttons.
- **Help** `/help` — styled like a Linux man page, covering both terminal commands and normal navigation.

## Terminal behaviour

Commands: help, clear, whoami, profile, experience, projects, skills, education, achievements, hobbies, timeline, now, contact, resume, location, github, linkedin, about, ls, pwd, date, `project <name>`, `find <term>`, `open <term>`.

Plain-English questions ("what does vikash know about kubernetes?", "show aws experience") map to the same local search — no AI service needed now, but the search layer is written so an AI layer can be added later.

Easter eggs: `sudo hire vikash`, `neofetch`.

## Everything lives in one editable file

All personal info, experience, education, skills, projects, hobbies, achievements, timeline, now-status, social links and the resume/photo paths go in `src/data/portfolio.ts`. Pages read from it, so you update content without touching layout.

Anything you haven't given me (hometown, education, certifications, email, social URLs, project metrics) will show `[PLACEHOLDER — ADD INFORMATION]`. Nothing invented.

## Global extras

- Responsive navbar with your name and a `~/vikash` tag; mobile menu.
- Ctrl+K command palette searching pages, projects, skills, experience, hobbies.
- Footer with links, `Built with React • TypeScript • ❤️`, and a live `$ uptime — Portfolio online` indicator.
- Accessibility: semantic HTML, keyboard support, focus states, alt text, reduced-motion respected.
- Per-page titles, descriptions and social preview metadata.

## Technical notes

- This project runs on TanStack Start with TanStack Router (file-based routes in `src/routes/`) — React Router isn't supported here, so routing uses `Link`/`useNavigate` from TanStack Router. Everything else in your stack request (React, TypeScript, Vite, Tailwind, shadcn/ui, lucide-react, framer-motion) is used as specified.
- Search service in `src/lib/portfolioSearch.ts` returning `{ title, category, snippet, relevance, route }`; command handling in `src/lib/terminalCommands.ts`, kept pure so it is testable and swappable.
- Components split as proposed: Navbar, Footer, Hero, Terminal, CommandPalette, ProjectCard, ExperienceCard, SkillCard, HobbyCard, Timeline.
- Design tokens (colors, fonts) defined in `src/styles.css` — dark-leaning technical palette with a single restrained accent, monospace only for terminal surfaces and micro-labels.
- Images lazy-loaded; terminal page code-split.

## Build order

1. Data model + design tokens + shell (navbar, footer, root layout)
2. Home, Profile, Projects + detail, Skills
3. Search service, terminal page, command palette
4. Hobbies, Timeline, Now, Contact, Help
5. Responsive/accessibility pass and metadata
