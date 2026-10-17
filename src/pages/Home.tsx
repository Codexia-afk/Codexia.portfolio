import React from 'react';
import { SEO } from '../components/SEO';
import { OrbitalHero } from '../components/OrbitalHero';
import { AboutConstellation } from '../components/AboutConstellation';
import { ExperienceCarousel } from '../components/ExperienceCarousel';
import { SkillOrbit } from '../components/SkillOrbit';
import { ProjectsEditorial } from '../components/ProjectsEditorial';
import { HackathonsSection } from '../components/HackathonsSection';
import { Writing } from '../components/Writing';
import { GitHubBuildLog } from '../components/GitHubBuildLog';
import { ContactOrbit } from '../components/ContactOrbit';

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://codexia-portfolio.vercel.app/#person",
    "name": "Srinjoy Pramanick",
    "alternateName": [
      "Codexia-afk",
      "Codexia-afk Srinjoy",
      "Codexia",
      "Srinjoy",
      "Srinjoy Pramanick (Codexia-afk)"
    ],
    "givenName": "Srinjoy",
    "familyName": "Pramanick",
    "additionalName": "Codexia-afk",
    "url": "https://codexia-portfolio.vercel.app/",
    "image": "https://codexia-portfolio.vercel.app/avatar.jpg",
    "jobTitle": ["AI Engineer", "Systems Builder", "Full-Stack Developer"],
    "description": "Srinjoy Pramanick (known online as Codexia-afk) is an AI Engineer and Systems Builder studying Computer Science & Engineering at JIS College of Engineering (2024–2028). Creator of TrustOS and PushGuard.",
    "gender": "Male",
    "nationality": "Indian",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ichapore, Kolkata",
      "addressRegion": "West Bengal",
      "addressCountry": "India"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "JIS College of Engineering",
      "url": "https://www.jiscollege.ac.in/"
    },
    "sameAs": [
      "https://github.com/Codexia-afk",
      "https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/",
      "https://bento.me/srinjoy19"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "AI Agents",
      "Deterministic Guardrails",
      "FastAPI",
      "Python",
      "Go",
      "Rust",
      "WebAssembly",
      "React",
      "TypeScript",
      "Vector Search (FAISS)",
      "Cybersecurity"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://codexia-portfolio.vercel.app/#profilepage",
    "url": "https://codexia-portfolio.vercel.app/",
    "name": "Srinjoy Pramanick (Codexia-afk) — Official Developer Portfolio",
    "description": "The official portfolio, biography, and engineering works of Srinjoy Pramanick (Codexia-afk).",
    "mainEntity": {
      "@id": "https://codexia-portfolio.vercel.app/#person"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://codexia-portfolio.vercel.app/#website",
    "name": "Srinjoy Pramanick (Codexia-afk) Portfolio",
    "alternateName": [
      "Codexia-afk Srinjoy",
      "Codexia Portfolio",
      "Srinjoy Pramanick"
    ],
    "url": "https://codexia-portfolio.vercel.app/",
    "publisher": {
      "@id": "https://codexia-portfolio.vercel.app/#person"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "About Srinjoy Pramanick (Codexia-afk)",
        "description": "Biography, background, education at JIS College of Engineering, and engineering philosophy.",
        "url": "https://codexia-portfolio.vercel.app/#about"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Capabilities & Technical Stack",
        "description": "Core competencies in AI Middleware, Systems in Go & WASM, and Frontend Craft.",
        "url": "https://codexia-portfolio.vercel.app/#skills"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Selected Builds & Projects",
        "description": "Flagship builds including TrustOS, PushGuard, PulseForge AI, Loksetu.ai, and JeeraType.",
        "url": "https://codexia-portfolio.vercel.app/#projects"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Hackathon Log & Awards",
        "description": "Competitive engineering logs including CrazyBuild 1st Runner-Up and Smart India Hackathon.",
        "url": "https://codexia-portfolio.vercel.app/#hackathons"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Contact Srinjoy Pramanick",
        "description": "Get in touch for engineering roles, technical collaborations, and hackathons.",
        "url": "https://codexia-portfolio.vercel.app/#contact"
      }
    ]
  }
];

export const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Srinjoy Pramanick (@Codexia-afk) — AI Systems Engineer & Developer Portfolio"
        description="Official portfolio and biography of Srinjoy Pramanick (Codexia-afk). AI Systems Engineer and CSE student at JIS College of Engineering. Building deterministic AI guardrails, WebAssembly sandboxes, and developer tooling in Go & Rust."
        keywords="Srinjoy Pramanick, Codexia-afk, Codexia-afk Srinjoy, Srinjoy Pramanick Codexia-afk, Codexia, Srinjoy, Srinjoy Pramanick portfolio, Srinjoy Pramanick about, Srinjoy Pramanick bio, Srinjoy Pramanick GitHub, Codexia-afk GitHub, Srinjoy Pramanick JIS College of Engineering, AI Engineer Srinjoy Pramanick, ML Engineer, Systems Engineer, TrustOS, PushGuard, Loksetu.ai, Kolkata developer"
        jsonLd={homepageJsonLd} 
      />
      <main className="relative w-full overflow-hidden">
        <OrbitalHero />
        <AboutConstellation />
        <ExperienceCarousel />
        <SkillOrbit />
        <ProjectsEditorial />
        <HackathonsSection />
        <Writing />
        <GitHubBuildLog />
        <ContactOrbit />
      </main>
    </>
  );
};

export default Home;
