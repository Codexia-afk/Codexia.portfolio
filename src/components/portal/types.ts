export type PortalView = 
  | 'discover' 
  | 'search' 
  | 'project-preview' 
  | 'margins-notes' 
  | 'on-my-desk' 
  | 'recruiter-mode' 
  | 'colophon';

export type SearchCategory = 
  | 'Navigation' 
  | 'Projects' 
  | 'Capabilities' 
  | 'Experience' 
  | 'Writing' 
  | 'Actions' 
  | 'External';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  iconName: string;
  badge?: string;
  keywords: string[];
  action: () => void;
  metadata?: Record<string, any>;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'github' | 'google';
  handle?: string;
  verifiedAt: string;
}

export type NoteCategory = 
  | 'Critique & Suggestions'
  | 'Portfolio Feedback' 
  | 'Collaboration Idea' 
  | 'Technical Architecture'
  | 'Appreciation' 
  | 'A Question';

export interface NoteItem {
  id: string;
  displayName: string;
  message: string;
  category: NoteCategory;
  createdAt: string; // ISO date string
  isFeatured?: boolean;
  reactionCount: number;
  status: 'approved' | 'pending' | 'rejected';
  userReacted?: boolean;
  authorAvatar?: string;
  authorProvider?: 'github' | 'google';
  authorHandle?: string;
  authorEmail?: string;
  rating?: number; // 1-5 rating
}

export interface DeskMilestone {
  id: string;
  projectTitle: string;
  slug?: string;
  update: string;
  date: string;
  status: 'In Flight' | 'Benchmarking' | 'Shipped' | 'Exploring';
  tech: string[];
  link?: string;
}
