/**
 * THE PERSONAL INTERNET — EDITION 03
 * HUMANLAYER // CONTEXT-AWARE INTERACTION SYSTEM
 * 
 * Curated, typed registry of micro-humor interactions.
 * Mode A: Professional Wit (for /hire, Résumé, skills, architectural annotations)
 * Mode B: Personal / Hinglish Humor (for socials, guestbook, PORTAL, theme switch, easter eggs)
 */

export type HumorTone = 'professional-wit' | 'hinglish-casual';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface HumorItem {
  id: string;
  context: string;
  tone: HumorTone;
  messages: string[];
  placement?: TooltipPlacement;
  trigger?: 'hover' | 'focus' | 'both';
  duration?: number;
  ariaLabel?: string;
  tag?: string;
}

export const humanLayerRegistry: Record<string, HumorItem> = {
  // =========================================================================
  // MODE A — PROFESSIONAL WIT (RECRUITER & TECHNICAL SYSTEMS)
  // =========================================================================
  'resume-action': {
    id: 'resume-action',
    context: 'recruiter-resume-view-download',
    tone: 'professional-wit',
    messages: [
      'Compiled for humans. No dependencies required.',
      'Zero buzzwords injected. Just raw proof of work.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'RÉSUMÉ // VERIFIED',
    ariaLabel: 'Compiled for humans. No dependencies required.'
  },
  'proof-of-work': {
    id: 'proof-of-work',
    context: 'recruiter-project-evidence',
    tone: 'professional-wit',
    messages: [
      'Less buzzwords. More commits.',
      'Proof of work. Not proof of slide decks.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'ENGINEERING // EVIDENCE',
    ariaLabel: 'Less buzzwords. More commits.'
  },
  'architecture-guardrail': {
    id: 'architecture-guardrail',
    context: 'systems-architecture-annotations',
    tone: 'professional-wit',
    messages: [
      'Diagrams are cheaper than production incidents.',
      'Architecture: decisions with consequences.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'SYSTEMS // RUNTIME',
    ariaLabel: 'Diagrams are cheaper than production incidents.'
  },
  'skills-capabilities': {
    id: 'skills-capabilities',
    context: 'technical-expertise-matrix',
    tone: 'professional-wit',
    messages: [
      'Claims backed by code.',
      'Tested against real edge cases.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'STACK // VERIFIED',
    ariaLabel: 'Claims backed by code.'
  },
  'github-activity': {
    id: 'github-activity',
    context: 'github-commits-and-builds',
    tone: 'professional-wit',
    messages: [
      'The code has entered the chat.',
      'Main branch is green. Proceed with confidence.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'GIT // COMMITS',
    ariaLabel: 'The code has entered the chat.'
  },
  'recruiter-contact': {
    id: 'recruiter-contact',
    context: 'direct-recruiter-reachout',
    tone: 'professional-wit',
    messages: [
      'Low-latency communication preferred.',
      'Inbox zero is a moral imperative.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'COMMS // DIRECT',
    ariaLabel: 'Low-latency communication preferred.'
  },
  'achievements-badges': {
    id: 'achievements-badges',
    context: 'hackathons-and-awards',
    tone: 'professional-wit',
    messages: [
      'Small badges. Real lessons.',
      '48-hour sprint, zero shortcuts.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'AWARDS // PROVEN',
    ariaLabel: 'Small badges. Real lessons.'
  },
  'production-philosophy': {
    id: 'production-philosophy',
    context: 'engineering-methodology',
    tone: 'professional-wit',
    messages: [
      'It works on my machine was only phase one.',
      'Readable code is a love language.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'CRAFT // DISCIPLINE',
    ariaLabel: 'It works on my machine was only phase one.'
  },

  // =========================================================================
  // MODE B — PERSONAL / HINGLISH HUMOR (COMMUNITY, ATELIER & EXPLORATION)
  // =========================================================================
  'guestbook-trigger': {
    id: 'guestbook-trigger',
    context: 'topbar-and-margins-guestbook',
    tone: 'hinglish-casual',
    messages: [
      'Aaye ho toh kuch likh ke jaana.',
      'Ek review drop karo, good karma guarantee.'
    ],
    placement: 'bottom',
    trigger: 'both',
    tag: 'MARGINS // GUESTBOOK',
    ariaLabel: 'Aaye ho toh kuch likh ke jaana.'
  },
  'theme-toggle': {
    id: 'theme-toggle',
    context: 'topbar-theme-switcher',
    tone: 'hinglish-casual',
    messages: [
      'Light mode? Aaj bade optimistic lag rahe ho.',
      'Dark mode: photon conservation protocol.'
    ],
    placement: 'bottom',
    trigger: 'both',
    tag: 'SYSTEM // PHOTONS',
    ariaLabel: 'Light mode? Aaj bade optimistic lag rahe ho.'
  },
  'portal-command': {
    id: 'portal-command',
    context: 'portal-os-launcher',
    tone: 'hinglish-casual',
    messages: [
      'Shortcut mila? Ab productivity ka kya excuse?',
      'Welcome back to the command center.'
    ],
    placement: 'bottom',
    trigger: 'both',
    tag: 'PORTAL // ⌘K',
    ariaLabel: 'Shortcut mila? Ab productivity ka kya excuse?'
  },
  'portal-empty-search': {
    id: 'portal-empty-search',
    context: 'portal-search-placeholder',
    tone: 'hinglish-casual',
    messages: [
      'Even the search engine needs a hint.',
      'Kuch toh type karo, telepathy module offline hai.'
    ],
    placement: 'bottom',
    trigger: 'both',
    tag: 'SEARCH // HINT',
    ariaLabel: 'Even the search engine needs a hint.'
  },
  'portal-not-found': {
    id: 'portal-not-found',
    context: 'portal-search-zero-results',
    tone: 'hinglish-casual',
    messages: [
      "404: That thought hasn't shipped yet.",
      'Kuch zyaada futuristic search kar liya shayad.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'ATELIER // 404',
    ariaLabel: "404: That thought hasn't shipped yet."
  },
  'banda-kaam-ka': {
    id: 'banda-kaam-ka',
    context: 'hero-portrait-hover',
    tone: 'hinglish-casual',
    messages: [
      'Banda Kaam ka.',
      'Full-time builder, part-time tea enthusiast.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'ATELIER // HUMAN',
    ariaLabel: 'Banda Kaam ka.'
  },
  'late-night-commit': {
    id: 'late-night-commit',
    context: 'github-build-log',
    tone: 'hinglish-casual',
    messages: [
      'Bas ek aur commit. Famous last words.',
      'Bug fix ho jayega. Pehle chai.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'TERMINAL // LATE NIGHT',
    ariaLabel: 'Bas ek aur commit. Famous last words.'
  },
  'project-burnout-humor': {
    id: 'project-burnout-humor',
    context: 'projects-editorial-hover',
    tone: 'hinglish-casual',
    messages: [
      'Isko banane mein neend gayi. Worth it.',
      'Refactored 4 times. No regrets.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'BUILDS // REALITY',
    ariaLabel: 'Isko banane mein neend gayi. Worth it.'
  },
  'easter-egg-curiosity': {
    id: 'easter-egg-curiosity',
    context: 'colophon-footer-easter-egg',
    tone: 'hinglish-casual',
    messages: [
      'Achievement unlocked: unnecessary curiosity.',
      'Inspection complete. Sab authentic hai yahan.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'EASTER EGG // 100%',
    ariaLabel: 'Achievement unlocked: unnecessary curiosity.'
  },
  'contact-humor': {
    id: 'contact-humor',
    context: 'general-contact-section',
    tone: 'hinglish-casual',
    messages: [
      'DM kar do. Stack trace mat bhejna.',
      'Coffee & systems discussion? Anytime.'
    ],
    placement: 'top',
    trigger: 'both',
    tag: 'CONTACT // REAL TALK',
    ariaLabel: 'DM kar do. Stack trace mat bhejna.'
  }
};

/**
 * Helper to fetch a registered humor item safely
 */
export const getHumorItem = (id: string): HumorItem | undefined => {
  return humanLayerRegistry[id];
};
