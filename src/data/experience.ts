export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  tech: string[];
  link?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "techverse",
    role: "Community Contributor",
    organization: "TechVerse",
    period: "Sep 2025 – Present",
    type: "Community Leadership",
    description: "Active contributor to technical discussions, development challenges, and open-source collaboration.",
    achievements: [
      "Contribute to technical architecture discussions and developer challenges.",
      "Conduct peer debugging sessions and Git/GitHub collaborative workflows."
    ],
    tech: ["Git", "GitHub", "Python", "Open Source", "Peer Mentoring"]
  },
  {
    id: "coding-club",
    role: "Core Member",
    organization: "College Coding Club",
    period: "Sep 2025 – Present",
    type: "College Leadership",
    description: "Core organizer and mentor leading hackathons, coding activities, and technical events.",
    achievements: [
      "Participate in regional & national hackathons and technical events.",
      "Provide peer mentoring and support junior developers in problem solving and full-stack development."
    ],
    tech: ["Algorithms", "Hackathons", "Mentoring", "C++", "Python"]
  },
  {
    id: "gaming-club",
    role: "Extended Member",
    organization: "JIS Gaming Club",
    period: "2025 – Present",
    type: "Community Coordination",
    description: "Event coordinator and extended member supporting gaming community initiatives.",
    achievements: [
      "Contribute to gaming community activities and esports event coordination.",
      "Collaborate on campus initiatives and esports tech infrastructure."
    ],
    tech: ["Event Coordination", "Community Leadership", "Teamwork"]
  },
  {
    id: "crazybuild-2025",
    role: "1st Runner-Up",
    organization: "CrazyBuild Hackathon",
    period: "2025",
    type: "36-Hour Competitive Hackathon",
    description: "Secured 1st Runner-Up position building real-time collaborative developer tooling under high pressure.",
    achievements: [
      "Architected sub-50ms WebSocket state sync engine for real-time developer pair sessions.",
      "Built dynamic UI with React, Framer Motion, and Tailwind CSS recognized for visual polish and architectural speed."
    ],
    tech: ["React", "TypeScript", "WebSockets", "FastAPI", "Tailwind CSS"]
  },
  {
    id: "sih-2025",
    role: "Qualifier",
    organization: "Smart India Hackathon 2025",
    period: "2025",
    type: "National Level Hackathon",
    description: "Selected among top engineering teams across India to build full-stack intelligent solutions for real-world impact.",
    achievements: [
      "Engineered microservice backend with async FastAPI pipelines and real-time model evaluation.",
      "Presented working technical prototype and system architecture to senior industry evaluation panels."
    ],
    tech: ["Python", "FastAPI", "React", "Machine Learning", "Cloud Infrastructure"]
  }
];
