import React, { useState } from 'react';
import { Printer, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { MonoLabel } from '../typography/Typography';

export const ResumePanel: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] border-b border-[#dcd6c8] dark:border-[#2d2c27] transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
          <div>
            <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
              07 // OFFICIAL CREDENTIALS
            </MonoLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] mt-1">
              RÉSUMÉ & CANDIDATE DOSSIER
            </h2>
            <p className="font-sans text-sm text-[#58554d] dark:text-[#a8a69f] max-w-xl mt-1">
              Access the official curriculum vitae in HTML, printable PDF format, or view the inline briefing below.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
            DOCUMENT VER: 2026.02 // UPDATED
          </div>
        </div>

        {/* Action Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#486616] dark:bg-[#d5ef9c]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5]">
                SRINJOY_PRAMANICK_RESUME.HTML
              </span>
            </div>
            <p className="font-sans text-sm text-[#58554d] dark:text-[#a8a69f] max-w-xl">
              Includes full academic coursework at JIS College of Engineering, complete skill stack, flagship case studies, hackathon results, and leadership history.
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>OPEN FULL RÉSUMÉ</span>
            </a>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors cursor-pointer"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPreview ? 'COLLAPSE BRIEF' : 'INLINE PREVIEW'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT PDF</span>
            </button>
          </div>
        </div>

        {/* Inline Interactive Résumé Summary */}
        {showPreview && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#ffffff] dark:bg-[#0c0c0b] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#2d2c27] shadow-lg space-y-6 animate-fadeIn">
            
            {/* Header */}
            <div className="text-center pb-6 border-b border-[#dcd6c8] dark:border-[#2d2c27] space-y-1">
              <h3 className="font-display text-2xl font-bold">SRINJOY PRAMANICK</h3>
              <p className="font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
                Ichapore, Kolkata, WB · srinjoypramanick15@gmail.com · +91 7980942750 · github.com/Codexia-afk
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-wider border-b border-[#dcd6c8] dark:border-[#2d2c27] pb-1">
                EDUCATION
              </div>
              <div className="flex justify-between text-xs font-sans">
                <div>
                  <strong>JIS College of Engineering, Kalyani</strong> — B.Tech in Computer Science & Engineering
                </div>
                <div className="font-mono text-[#8c877b]">2024 – 2028 | CGPA: 8.44</div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-wider border-b border-[#dcd6c8] dark:border-[#2d2c27] pb-1">
                TECHNICAL CAPABILITIES
              </div>
              <div className="font-sans text-xs space-y-1 text-[#58554d] dark:text-[#a8a69f]">
                <div><strong>Languages:</strong> Go, Python, Rust, C/C++, TypeScript, JavaScript, SQL, Bash</div>
                <div><strong>Frameworks & Systems:</strong> React 19, FastAPI, WebAssembly (Wasmtime), Docker, Linux, Git Hooks</div>
                <div><strong>AI & Security:</strong> Deterministic Guardrails, FAISS Vector Search, LLM Function Calling, Shannon Entropy</div>
              </div>
            </div>

            {/* Flagship Projects */}
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-wider border-b border-[#dcd6c8] dark:border-[#2d2c27] pb-1">
                FEATURED PROJECTS
              </div>
              <div className="space-y-3 font-sans text-xs text-[#58554d] dark:text-[#a8a69f]">
                <div>
                  <div className="font-bold text-[#1a1917] dark:text-[#f0ede5]">
                    PushGuard — Zero-Dependency Pre-Push Git Security Guard in Go
                  </div>
                  <p>Sub-5ms Shannon entropy scanner and AST diff parser intercepting high-entropy secrets and API keys locally before push.</p>
                </div>
                <div>
                  <div className="font-bold text-[#1a1917] dark:text-[#f0ede5]">
                    TrustOS — Deterministic AI Agent Guardrail Layer
                  </div>
                  <p>Async FastAPI interception middleware with FAISS policy vector database and SHA-256 state hashing receipts with sub-18ms latency.</p>
                </div>
                <div>
                  <div className="font-bold text-[#1a1917] dark:text-[#f0ede5]">
                    Loksetu.ai — Privacy-First Welfare Portal Copilot (MV3)
                  </div>
                  <p>Client-side Chrome extension copilot with zero telemetry, local schema matching, and client OCR for Indian welfare schemes.</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-wider border-b border-[#dcd6c8] dark:border-[#2d2c27] pb-1">
                ACHIEVEMENTS & LEADERSHIP
              </div>
              <ul className="list-disc list-inside font-sans text-xs text-[#58554d] dark:text-[#a8a69f] space-y-1">
                <li>1st Runner-Up @ CrazyBuild Hackathon (Real-time collaborative developer tooling)</li>
                <li>Qualifier @ Smart India Hackathon (SIH) 2025 (Selected among national collegiate teams)</li>
                <li>Core Member, College Coding Club (Peer mentoring and technical problem-solving sessions)</li>
                <li>7+ Hackathons completed across AI/ML, developer tools, and systems engineering</li>
              </ul>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
