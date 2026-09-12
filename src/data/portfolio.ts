/**
 * CENTRAL PORTFOLIO DATA
 * ----------------------
 * Everything the site displays comes from this file.
 * Replace any `PLACEHOLDER` string with real information — no component edits needed.
 */

export const PLACEHOLDER = "[PLACEHOLDER — ADD INFORMATION]";

export type SocialLink = {
  id: string;
  label: string;
  /** Set to a real URL (or mailto:) when available. */
  url: string;
  handle: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  type?: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
};

export type Education = {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  start: string;
  end: string;
  details: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  credentialUrl?: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export type SkillCategory = {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
};

export type Skill = {
  name: string;
  /** ids of experience entries where this was used */
  experienceIds?: string[];
  /** ids of projects where this was used */
  projectIds?: string[];
  note?: string;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  year: string;
  problem: string;
  solution: string;
  architecture: string;
  responsibilities: string[];
  technologies: string[];
  results: string[];
  githubUrl: string;
  liveUrl: string;
  /** Image paths in /public — replace with real screenshots. */
  screenshots: { src: string; alt: string }[];
  architectureDiagram: { src: string; alt: string } | null;
  featured?: boolean;
};

export type Hobby = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  story: string;
  status: string;
  since: string;
  milestones: { date: string; text: string }[];
  images: { src: string; alt: string }[];
};

export type TimelineEntry = {
  id: string;
  date: string;
  sortKey: string;
  title: string;
  category: "Career" | "Education" | "Project" | "Technical" | "Personal" | "Achievement";
  description: string;
  route?: string;
};

export type NowSection = {
  id: string;
  title: string;
  items: string[];
};

export const personal = {
  name: "Vikash Anand",
  title: "Cloud / DevOps Engineer",
  role: "Cloud-COE Engineer",
  company: "Avis Budget Group",
  shortIntro:
    "Cloud and DevOps Engineer passionate about AWS, Kubernetes, Terraform, automation and building reliable infrastructure.",
  about:
    "I build and operate cloud infrastructure — designing AWS environments, running containerised workloads on Kubernetes, and codifying everything with Terraform so it can be rebuilt, reviewed and trusted. I care about systems that are boring in production and pleasant to operate.",
  professionalSummary:
    "Cloud and DevOps engineer with 4+ years of experience across AWS infrastructure, container platforms and CI/CD automation. Day to day I work with ECS and EKS workloads, Terraform-managed infrastructure, Jenkins and GitHub-based delivery pipelines, and observability stacks built on Prometheus, Grafana and Zabbix. My focus is reliability: reproducible environments, sane networking, least-privilege access and deployments that are routine rather than eventful.",
  location: "Pune, Maharashtra, India",
  hometown: PLACEHOLDER,
  yearsOfExperience: "4+ Years",
  focus: "AWS • Kubernetes • Terraform • DevOps",
  availability: "Open to conversations",
  /** Replace with your real photograph at this path. */
  profileImage: "/images/profile.jpg",
  /** Drop your resume PDF in /public and point this at it. */
  resumePath: PLACEHOLDER,
  resumeFileName: "vikash-anand-resume.pdf",
  terminalUser: "vikash",
  terminalHost: "portfolio",
};

export const socials: SocialLink[] = [
  { id: "email", label: "Email", url: PLACEHOLDER, handle: PLACEHOLDER },
  { id: "github", label: "GitHub", url: PLACEHOLDER, handle: PLACEHOLDER },
  { id: "linkedin", label: "LinkedIn", url: PLACEHOLDER, handle: PLACEHOLDER },
  { id: "x", label: "X / Twitter", url: PLACEHOLDER, handle: PLACEHOLDER },
];

export const quickFacts = [
  { label: "Location", value: personal.location },
  { label: "Hometown", value: personal.hometown },
  { label: "Role", value: personal.role },
  { label: "Experience", value: personal.yearsOfExperience },
  { label: "Focus", value: personal.focus },
];

export const experience: Experience[] = [
  {
    id: "avis-cloud-coe",
    company: "Avis Budget Group",
    role: "Cloud-COE Engineer",
    type: "Full-time",
    location: PLACEHOLDER,
    start: "Nov 2024",
    end: "Present",
    current: true,
    summary:
      "Part of the Cloud Center of Excellence, working on AWS platform engineering, container platforms and infrastructure automation.",
    responsibilities: [
      "Design and maintain AWS infrastructure using Terraform.",
      "Operate containerised workloads on ECS and EKS.",
      "Support CI/CD delivery pipelines and release automation.",
      "Maintain monitoring and alerting across platform services.",
      PLACEHOLDER,
    ],
    achievements: [PLACEHOLDER],
    technologies: [
      "AWS",
      "Terraform",
      "Kubernetes",
      "EKS",
      "ECS",
      "Docker",
      "Jenkins",
      "Prometheus",
      "Grafana",
      "Linux",
    ],
  },
  {
    id: "avis-devops-contract",
    company: "Avis Budget Group",
    role: "DevOps Engineer — Contract / Multi-Region Deployment",
    type: "Contract",
    location: PLACEHOLDER,
    start: "Oct 2023",
    end: "Oct 2024",
    summary:
      "Worked on multi-region deployment of platform workloads, with a focus on Kubernetes environments and infrastructure as code.",
    responsibilities: [
      "Support multi-region deployment of application workloads.",
      "Build and maintain Terraform modules for repeatable environments.",
      "Work with Kubernetes/EKS clusters, Helm releases and service mesh routing.",
      PLACEHOLDER,
    ],
    achievements: [PLACEHOLDER],
    technologies: [
      "AWS",
      "Kubernetes",
      "EKS",
      "Helm",
      "Istio",
      "Gloo Mesh",
      "Terraform",
      "Docker",
      "Shell scripting",
    ],
  },
];

export const education: Education[] = [
  {
    id: "education-1",
    institution: PLACEHOLDER,
    qualification: PLACEHOLDER,
    field: PLACEHOLDER,
    start: PLACEHOLDER,
    end: PLACEHOLDER,
    details: PLACEHOLDER,
  },
];

export const certifications: Certification[] = [
  {
    id: "certification-1",
    name: PLACEHOLDER,
    issuer: PLACEHOLDER,
    issued: PLACEHOLDER,
  },
];

export const achievements: Achievement[] = [
  {
    id: "achievement-1",
    title: PLACEHOLDER,
    description: PLACEHOLDER,
    date: PLACEHOLDER,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "cloud",
    name: "Cloud",
    description: "Cloud platforms and managed services.",
    skills: [
      { name: "AWS", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
      { name: "S3", experienceIds: ["avis-cloud-coe"] },
      { name: "CloudFront", experienceIds: ["avis-cloud-coe"] },
      { name: "Route53", experienceIds: ["avis-cloud-coe"] },
      { name: "IAM", experienceIds: ["avis-cloud-coe"] },
      { name: "Secrets Manager", experienceIds: ["avis-cloud-coe"] },
    ],
  },
  {
    id: "containers",
    name: "Containers & Orchestration",
    description: "Building, shipping and running containers.",
    skills: [
      { name: "Docker", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
      { name: "Kubernetes", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
      { name: "EKS", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
      { name: "ECS", experienceIds: ["avis-cloud-coe"] },
      { name: "ECR", experienceIds: ["avis-cloud-coe"] },
      { name: "kubectl", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
      { name: "Helm", experienceIds: ["avis-devops-contract"] },
    ],
  },
  {
    id: "iac",
    name: "Infrastructure as Code",
    description: "Declarative, reviewable infrastructure.",
    skills: [
      { name: "Terraform", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
      { name: "CloudFormation", experienceIds: ["avis-cloud-coe"] },
    ],
  },
  {
    id: "cicd",
    name: "CI/CD",
    description: "Delivery pipelines and release automation.",
    skills: [
      { name: "Jenkins", experienceIds: ["avis-cloud-coe"] },
      { name: "GitHub", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring & Observability",
    description: "Knowing what production is doing.",
    skills: [
      { name: "Prometheus", experienceIds: ["avis-cloud-coe"] },
      { name: "Grafana", experienceIds: ["avis-cloud-coe"] },
      { name: "Zabbix", experienceIds: ["avis-cloud-coe"] },
    ],
  },
  {
    id: "networking",
    name: "Networking & Service Mesh",
    description: "Traffic, routing and connectivity.",
    skills: [
      { name: "Istio", experienceIds: ["avis-devops-contract"] },
      { name: "Gloo Mesh", experienceIds: ["avis-devops-contract"] },
      { name: "Route53", experienceIds: ["avis-cloud-coe"] },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    description: "Managed and self-hosted data stores.",
    skills: [
      { name: "RDS", experienceIds: ["avis-cloud-coe"] },
      { name: "PostgreSQL", experienceIds: ["avis-cloud-coe"], projectIds: ["grimmspot"] },
      { name: "PostGIS", projectIds: ["grimmspot"] },
    ],
  },
  {
    id: "programming",
    name: "Programming & Scripting",
    description: "Automation and tooling.",
    skills: [
      { name: "Python", experienceIds: ["avis-cloud-coe"] },
      { name: "Shell scripting", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
      { name: "TypeScript", projectIds: ["grimmspot"] },
      { name: "React", projectIds: ["grimmspot"] },
    ],
  },
  {
    id: "tools",
    name: "Systems & Tools",
    description: "The everyday working environment.",
    skills: [
      { name: "Linux", experienceIds: ["avis-cloud-coe", "avis-devops-contract"] },
      { name: "Git", experienceIds: ["avis-cloud-coe"] },
      { name: "Supabase", projectIds: ["grimmspot"] },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "grimmspot",
    name: "GrimmSpot",
    tagline: "Discover the local spots that maps forget.",
    description:
      "A map-based platform for discovering local street vendors, food carts, temporary shops and hidden local spots.",
    status: "In development",
    year: PLACEHOLDER,
    problem:
      "Street vendors, food carts and pop-up shops are a huge part of local life, but they are almost invisible on mainstream maps — they move, they have no fixed listing, and they are found mostly by word of mouth.",
    solution:
      "A community-driven map where spots can be added, located and described by the people who actually visit them, with geospatial search so you can see what is around you right now.",
    architecture:
      "React + TypeScript front end talking to Supabase for data, authentication and storage, with PostGIS powering location queries and a map layer for browsing and adding spots.",
    responsibilities: [
      "Product concept and data model.",
      "Front-end application in React and TypeScript.",
      "Geospatial queries and schema design with PostGIS.",
      "Deployment and iteration.",
    ],
    technologies: ["React", "TypeScript", "Supabase", "PostGIS", "Maps", "Lovable"],
    results: [PLACEHOLDER],
    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,
    screenshots: [
      { src: "/images/projects/grimmspot-1.jpg", alt: "GrimmSpot screenshot placeholder" },
      { src: "/images/projects/grimmspot-2.jpg", alt: "GrimmSpot screenshot placeholder" },
    ],
    architectureDiagram: {
      src: "/images/projects/grimmspot-architecture.png",
      alt: "GrimmSpot architecture diagram placeholder",
    },
    featured: true,
  },
];

export const hobbies: Hobby[] = [
  {
    id: "motorcycling",
    title: "Motorcycling",
    tagline: "Long roads, early starts.",
    description:
      "Riding is how I clear my head — planning routes, maintaining the bike and covering distance.",
    story: PLACEHOLDER,
    status: PLACEHOLDER,
    since: PLACEHOLDER,
    milestones: [{ date: PLACEHOLDER, text: PLACEHOLDER }],
    images: [
      { src: "/images/hobbies/motorcycling-1.jpg", alt: "Motorcycling photo placeholder" },
      { src: "/images/hobbies/motorcycling-2.jpg", alt: "Motorcycling photo placeholder" },
    ],
  },
  {
    id: "travel",
    title: "Travel / Exploration",
    tagline: "Places, people, detours.",
    description: "Exploring new places, usually on two wheels and usually off the obvious route.",
    story: PLACEHOLDER,
    status: PLACEHOLDER,
    since: PLACEHOLDER,
    milestones: [{ date: PLACEHOLDER, text: PLACEHOLDER }],
    images: [
      { src: "/images/hobbies/travel-1.jpg", alt: "Travel photo placeholder" },
      { src: "/images/hobbies/travel-2.jpg", alt: "Travel photo placeholder" },
    ],
  },
  {
    id: "content-creation",
    title: "Content Creation",
    tagline: "Documenting the ride and the build.",
    description: "Capturing rides, trips and projects, and shaping them into something watchable.",
    story: PLACEHOLDER,
    status: PLACEHOLDER,
    since: PLACEHOLDER,
    milestones: [{ date: PLACEHOLDER, text: PLACEHOLDER }],
    images: [
      { src: "/images/hobbies/content-1.jpg", alt: "Content creation photo placeholder" },
    ],
  },
  {
    id: "building",
    title: "Technology / Building Projects",
    tagline: "Side projects as a laboratory.",
    description:
      "Building things outside work — small tools, side projects and experiments that teach me something new.",
    story: PLACEHOLDER,
    status: "Currently building GrimmSpot",
    since: PLACEHOLDER,
    milestones: [{ date: PLACEHOLDER, text: PLACEHOLDER }],
    images: [{ src: "/images/hobbies/building-1.jpg", alt: "Project build photo placeholder" }],
  },
];

export const timeline: TimelineEntry[] = [
  {
    id: "t-cloud-coe",
    date: "Nov 2024",
    sortKey: "2024-11",
    title: "Cloud-COE Engineer, Avis Budget Group",
    category: "Career",
    description: "Joined the Cloud Center of Excellence working on AWS platform engineering.",
    route: "/profile",
  },
  {
    id: "t-devops-contract",
    date: "Oct 2023",
    sortKey: "2023-10",
    title: "DevOps Engineer — Multi-Region Deployment, Avis Budget Group",
    category: "Career",
    description: "Contract role focused on multi-region Kubernetes deployment and Terraform.",
    route: "/profile",
  },
  {
    id: "t-grimmspot",
    date: PLACEHOLDER,
    sortKey: "2025-01",
    title: "Started building GrimmSpot",
    category: "Project",
    description: "A map-based platform for discovering local vendors and hidden spots.",
    route: "/projects/grimmspot",
  },
  {
    id: "t-education",
    date: PLACEHOLDER,
    sortKey: "0000",
    title: PLACEHOLDER,
    category: "Education",
    description: PLACEHOLDER,
  },
];

export const now: { updated: string; sections: NowSection[] } = {
  updated: PLACEHOLDER,
  sections: [
    {
      id: "working-on",
      title: "Currently Working On",
      items: ["Cloud platform engineering at Avis Budget Group (AWS, ECS/EKS, Terraform).", PLACEHOLDER],
    },
    {
      id: "learning",
      title: "Currently Learning",
      items: [PLACEHOLDER],
    },
    {
      id: "building",
      title: "Currently Building",
      items: ["GrimmSpot — a map-based platform for discovering local spots.", PLACEHOLDER],
    },
    {
      id: "exploring",
      title: "Currently Exploring",
      items: [PLACEHOLDER],
    },
    {
      id: "goals",
      title: "Current Goals",
      items: [PLACEHOLDER],
    },
  ],
};

export const navItems = [
  { label: "Home", to: "/" },
  { label: "Terminal", to: "/terminal" },
  { label: "Profile", to: "/profile" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Hobbies", to: "/hobbies" },
  { label: "Timeline", to: "/timeline" },
  { label: "Now", to: "/now" },
  { label: "Contact", to: "/contact" },
  { label: "Help", to: "/help" },
] as const;

export const isPlaceholder = (value: string | undefined | null) =>
  !value || value === PLACEHOLDER || value.startsWith("[PLACEHOLDER");
