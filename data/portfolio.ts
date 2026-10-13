export const portfolio = {
  name: "Your Name",
  role: "Full-stack Developer",
  intro: "I build fast, accessible web apps with React and Node.js.",
  about:
    "Write 2 or 3 sentences about your background, what you enjoy building, and what you are learning now.",
  email: "you@example.com",
  photo: "", // later: put a transparent PNG in /public/me.png and set this to "/me.png"
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/in/" },
    { label: "LeetCode", href: "https://leetcode.com/" },
  ],
  skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind", "Git"],
  services: [
    { title: "Web Development", note: "Next.js, React, TypeScript" },
    { title: "Backend and APIs", note: "Node.js, Express, PostgreSQL" },
    { title: "Animations and UI", note: "GSAP, Motion, Tailwind" },
  ],
  projects: [
    {
      title: "Project one",
      description: "What it does, who it is for, and one result.",
      tech: ["React", "Node.js", "MongoDB"],
      live: "#",
      code: "#",
      image: "",
    },
    {
      title: "Project two",
      description: "What you built and the hardest part you solved.",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      live: "#",
      code: "#",
      image: "",
    },
    {
      title: "Project three",
      description: "What it does and what you learned building it.",
      tech: ["JavaScript", "Express", "MongoDB"],
      live: "#",
      code: "#",
      image: "",
    },
  ],
  experience: [
    { org: "Company one", role: "Software Developer Intern", when: "2026" },
    { org: "Company two", role: "Frontend Developer", when: "2025" },
    { org: "College or course", role: "B.Tech, Computer Science", when: "2022 to 2026" },
  ],
};