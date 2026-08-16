export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  link?: string;
  content: string[];
}

export const writingData: Article[] = [
  {
    id: "latency-critical-guardrails",
    title: "Designing Latency-Critical Guardrail Sidecars for Autonomous AI Agents",
    excerpt: "Why evaluating LLM function calls requires sub-20ms policy vector lookup rather than recursive model calls.",
    date: "Feb 2026",
    readTime: "4 min read",
    category: "AI Infrastructure",
    content: [
      "Autonomous agents are moving from simple chatbots to active execution proxies. When an agent emits a function call to execute an external API payload, traditional perimeter security models break down.",
      "In this technical note, I detail the architectural trade-offs of building an in-flight middleware sidecar using FastAPI and vector embeddings to enforce non-repudiable policy checks under 20ms."
    ]
  },
  {
    id: "defense-in-depth-ai-telemetry",
    title: "Defense in Depth: Combining Heuristic Threat Scoring with LLM Telemetry",
    excerpt: "How autoencoders for packet anomaly detection pair with natural language explanation generators to combat SOC analyst fatigue.",
    date: "Jan 2026",
    readTime: "5 min read",
    category: "Cybersecurity",
    content: [
      "Machine learning models excels at pattern recognition in high-dimensional packet data, but fails at generating human-readable context. Large Language Models excel at narrative explanation, but hallucinate under strict numerical inputs.",
      "By placing a PyTorch statistical autoencoder in front of a constrained LLM explanation engine, we can reduce false-positive fatigue while delivering instant MITRE ATT&CK mappings to security analysts."
    ]
  },
  {
    id: "hackathon-architecture-patterns",
    title: "Hackathon Engineering: Patterns for Shipping Production-Grade Demos in 36 Hours",
    excerpt: "Architectural heuristics for rapidly building, testing, and presenting complex web applications under severe constraints.",
    date: "Nov 2025",
    readTime: "3 min read",
    category: "Engineering Practices",
    content: [
      "Hackathons are not about writing quick hacky code—they are about rapid scope control and ruthless prioritization. Having completed 7+ hackathons and placing 1st Runner-Up at CrazyBuild, here are 5 patterns that ensure your system actually works when judges test it."
    ]
  }
];
