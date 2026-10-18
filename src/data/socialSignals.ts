export interface SocialSignal {
  id: 'linkedin' | 'x' | 'instagram' | 'facebook' | 'linktree' | 'peerlist';
  label: string;
  handle: string;
  url: string;
  accessibleName: string;
  tag: string;
  accentColor: string;
  mobileDescription: string;
  animationVariant: 'snap' | 'glitch' | 'tilt' | 'retro' | 'branch' | 'compile';
}

export const socialSignalsData: SocialSignal[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/srinjoy-pramanick',
    url: 'https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/',
    accessibleName: 'Srinjoy Pramanick on LinkedIn (Professional Network)',
    tag: 'PRO // NETWORK',
    accentColor: '#0a66c2',
    mobileDescription: 'Career updates, architectural case studies & professional network',
    animationVariant: 'snap'
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    handle: '@Srinjoy_18',
    url: 'https://x.com/Srinjoy_18',
    accessibleName: 'Srinjoy Pramanick on X (formerly Twitter)',
    tag: 'DISPATCH // MICRO',
    accentColor: '#e7e5e4',
    mobileDescription: 'Raw systems thoughts, build updates, and cold coffee rants',
    animationVariant: 'glitch'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@unknown_syntax01',
    url: 'https://www.instagram.com/unknown_syntax01/',
    accessibleName: 'Srinjoy Pramanick on Instagram (Life & Behind The Screen)',
    tag: 'ATELIER // VISUAL',
    accentColor: '#e1306c',
    mobileDescription: 'Visual dispatches, college moments & life outside terminals',
    animationVariant: 'tilt'
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'srinjoy.pramanick.2025',
    url: 'https://www.facebook.com/srinjoy.pramanick.2025',
    accessibleName: 'Srinjoy Pramanick on Facebook (Personal Archive)',
    tag: 'LEGACY // SOCIAL',
    accentColor: '#1877f2',
    mobileDescription: 'The vintage internet social graph & family milestone archives',
    animationVariant: 'retro'
  },
  {
    id: 'linktree',
    label: 'Linktree',
    handle: '@srinjoypramanick15',
    url: 'https://linktr.ee/srinjoypramanick15',
    accessibleName: 'Srinjoy Pramanick Linktree (All Routes Hub)',
    tag: 'ROUTER // ALL',
    accentColor: '#43e660',
    mobileDescription: 'Universal launchpad routing to every dispatch, build & portal',
    animationVariant: 'branch'
  },
  {
    id: 'peerlist',
    label: 'Peerlist',
    handle: '@srinjoyp15',
    url: 'https://peerlist.io/srinjoyp15',
    accessibleName: 'Srinjoy Pramanick on Peerlist (Builder Community)',
    tag: 'BUILD // SHIP',
    accentColor: '#00aa44',
    mobileDescription: 'Proof of work, ship logs & verified builder community',
    animationVariant: 'compile'
  }
];
