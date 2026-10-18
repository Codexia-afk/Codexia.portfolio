import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Copy, 
  Check, 
  Linkedin, 
  Github, 
  ArrowLeft, 
  ArrowUpRight 
} from 'lucide-react';
import { personalData } from '../../data/personal';
import { MonoLabel } from '../typography/Typography';

export const RecruiterContact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section 
      id="contact-recruiter" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#eeeae0] dark:bg-[#1a1917] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Label */}
        <div>
          <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
            08 // DIRECT HIRING PIPELINE
          </MonoLabel>
        </div>

        {/* Master Heading */}
        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#1a1917] dark:text-[#f0ede5] leading-[0.96]">
            LET'S BUILD SOMETHING<br />
            <span className="font-editorial italic lowercase font-normal text-[#486616] dark:text-[#d5ef9c]">
              *worth shipping.*
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#58554d] dark:text-[#a8a69f] max-w-xl mx-auto leading-relaxed">
            Actively open to software engineering internships, systems programming roles, technical hackathons, and high-impact developer tooling initiatives.
          </p>
        </div>

        {/* Direct Action Hub */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
          
          {/* Direct Email */}
          <a
            href={personalData.socials.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL DIRECTLY</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Copy Email */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
                <span className="text-[#486616] dark:text-[#d5ef9c] font-bold">COPIED: srinjoypramanick15@gmail.com</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 opacity-80" />
                <span>COPY EMAIL ADDRESS</span>
              </>
            )}
          </button>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors"
          >
            <Linkedin className="w-4 h-4 opacity-80" />
            <span>LINKEDIN</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Codexia-afk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors"
          >
            <Github className="w-4 h-4 opacity-80" />
            <span>GITHUB</span>
          </a>

          {/* Return to Portfolio */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 opacity-80" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </Link>

        </div>

        {/* Telemetry Footer */}
        <div className="pt-8 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
          <span>TYPICAL RESPONSE LATENCY: &lt; 24 HOURS (IST)</span>
          <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
          <span>LOCATION: KOLKATA, INDIA (22.57°N, 88.36°E)</span>
          <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
          <span className="text-[#486616] dark:text-[#d5ef9c] font-semibold">VERIFIED TELEMETRY ACTIVE</span>
        </div>

      </div>
    </section>
  );
};
