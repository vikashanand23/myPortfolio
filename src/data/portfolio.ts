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
  icon: string;
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
  experienceIds?: string[];
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
  category:
    | "Career"
    | "Education"
    | "Project"
    | "Technical"
    | "Personal"
    | "Achievement";
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
  title: "Cloud DevOps Engineer",
  role: "Cloud DevOps Engineer",
  company: "ThinkAnalytics",

  shortIntro:
    "I explore problems that catch my eye, break them down, automate what I can, and build reliable solutions across cloud and infrastructure.",

  about:
    "I bridge the gap between application code and cloud infrastructure. Specializing in container platform design and infrastructure automation, I help engineering teams scale on AWS without sacrificing reliability or velocity. Interested in resilience engineering, internal developer platforms, and eliminating operational toil.",

  professionalSummary:
    "Cloud DevOps Engineer with 4+ years of experience designing, deploying and supporting scalable cloud infrastructure on AWS. Experienced in Kubernetes container orchestration, CI/CD automation using Jenkins, Infrastructure as Code with Terraform, and service mesh technologies such as Istio and Gloo Mesh. Strong background in Linux-based environments, multi-region deployments, cloud monitoring, production support and operational automation.",

  location: "Pune, Maharashtra, India",

  hometown: "Patna, Bihar, India",

  yearsOfExperience: "4+ Years",

  focus: "AWS • Kubernetes • Terraform • DevOps",

  availability: "Open to conversations",

  /** Replace with your real photograph at this path. */
  profileImage: "/images/profile.jpg",

  /** Drop your resume PDF in /public and point this at it. */
  resumePath: "/vikash-anand-resume.pdf",

  resumeFileName: "vikash-anand-resume.pdf",

  terminalUser: "vikash",

  terminalHost: "portfolio",
};

export const socials: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    // { rel: "icon", href: "", type: "image/x-icon" },
    icon: "/gmail.png",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=vikashanand04@gmail.com",
    handle: "vikashanand04@gmail.com",
  },
  {
    id: "github",
    label: "GitHub",
    icon: "/github.png",
    url: "https://github.com/vikashanand23",
    handle: "Open vikash's github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "/linkedin.png",
    url: "https://www.linkedin.com/in/vikash-a-040760107/",
    handle: "Check out vikash's linkedin",
  },
  {
    id: "instagram",
    label: "instagram",
    icon: "/instagram.png",
    url: "https://www.instagram.com/afictionalwolf/",
    handle: "Visit vikash on Instagram",
  },
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
    id: "thinkanalytics-cloud-devops",
    company: "ThinkAnalytics",
    role: "Cloud DevOps Engineer",
    type: "Full-time",
    location: "Pune, Maharashtra, India",
    start: "Mar 2025",
    end: "Present",
    current: true,

    summary:
      "Cloud DevOps Engineer focused on designing, automating and operating AWS cloud infrastructure, with hands-on experience in Kubernetes, Terraform, CI/CD, monitoring and application reliability. Builds scalable infrastructure and automation solutions that improve deployment efficiency, system resilience and operational performance.",

    responsibilities: [ 
      "Delivered cloud-native deployment solutions for 20+ enterprise customers, developing and deploying applications across AWS environments while collaborating with cross-functional teams to ensure reliable and scalable releases.",
      "Migrated traditionally deployed services to containerized Kubernetes workloads, implementing automated deployment, failover, scaling and multi-layer security across staging and production environments.",
      "Transformed 100+ static CloudFormation scripts into modular Terraform code, reducing infrastructure provisioning time by 60% and improving deployment consistency.", 
      "Designed an AI-based predictive scaling architecture to dynamically optimize infrastructure capacity based on application usage patterns, with a projected ~15% reduction in infrastructure costs during peak workloads.", 
      "Developed and deployed feature enhancements for multiple customers in production environments, coordinating application changes, configuration updates, testing and release activities to improve deployment efficiency.", 
      "Automated and optimized system health monitoring and AWS CloudWatch configurations, implementing proactive alerting and infrastructure capacity improvements across compute, disk and memory resources.", 
      "Streamlined Terraform-based infrastructure deployments, reducing manual provisioning and configuration activities by 40% and improving consistency across environments.", 
      "Worked extensively with AWS, Kubernetes, Terraform, CloudWatch and containerized application environments to build, deploy, monitor and maintain scalable cloud infrastructure.", 
    ],

    achievements: [
      "Deployed and maintained 20+ enterprise customers in production environments.",
      "Reduced downtime incidents by approximately 25% through proactive alert handling.",
      "Reduced manual intervention in Terraform deployments by approximately 40%.",
      "Designed predictive scaling architecture projected to reduce peak infrastructure costs by approximately 15%.",
      "Migrated services toward Kubernetes-based deployments for automated failure management and improved security.",
    ],

    technologies: [
      "AWS",
      "Kubernetes",
      "Terraform",
      "Docker",
      "CloudWatch",
      "Jenkins",
      "Linux",
      "Python",
      "Shell",
    ],
  },

  { 
    id: "avis-cloud-coe", 
    company: "Avis Budget Group", 
    role: "Cloud COE Engineer / DevOps Engineer", 
    type: "Full-time", 
    location: "Bengaluru, Karnataka, India", 
    start: "Oct 2023", 
    end: "Feb 2025", 
    
    summary: "Cloud DevOps engineering role focused on AWS infrastructure automation, Kubernetes, multi-region deployments, Infrastructure as Code, CI/CD and service mesh technologies across Fleet Data Platform and Customer Data Platform environments.", 
    
    responsibilities: [ 
      "Engineered and automated AWS infrastructure workflows for Fleet Data Platform and Customer Data Platform environments.", 
      "Automated service lifecycle management through JumpBox-based workflows and implemented automatic secret key rotation for cloud services.", 
      "Transformed 100+ static CloudFormation scripts into modular Terraform infrastructure, improving scalability, maintainability and deployment consistency.", 
      "Designed and maintained Jenkins pipelines integrating Terraform and CloudFormation to automate AWS infrastructure operations and deployments.", 
      "Created automated deployment scripts for multi-region application environments, significantly reducing environment setup time.", 
      "Deployed and maintained Kubernetes clusters across two AWS regions to provide service redundancy and improve application resilience.", 
      "Implemented service mesh access-control, failover and outlier-detection policies to improve reliability across distributed environments.", 
      "Managed cross-region service mesh traffic and migrated ingress routing from Istio to Gloo Mesh Route Tables to optimize traffic flow.", 
    ], 
    
    achievements: [ 
      "Eliminated approximately 15 hours per week of manual coordination through service lifecycle and secret rotation automation.", 
      "Transformed 100+ static CloudFormation scripts into modular Terraform code, reducing infrastructure provisioning time by approximately 60%.", 
      "Automated AWS infrastructure operations through Jenkins pipelines, reducing execution time by approximately 70%.", 
      "Achieved approximately 90% reduction in multi-region environment setup time through automated deployment scripts.", 
      "Improved service redundancy by deploying Kubernetes clusters across two AWS regions and reduced downtime risk by approximately 40%.", 
      "Improved system reliability by approximately 35% through service mesh access control, failover and outlier-detection policies.", 
      "Optimized cross-region traffic management by migrating ingress routing from Istio to Gloo Mesh Route Tables.", 
    ], 
    
    technologies: [ 
      "AWS", 
      "Kubernetes", 
      "EKS", 
      "Docker", 
      "Terraform", 
      "CloudFormation", 
      "Jenkins", 
      "Istio", 
      "Gloo Mesh", 
      "Helm", 
      "Python", 
      "Shell", 
      "Linux", 
      "S3", 
      "IAM", 
      "Secrets Manager", 
    ], 
  },

  {
    id: "cognizant-programmer-analyst",
    company: "Cognizant",
    role: "Programmer Analyst Trainee",
    type: "Full-time",
    location: "India",
    start: "Mar 2023",
    end: "Oct 2023",

    summary:
      "Worked on Digital Dashboard Transformation for Otsuka Pharmaceuticals, focusing on data migration, SQL optimization and Tableau dashboard validation.",

    responsibilities: [
      "Migrated large datasets into Tableau using optimized SQL queries.",
      "Validated and enhanced Tableau dashboards for reporting accuracy.",
      "Analyzed data quality and resolved migration and visualization issues.",
      "Worked with SQL-based data extraction and transformation workflows.",
    ],

    achievements: [
      "Improved data integrity and reduced migration errors by approximately 20%.",
      "Achieved 100% visualization accuracy across validated dashboards.",
      "Reduced reporting errors by approximately 30%.",
    ],

    technologies: [
      "SQL",
      "Tableau",
      "Data Analysis",
    ],
  },

  {
    id: "cognizant-data-warehousing",
    company: "Cognizant",
    role: "Data Warehousing Intern",
    type: "Internship",
    location: "India",
    start: "Mar 2022",
    end: "Jun 2022",

    summary:
      "Worked on data processing and ETL workflows using PySpark, Hive, Hadoop and Informatica, along with Python, SQL and shell scripting.",

    responsibilities: [
      "Built PySpark, Hive and Hadoop workflows for data processing.",
      "Developed ETL pipelines using Informatica PowerCenter.",
      "Authored shell scripts for automation and data-processing workflows.",
      "Developed SQL, Python, NumPy and Pandas solutions for data analysis.",
    ],

    achievements: [
      "Improved data processing efficiency by approximately 25%.",
      "Reduced ETL load time by approximately 30%.",
      "Authored 50+ shell scripts.",
      "Completed 150+ SQL, Python, NumPy and Pandas solutions.",
      "Improved data analysis throughput by approximately 40%.",
    ],

    technologies: [
      "PySpark",
      "Hive",
      "Hadoop",
      "Informatica PowerCenter",
      "Python",
      "SQL",
      "Shell",
      "NumPy",
      "Pandas",
    ],
  },
];

export const education: Education[] = [
  {
    id: "education-1",
    institution: "Heritage Institute of Technology, Kolkata",
    qualification: "Bachelor of Technology",
    field: "Technology",
    start: "Jul 2018",
    end: "Jul 2022",
    details: "CGPA: 8.0",
  },
];

export const certifications: Certification[] = [
  {
    id: "certification-1",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "Certified",
  },
];

export const achievements: Achievement[] = [
  {
    id: "achievement-python-sql",
    title: "HackerRank Gold Badges",
    description:
      "Earned Gold Badges in Python and SQL on HackerRank.",
    date: "Professional Achievement",
  },

];

export const skillCategories: SkillCategory[] = [
  {
    id: "cloud",
    name: "Cloud",
    description: "AWS cloud infrastructure and managed services.",
    skills: [
      {
        name: "AWS",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-cloud-coe",
          "avis-multi-region",
        ],
      },
      {
        name: "S3",
        experienceIds: ["avis-cloud-coe"],
        projectIds: ["cross-account-s3"],
      },
      {
        name: "EC2",
        projectIds: ["book-info"],
      },
      {
        name: "VPC",
        projectIds: ["book-info"],
      },
      {
        name: "IAM",
        experienceIds: ["avis-cloud-coe"],
        projectIds: ["cross-account-s3"],
      },
      {
        name: "Secrets Manager",
        experienceIds: ["avis-cloud-coe"],
      },
      {
        name: "CloudWatch",
        experienceIds: ["thinkanalytics-cloud-devops"],
        projectIds: ["cross-account-s3"],
      },
      {
        name: "Lambda",
        projectIds: ["cross-account-s3"],
      },
    ],
  },

  {
    id: "containers",
    name: "Containers & Orchestration",
    description: "Building, deploying and operating containerised workloads.",
    skills: [
      {
        name: "Docker",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-cloud-coe",
          "avis-multi-region",
        ],
      },
      {
        name: "Kubernetes",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-cloud-coe",
          "avis-multi-region",
        ],
      },
      {
        name: "EKS",
        experienceIds: ["avis-multi-region"],
      },
      {
        name: "ECS",
        experienceIds: ["avis-cloud-coe"],
      },
      {
        name: "ECR",
        experienceIds: ["avis-cloud-coe"],
      },
      {
        name: "kubectl",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-multi-region",
        ],
      },
      {
        name: "Helm",
        experienceIds: ["avis-multi-region"],
      },
    ],
  },

  {
    id: "iac",
    name: "Infrastructure as Code",
    description: "Declarative and repeatable infrastructure provisioning.",
    skills: [
      {
        name: "Terraform",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-cloud-coe",
          "avis-multi-region",
        ],
        projectIds: ["book-info"],
      },
      {
        name: "CloudFormation",
        experienceIds: ["avis-cloud-coe"],
      },
    ],
  },

  {
    id: "cicd",
    name: "CI/CD",
    description: "Delivery pipelines, release automation and infrastructure workflows.",
    skills: [
      {
        name: "Jenkins",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-cloud-coe",
          "avis-multi-region",
        ],
      },
      {
        name: "Concourse",
        note: "Listed in technical skills on the resume.",
      },
      {
        name: "ArgoCD",
        note: "Listed in technical skills on the resume.",
      },
      {
        name: "Git",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-cloud-coe",
          "avis-multi-region",
        ],
      },
      {
        name: "GitHub",
        note: "Used for source control and engineering projects.",
      },
    ],
  },

  {
    id: "monitoring",
    name: "Monitoring & Observability",
    description: "Monitoring infrastructure and supporting production reliability.",
    skills: [
      {
        name: "CloudWatch",
        experienceIds: ["thinkanalytics-cloud-devops"],
        projectIds: ["cross-account-s3"],
      },
      {
        name: "Prometheus",
        note: "Listed in prior DevOps experience and technical toolkit.",
      },
      {
        name: "Grafana",
        note: "Listed in prior DevOps experience and technical toolkit.",
      },
      {
        name: "Zabbix",
        note: "Listed in prior DevOps experience and technical toolkit.",
      },
      {
        name: "Postman",
        note: "Listed in technical skills on the resume.",
      },
    ],
  },

  {
    id: "networking",
    name: "Networking & Service Mesh",
    description: "Traffic management, routing, security and service connectivity.",
    skills: [
      {
        name: "Istio",
        experienceIds: ["avis-multi-region"],
        projectIds: ["book-info"],
      },
      {
        name: "Gloo Mesh",
        experienceIds: ["avis-multi-region"],
      },
      {
        name: "VPC",
        projectIds: ["book-info"],
      },
      {
        name: "Security Groups",
        projectIds: ["book-info"],
      },
    ],
  },

  {
    id: "databases",
    name: "Databases & Data",
    description: "Data platforms, databases and analytical technologies.",
    skills: [
      {
        name: "SQL",
        projectIds: ["movie-review-model"],
      },
      {
        name: "Hadoop",
        experienceIds: ["cognizant-data-warehousing"],
      },
      {
        name: "Hive",
        experienceIds: ["cognizant-data-warehousing"],
      },
      {
        name: "PySpark",
        experienceIds: ["cognizant-data-warehousing"],
      },
      {
        name: "Informatica PowerCenter",
        experienceIds: ["cognizant-data-warehousing"],
      },
    ],
  },

  {
    id: "programming",
    name: "Programming & Scripting",
    description: "Automation, data processing and scripting.",
    skills: [
      {
        name: "Python",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "cognizant-data-warehousing",
        ],
        projectIds: ["movie-review-model"],
      },
      {
        name: "Shell scripting",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "cognizant-data-warehousing",
          "avis-multi-region",
        ],
      },
      {
        name: "SQL",
        experienceIds: ["cognizant-programmer-analyst"],
        projectIds: ["movie-review-model"],
      },
      {
        name: "HTML/CSS",
      },
      {
        name: "BeautifulSoup",
        projectIds: ["movie-review-model"],
      },
      {
        name: "NumPy",
        experienceIds: ["cognizant-data-warehousing"],
        projectIds: ["movie-review-model"],
      },
      {
        name: "Pandas",
        experienceIds: ["cognizant-data-warehousing"],
        projectIds: ["movie-review-model"],
      },
    ],
  },

  {
    id: "analytics",
    name: "Data & Analytics",
    description: "Data engineering, visualization and machine learning.",
    skills: [
      {
        name: "Tableau",
        experienceIds: ["cognizant-programmer-analyst"],
        projectIds: ["movie-review-model"],
      },
      {
        name: "Scikit-Learn",
        projectIds: ["movie-review-model"],
      },
      {
        name: "RandomForest",
        projectIds: ["movie-review-model"],
      },
      {
        name: "PySpark",
        experienceIds: ["cognizant-data-warehousing"],
      },
      {
        name: "Hadoop",
        experienceIds: ["cognizant-data-warehousing"],
      },
      {
        name: "Hive",
        experienceIds: ["cognizant-data-warehousing"],
      },
      {
        name: "Informatica PowerCenter",
        experienceIds: ["cognizant-data-warehousing"],
      },
    ],
  },

  {
    id: "tools",
    name: "Systems & Tools",
    description: "Everyday engineering and development tools.",
    skills: [
      {
        name: "Linux",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-cloud-coe",
          "avis-multi-region",
        ],
      },
      {
        name: "Git",
        experienceIds: [
          "thinkanalytics-cloud-devops",
          "avis-cloud-coe",
          "avis-multi-region",
        ],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "book-info",
    name: "Book Info Application",
    tagline: "AWS infrastructure and Istio service mesh deployment.",

    description:
      "A Book Info application deployed on AWS infrastructure provisioned with Terraform, demonstrating secure cloud networking, EC2-based application deployment and Istio service mesh capabilities.",

    status: "Completed",
    year: "Project",

    problem:
      "Deploying an application on AWS requires secure networking, controlled access and repeatable infrastructure provisioning while also providing a practical environment for service mesh implementation.",

    solution:
      "Provisioned AWS infrastructure using Terraform and deployed the Book Info application on EC2 with Istio for service mesh capabilities.",

    architecture:
      "Terraform provisions the AWS VPC, subnets, routing, security groups and EC2 infrastructure. The Book Info application runs on the provisioned environment with Istio providing service mesh functionality.",

    responsibilities: [
      "Provisioned VPC, subnets, routing and security groups using Terraform.",
      "Provisioned EC2 infrastructure for application deployment.",
      "Deployed the Book Info application.",
      "Implemented Istio-based service mesh capabilities.",
      "Designed the infrastructure with secure and repeatable deployment practices.",
    ],

    technologies: [
      "AWS",
      "Terraform",
      "VPC",
      "EC2",
      "Security Groups",
      "Istio",
    ],

    results: [
      "Created a repeatable AWS infrastructure deployment using Terraform.",
      "Demonstrated end-to-end cloud infrastructure provisioning and application deployment.",
      "Implemented Istio service mesh capabilities on the Book Info application.",
    ],

    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,

    screenshots: [
      {
        src: "/images/book-info-coverpic.jpg",
        alt: "Book Info application screenshot",
      },
    ],

    architectureDiagram: {
      src: "/images/architecture-bookinfo.jpg",
      alt: "Book Info application architecture diagram",
    },

    featured: true,
  },

  {
    id: "movie-review-model",
    name: "Movie Review Model",
    tagline: "IMDb data pipeline, analytics and machine learning.",

    description:
      "A data and machine learning project using IMDb movie review data collected with BeautifulSoup, processed with Python, NumPy and Pandas, visualized with Tableau and used to train a RandomForest regression model.",

    status: "Completed",
    year: "Project",

    problem:
      "Large-scale movie review data requires collection, cleaning, structured storage and analysis before meaningful insights or predictive models can be produced.",

    solution:
      "Scraped and stored more than 5,000 IMDb movie records using BeautifulSoup and SQL, cleansed the dataset with Python data-processing libraries, built Tableau dashboards and trained a RandomForest regression model.",

    architecture:
      "IMDb data is collected using BeautifulSoup, stored using SQL, cleaned and transformed with Python, NumPy and Pandas, visualized in Tableau, and passed into a Scikit-Learn RandomForest regression model for prediction.",

    responsibilities: [
      "Scraped 5,000+ IMDb movie records using BeautifulSoup.",
      "Stored and queried movie data using SQL.",
      "Cleaned and transformed datasets using Python, NumPy and Pandas.",
      "Built Tableau dashboards for data analysis and visualization.",
      "Trained a RandomForest regression model using Scikit-Learn.",
    ],

    technologies: [
      "Python",
      "BeautifulSoup",
      "SQL",
      "NumPy",
      "Pandas",
      "Tableau",
      "Scikit-Learn",
      "RandomForest",
    ],

    results: [
      "Processed more than 5,000 IMDb movie records.",
      "Improved insights quality by approximately 40% through data cleansing and visualization.",
      "Achieved 96% prediction accuracy with the RandomForest regression model.",
    ],

    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,

    screenshots: [
      {
        src: "/images/movie-review-model.jpg",
        alt: "Movie Review Model application screenshot",
      },
    ],

    architectureDiagram: null,

    featured: true,
  },

  {
    id: "cross-account-s3",
    name: "Cross-Account S3 Replication",
    tagline: "Automated cross-account and cross-region AWS data replication.",

    description:
      "An AWS-based cross-account S3 replication solution designed to synchronize data across AWS regions while using IAM, Lambda and CloudWatch for secure automation and operational monitoring.",

    status: "Completed",
    year: "Project",

    problem:
      "Critical data requires reliable replication across accounts and regions to improve availability, reduce recovery risk and maintain secure data transfer between AWS environments.",

    solution:
      "Engineered cross-account S3 replication using IAM roles and bucket policies, with AWS Lambda and CloudWatch supporting replication automation and monitoring.",

    architecture:
      "Source S3 data is replicated across AWS accounts and regions using IAM-controlled permissions and S3 bucket policies. AWS Lambda supports automation while CloudWatch provides operational monitoring.",

    responsibilities: [
      "Engineered cross-account S3 replication between AWS environments.",
      "Configured IAM roles for secure cross-account access.",
      "Configured S3 bucket policies for controlled data transfer.",
      "Implemented AWS Lambda automation around the replication workflow.",
      "Configured CloudWatch monitoring for replication operations.",
    ],

    technologies: [
      "AWS S3",
      "IAM",
      "AWS Lambda",
      "CloudWatch",
      "Cross-Account AWS",
      "Cross-Region Replication",
    ],

    results: [
      "Improved data redundancy and availability across AWS regions.",
      "Implemented secure cross-account data transfer using IAM and S3 policies.",
      "Reduced recovery point objective to near-zero.",
    ],

    githubUrl: PLACEHOLDER,
    liveUrl: PLACEHOLDER,

    screenshots: [
      {
        src: "/images/s3-account-replication.jpg",
        alt: "S3 Account Replication application screenshot",
      },
    ],

    architectureDiagram: null,

    featured: true,
  },
];

export const hobbies: Hobby[] = [
  {
    id: "motorcycling",
    title: "Motorcycling",
    tagline: "Outrunning daylight and regrets.",
    description:
      "Riding is how I clear my head. You inspect every bolt, check every line, and respect the machine—mostly because you know it won't hesitate to turn you into a statistical anomaly",
    story: PLACEHOLDER,
    status: "Active",
    since: "2023",
    milestones: [{ date: "05-2025", text: "bought guirrella 450" }],
    images: [
      {
        src: "/images/hobbies/motorcycling-1.jpg",
        alt: "Motorcycling photo placeholder",
      },
      {
        src: "/images/hobbies/motorcycling-2.jpg",
        alt: "Motorcycling photo placeholder",
      },
    ],
  },

  {
    id: "travel",
    title: "Travel / Exploration",
    tagline: "Places, people, detours.",
    description:
      "Off the map, off-beat, and driving straight into the punchline no one saw coming.",
    story: PLACEHOLDER,
    status: "Active",
    since: "2018",
    milestones: [{ date: "present", text: "earth is too big to have a milestone for travelling" }],
    images: [
      {
        src: "/images/hobbies/travel-1.jpg",
        alt: "Travel photo placeholder",
      },
      {
        src: "/images/hobbies/travel-2.jpg",
        alt: "Travel photo placeholder",
      },
      {
        src: "/images/hobbies/travel-3.jpg",
        alt: "Travel photo placeholder",
      },
    ],
  },

  {
    id: "building",
    title: "Technology / Building Projects",
    tagline: "Utilising new technologies to build side projects and experiments.",
    description:
      "Building technology projects and experiments outside work to learn new tools, architectures and engineering practices.",
    story: PLACEHOLDER,
    status: "Currently building",
    since: "2018",
    milestones: [{ date: "2026", text: "personal curated portfolio" }],
    images: [
      {
        src: "/images/hobbies/building-1.jpg",
        alt: "Technology project build photo placeholder",
      },
    ],
  },

  {
    id: "Sports",
    title: "Playing Sports",
    tagline: "Staying active and competitive.",
    description:
      "Playing various sports to stay fit and competitive.",
    story: PLACEHOLDER,
    status: "Currently playing",
    since: "2000",
    milestones: [{ date: "2012", text: "won bronze medal in high jump" }],
    images: [
      {
        src: "/images/hobbies/building-1.jpg",
        alt: "Technology project build photo placeholder",
      },
    ],
  },

  {
    id: "RRiddles",
    title: "Solving Riddles and mathematical sums",
    tagline: "Sharpening my mind with logic puzzles.",
    description:
      "Solving riddles and mathematical sums to keep my mind sharp.",
    story: PLACEHOLDER,
    status: "Currently solving",
    since: "2005",
    milestones: [{ date: "2009-2015", text: "scored 100 marks in mathematics every year" }],
    images: [
      {
        src: "/images/hobbies/building-1.jpg",
        alt: "Technology project build photo placeholder",
      },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    id: "t-thinkanalytics",
    date: "Mar 2025",
    sortKey: "2025-03",
    title: "Cloud DevOps Engineer, ThinkAnalytics",
    category: "Career",
    description:
      "Joined ThinkAnalytics as a Cloud DevOps Engineer, working on AWS production support, Kubernetes, Terraform, monitoring and cloud automation.",
    route: "/profile",
  },

  {
    id: "t-avis-budget-group",
    date: "Oct 2023",
    sortKey: "2023-10",
    title: "Cloud COE Engineer, Avis Budget Group",
    category: "Career",
    description:
      "Worked on AWS cloud infrastructure, Terraform, CloudFormation, Jenkins, service lifecycle automation and multi-region platform engineering.",
    route: "/profile",
  },

  {
    id: "t-cognizant",
    date: "Mar 2023",
    sortKey: "2023-03",
    title: "Programmer Analyst Trainee, Cognizant",
    category: "Career",
    description:
      "Worked on Digital Dashboard Transformation for Otsuka Pharmaceuticals using SQL and Tableau.",
    route: "/profile",
  },

  {
    id: "t-cognizant-intern",
    date: "Mar 2022",
    sortKey: "2022-08",
    title: "Data Warehousing Intern, Cognizant",
    category: "Career",
    description:
      "Worked with PySpark, Hive, Hadoop, Informatica, Python, SQL and shell scripting.",
    route: "/profile",
  },

  {
    id: "t-education-btech",
    date: "Jul 2022",
    sortKey: "2022-07",
    title: "Bachelor of Technology — Heritage Institute of Technology",
    category: "Education",
    description:
      "Completed Bachelor of Technology with an 8.0 CGPA.",
    route: "/profile",
  },

  {
    id: "t-education-Senior-Secondary-School",
    date: "Jul 2017",
    sortKey: "2017-07",
    title: "class12th - Krishna Public School, Patna",
    category: "Education",
    description:
      "Completed senior secondary education with 70% marks.",
    route: "/profile",
  },

    {
    id: "t-education-Higher-Secondary-School",
    date: "Jul 2015",
    sortKey: "2015-07",
    title: "class10th - Keshave Saraswati Vidya Mandir, Patna",
    category: "Education",
    description:
      "Completed primary education with 98 % marks.",
    route: "/profile",
  },
];

export const now: { updated: string; sections: NowSection[] } = {
  updated: "September 2026",

  sections: [
    {
      id: "working-on",
      title: "Currently Working On",
      items: [
        "Cloud DevOps engineering at ThinkAnalytics.",
        "AWS production support, Kubernetes, Terraform and cloud monitoring.",
        "Onboarding and deploying new infrastructure for new customers, Improving operational reliability and reducing manual infrastructure work.",
      ],
    },

    {
      id: "learning",
      title: "Currently Learning",
      items: [
        "Advanced Kubernetes and cloud-native architecture.",
        "Infrastructure automation and CI/CD engineering.",
        "AI Integrated DevOps workflows and MLOps.",
      ],
    },

    {
      id: "building",
      title: "Currently Building",
      items: [
        "A Dynamic Personal Project using AI integration and scalable infrastructure",
      ],
    },

    {
      id: "exploring",
      title: "Currently Exploring",
      items: [
        "AWS platform engineering.",
        "Kubernetes and service mesh technologies.",
        "Infrastructure as Code and deployment automation.",
        "MLOps and platform engineering.",
      ],
    },

    {
      id: "goals",
      title: "Current Goals",
      items: [
        "Deepen AWS and Kubernetes expertise.",
        "Build production-quality DevOps and cloud projects.",
        "Strengthen CI/CD and infrastructure automation skills.",
        "Become proficient in MLOps and AI-integrated DevOps workflows.",
      ],
    },
  ],
};

export const navItems = [
  { label: "Home", to: "/" },
  { label: "Profile", to: "/profile" },
  { label: "Terminal", to: "/terminal" },
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