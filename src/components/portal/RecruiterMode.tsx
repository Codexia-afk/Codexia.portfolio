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
      <div className="flex items-center justify-between pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-[#e8edd9] text-[#486616] dark:bg-[#201f1c] dark:text-[#d5ef9c] border border-[#486616]/30 dark:border-[#d5ef9c]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#486616] dark:bg-[#d5ef9c] animate-pulse" />
          30-SECOND SCAN DOSSIER
        </span>
      </div>

      {/* Candidate Overview Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
              Srinjoy Pramanick
            </h2>
            <div className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-wider mt-0.5">
              AI Engineer & Full-Stack Systems Builder
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] mt-2 max-w-xl leading-relaxed text-pretty">
              B.Tech CSE student (2024–2028, JIS College of Engineering) specializing in deterministic AI agent guardrails, WebAssembly micro-runtimes, low-latency microservices, and developer tools.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW RESUME</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs uppercase font-bold tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] hover:text-[#486616] dark:hover:border-[#d5ef9c] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>COPY EMAIL</span>
            </button>
          </div>
        </div>

        {/* Quick Contact & Profile Badges */}
        <div className="pt-3 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub (@{personalData.username})</span>
          </a>
          <span className="text-[#bfb8a6] dark:text-[#383731]">·</span>
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <span className="text-[#bfb8a6] dark:text-[#383731]">·</span>
          <a
            href={personalData.socials.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            title="Click to mail"
            aria-label="Click to mail"
            className="inline-flex items-center gap-1.5 text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Email</span>
          </a>
        </div>
      </div>

      {/* Verified Benchmarks & Awards Grid */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-[#8c877b] dark:text-[#a8a69f] mb-3 font-semibold">
          VERIFIED COMPETITIVE ACHIEVEMENTS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#eeeae0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#2d2c27]">
            <div className="flex items-center gap-2 text-[#486616] dark:text-[#d5ef9c] font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>1st Runner-Up</span>
            </div>
            <div className="text-[#1a1917] dark:text-[#f0ede5] font-bold">CrazyBuild Hackathon</div>
            <div className="text-[11px] text-[#58554d] dark:text-[#a8a69f] mt-1">Sub-50ms synchronized WebSocket developer canvas</div>
          </div>

          <div className="p-4 rounded-xl bg-[#eeeae0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#2d2c27]">
            <div className="flex items-center gap-2 text-[#486616] dark:text-[#d5ef9c] font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Qualifier</span>
            </div>
            <div className="text-[#1a1917] dark:text-[#f0ede5] font-bold">Smart India Hackathon 2025</div>
            <div className="text-[11px] text-[#58554d] dark:text-[#a8a69f] mt-1">Government welfare portal copilot application engine</div>
          </div>

          <div className="p-4 rounded-xl bg-[#eeeae0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#2d2c27]">
            <div className="flex items-center gap-2 text-[#486616] dark:text-[#d5ef9c] font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>7+ Hackathons</span>
            </div>
            <div className="text-[#1a1917] dark:text-[#f0ede5] font-bold">Competitive Track Record</div>
            <div className="text-[11px] text-[#58554d] dark:text-[#a8a69f] mt-1">Shipping complete end-to-end MVPs in 24-48 hours</div>
          </div>
        </div>
      </div>

      {/* Core Competencies Matrix */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-[#8c877b] dark:text-[#a8a69f] mb-3 font-semibold">
          TECHNICAL COMPETENCY BREAKDOWN
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
          <div className="p-4 rounded-xl bg-[#eeeae0]/70 dark:bg-[#1a1917]/70 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-1.5">
            <div className="font-mono font-bold text-[#486616] dark:text-[#d5ef9c] uppercase text-[11px]">
              AI Infrastructure & Machine Learning
            </div>
            <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
              PyTorch, FAISS vector search, in-flight agent function interception, deterministic policy validation, LLM telemetry, LangChain, semantic embeddings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#eeeae0]/70 dark:bg-[#1a1917]/70 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-1.5">
            <div className="font-mono font-bold text-[#486616] dark:text-[#d5ef9c] uppercase text-[11px]">
              Low-Latency Systems & Backends
            </div>
            <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
              Python (FastAPI, AsyncIO), Go (Terminal UIs, concurrent network services), Rust, WebSockets, MongoDB, Redis, Docker, Linux systems administration.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#eeeae0]/70 dark:bg-[#1a1917]/70 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-1.5">
            <div className="font-mono font-bold text-[#486616] dark:text-[#d5ef9c] uppercase text-[11px]">
              Frontend & Interaction Engineering
            </div>
            <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
              React 19, TypeScript, Tailwind CSS v4, Framer Motion, Vanilla CSS design systems, Web accessibility (WCAG AA), responsive fluid clamp scaling.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#eeeae0]/70 dark:bg-[#1a1917]/70 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-1.5">
            <div className="font-mono font-bold text-[#486616] dark:text-[#d5ef9c] uppercase text-[11px]">
              Runtimes & Security Primitives
            </div>
            <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
              WebAssembly (WASM), Wasmtime capability sandboxing, Chrome Extensions (Manifest V3), cryptographic SHA-256 signatures, zero-trust verification.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Builds Quick Table */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-[#8c877b] dark:text-[#a8a69f] mb-3 font-semibold">
          TOP PRODUCTION CASE STUDIES
        </div>

        <div className="divide-y divide-[#dcd6c8] dark:divide-[#2d2c27] rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden font-sans">
          {projectsData.slice(0, 4).map((p) => (
            <div
              key={p.slug}
              className="p-4 flex items-center justify-between hover:bg-[#f4efe5] dark:hover:bg-[#201f1c] transition-colors gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#486616] dark:text-[#d5ef9c]">
                    {p.number}
                  </span>
                  <span className="font-display font-bold text-sm text-[#1a1917] dark:text-[#f0ede5] truncate">
                    {p.title}
                  </span>
                  <span className="hidden sm:inline font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase px-2 py-0.5 rounded bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731]">
                    {p.category}
                  </span>
                </div>
                <p className="text-xs text-[#58554d] dark:text-[#a8a69f] truncate mt-0.5">
                  {p.tagline}
                </p>
              </div>

              <button
                onClick={() => onOpenProjectPreview(p.slug)}
                className="font-mono text-xs text-[#486616] dark:text-[#d5ef9c] hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
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
