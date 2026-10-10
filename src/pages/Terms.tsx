import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckSquare, Code2, AlertCircle, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';
import { personalData } from '../data/personal';

export const Terms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsTitle = "Terms & Conditions - Srinjoy Pramanick Portfolio";
  const termsDesc = "Terms and conditions of use for the personal developer portfolio and open-source project showcases of Srinjoy Pramanick.";
  const canonicalUrl = "https://codexia-portfolio.vercel.app/terms";

  return (
    <>
      <SEO
        title={termsTitle}
        description={termsDesc}
        canonical={canonicalUrl}
      />
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-stone-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-200 dark:border-cyan-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Terms of Use & License Terms
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400">
            LAST UPDATED // OCTOBER 2026 · EFFECTIVE DATE // OCTOBER 2026
          </p>
        </header>

        {/* Content */}
        <div className="py-10 space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              1. Acceptance of Terms
            </h2>
            <p className="text-sm sm:text-base">
              By accessing and viewing this portfolio website (<code className="font-mono text-xs px-1.5 py-0.5 rounded bg-stone-200 dark:bg-zinc-800">codexia-portfolio.vercel.app</code>), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue use of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              2. Intellectual Property & Open-Source Code
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                <strong>Portfolio Design & Content:</strong> The overall site design, textual editorial content, case studies, and personal branding are the intellectual property of <strong>Srinjoy Pramanick</strong>.
              </p>
              <p>
                <strong>Open-Source Repositories:</strong> Code repositories linked on this site (such as TrustOS, JeeraType, Loksetu.ai, and WASM Sandbox) are hosted publicly on GitHub and are individually governed by their respective open-source licenses (such as MIT or Apache 2.0) specified in each repository.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              3. Disclaimer of Warranties
            </h2>
            <p className="text-sm sm:text-base">
              This portfolio and all demo projects are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. The author does not warrant that live demo links, sandbox instances, or external APIs will remain uninterrupted or error-free.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              4. Permitted Use
            </h2>
            <p className="text-sm sm:text-base">
              You are welcome to browse this portfolio, review technical architecture case studies, inspect source code repositories on GitHub, and contact the author regarding engineering opportunities, collaborations, or hackathons.
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-xl bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              5. Inquiries
            </h2>
            <p className="text-sm">
              For any licensing or technical inquiries regarding these terms:
            </p>
            <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400 pt-1">
              <a href={`mailto:${personalData.socials.email}`} className="hover:underline">
                {personalData.socials.email}
              </a>
            </div>
          </section>

        </div>

        {/* Bottom Back Button */}
        <div className="pt-8 border-t border-stone-200 dark:border-zinc-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs uppercase font-bold hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

      </main>
    </>
  );
};

export default Terms;
