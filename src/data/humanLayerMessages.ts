/** Curated offline copy. Routes and component intent determine tone; no random rotation. */
export type ContentProfile = 'professional' | 'personal' | 'technical';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipMessage {
  id: string;
  targetId: string;
  route: string;
  component: string;
  tone: ContentProfile;
  defaultMessage: string;
  alternatives: readonly string[];
  priority: 'high' | 'medium' | 'low';
  preferredPlacement: TooltipPlacement;
  mobileBehavior: 'omit';
  enabled: boolean;
  professionalMessage?: string;
}
const messages = {
  "resume": {
    "id": "resume",
    "targetId": "Open résumé",
    "route": "*",
    "component": "OrbitalHero, RecruiterHero, ResumePanel, RecruiterMode",
    "tone": "professional",
    "defaultMessage": "Compiled for humans. No dependencies required.",
    "alternatives": [
      "A concise summary of several thousand decisions."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "resume-preview": {
    "id": "resume-preview",
    "targetId": "Toggle inline résumé preview",
    "route": "/hire",
    "component": "ResumePanel",
    "tone": "professional",
    "defaultMessage": "One briefing. Plenty to discuss.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "print-profile": {
    "id": "print-profile",
    "targetId": "Print / export profile",
    "route": "/hire",
    "component": "RecruiterHero, ResumePanel",
    "tone": "professional",
    "defaultMessage": "Optimized for the human reading experience.",
    "alternatives": [
      "Hardware requirement: one reasonably curious recruiter."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "github": {
    "id": "github",
    "targetId": "Source repository",
    "route": "*",
    "component": "ProjectsEditorial, RecruiterHero, RecruiterContact, RecruiterMode, ProjectDetail",
    "tone": "professional",
    "defaultMessage": "Where the implementation answers the questions.",
    "alternatives": [
      "The repository has the final word."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "linkedin-pro": {
    "id": "linkedin-pro",
    "targetId": "Professional LinkedIn",
    "route": "*",
    "component": "RecruiterContact, RecruiterMode",
    "tone": "professional",
    "defaultMessage": "Let's connect beyond the codebase.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "projects": {
    "id": "projects",
    "targetId": "Selected work",
    "route": "/hire",
    "component": "RecruiterHero",
    "tone": "professional",
    "defaultMessage": "Evidence beats adjectives.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "contact-pro": {
    "id": "contact-pro",
    "targetId": "Professional contact",
    "route": "*",
    "component": "RecruiterHero, RecruiterContact, RecruiterMode",
    "tone": "professional",
    "defaultMessage": "Let's discuss something worth building.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "copy-email": {
    "id": "copy-email",
    "targetId": "Copy email address",
    "route": "*",
    "component": "RecruiterContact, RecruiterMode",
    "tone": "professional",
    "defaultMessage": "Email copied. Conversation pending.",
    "alternatives": [
      "Address mil gaya. Ab achhi baat bhejna."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "recruiter-brief": {
    "id": "recruiter-brief",
    "targetId": "Hiring Dossier entry",
    "route": "*",
    "component": "TopBar, OrbitalHero",
    "tone": "professional",
    "defaultMessage": "Everything a recruiter needs. Minus the scavenger hunt.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "recruiter-quick": {
    "id": "recruiter-quick",
    "targetId": "Recruiter quick view",
    "route": "*",
    "component": "PortalOS, PortalDiscover",
    "tone": "professional",
    "defaultMessage": "Thirty seconds. The important bits.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "explore-work": {
    "id": "explore-work",
    "targetId": "Explore selected builds",
    "route": "/",
    "component": "OrbitalHero",
    "tone": "professional",
    "defaultMessage": "Real projects. Actual engineering. Minimal buzzwords.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "portrait": {
    "id": "portrait",
    "targetId": "Personal portrait",
    "route": "/",
    "component": "OrbitalHero",
    "tone": "personal",
    "defaultMessage": "Yes, that's the person behind all those commits.",
    "alternatives": [
      "Face recognition passed. Sleep detection inconclusive."
    ],
    "priority": "medium",
    "preferredPlacement": "left",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "skills": {
    "id": "skills",
    "targetId": "Technical capability selector",
    "route": "/",
    "component": "SkillOrbit",
    "tone": "professional",
    "defaultMessage": "Skills are easier to trust when the repositories exist.",
    "alternatives": [
      "Listed here. Demonstrated elsewhere."
    ],
    "priority": "medium",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "nav-about": {
    "id": "nav-about",
    "targetId": "Navigate to about",
    "route": "*",
    "component": "TopBar",
    "tone": "personal",
    "defaultMessage": "Behind the architecture, there’s a human. Surprisingly.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Behind the architecture, there’s a human. Surprisingly."
  },
  "nav-skills": {
    "id": "nav-skills",
    "targetId": "Navigate to skills",
    "route": "*",
    "component": "TopBar",
    "tone": "professional",
    "defaultMessage": "Tools I use. Problems I actually solve.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Tools I use. Problems I actually solve."
  },
  "nav-projects": {
    "id": "nav-projects",
    "targetId": "Navigate to projects",
    "route": "*",
    "component": "TopBar",
    "tone": "personal",
    "defaultMessage": "Side projects with main-character energy.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Where ideas meet edge cases."
  },
  "nav-hackathons": {
    "id": "nav-hackathons",
    "targetId": "Navigate to hackathons",
    "route": "*",
    "component": "TopBar",
    "tone": "personal",
    "defaultMessage": "Sleep was optional. Deadlines weren’t.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "The outcomes matter. The lessons last longer."
  },
  "nav-writing": {
    "id": "nav-writing",
    "targetId": "Navigate to writing",
    "route": "*",
    "component": "TopBar",
    "tone": "professional",
    "defaultMessage": "Source code explains the how. These notes explain the why.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Source code explains the how. These notes explain the why."
  },
  "nav-contact": {
    "id": "nav-contact",
    "targetId": "Navigate to contact",
    "route": "*",
    "component": "TopBar",
    "tone": "professional",
    "defaultMessage": "Open to interesting problems and sensible conversations.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Open to interesting problems and sensible conversations."
  },
  "project-trustos": {
    "id": "project-trustos",
    "targetId": "Project trustos case study / source",
    "route": "/, /hire, /projects/trustos",
    "component": "ProjectsEditorial, ProjectDetail, ProofOfWork, ProjectQuickView, SkillOrbit",
    "tone": "technical",
    "defaultMessage": "Trust is good. Verifiable execution is better.",
    "alternatives": [
      "Because 'the AI said so' is not an audit trail."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "project-pushguard": {
    "id": "project-pushguard",
    "targetId": "Project pushguard case study / source",
    "route": "/, /hire, /projects/pushguard",
    "component": "ProjectsEditorial, ProjectDetail, ProofOfWork, ProjectQuickView, SkillOrbit",
    "tone": "technical",
    "defaultMessage": "Your secrets deserve better than a public repository.",
    "alternatives": [
      "Prevention: considerably cheaper than credential rotation."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "project-pulseforge-ai": {
    "id": "project-pulseforge-ai",
    "targetId": "Project pulseforge-ai case study / source",
    "route": "/, /hire, /projects/pulseforge-ai",
    "component": "ProjectsEditorial, ProjectDetail, ProofOfWork, ProjectQuickView, SkillOrbit",
    "tone": "technical",
    "defaultMessage": "Finding signals in a world full of noise.",
    "alternatives": [
      "More analysis. Fewer crystal balls."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "project-loksetu-ai": {
    "id": "project-loksetu-ai",
    "targetId": "Project loksetu-ai case study / source",
    "route": "/, /hire, /projects/loksetu-ai",
    "component": "ProjectsEditorial, ProjectDetail, ProofOfWork, ProjectQuickView, SkillOrbit",
    "tone": "technical",
    "defaultMessage": "Making complicated forms a little less complicated.",
    "alternatives": [
      "Because paperwork shouldn’t require a side quest."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "project-jeeratype": {
    "id": "project-jeeratype",
    "targetId": "Project jeeratype case study / source",
    "route": "/, /hire, /projects/jeeratype",
    "component": "ProjectsEditorial, ProjectDetail, ProofOfWork, ProjectQuickView, SkillOrbit",
    "tone": "technical",
    "defaultMessage": "Words per minute. Regrets per typo.",
    "alternatives": [
      "Terminal opened. Competitive spirit activated."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "project-wasm-sandbox": {
    "id": "project-wasm-sandbox",
    "targetId": "Project wasm-sandbox case study / source",
    "route": "/, /hire, /projects/wasm-sandbox",
    "component": "ProjectsEditorial, ProjectDetail, ProofOfWork, ProjectQuickView, SkillOrbit",
    "tone": "technical",
    "defaultMessage": "Run the plugin. Contain the surprises.",
    "alternatives": [
      "Untrusted code gets its own room."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "social-github": {
    "id": "social-github",
    "targetId": "github external profile",
    "route": "/",
    "component": "GitHubBuildLog",
    "tone": "personal",
    "defaultMessage": "Code public hai. Debugging trauma private.",
    "alternatives": [
      "Commit history dekh lo. Character development free hai."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "social-linkedin": {
    "id": "social-linkedin",
    "targetId": "linkedin external profile",
    "route": "/",
    "component": "SocialDock",
    "tone": "personal",
    "defaultMessage": "Corporate mode ON. Thoda professional ban jaate hain.",
    "alternatives": [
      "Yahan jokes bhi experience section mein jaate hain."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "social-x": {
    "id": "social-x",
    "targetId": "x external profile",
    "route": "/",
    "component": "SocialDock",
    "tone": "personal",
    "defaultMessage": "280 characters. Unlimited overthinking.",
    "alternatives": [
      "Thoughts short. Debates unnecessarily long."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "social-instagram": {
    "id": "social-instagram",
    "targetId": "instagram external profile",
    "route": "/",
    "component": "SocialDock",
    "tone": "personal",
    "defaultMessage": "Code ke alawa bhi zindagi hai... allegedly.",
    "alternatives": [
      "Life ka frontend yahan milega."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "social-facebook": {
    "id": "social-facebook",
    "targetId": "facebook external profile",
    "route": "/",
    "component": "SocialDock",
    "tone": "personal",
    "defaultMessage": "OG internet. Before everything became a personal brand.",
    "alternatives": [
      "Friend requests: the original connection API."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "social-linktree": {
    "id": "social-linktree",
    "targetId": "linktree external profile",
    "route": "/",
    "component": "SocialDock",
    "tone": "personal",
    "defaultMessage": "Ek link. Saare raaste. Navigation OP.",
    "alternatives": [
      "Choose your next internet side quest."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "social-peerlist": {
    "id": "social-peerlist",
    "targetId": "peerlist external profile",
    "route": "/",
    "component": "SocialDock",
    "tone": "personal",
    "defaultMessage": "Build. Ship. Repeat. Chai bhi zaroori hai.",
    "alternatives": [
      "Professional growth, one shipped project at a time."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "guestbook": {
    "id": "guestbook",
    "targetId": "Open MARGINS",
    "route": "*",
    "component": "TopBar, PortalOS, PortalDiscover",
    "tone": "personal",
    "defaultMessage": "Aaye ho toh kuch likh ke jaana. Attendance nahi lagegi.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Visitors come and go. Good messages stay."
  },
  "theme-light": {
    "id": "theme-light",
    "targetId": "Switch to light theme",
    "route": "*",
    "component": "TopBar",
    "tone": "personal",
    "defaultMessage": "Light mode? Aaj toh zindagi sorted lag rahi hai.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Changing appearance. Preserving personality."
  },
  "theme-dark": {
    "id": "theme-dark",
    "targetId": "Switch to dark theme",
    "route": "*",
    "component": "TopBar",
    "tone": "personal",
    "defaultMessage": "Dark mode. Developer habitat restored.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Dark mode. Same engineering, different lighting."
  },
  "portal": {
    "id": "portal",
    "targetId": "Open PORTAL",
    "route": "*",
    "component": "TopBar",
    "tone": "personal",
    "defaultMessage": "Congratulations. You found the developer’s control room.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "The portfolio, one command away."
  },
  "portal-search": {
    "id": "portal-search",
    "targetId": "Search commands",
    "route": "*",
    "component": "PortalOS",
    "tone": "personal",
    "defaultMessage": "Type a command. No magic words required.",
    "alternatives": [
      "Search karo. Mind reading abhi beta mein hai."
    ],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Type a command. No magic words required."
  },
  "portal-close": {
    "id": "portal-close",
    "targetId": "Close PORTAL",
    "route": "*",
    "component": "PortalOS",
    "tone": "personal",
    "defaultMessage": "Returning to the regularly scheduled internet.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "bottom",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Return to the portfolio."
  },
  "portal-projects": {
    "id": "portal-projects",
    "targetId": "Projects command",
    "route": "*",
    "component": "PortalSearchResults",
    "tone": "personal",
    "defaultMessage": "Choose your next rabbit hole.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Explore the engineering case studies."
  },
  "portal-resume": {
    "id": "portal-resume",
    "targetId": "Resume command",
    "route": "*",
    "component": "PortalSearchResults",
    "tone": "professional",
    "defaultMessage": "Professional credentials, without the dramatic soundtrack.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "portal-theme": {
    "id": "portal-theme",
    "targetId": "Theme command",
    "route": "*",
    "component": "PortalSearchResults",
    "tone": "personal",
    "defaultMessage": "Changing appearance. Preserving personality.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Changing appearance. Preserving personality."
  },
  "portal-empty": {
    "id": "portal-empty",
    "targetId": "No matching commands",
    "route": "*",
    "component": "PortalSearchResults",
    "tone": "personal",
    "defaultMessage": "Even the search engine needs a better clue.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "No matching commands. Try a project or action name."
  },
  "note-write": {
    "id": "note-write",
    "targetId": "Open note composer",
    "route": "*",
    "component": "TheMarginsNotes",
    "tone": "personal",
    "defaultMessage": "Apni legacy chhod jao. Database sambhaal lega.",
    "alternatives": [
      "Ek note likho. Essay submission nahi hai."
    ],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Short note, long-lasting impression."
  },
  "auth-google": {
    "id": "auth-google",
    "targetId": "Google sign-in",
    "route": "*",
    "component": "TheMarginsNotes, AuthGateModal",
    "tone": "personal",
    "defaultMessage": "Google pe bharosa. Password yaad rakhne ki zaroorat nahi.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Sign in with Google to leave a note."
  },
  "auth-github": {
    "id": "auth-github",
    "targetId": "GitHub sign-in",
    "route": "*",
    "component": "TheMarginsNotes, AuthGateModal",
    "tone": "personal",
    "defaultMessage": "GitHub se entry. Contribution optional.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Sign in with GitHub. A pull request is optional."
  },
  "note-composer": {
    "id": "note-composer",
    "targetId": "Note text field",
    "route": "*",
    "component": "TheMarginsNotes",
    "tone": "personal",
    "defaultMessage": "Dil ki baat likho. Stack trace mat bhejna.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Short note, long-lasting impression."
  },
  "note-submit": {
    "id": "note-submit",
    "targetId": "Submit note for moderation",
    "route": "*",
    "component": "TheMarginsNotes",
    "tone": "personal",
    "defaultMessage": "Send it. The internet deserves one nice comment.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "A thoughtful note is always welcome."
  },
  "note-reaction": {
    "id": "note-reaction",
    "targetId": "React to approved note",
    "route": "*",
    "component": "TheMarginsNotes",
    "tone": "personal",
    "defaultMessage": "Ek reaction se bhi validation mil jaati hai.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "A little appreciation goes a long way."
  },
  "sign-out": {
    "id": "sign-out",
    "targetId": "Sign out",
    "route": "*",
    "component": "TheMarginsNotes",
    "tone": "personal",
    "defaultMessage": "Session khatam. Connection remains.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Session ended. Connection remains."
  },
  "contact-personal": {
    "id": "contact-personal",
    "targetId": "Contact email",
    "route": "/",
    "component": "ContactOrbit",
    "tone": "personal",
    "defaultMessage": "DM kar do. Stack trace optional.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true
  },
  "back-to-top": {
    "id": "back-to-top",
    "targetId": "Back to top",
    "route": "*",
    "component": "Footer",
    "tone": "personal",
    "defaultMessage": "Upar chalo. Story dobara.",
    "alternatives": [],
    "priority": "high",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Return to the beginning. The evidence is still there."
  },
  "footer": {
    "id": "footer",
    "targetId": "Footer signature",
    "route": "*",
    "component": "Footer",
    "tone": "personal",
    "defaultMessage": "Built with code. Maintained with caffeine.",
    "alternatives": [
      "End of page. Developer still debugging life."
    ],
    "priority": "low",
    "preferredPlacement": "top",
    "mobileBehavior": "omit",
    "enabled": true,
    "professionalMessage": "Built with code. Maintained with caffeine."
  }
} as const satisfies Record<string, TooltipMessage>;
export type HumanMessageId = keyof typeof messages;
export const humanLayerMessages: Record<HumanMessageId, TooltipMessage> = messages;

export function getTooltipMessage(id: HumanMessageId, professional = false): TooltipMessage {
  const item = humanLayerMessages[id];
  return professional && item.tone === 'personal'
    ? { ...item, tone: 'professional', defaultMessage: item.professionalMessage ?? item.defaultMessage }
    : item;
}

export function projectMessageId(slug: string): HumanMessageId | undefined {
  const id = `project-${slug}`;
  return id in humanLayerMessages ? id as HumanMessageId : undefined;
}
