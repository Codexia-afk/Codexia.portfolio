import { SearchResultItem } from './types';
import { projectsData } from '../../data/projects';
import { skillOrbitNodes } from '../../data/skills';
import { personalData } from '../../data/personal';
import { writingData } from '../../data/writing';
import { experienceData } from '../../data/experience';

export interface ActionHandlers {
  onNavigateSection: (sectionId: string) => void;
  onOpenProjectPreview: (projectSlug: string) => void;
  onOpenView: (view: 'discover' | 'margins-notes' | 'on-my-desk' | 'recruiter-mode' | 'colophon') => void;
  onToggleTheme: () => void;
  onToggleReducedMotion: () => void;
  onShowToast: (message: string) => void;
  onClose: () => void;
}

export function buildSearchIndex(handlers: ActionHandlers): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // 1. Core Section Destinations
  items.push(
    {
      id: 'nav-home',
      title: 'Top / Landing Hero',
      subtitle: 'Srinjoy Pramanick · Building intelligent systems with precision & intent',
      category: 'Navigation',
      iconName: 'Home',
      badge: 'HERO',
      keywords: ['home', 'hero', 'top', 'start', 'intro', 'header'],
      action: () => { handlers.onNavigateSection('hero'); handlers.onClose(); }
    },
    {
      id: 'nav-about',
      title: '01 // Architectural Intent & Background',
      subtitle: 'Turning complex abstractions into deterministic software · JIS CSE',
      category: 'Navigation',
      iconName: 'User',
      badge: '01',
      keywords: ['about', 'bio', 'who', 'engineer', 'jis', 'college', 'philosophy'],
      action: () => { handlers.onNavigateSection('about'); handlers.onClose(); }
    },
    {
      id: 'nav-experience',
      title: '02 // Track Record & Experience',
      subtitle: 'Leadership, open source maintainer, competitive benchmarks',
      category: 'Navigation',
      iconName: 'Trophy',
      badge: '02',
      keywords: ['experience', 'work', 'track record', 'jobs', 'roles', 'history'],
      action: () => { handlers.onNavigateSection('experience'); handlers.onClose(); }
    },
    {
      id: 'nav-skills',
      title: '03 // Technical Capabilities Matrix',
      subtitle: 'Interactive skills breakdown: AI/ML, low-latency systems, web, runtimes',
      category: 'Navigation',
      iconName: 'Cpu',
      badge: '03',
      keywords: ['skills', 'stack', 'capabilities', 'tech', 'languages', 'frameworks'],
      action: () => { handlers.onNavigateSection('skills'); handlers.onClose(); }
    },
    {
      id: 'nav-projects',
      title: '04 // Selected Engineering Builds',
      subtitle: 'In-depth case studies: TrustOS, PulseForge AI, Loksetu, WASM Sandbox',
      category: 'Navigation',
      iconName: 'Folder',
      badge: '04',
      keywords: ['projects', 'builds', 'work', 'case studies', 'portfolio', 'apps'],
      action: () => { handlers.onNavigateSection('projects'); handlers.onClose(); }
    },
    {
      id: 'nav-hackathons',
      title: '05 // Pressure Builds & Hackathons',
      subtitle: '1st Runner-Up @ CrazyBuild · SIH 2025 Qualifier · 7+ Hackathons',
      category: 'Navigation',
      iconName: 'Zap',
      badge: '05',
      keywords: ['hackathons', 'crazybuild', 'sih', 'awards', 'trophy', 'discoveria', 'competitions'],
      action: () => { handlers.onNavigateSection('hackathons'); handlers.onClose(); }
    },
    {
      id: 'nav-contact',
      title: '06 // Direct Initiative & Collaboration',
      subtitle: 'Direct email, technical inquiries, and open engineering collaborations',
      category: 'Navigation',
      iconName: 'Mail',
      badge: '06',
      keywords: ['contact', 'email', 'reach', 'message', 'collaborate', 'hire', 'phone'],
      action: () => { handlers.onNavigateSection('contact'); handlers.onClose(); }
    }
  );

  // 2. Specialized Portal OS Views
  items.push(
    {
      id: 'portal-recruiter',
      title: 'Recruiter Mode // 30-Second Dossier',
      subtitle: 'Executive summary for technical hiring managers: skills, achievements & contact',
      category: 'Actions',
      iconName: 'FileText',
      badge: 'DOSSIER',
      keywords: ['recruiter', 'hire', 'resume', 'cv', 'summary', 'job', 'interview', 'talent'],
      action: () => { handlers.onOpenView('recruiter-mode'); }
    },
    {
      id: 'portal-margins',
      title: 'The Margins // Authentic Thoughts & Reviews',
      subtitle: 'Share genuine feedback or critique with verified Google or GitHub authentication',
      category: 'Actions',
      iconName: 'MessageSquare',
      badge: 'FEEDBACK',
      keywords: ['margins', 'notes', 'guestbook', 'thoughts', 'leave note', 'comment', 'wall', 'feedback', 'review', 'reviews', 'critique', 'suggestions', 'google', 'github'],
      action: () => { handlers.onOpenView('margins-notes'); }
    },
    {
      id: 'portal-desk',
      title: 'On My Desk // Active Build Log',
      subtitle: 'Live chronological milestones, current sprints, and shipping status',
      category: 'Actions',
      iconName: 'Terminal',
      badge: 'LIVE',
      keywords: ['desk', 'currently building', 'log', 'status', 'milestones', 'in flight', 'wip'],
      action: () => { handlers.onOpenView('on-my-desk'); }
    },
    {
      id: 'portal-colophon',
      title: 'Technical Colophon // System Specs',
      subtitle: 'Design decisions, typography licenses, architecture stack, and credits',
      category: 'Actions',
      iconName: 'Code',
      badge: 'SPECS',
      keywords: ['colophon', 'specs', 'typography', 'stack', 'credits', 'fonts', 'vite'],
      action: () => { handlers.onOpenView('colophon'); }
    }
  );

  // 3. Projects Index
  projectsData.forEach((project) => {
    items.push({
      id: `project-${project.slug}`,
      title: project.title,
      subtitle: `${project.tagline} · ${project.tech.slice(0, 3).join(', ')}`,
      category: 'Projects',
      iconName: 'Folder',
      badge: project.number,
      keywords: [
        project.title.toLowerCase(),
        project.slug,
        project.category.toLowerCase(),
        ...project.tech.map((t) => t.toLowerCase()),
        project.caseStudy.thesis.toLowerCase(),
        'case study',
        'project'
      ],
      metadata: { project },
      action: () => { handlers.onOpenProjectPreview(project.slug); }
    });
  });

  // 4. Skills & Tooling Index
  skillOrbitNodes.forEach((node) => {
    items.push({
      id: `skill-${node.name.toLowerCase().replace(/\s+/g, '-')}`,
      title: node.name,
      subtitle: `${node.category} · ${node.description}`,
      category: 'Capabilities',
      iconName: 'Cpu',
      badge: node.category,
      keywords: [node.name.toLowerCase(), node.category.toLowerCase(), 'skills', 'capability', 'tool'],
      action: () => {
        handlers.onNavigateSection('skills');
        handlers.onClose();
        handlers.onShowToast(`Jumped to capabilities: ${node.name}`);
      }
    });
  });

  // 5. Technical Articles & Writing
  writingData.forEach((article) => {
    items.push({
      id: `writing-${article.id}`,
      title: article.title,
      subtitle: `${article.category} · ${article.date} · ${article.readTime}`,
      category: 'Writing',
      iconName: 'FileText',
      badge: 'ESSAY',
      keywords: [article.title.toLowerCase(), article.category.toLowerCase(), 'writing', 'article', 'essay', 'blog'],
      action: () => {
        handlers.onShowToast(`Opened writing preview: ${article.title}`);
        handlers.onNavigateSection('projects');
        handlers.onClose();
      }
    });
  });

  // 6. Experience & Milestones
  experienceData.forEach((exp) => {
    items.push({
      id: `exp-${exp.id}`,
      title: `${exp.role} @ ${exp.organization}`,
      subtitle: `${exp.period} · ${exp.description.substring(0, 75)}...`,
      category: 'Experience',
      iconName: 'Trophy',
      badge: exp.period,
      keywords: [exp.role.toLowerCase(), exp.organization.toLowerCase(), 'experience', 'work', 'job'],
      action: () => { handlers.onNavigateSection('experience'); handlers.onClose(); }
    });
  });

  // 7. Utility Actions & External Links
  items.push(
    {
      id: 'action-copy-email',
      title: 'Copy Email Address',
      subtitle: 'srinjoypramanick15@gmail.com · Instant clipboard copy',
      category: 'Actions',
      iconName: 'Copy',
      badge: 'CLIPBOARD',
      keywords: ['copy email', 'email', 'mail', 'clipboard', 'contact email'],
      action: () => {
        navigator.clipboard.writeText(personalData.socials.email);
        handlers.onShowToast('✓ Email copied to clipboard: srinjoypramanick15@gmail.com');
      }
    },
    {
      id: 'action-open-resume',
      title: 'Open Curriculum Vitae (Resume)',
      subtitle: 'View ATS-friendly software engineering resume in new tab',
      category: 'Actions',
      iconName: 'FileText',
      badge: 'PDF',
      keywords: ['resume', 'cv', 'curriculum vitae', 'pdf', 'credentials'],
      action: () => {
        window.open('/resume.html', '_blank');
        handlers.onClose();
      }
    },
    {
      id: 'action-toggle-theme',
      title: 'Toggle Color Theme (Dark / Light)',
      subtitle: 'Switch between near-black obsidian and editorial soft stone',
      category: 'Actions',
      iconName: 'Sun',
      badge: 'APPEARANCE',
      keywords: ['theme', 'dark mode', 'light mode', 'appearance', 'toggle theme', 'color'],
      action: () => {
        handlers.onToggleTheme();
        handlers.onShowToast('Color theme switched.');
      }
    },
    {
      id: 'action-toggle-reduced-motion',
      title: 'Toggle Reduced Motion Preference',
      subtitle: 'Minimize or restore UI animations across portfolio',
      category: 'Actions',
      iconName: 'Zap',
      badge: 'A11Y',
      keywords: ['motion', 'reduced motion', 'animation', 'a11y', 'performance'],
      action: () => {
        handlers.onToggleReducedMotion();
      }
    },
    {
      id: 'ext-github',
      title: 'Open GitHub Profile',
      subtitle: `@${personalData.username} · Repositories, commits & systems tooling`,
      category: 'External',
      iconName: 'Github',
      badge: 'GITHUB',
      keywords: ['github', 'git', 'code', 'repo', 'open source', 'codexia-afk'],
      action: () => { window.open(personalData.socials.github, '_blank'); handlers.onClose(); }
    },
    {
      id: 'ext-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'Connect with Srinjoy Pramanick on LinkedIn',
      category: 'External',
      iconName: 'Linkedin',
      badge: 'LINKEDIN',
      keywords: ['linkedin', 'social', 'network', 'profile', 'connect'],
      action: () => { window.open(personalData.socials.linkedin, '_blank'); handlers.onClose(); }
    }
  );

  return items;
}

export function searchPortalItems(query: string, items: SearchResultItem[]): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  // Secret Easter Egg triggers
  if (cleanQuery === 'matrix' || cleanQuery === '/matrix') {
    return [{
      id: 'easter-matrix',
      title: '⚡ SYSTEM OVERRIDE: MATRIX TELEMETRY',
      subtitle: 'Secret terminal easter egg discovered. Press Enter to activate visual telemetry stream.',
      category: 'Actions',
      iconName: 'Terminal',
      badge: 'SECRET',
      keywords: ['matrix'],
      action: () => { alert('⚡ [PORTAL OS TELEMETRY]: All deterministic guardrail vectors nominal. 0 anomalies detected.'); }
    }];
  }

  const scored = items.map((item) => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const subtitleLower = item.subtitle.toLowerCase();
    const categoryLower = item.category.toLowerCase();

    // Exact title match
    if (titleLower === cleanQuery) score += 100;
    else if (titleLower.startsWith(cleanQuery)) score += 50;
    else if (titleLower.includes(cleanQuery)) score += 30;

    // Keyword & Alias match
    item.keywords.forEach((kw) => {
      if (kw === cleanQuery) score += 40;
      else if (kw.startsWith(cleanQuery)) score += 20;
      else if (kw.includes(cleanQuery)) score += 10;
    });

    // Subtitle match
    if (subtitleLower.includes(cleanQuery)) score += 15;

    // Category match
    if (categoryLower.includes(cleanQuery)) score += 10;

    return { item, score };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 16)
    .map((entry) => entry.item);
}
