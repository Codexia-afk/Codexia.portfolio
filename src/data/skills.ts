export interface SkillNode {
  name: string;
  category: 'AI/ML' | 'Frontend' | 'Backend' | 'Infrastructure' | 'Tools';
  description: string;
  ring: number; // 1 to 3 inner to outer ring radius multiplier
  angle: number; // default starting angle in degrees
  accent?: string;
}

export const skillOrbitNodes: SkillNode[] = [
  {
    name: "Python",
    category: "AI/ML",
    description: "Core language for LLM agents, TrustOS middleware, PyTorch, and FastAPI backends.",
    ring: 1,
    angle: 0,
    accent: "#0284c7"
  },
  {
    name: "Go",
    category: "Backend",
    description: "High-performance systems programming language used to build cross-platform tools like JeeraType.",
    ring: 1,
    angle: 60,
    accent: "#0284c7"
  },
  {
    name: "Rust",
    category: "Backend",
    description: "Memory-safe systems programming language used to build WASM Sandbox package manager plugins.",
    ring: 1,
    angle: 120,
    accent: "#0284c7"
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Type-safe application engineering for React interfaces, state machines, and Chrome extensions.",
    ring: 1,
    angle: 180,
    accent: "#0284c7"
  },
  {
    name: "React",
    category: "Frontend",
    description: "Primary library for building fluid, high-performance web applications and custom design systems.",
    ring: 1,
    angle: 240,
    accent: "#0284c7"
  },
  {
    name: "FastAPI",
    category: "Backend",
    description: "Used for high-speed Python REST APIs, WebSocket servers, and AI agent middleware.",
    ring: 1,
    angle: 300,
    accent: "#0d9488"
  },
  {
    name: "WebAssembly",
    category: "Backend",
    description: "WASM plugin runtime isolation and sandbox execution powered by Rust and Wasmtime.",
    ring: 2,
    angle: 30,
    accent: "#0284c7"
  },
  {
    name: "PyTorch",
    category: "AI/ML",
    description: "Deep learning framework used for neural networks, NLP, and machine learning models.",
    ring: 2,
    angle: 90,
    accent: "#0284c7"
  },
  {
    name: "Manifest V3",
    category: "Frontend",
    description: "Chrome Browser Extension architecture used in Loksetu.ai for privacy-first web copilots.",
    ring: 2,
    angle: 150,
    accent: "#0284c7"
  },
  {
    name: "Gemini API",
    category: "AI/ML",
    description: "Leveraged for LLM reasoning, prompt engineering, and Business Twin signal predictions.",
    ring: 2,
    angle: 210,
    accent: "#0284c7"
  },
  {
    name: "MongoDB",
    category: "Backend",
    description: "NoSQL document database powering structured market intelligence feeds in PulseForge AI.",
    ring: 2,
    angle: 270,
    accent: "#0d9488"
  },
  {
    name: "C / C++",
    category: "Backend",
    description: "Foundational languages for low-level systems programming, algorithms, and performance optimization.",
    ring: 2,
    angle: 330,
    accent: "#0284c7"
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    description: "Version control, open-source repository maintenance, and collaborative software development.",
    ring: 3,
    angle: 45,
    accent: "#7c3aed"
  },
  {
    name: "Docker",
    category: "Infrastructure",
    description: "Containerization tool for reproducible microservice deployment pipelines.",
    ring: 3,
    angle: 165,
    accent: "#0d9488"
  },
  {
    name: "DigitalOcean",
    category: "Infrastructure",
    description: "Cloud droplet infrastructure, Linux server deployment, and microservice hosting.",
    ring: 3,
    angle: 285,
    accent: "#0d9488"
  }
];

export interface SkillCategoryGroup {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategoryGroup[] = [
  {
    title: "Languages",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript", "Go", "Rust", "PHP", "HTML", "CSS"]
  },
  {
    title: "Frameworks & UI",
    skills: ["React", "FastAPI", "Flutter", "Tailwind CSS", "Vite", "PyTorch", "TensorFlow"]
  },
  {
    title: "AI / ML & Intelligence",
    skills: ["Generative AI", "LLMs", "AI Agents", "Machine Learning", "NLP", "Computer Vision", "Prompt Engineering"]
  },
  {
    title: "Systems, Web & Tools",
    skills: ["REST APIs", "Chrome Extensions (Manifest V3)", "WebAssembly (WASM)", "Git & GitHub", "MongoDB", "Firebase", "DigitalOcean", "Google AI Studio"]
  }
];
