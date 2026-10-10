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
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Benchmarking':
        return 'bg-sky-100 text-sky-800 dark:bg-cyan-950/80 dark:text-cyan-300 border-sky-300 dark:border-cyan-800';
      case 'Shipped':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      default:
        return 'bg-stone-100 text-stone-700 dark:bg-zinc-800 dark:text-zinc-300 border-stone-200 dark:border-zinc-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back to Portal Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <span className="font-mono text-xs font-bold text-sky-600 dark:text-cyan-400 uppercase tracking-widest">
          ON MY DESK // BUILD LOG
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5" />
          <span>VERIFIED ENGINEERING TELEMETRY</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          What I'm currently designing and shipping.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-xl text-pretty leading-relaxed">
          Chronological milestone log of active research, in-flight architecture sprints, and recently shipped benchmarks.
        </p>
      </div>

      {/* Milestones Stream */}
      <div className="space-y-4">
        {milestones.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-stone-200/80 dark:border-zinc-800 shadow-2xs hover:border-sky-300 dark:hover:border-zinc-700 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  {item.date}
                </span>
              </div>

              {item.slug && (
                <button
                  onClick={() => onOpenProjectPreview(item.slug!)}
                  className="inline-flex items-center gap-1 font-mono text-xs text-sky-600 dark:text-cyan-400 hover:underline cursor-pointer w-fit"
                >
                  <span>Preview Case Study</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {item.projectTitle}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed text-pretty">
              {item.update}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-zinc-800/80 font-mono text-xs">
              <div className="flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px]"
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
                  className="text-zinc-400 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-1 text-[11px]"
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
