import React from 'react';
import { Code2, Server, Layout, Brain, Wrench } from 'lucide-react';
import { MonoLabel } from '../typography/Typography';
import { HumanTooltip } from '../common/HumanTooltip';

interface SkillCategory {
  title: string;
  icon: React.FC<{ className?: string }>;
  skills: {
    name: string;
    level: string;
    projectEvidence: string;
    verified: boolean;
  }[];
}

export const TechnicalExpertise: React.FC = () => {

  const categories: SkillCategory[] = [
    {
      title: 'LANGUAGES',
      icon: Code2,
      skills: [
        { name: 'Go', level: 'Systems & CLI', projectEvidence: 'PushGuard & JeeraType', verified: true },
        { name: 'Python', level: 'Async APIs & ML', projectEvidence: 'TrustOS & PulseForge AI', verified: true },
        { name: 'TypeScript', level: 'Full-Stack & Extensions', projectEvidence: 'Loksetu.ai & Portfolio', verified: true },
        { name: 'Rust', level: 'WASM Runtime & FFI', projectEvidence: 'WASM Sandbox Manager', verified: true },
        { name: 'C / C++', level: 'Data Structures & Algorithmic', projectEvidence: 'CSE Core Coursework', verified: true },
        { name: 'SQL', level: 'Relational DB Schema', projectEvidence: 'PostgreSQL / Supabase', verified: true },
        { name: 'Bash', level: 'Shell Automation', projectEvidence: 'Git Hooks & CI Scripts', verified: true }
      ]
    },
    {
      title: 'BACKEND & SYSTEMS',
      icon: Server,
      skills: [
        { name: 'FastAPI', level: 'High-Throughput Async', projectEvidence: 'TrustOS Interception Engine', verified: true },
        { name: 'WebAssembly (WASM)', level: 'Capability Sandboxing', projectEvidence: 'Wasmtime Runtime Sandbox', verified: true },
        { name: 'Git Hook Interception', level: 'Pre-Commit DevSecOps', projectEvidence: 'PushGuard Go Hook Engine', verified: true },
        { name: 'REST & WebSockets', level: 'State Streaming', projectEvidence: 'TrustOS Realtime Telemetry', verified: true }
      ]
    },
    {
      title: 'FRONTEND & CLIENTS',
      icon: Layout,
      skills: [
        { name: 'React 19', level: 'Component Architecture', projectEvidence: 'Portfolio & Loksetu.ai', verified: true },
        { name: 'Chrome MV3 Extensions', level: 'Privacy DOM Injection', projectEvidence: 'Loksetu.ai Gov Copilot', verified: true },
        { name: 'Tailwind CSS (v4)', level: 'Fluid CSS Tokens', projectEvidence: 'Portfolio V2 Design System', verified: true },
        { name: 'Framer Motion', level: 'Microinteraction Physics', projectEvidence: 'Interactive Atelier & Orbit', verified: true }
      ]
    },
    {
      title: 'AI & MIDDLEWARE',
      icon: Brain,
      skills: [
        { name: 'Deterministic Guardrails', level: 'Policy Bounds Enforcing', projectEvidence: 'TrustOS Verification Layer', verified: true },
        { name: 'FAISS Vector Search', level: 'Cosine Similarity Queries', projectEvidence: 'TrustOS Policy Embeddings', verified: true },
        { name: 'LLM Function Calling', level: 'Schema Validation', projectEvidence: 'TrustOS & PulseForge AI', verified: true },
        { name: 'Zero-Telemetry OCR', level: 'Client-Side Document Parsing', projectEvidence: 'Loksetu.ai MV3 Engine', verified: true }
      ]
    },
    {
      title: 'TOOLS & INFRASTRUCTURE',
      icon: Wrench,
      skills: [
        { name: 'Git & GitHub', level: 'Monorepo & Hooks', projectEvidence: 'PushGuard & Daily Commits', verified: true },
        { name: 'Docker / Linux', level: 'Container Isolation', projectEvidence: 'Microservice Deployment', verified: true },
        { name: 'Supabase (OAuth PKCE)', level: 'Auth & RLS Policies', projectEvidence: 'Margins Feedback Engine', verified: true },
        { name: 'Vite & TS Build Tooling', level: 'ESM Bundling & Prerender', projectEvidence: 'Portfolio SSG Pipeline', verified: true }
      ]
    }
  ];

  return (
    <section id="technical-expertise" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#eeeae0] dark:bg-[#1a1917] border-b border-[#dcd6c8] dark:border-[#2d2c27] transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
          <div>
            <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
              04 // CAPABILITIES MATRIX
            </MonoLabel>
            <HumanTooltip registryId="skills-capabilities" placement="top">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] mt-1 cursor-default">
                TECHNICAL EXPERTISE
              </h2>
            </HumanTooltip>
            <p className="font-sans text-sm text-[#58554d] dark:text-[#a8a69f] max-w-xl mt-1">
              Verified skills tied directly to source-code implementations. No arbitrary percentage bars.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
            EVIDENCE-BASED COMPETENCY MATRIX
          </div>
        </div>

        {/* 5-Category Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <div
                key={idx}
                className="rounded-xl bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] p-5 space-y-4 shadow-2xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#dcd6c8]/60 dark:border-[#2d2c27]">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5]">
                    <Icon className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
                    <span>{cat.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63]">
                    {cat.skills.length} TECHNOLOGIES
                  </span>
                </div>

                <div className="space-y-2.5">
                  {cat.skills.map((s, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-lg bg-[#eeeae0]/60 dark:bg-[#1a1917]/60 border border-[#dcd6c8]/50 dark:border-[#2d2c27] flex flex-col justify-between hover:border-[#486616]/40 dark:hover:border-[#d5ef9c]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-bold text-xs sm:text-sm text-[#1a1917] dark:text-[#f0ede5]">
                          {s.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#486616] dark:text-[#d5ef9c] font-semibold bg-[#e8edd9] dark:bg-[#272622] px-1.5 py-0.5 rounded-xs">
                          {s.level}
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] mt-1 flex items-center gap-1 truncate">
                        <span className="text-[#bfb8a6] dark:text-[#494841]">↳</span>
                        <span>Evidence: {s.projectEvidence}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
