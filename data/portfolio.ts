export type Project = {
  title: string;
  label: string;
  tagline: string;
  highlights: string[];
  tech: string[];
  image: string;
  code: string;
  live: string;
  demo: string;
  isPrivate: boolean;
};

const projects: Project[] = [
  {
    title: "VeriJob AI",
    label: "NLP · Machine Learning",
    tagline: "Fake job posting detector",
    highlights: [
      "Catches about 91% of fake postings (recall) with Logistic Regression, compared against Random Forest and Naive Bayes.",
      "Handles heavily imbalanced data (about 5% fraudulent) with TF-IDF features and class-weighted training.",
      "Served through a FastAPI backend to a React web app.",
    ],
    tech: ["Python", "scikit-learn", "NLTK", "FastAPI", "React"],
    image: "/projects/verijob-ai.png",
    code: "https://github.com/riyax11/verijob-ai",
    live: "",
    demo: "",
    isPrivate: false,
  },
  {
    title: "FinSight AI",
    label: "LLM · Data Analytics",
    tagline: "Ask a bank's data questions in plain English",
    highlights: [
      "An LLM turns each question into SQL and runs it on over 1 million transactions in PostgreSQL.",
      "Every generated query passes a safety check and is shown next to the answer.",
      "Results appear as interactive charts with an AI-written summary.",
    ],
    tech: ["Django", "PostgreSQL", "Groq LLM", "Chart.js", "Python"],
    image: "/projects/finsight-ai.png",
    code: "https://github.com/riyax11/finsight-ai",
    live: "",
    demo: "",
    isPrivate: false,
  },
  {
    title: "ChainGuard",
    label: "Blockchain · Team of 3",
    tagline: "Anti-money laundering monitor",
    highlights: [
      "A five-rule risk engine scores every transaction from 0 to 100.",
      "Each result is written to a Solidity smart contract as a tamper-proof audit trail, with role-based access.",
      "Dashboard with alerts, SAR PDF export, a watchlist and a network graph of fund flows.",
    ],
    tech: ["React", "Node.js", "Express", "Solidity", "Hardhat", "ethers.js"],
    image: "/projects/chainguard.png",
    code: "https://github.com/riyax11/chainguard-aml",
    live: "",
    demo: "",
    isPrivate: false,
  },
  {
    title: "DataForge AI",
    label: "Data Engineering · AI-assisted base",
    tagline: "Approval-gated data pipeline workspace",
    highlights: [
      "Attach a CSV and get a risk-classified plan; duplicate removal and publishing wait for human approval.",
      "Extended with an LLM planner (Groq) that proposes the steps, while fixed rules enforce the approvals.",
      "Falls back to a rule-based plan if the model fails, and sends only column metadata, never row data.",
    ],
    tech: ["React", "Express", "PostgreSQL", "Drizzle", "OpenAPI", "Groq"],
    image: "/projects/dataforge-ai.png",
    code: "https://github.com/riyax11/dataforge-ai",
    live: "",
    demo: "",
    isPrivate: false,
  },
  {
    title: "InventoryQR",
    label: "Full-Stack",
    tagline: "Warehouse inventory with QR and barcode scanning",
    highlights: [
      "Scan a product and its rack to verify its location before it is stored.",
      "Records inbound and outbound movements with a full history.",
      "React frontend with a FastAPI and SQLAlchemy backend.",
    ],
    tech: ["React", "FastAPI", "SQLAlchemy", "SQLite", "QR scanning"],
    image: "/projects/inventoryqr.png",
    code: "",
    live: "",
    demo: "",
    isPrivate: true,
  },
  {
    title: "Chair Occupancy Detection",
    label: "Computer Vision · Internship project",
    tagline: "Measures how long each chair is occupied",
    highlights: [
      "Detects people with a pretrained YOLOv8 model and OpenCV.",
      "Chair zones are marked on the frame and the time each one stays occupied is tracked.",
      "Tested on public video clips recorded from different camera angles.",
    ],
    tech: ["Python", "YOLOv8", "OpenCV"],
    image: "/projects/chair-occupancy.png",
    code: "",
    live: "",
    demo: "",
    isPrivate: true,
  },
];

export const portfolio = {
  name: "Riya Patkar",
  role: "AI/ML & Full-Stack Developer",
  intro:
    "Final-year AI & ML engineering student building intelligent, practical and user-focused products.",
  about:
    "I'm a final-year Artificial Intelligence and Machine Learning engineering student who enjoys turning ideas into working products. I work across machine learning, computer vision, LLM-powered tools and full-stack web development, and I'm building my skills through real-world projects, with a focus on technology that solves meaningful problems.",
  email: "riyapatkar20@gmail.com",
  photo: "/me.jpg",
  github: "riyax11",
  socials: [{ label: "GitHub", href: "https://github.com/riyax11" }],
  skills: [
    "Python",
    "JavaScript",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Data Analytics",
    "React",
    "Node.js",
    "FastAPI",
    "Django",
    "SQL",
    "Git",
  ],
  services: [
    { title: "AI & Machine Learning", note: "NLP, Computer Vision, LLM apps" },
    { title: "Data & Analytics", note: "Python, SQL, dashboards" },
    { title: "Full-Stack Development", note: "React, FastAPI, Django, Node.js" },
  ],
  stack: [
    { group: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL", "Solidity"] },
    {
      group: "AI & ML",
      items: ["scikit-learn", "NLP (TF-IDF)", "YOLOv8 · OpenCV", "LLM apps (Groq)", "Prompt design"],
    },
    { group: "Backend", items: ["FastAPI", "Django", "Node.js · Express", "REST APIs"] },
    { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Chart.js", "GSAP"] },
    {
      group: "Data & Tools",
      items: ["PostgreSQL", "SQLite", "SQLAlchemy", "Drizzle ORM", "Git · GitHub"],
    },
  ],
  projects,
  experience: [
    {
      org: "Reliance Jio",
      role: "Video Analytics Intern, Business Automation",
      when: "1 to 31 January 2026",
    },
    {
      org: "Lokmanya Tilak College of Engineering",
      role: "B.E., Artificial Intelligence and Machine Learning",
      when: "Final year",
    },
  ],
  certifications: [
    {
      title: "Agentic AI: From Learner to Builder",
      issuer: "IBM SkillsBuild with CSRBOX",
      when: "4 July to 7 August 2025",
      note: "A 4-week project-based learning program on building AI agents. Certificate of Training.",
    },
    {
      title: "Green Skills and Artificial Intelligence",
      issuer: "Edunet Foundation, Skills4Future Program",
      when: "March 2025",
      note: "Foundation course completed at Lokmanya Tilak College of Engineering. Certificate of Completion.",
    },
  ],
};