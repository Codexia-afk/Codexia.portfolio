import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Eye, Server, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';
import { personalData } from '../data/personal';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const privacyTitle = "Privacy Policy - Srinjoy Pramanick Portfolio";
  const privacyDesc = "Privacy policy and data transparency statement for the personal portfolio of Srinjoy Pramanick.";
  const canonicalUrl = "https://codexia-portfolio.vercel.app/privacy";

  return (
    <>
      <SEO
        title={privacyTitle}
        description={privacyDesc}
        canonical={canonicalUrl}
      />
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8c877b] dark:text-[#a8a69f] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#486616] dark:text-[#d5ef9c] bg-[#e8edd9] dark:bg-[#201f1c] px-3 py-1 rounded-md border border-[#486616]/30 dark:border-[#d5ef9c]/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal & Data Transparency
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#8c877b] dark:text-[#6e6b63]">
            LAST UPDATED // OCTOBER 2026 · EFFECTIVE DATE // OCTOBER 2026
          </p>
        </header>

        {/* Content */}
        <div className="py-10 space-y-10 text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1a1917] dark:text-[#f0ede5] flex items-center gap-2 font-display">
              <Lock className="w-5 h-5 text-[#486616] dark:text-[#d5ef9c]" />
              1. Overview & Commitment
            </h2>
            <p className="text-sm sm:text-base">
              This portfolio website (<code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#eae4d6] dark:bg-[#262521] text-[#1a1917] dark:text-[#f0ede5]">codexia-portfolio.vercel.app</code>) is a personal developer portfolio authored and maintained by <strong>Srinjoy Pramanick</strong>. Your privacy is respected unconditionally: this site does not track you across the web, does not sell your data, does not serve advertisements, and does not use third-party invasive trackers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1a1917] dark:text-[#f0ede5] flex items-center gap-2 font-display">
              <Eye className="w-5 h-5 text-[#486616] dark:text-[#d5ef9c]" />
              2. Information Collected
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                <strong>Local Browser Storage:</strong> We use your browser's <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#eae4d6] dark:bg-[#262521] text-[#1a1917] dark:text-[#f0ede5]">localStorage</code> solely to remember your UI theme preference (Light or Dark mode). No personal identifiers are stored.
              </p>
              <p>
                <strong>Direct Communications:</strong> When you click email links (<code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#eae4d6] dark:bg-[#262521] text-[#1a1917] dark:text-[#f0ede5]">mailto:</code>) or connect via LinkedIn or GitHub, any message you send is transmitted directly through standard email or those respective platforms. We only use your contact information to reply to your inquiry.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1a1917] dark:text-[#f0ede5] flex items-center gap-2 font-display">
              <Server className="w-5 h-5 text-[#486616] dark:text-[#d5ef9c]" />
              3. Hosting & Infrastructure
            </h2>
            <p className="text-sm sm:text-base">
              This site is deployed on <strong>Vercel Inc.</strong> Vercel may collect standard technical edge server logs (such as IP addresses, browser user-agent headers, and request timestamps) necessary for security auditing, DDoS mitigation, and global CDN caching.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1a1917] dark:text-[#f0ede5] flex items-center gap-2 font-display">
              <ShieldCheck className="w-5 h-5 text-[#486616] dark:text-[#d5ef9c]" />
              4. External Links
            </h2>
            <p className="text-sm sm:text-base">
              This site contains links to third-party services including GitHub, LinkedIn, and live project demos. We are not responsible for the privacy practices or content of external third-party sites. We encourage you to review their individual privacy policies.
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-xl bg-[#f4efe5] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27]">
            <h2 className="text-lg font-bold text-[#1a1917] dark:text-[#f0ede5] flex items-center gap-2 font-display">
              <Mail className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
              5. Contact Information
            </h2>
            <p className="text-sm">
              If you have any questions or data inquiries regarding this policy, please reach out directly:
            </p>
            <div className="font-mono text-xs text-[#486616] dark:text-[#d5ef9c] pt-1">
              <a href={`mailto:${personalData.socials.email}`} className="hover:underline">
                {personalData.socials.email}
              </a>
            </div>
          </section>

        </div>

        {/* Bottom Back Button */}
        <div className="pt-8 border-t border-[#dcd6c8] dark:border-[#2d2c27]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1917] dark:bg-[#f0ede5] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold hover:bg-[#486616] dark:hover:bg-[#d5ef9c] hover:text-[#f8f6f0] dark:hover:text-[#131312] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

      </main>
    </>
  );
};

export default PrivacyPolicy;
