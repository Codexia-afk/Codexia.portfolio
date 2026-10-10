import React from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Copy, 
  Github, 
  Linkedin, 
  Mail, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';
import { personalData } from '../../data/personal';
import { projectsData } from '../../data/projects';

interface RecruiterModeProps {
  onBack: () => void;
  onOpenProjectPreview: (slug: string) => void;
  onShowToast: (msg: string) => void;
}

export const RecruiterMode: React.FC<RecruiterModeProps> = ({
  onBack,
  onOpenProjectPreview,
  onShowToast
}) => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.socials.email);
    onShowToast('✓ Email copied: srinjoypramanick15@gmail.com');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Back to Portal Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          30-SECOND SCAN DOSSIER
        </span>
      </div>

      {/* Candidate Overview Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Srinjoy Pramanick
            </h2>
            <div className="font-mono text-xs font-bold text-sky-600 dark:text-cyan-400 uppercase tracking-wider mt-0.5">
              AI Engineer & Full-Stack Systems Builder
            </div>
            <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 max-w-xl leading-relaxed text-pretty">
              B.Tech CSE student (2024–2028, JIS College of Engineering) specializing in deterministic AI agent guardrails, WebAssembly micro-runtimes, low-latency microservices, and developer tools.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW RESUME</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-xs uppercase font-bold tracking-wider border border-stone-300 dark:border-zinc-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>COPY EMAIL</span>
            </button>
          </div>
        </div>

        {/* Quick Contact & Profile Badges */}
        <div className="pt-3 border-t border-stone-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub (@{personalData.username})</span>
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a
            href={personalData.socials.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            title="Click to mail"
            aria-label="Click to mail"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Email</span>
          </a>
        </div>
      </div>

      {/* Verified Benchmarks & Awards Grid */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3 font-semibold">
          VERIFIED COMPETITIVE ACHIEVEMENTS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>1st Runner-Up</span>
            </div>
            <div className="text-zinc-800 dark:text-zinc-200 font-bold">CrazyBuild Hackathon</div>
            <div className="text-[11px] text-zinc-500 mt-1">Sub-50ms synchronized WebSocket developer canvas</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Qualifier</span>
            </div>
            <div className="text-zinc-800 dark:text-zinc-200 font-bold">Smart India Hackathon 2025</div>
            <div className="text-[11px] text-zinc-500 mt-1">Government welfare portal copilot application engine</div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-cyan-950/20 border border-sky-200/80 dark:border-cyan-900/40">
            <div className="flex items-center gap-2 text-sky-700 dark:text-cyan-400 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>7+ Hackathons</span>
            </div>
            <div className="text-zinc-800 dark:text-zinc-200 font-bold">Competitive Track Record</div>
            <div className="text-[11px] text-zinc-500 mt-1">Shipping complete end-to-end MVPs in 24-48 hours</div>
          </div>
        </div>
      </div>

      {/* Core Competencies Matrix */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3 font-semibold">
          TECHNICAL COMPETENCY BREAKDOWN
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-1.5">
            <div className="font-mono font-bold text-sky-600 dark:text-cyan-400 uppercase text-[11px]">
              AI Infrastructure & Machine Learning
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              PyTorch, FAISS vector search, in-flight agent function interception, deterministic policy validation, LLM telemetry, LangChain, semantic embeddings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-1.5">
            <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[11px]">
              Low-Latency Systems & Backends
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Python (FastAPI, AsyncIO), Go (Terminal UIs, concurrent network services), Rust, WebSockets, MongoDB, Redis, Docker, Linux systems administration.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-1.5">
            <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[11px]">
              Frontend & Interaction Engineering
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              React 19, TypeScript, Tailwind CSS v4, Framer Motion, Vanilla CSS design systems, Web accessibility (WCAG AA), responsive fluid clamp scaling.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-1.5">
            <div className="font-mono font-bold text-amber-600 dark:text-amber-400 uppercase text-[11px]">
              Runtimes & Security Primitives
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              WebAssembly (WASM), Wasmtime capability sandboxing, Chrome Extensions (Manifest V3), cryptographic SHA-256 signatures, zero-trust verification.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Builds Quick Table */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3 font-semibold">
          TOP PRODUCTION CASE STUDIES
        </div>

        <div className="divide-y divide-stone-200/80 dark:divide-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 overflow-hidden font-sans">
          {projectsData.slice(0, 4).map((p) => (
            <div
              key={p.slug}
              className="p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-zinc-800/40 transition-colors gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-sky-600 dark:text-cyan-400">
                    {p.number}
                  </span>
                  <span className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {p.title}
                  </span>
                  <span className="hidden sm:inline font-mono text-[10px] text-zinc-400 uppercase px-2 py-0.5 rounded bg-stone-100 dark:bg-zinc-800">
                    {p.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {p.tagline}
                </p>
              </div>

              <button
                onClick={() => onOpenProjectPreview(p.slug)}
                className="font-mono text-xs text-sky-600 dark:text-cyan-400 hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
