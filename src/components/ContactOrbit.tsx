import React, { useState } from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, FileText, Copy, Check } from 'lucide-react';
import { personalData } from '../data/personal';
import { MonoLabel } from './typography/Typography';
import { HumanTooltip } from './common/HumanTooltip';

export const ContactOrbit: React.FC = () => {
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
      id="contact" 
      className="relative min-h-[85vh] w-full flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-b border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        
        {/* Section Label */}
        <div>
          <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
            07 // CLOSING CHAPTER &amp; DIRECT INQUIRIES
          </MonoLabel>
        </div>

        {/* Master Typographic Heading */}
        <div className="space-y-3">
          <h2 className="section-title text-[#1a1917] dark:text-[#f0ede5] leading-[0.98]">
            HAVE A SYSTEM TO ARCHITECT?{' '}<br className="hidden sm:inline" />
            <span className="editorial-italic font-normal lowercase tracking-normal text-[#486616] dark:text-[#d5ef9c]">
              *let's build it right.*
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#58554d] dark:text-[#a8a69f] max-w-2xl mx-auto leading-relaxed text-pretty">
            Open to AI systems engineering roles, low-latency microservice architectures, competitive hackathons, and high-impact technical collaborations.
          </p>
        </div>

        {/* Direct Action Hub */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
          
          {/* Primary Action: Direct Email */}
          <HumanTooltip registryId="contact-personal" placement="top">
            <a
              href={personalData.socials.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#486616] dark:hover:bg-[#e2f5b8] transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4 text-current" />
              <span>EMAIL DIRECTLY</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </HumanTooltip>

          {/* Secondary Action: Copy Email to Clipboard */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
                <span className="text-[#486616] dark:text-[#d5ef9c] font-bold">COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-current opacity-80" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>

          {/* Résumé */}
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
          >
            <FileText className="w-4 h-4 text-current opacity-80" />
            <span>CURRICULUM VITAE</span>
          </a>

          {/* GitHub */}
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
          >
            <Github className="w-4 h-4 text-current opacity-80" />
            <span>GITHUB</span>
          </a>

          {/* LinkedIn */}
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
          >
            <Linkedin className="w-4 h-4 text-current opacity-80" />
            <span>LINKEDIN</span>
          </a>

        </div>

        {/* Telemetry info */}
        <div className="pt-6 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
          <span>TELEMETRY: RESPONSE LATENCY</span>
          <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
          <span className="text-[#486616] dark:text-[#d5ef9c] font-semibold">&lt; 24 HOURS (IST)</span>
          <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
          <span>LOCATION: KOLKATA (22.57°N, 88.36°E)</span>
        </div>

      </div>
    </section>
  );
};

export default ContactOrbit;
