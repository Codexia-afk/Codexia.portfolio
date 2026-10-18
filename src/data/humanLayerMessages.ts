/**
 * THE PERSONAL INTERNET // HUMANLAYER 2.0
 * Intelligent Hover Experience & Context-Aware Humor Registry
 * 
 * Centralized, typed registry for all tooltip interactions across the portfolio.
 * Categorized into:
 *  - Category A: Professional Engineering Wit (Recruiter, résumé, architecture, skills)
 *  - Category B: Personal Hinglish Micro-Memes (Socials, guestbook, theme, portal, casual)
 *  - Category C: Subtle Easter Eggs (Colophon, curiosity, deep links)
 */

export type HumorContext = 
  | 'professional'
  | 'personal'
  | 'social'
  | 'technical'
  | 'easter-egg';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipMessage {
  id: string;
  tag: string;
  message: string;
  context: HumorContext;
  preferredPlacement?: TooltipPlacement;
  compactMessage?: string;
  alternativeMessages?: string[];
  externalIcon?: boolean;
}

export const humanLayerMessages: Record<string, TooltipMessage> = {
  // =========================================================================
  // CATEGORY A — PROFESSIONAL ENGINEERING WIT
  // =========================================================================
  'resume': {
    id: 'resume',
    tag: 'RÉSUMÉ // VERIFIED',
    message: 'Compiled for humans. No dependencies required.',
    context: 'professional',
    preferredPlacement: 'top',
    compactMessage: 'Compiled for humans.',
    alternativeMessages: [
      'Zero buzzwords injected. Just raw proof of work.',
      'Readable code is a love language.'
    ]
  },
  'github': {
    id: 'github',
    tag: 'GIT // SOURCE',
    message: 'The source is open. The debugging scars are private.',
    context: 'professional',
    preferredPlacement: 'top',
    compactMessage: 'The source is open.',
    alternativeMessages: [
      'The code has entered the chat.',
      'Main branch is green. Proceed with confidence.'
    ]
  },
  'projects': {
    id: 'projects',
    tag: 'ENGINEERING // COMMITS',
    message: 'Less buzzwords. More commits.',
    context: 'professional',
    preferredPlacement: 'top',
    compactMessage: 'Less buzzwords. More commits.',
    alternativeMessages: [
      'Proof of work. Not proof of slide decks.',
      'Refactored until deterministic.'
    ]
  },
  'architecture': {
    id: 'architecture',
    tag: 'SYSTEMS // RUNTIME',
    message: 'Good boundaries prevent bad surprises.',
    context: 'technical',
    preferredPlacement: 'top',
    compactMessage: 'Good boundaries prevent bad surprises.',
    alternativeMessages: [
      'Diagrams are cheaper than production incidents.',
      'Architecture: decisions with consequences.'
    ]
  },
  'testing': {
    id: 'testing',
    tag: 'DEVSECOPS // RIGOR',
    message: 'Trust is good. Assertions are better.',
    context: 'technical',
    preferredPlacement: 'top',
    compactMessage: 'Trust is good. Assertions are better.',
    alternativeMessages: [
      'Edge cases tested under adversarial conditions.',
      'Shannon entropy parsed in < 5ms.'
    ]
  },
  'skills': {
    id: 'skills',
    tag: 'CAPABILITIES // PROOF',
    message: 'Claims backed by code.',
    context: 'professional',
    preferredPlacement: 'top',
    compactMessage: 'Claims backed by code.',
    alternativeMessages: [
      'No arbitrary percentage bars. Real implementations.',
      'Tested against real edge cases.'
    ]
  },
  'contact-pro': {
    id: 'contact-pro',
    tag: 'COMMS // DIRECT',
    message: 'Low-latency communication preferred.',
    context: 'professional',
    preferredPlacement: 'top',
    compactMessage: 'Low-latency preferred.',
    alternativeMessages: [
      'Inbox zero is a moral imperative.',
      'Email directly. Fast response guaranteed.'
    ]
  },
  'documentation': {
    id: 'documentation',
    tag: 'ENGINEERING // DOCS',
    message: 'Future me says thank you.',
    context: 'technical',
    preferredPlacement: 'top',
    compactMessage: 'Future me says thank you.'
  },
  'deployment': {
    id: 'deployment',
    tag: 'PRODUCTION // DISCIPLINE',
    message: 'Works on my machine was the beginning, not the finish line.',
    context: 'professional',
    preferredPlacement: 'top',
    compactMessage: 'Works on my machine was phase one.'
  },
  'engineering': {
    id: 'engineering',
    tag: 'CRAFT // DISCIPLINE',
    message: 'The edge cases are where the story gets interesting.',
    context: 'technical',
    preferredPlacement: 'top',
    compactMessage: 'Edge cases tell the story.'
  },
  'achievements': {
    id: 'achievements',
    tag: 'AWARDS // PROVEN',
    message: 'Real lessons. Minimal confetti.',
    context: 'professional',
    preferredPlacement: 'top',
    compactMessage: 'Real lessons. Minimal confetti.',
    alternativeMessages: [
      'Small badges. Real lessons.',
      'CrazyBuild 1st Runner-Up & SIH Qualifier.'
    ]
  },
  'recruiter-brief': {
    id: 'recruiter-brief',
    tag: 'HIRING // 30S SCAN',
    message: 'Everything important. No unnecessary scrolling.',
    context: 'professional',
    preferredPlacement: 'bottom',
    compactMessage: '30s recruiter briefing.'
  },

  // =========================================================================
  // CATEGORY B — PERSONAL HINGLISH MICRO-MEMES
  // =========================================================================
  'social-linkedin': {
    id: 'social-linkedin',
    tag: 'LINKEDIN // PRO',
    message: 'Corporate mode ON. Thoda professional ban jaate hain.',
    context: 'social',
    preferredPlacement: 'top',
    compactMessage: 'Corporate mode ON.',
    externalIcon: true
  },
  'social-x': {
    id: 'social-x',
    tag: 'X // 280 CHARS',
    message: '280 characters. Unlimited overthinking.',
    context: 'social',
    preferredPlacement: 'top',
    compactMessage: '280 characters. Overthinking.',
    externalIcon: true
  },
  'social-instagram': {
    id: 'social-instagram',
    tag: 'INSTAGRAM // ATELIER',
    message: 'Code ke alawa bhi zindagi hai... allegedly.',
    context: 'social',
    preferredPlacement: 'top',
    compactMessage: 'Life outside code... allegedly.',
    externalIcon: true
  },
  'social-facebook': {
    id: 'social-facebook',
    tag: 'FACEBOOK // ARCHIVE',
    message: 'Purane internet ki yaadein unlocked.',
    context: 'social',
    preferredPlacement: 'top',
    compactMessage: 'OG internet vibes.',
    externalIcon: true
  },
  'social-linktree': {
    id: 'social-linktree',
    tag: 'LINKTREE // HUB',
    message: 'Ek link. Saare raaste.',
    context: 'social',
    preferredPlacement: 'top',
    compactMessage: 'Ek link. Saare raaste.',
    externalIcon: true
  },
  'social-peerlist': {
    id: 'social-peerlist',
    tag: 'PEERLIST // BUILD',
    message: 'Build. Ship. Repeat. Chai bhi zaroori hai.',
    context: 'social',
    preferredPlacement: 'top',
    compactMessage: 'Build. Ship. Repeat.',
    externalIcon: true
  },
  'guestbook': {
    id: 'guestbook',
    tag: 'MARGINS // GUESTBOOK',
    message: 'Aaye ho toh kuch likh ke jaana.',
    context: 'personal',
    preferredPlacement: 'bottom',
    compactMessage: 'Kuch likh ke jaana.',
    alternativeMessages: [
      'Ek note drop karo, good karma guarantee.',
      'Authenticated via Google/GitHub OAuth.'
    ]
  },
  'theme-toggle': {
    id: 'theme-toggle',
    tag: 'SYSTEM // PHOTONS',
    message: 'Light mode? Aaj bade optimistic lag rahe ho.',
    context: 'personal',
    preferredPlacement: 'bottom',
    compactMessage: 'Photon conservation protocol.',
    alternativeMessages: [
      'Dark mode: eye relief protocol.',
      'Light mode? Aaj bade optimistic lag rahe ho.'
    ]
  },
  'portal': {
    id: 'portal',
    tag: 'PORTAL // ⌘K',
    message: 'Shortcut mil gaya. Ab kaam bhi kar lo.',
    context: 'personal',
    preferredPlacement: 'bottom',
    compactMessage: 'Welcome to command center.',
    alternativeMessages: [
      'Welcome back to the command center.',
      'Shortcut mila? Ab productivity ka kya excuse?'
    ]
  },
  'project-gallery': {
    id: 'project-gallery',
    tag: 'BUILDS // REALITY',
    message: 'Code toh likh diya. Neend ka kya?',
    context: 'personal',
    preferredPlacement: 'top',
    compactMessage: 'Neend ka kya?'
  },
  'contact-personal': {
    id: 'contact-personal',
    tag: 'CONTACT // REAL TALK',
    message: 'DM kar do. Stack trace optional.',
    context: 'personal',
    preferredPlacement: 'top',
    compactMessage: 'DM kar do.'
  },
  'back-to-top': {
    id: 'back-to-top',
    tag: 'NAVIGATION // ASCENT',
    message: 'Upar chalo. Safar dobara.',
    context: 'personal',
    preferredPlacement: 'top',
    compactMessage: 'Upar chalo.'
  },
  'footer': {
    id: 'footer',
    tag: 'COLOPHON // CURIOUS',
    message: 'End of page. Curiosity continues.',
    context: 'personal',
    preferredPlacement: 'top',
    compactMessage: 'Curiosity continues.'
  },

  // =========================================================================
  // CATEGORY C — SUBTLE EASTER EGGS
  // =========================================================================
  'easter-egg': {
    id: 'easter-egg',
    tag: 'EASTER EGG // 100%',
    message: 'Achievement unlocked: unnecessary curiosity.',
    context: 'easter-egg',
    preferredPlacement: 'top',
    compactMessage: 'Achievement unlocked.',
    alternativeMessages: [
      'You found the tiny detail nobody requested.',
      'Developer was here. Probably debugging.'
    ]
  },
  'easter-egg-detail': {
    id: 'easter-egg-detail',
    tag: 'ATELIER // SECRET',
    message: 'You found the tiny detail nobody requested.',
    context: 'easter-egg',
    preferredPlacement: 'top',
    compactMessage: 'Secret found.'
  },
  'easter-egg-debug': {
    id: 'easter-egg-debug',
    tag: 'TERMINAL // ECHO',
    message: 'Developer was here. Probably debugging.',
    context: 'easter-egg',
    preferredPlacement: 'top',
    compactMessage: 'Probably debugging.'
  },
  'banda-kaam-ka': {
    id: 'banda-kaam-ka',
    tag: 'ATELIER // HUMAN',
    message: 'Banda Kaam ka. Full-time builder, part-time tea enthusiast.',
    context: 'personal',
    preferredPlacement: 'top',
    compactMessage: 'Banda Kaam ka.'
  },
  'late-night-commit': {
    id: 'late-night-commit',
    tag: 'TERMINAL // LATE NIGHT',
    message: 'Bas ek aur commit. Famous last words.',
    context: 'personal',
    preferredPlacement: 'top',
    compactMessage: 'Bas ek aur commit.'
  }
};

/**
 * Legacy & contextual alias mapping to guarantee seamless backward-compatibility
 */
export const ID_ALIASES: Record<string, string> = {
  'resume-action': 'resume',
  'proof-of-work': 'projects',
  'architecture-guardrail': 'architecture',
  'skills-capabilities': 'skills',
  'github-activity': 'github',
  'recruiter-contact': 'contact-pro',
  'achievements-badges': 'achievements',
  'production-philosophy': 'engineering',
  'guestbook-trigger': 'guestbook',
  'portal-command': 'portal',
  'easter-egg-curiosity': 'easter-egg',
  'project-burnout-humor': 'project-gallery',
  'contact-humor': 'contact-personal',
};

/**
 * Retrieve a tooltip message by ID safely with fallback & alias resolution
 */
export function getTooltipMessage(id: string): TooltipMessage | undefined {
  const canonicalId = ID_ALIASES[id] || id;
  return humanLayerMessages[canonicalId];
}
