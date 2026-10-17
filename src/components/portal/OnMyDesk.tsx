import React from 'react';
import { 
  ArrowLeft, 
  Terminal, 
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { DeskMilestone } from './types';

interface OnMyDeskProps {
  onBack: () => void;
  onOpenProjectPreview: (slug: string) => void;
}

export const OnMyDesk: React.FC<OnMyDeskProps> = ({
  onBack,
  onOpenProjectPreview
}) => {
  const milestones: DeskMilestone[] = [
    {
      id: 'desk-1',
      projectTitle: 'TrustOS // In-Flight Agent Guardrails',
      slug: 'trustos',
      update: 'Benchmarking sub-18ms policy vector evaluations. Designing deterministic SHA-256 state hashing for non-repudiable tool-call traces across multi-agent handoffs.',
      date: 'CURRENT SPRINT // OCT 2026',
      status: 'In Flight',
      tech: ['Python', 'FastAPI', 'FAISS', 'Cryptographic Proofs'],
      link: 'https://github.com/Codexia-afk/trustos'
    },
    {
      id: 'desk-2',
      projectTitle: 'Loksetu.ai // Citizen Service Copilot',
      slug: 'loksetu-ai',
      update: 'Refining offline-first schema cache for Indian state welfare portals. Building localized voice-guided prompt inputs for rural service facilitators.',
      date: 'ACTIVE // SEP 2026',
      status: 'Benchmarking',
      tech: ['Chrome Extensions MV3', 'React', 'FastAPI'],
      link: 'https://github.com/Codexia-afk/loksetu-ai'
    },
    {
      id: 'desk-3',
      projectTitle: 'WASM Capability Sandbox Runtime',
      slug: 'wasm-sandbox',
      update: 'Implementing capability-based permission checks inside Wasmtime memory sandbox. Restricting socket access and file descriptors to zero-trust boundaries.',
      date: 'RESEARCH // AUG 2026',
      status: 'Exploring',
      tech: ['Rust', 'WebAssembly', 'Wasmtime'],
      link: 'https://github.com/Codexia-afk/wasm-sandbox'
    },
    {
      id: 'desk-4',
      projectTitle: 'CrazyBuild // Sub-50ms Collaborative State Sync',
      slug: 'pulseforge-ai',
      update: 'Shipped real-time state synchronization engine. Awarded 1st Runner-Up at CrazyBuild Hackathon for collaborative developer canvas performance.',
      date: 'SHIPPED // JUL 2026',
      status: 'Shipped',
      tech: ['WebSockets', 'Go', 'React', 'TypeScript'],
      link: 'https://github.com/Codexia-afk'
    }
  ];

  const getStatusBadge = (status: DeskMilestone['status']) => {
    switch (status) {
      case 'In Flight':
        return 'bg-[#f4efe5] text-[#8c6b12] dark:bg-[#201f1c] dark:text-[#f3d47c] border border-[#dcd6c8] dark:border-[#52451c]';
      case 'Benchmarking':
        return 'bg-[#e8edd9] text-[#486616] dark:bg-[#201f1c] dark:text-[#d5ef9c] border border-[#486616]/30 dark:border-[#d5ef9c]/30';
      case 'Shipped':
        return 'bg-[#e8edd9] text-[#486616] dark:bg-[#201f1c] dark:text-[#d5ef9c] border border-[#486616]/40 dark:border-[#d5ef9c]/40';
      default:
        return 'bg-[#eeeae0] text-[#58554d] dark:bg-[#201f1c] dark:text-[#a8a69f] border border-[#dcd6c8] dark:border-[#383731]';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back to Portal Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <span className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-widest">
          ON MY DESK // BUILD LOG
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 font-mono text-xs text-[#486616] dark:text-[#d5ef9c] font-semibold uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5" />
          <span>VERIFIED ENGINEERING TELEMETRY</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
          What I'm currently designing and shipping.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] max-w-xl text-pretty leading-relaxed">
          Chronological milestone log of active research, in-flight architecture sprints, and recently shipped benchmarks.
        </p>
      </div>

      {/* Milestones Stream */}
      <div className="space-y-4">
        {milestones.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] shadow-2xs hover:border-[#486616]/40 dark:hover:border-[#d5ef9c]/40 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
                <span className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
                  {item.date}
                </span>
              </div>

              {item.slug && (
                <button
                  onClick={() => onOpenProjectPreview(item.slug!)}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#486616] dark:text-[#d5ef9c] hover:underline cursor-pointer w-fit"
                >
                  <span>Preview Case Study</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
              {item.projectTitle}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed text-pretty">
              {item.update}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#dcd6c8] dark:border-[#2d2c27] font-mono text-xs">
              <div className="flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8c877b] dark:text-[#6e6b63] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors inline-flex items-center gap-1 text-[11px]"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
