export interface HackathonPhoto {
  src: string;
  fullSrc: string;
  alt: string;
  tag: string;
  caption: string;
}

export const hackathonPhotos: HackathonPhoto[] = [
  { 
    src: '/hackathons/crazybuild-runnersup.webp',
    fullSrc: '/hackathons/crazybuild-runnersup.jpg',
    alt: 'CrazyBuild Hackathon 1st Runners Up Felicitation with Certificates and Trophy', 
    tag: 'CRAZYBUILD · 1ST RUNNERS-UP', 
    caption: 'CrazyBuild award presentation with our team.'
  },
  { 
    src: '/hackathons/discoveria-winner.webp',
    fullSrc: '/hackathons/discoveria-winner.png',
    alt: 'Winning moment with teammate in Discoveria', 
    tag: 'DISCOVERIA · WINNING MOMENT', 
    caption: 'With my teammate at Discoveria hackathon.'
  },
  { 
    src: '/hackathons/hacktoberfest-aliah.webp',
    fullSrc: '/hackathons/hacktoberfest-aliah.png',
    alt: 'Hacktoberfest Hack Day at Aliah University', 
    tag: 'HACKTOBERFEST · ALIAH UNIVERSITY', 
    caption: 'Hacktoberfest Hack Day at Aliah University.'
  },
  { 
    src: '/hackathons/hackathon-team.webp',
    fullSrc: '/hackathons/hackathon-team.jpg',
    alt: 'Hackathon team building together', 
    tag: 'TEAM COLLABORATION', 
    caption: 'Our team on campus during HackSpire.'
  },
  { 
    src: '/hackathons/hackspire-booth.webp',
    fullSrc: '/hackathons/hackspire-booth.jpg',
    alt: 'HackSpire mascot booth photo', 
    tag: 'HACKSPIRE · BOOTH',
    caption: 'At the HackSpire event booth.'
  },
  { 
    src: '/hackathons/stage-award-1.webp',
    fullSrc: '/hackathons/stage-award-1.png',
    alt: 'Stage felicitation and award presentation', 
    tag: 'STAGE FELICITATION',
    caption: 'Receiving award recognition on stage.'
  },
  { 
    src: '/hackathons/stage-award-2.webp',
    fullSrc: '/hackathons/stage-award-2.png',
    alt: 'Stage handshake and trophy moment', 
    tag: 'AWARD PRESENTATION',
    caption: 'With teammate following the award ceremony.'
  }
];
