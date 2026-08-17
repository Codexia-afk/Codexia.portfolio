import React from 'react';
import { SEO } from '../components/SEO';
import { OrbitalHero } from '../components/OrbitalHero';
import { AboutConstellation } from '../components/AboutConstellation';
import { ExperienceCarousel } from '../components/ExperienceCarousel';
import { SkillOrbit } from '../components/SkillOrbit';
import { ProjectsEditorial } from '../components/ProjectsEditorial';
import { HackathonsSection } from '../components/HackathonsSection';
import { GitHubBuildLog } from '../components/GitHubBuildLog';
import { ContactOrbit } from '../components/ContactOrbit';

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Srinjoy Pramanick",
    "url": "https://codexia-portfolio.vercel.app/",
    "image": "https://codexia-portfolio.vercel.app/profile-bw.jpg",
    "jobTitle": ["AI Engineer", "ML Engineer", "Full-Stack Developer"],
    "description": "Srinjoy Pramanick is an AI Engineer, ML Engineer, and Full-Stack Developer building intelligent applications, AI agents, and experimental systems.",
    "sameAs": [
      "https://github.com/Codexia-afk",
      "https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/",
      "https://bento.me/srinjoy19"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Full-Stack Development",
      "Cybersecurity",
      "AI Agents",
      "FastAPI",
      "Python",
      "React",
      "TypeScript",
      "Rust",
      "Go",
      "WebAssembly"
    ],
    "almamater": {
      "@type": "EducationalOrganization",
      "name": "JIS College of Engineering"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Srinjoy Pramanick Portfolio",
    "url": "https://codexia-portfolio.vercel.app/",
    "author": {
      "@type": "Person",
      "name": "Srinjoy Pramanick"
    }
  }
];

export const Home: React.FC = () => {
  return (
    <>
      <SEO jsonLd={homepageJsonLd} />
      <main className="relative w-full overflow-hidden">
        <OrbitalHero />
        <AboutConstellation />
        <ExperienceCarousel />
        <SkillOrbit />
        <ProjectsEditorial />
        <HackathonsSection />
        <GitHubBuildLog />
        <ContactOrbit />
      </main>
    </>
  );
};

export default Home;
