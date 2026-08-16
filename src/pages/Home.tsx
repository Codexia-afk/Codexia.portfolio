import React from 'react';
import { OrbitalHero } from '../components/OrbitalHero';
import { AboutConstellation } from '../components/AboutConstellation';
import { ExperienceCarousel } from '../components/ExperienceCarousel';
import { SkillOrbit } from '../components/SkillOrbit';
import { ProjectsEditorial } from '../components/ProjectsEditorial';
import { HackathonsSection } from '../components/HackathonsSection';
import { GitHubBuildLog } from '../components/GitHubBuildLog';
import { ContactOrbit } from '../components/ContactOrbit';

export const Home: React.FC = () => {
  return (
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
  );
};

export default Home;
