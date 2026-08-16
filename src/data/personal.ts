export interface PersonalData {
  name: string;
  username: string;
  role: string;
  tagline: string;
  subTagline: string;
  location: string;
  phone: string;
  education: {
    institution: string;
    degree: string;
    period: string;
  };
  availability: string;
  tags: string[];
  motto: string;
  bio: string[];
  heroStatements: string[];
  permanentStatement: {
    headline: string;
    subtext: string;
    detail: string;
  };
  currentlyBuilding: {
    title: string;
    description: string;
    slug: string;
    status: string;
    tech: string[];
  };
  socials: {
    github: string;
    linkedin: string;
    email: string;
    bento: string;
    mailto: string;
    resume: string;
  };
  stats: {
    hackathons: string;
    awards: string;
    sihStatus: string;
  };
}

export const personalData: PersonalData = {
  name: "Srinjoy Pramanick",
  username: "Codexia-afk",
  role: "AI ENGINEER · FULL-STACK DEVELOPER",
  tagline: "B.Tech CSE student focused on AI/ML, full-stack development, and systems engineering.",
  subTagline: "I build production-oriented systems involving LLMs, AI agents, trust infrastructure, browser extensions, WebAssembly, Go, and Rust.",
  location: "Ichapore, West Bengal, India",
  phone: "+91 7980942750",
  education: {
    institution: "JIS College of Engineering, Kalyani",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    period: "2024 – 2028"
  },
  availability: "Open to technical collaborations, engineering roles & hackathons",
  tags: ["AI/ML", "Full-Stack", "Systems", "Rust & Go", "WebAssembly"],
  motto: "Building intelligent software that revolves around real-world utility.",
  heroStatements: [
    "Building intelligent software.",
    "Engineering AI agents & trust systems.",
    "Exploring WebAssembly, Go & Rust.",
    "Shipping things that solve real problems."
  ],
  permanentStatement: {
    headline: "I BUILD INTELLIGENT SYSTEMS.",
    subtext: "AI Engineer • Full-Stack Developer • Systems Builder",
    detail: "JIS College of Engineering (2024–2028) · Ichapore, West Bengal"
  },
  bio: [
    "B.Tech Computer Science Engineering student focused on AI/ML, full-stack development, and systems engineering. Builds production-oriented projects involving LLMs, AI agents, trust infrastructure, browser extensions, WebAssembly, Go, and Rust.",
    "Active hackathon participant, open-source contributor, and core member of college coding and gaming communities.",
    "Prioritizes clean component abstraction, low-latency microservices, deterministic data flows, and security-focused software architecture."
  ],
  currentlyBuilding: {
    title: "TrustOS",
    description: "An explainable digital trust layer for autonomous AI agents providing intent verification, policy enforcement, and explainable decision traces.",
    slug: "trustos",
    status: "Active Architecture & v0.4 Dev",
    tech: ["Python", "FastAPI", "LLMs", "Vector Search", "Cryptographic Proofs"]
  },
  socials: {
    github: "https://github.com/Codexia-afk",
    linkedin: "https://linkedin.com/in/srinjoy-pramanick",
    email: "srinjoypramanick15@gmail.com",
    bento: "https://bento.me/srinjoy19",
    mailto: `mailto:srinjoypramanick15@gmail.com?subject=${encodeURIComponent("Inquiry / Opportunity for Srinjoy Pramanick")}&body=${encodeURIComponent("Hi Srinjoy,\n\nI reviewed your resume and portfolio and would love to connect regarding an opportunity or technical collaboration.\n\nBest regards,")}`,
    resume: "/resume.html"
  },
  stats: {
    hackathons: "7+ HACKATHONS",
    awards: "1st Runner-Up — CrazyBuild Hackathon",
    sihStatus: "Qualifier — Smart India Hackathon 2025"
  }
};
