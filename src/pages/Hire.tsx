import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { RecruiterHero } from '../components/recruiter/RecruiterHero';
import { RecruiterQuickView } from '../components/recruiter/RecruiterQuickView';
import { ProofOfWork } from '../components/recruiter/ProofOfWork';
import { TechnicalExpertise } from '../components/recruiter/TechnicalExpertise';
import { AchievementTimeline } from '../components/recruiter/AchievementTimeline';
import { EngineeringApproach } from '../components/recruiter/EngineeringApproach';
import { ResumePanel } from '../components/recruiter/ResumePanel';
import { RecruiterContact } from '../components/recruiter/RecruiterContact';

const hireJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://codexia-portfolio.vercel.app/hire#profilepage",
    "url": "https://codexia-portfolio.vercel.app/hire",
    "name": "The Hiring Dossier — Srinjoy Pramanick (@Codexia-afk)",
    "description": "Recruiter dossier and professional engineering profile of Srinjoy Pramanick (Codexia-afk). Computer Science student at JIS College of Engineering. Builder of PushGuard, TrustOS, and Loksetu.ai.",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://codexia-portfolio.vercel.app/#person",
      "name": "Srinjoy Pramanick",
      "jobTitle": ["Software Engineer", "Systems Builder", "AI Engineer"],
      "alumniOf": "JIS College of Engineering",
      "knowsAbout": ["Go", "Python", "Rust", "WebAssembly", "React", "Deterministic AI Guardrails", "Git Hooks"]
    }
  }
];

export const Hire: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <SEO
        title="The Hiring Dossier — Srinjoy Pramanick (@Codexia-afk) — Software Engineering Profile"
        description="Official candidate briefing and recruiter dossier for Srinjoy Pramanick (Codexia-afk). Software engineer, CSE student at JIS College of Engineering (2024–2028). Creator of PushGuard and TrustOS. Proven track record in Go, Python, and AI systems."
        keywords="Srinjoy Pramanick, Codexia-afk, Hire Srinjoy Pramanick, Srinjoy Pramanick resume, Srinjoy Pramanick recruiter brief, PushGuard creator, TrustOS engineer, Go developer, AI systems engineer, Kolkata developer, JIS College of Engineering"
        canonical="https://codexia-portfolio.vercel.app/hire"
        jsonLd={hireJsonLd}
      />

      <main className="relative w-full overflow-hidden min-h-screen">
        <RecruiterHero />
        <RecruiterQuickView />
        <ProofOfWork />
        <TechnicalExpertise />
        <AchievementTimeline />
        <EngineeringApproach />
        <ResumePanel />
        <RecruiterContact />
      </main>
    </>
  );
};

export default Hire;
