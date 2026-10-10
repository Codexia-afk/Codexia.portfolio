import { AuthUser, NoteCategory } from './types';
import { getSupabase, isSupabaseConfigured } from '../../lib/supabase';

const AUTH_STORAGE_KEY = 'portal_os_auth_user_v2';
const DRAFT_STORAGE_KEY = 'the_margins_draft_v1';

export interface DraftNote {
  message: string;
  category: NoteCategory;
  rating: number;
}

type AuthListener = (user: AuthUser | null) => void;
const listeners: Set<AuthListener> = new Set();

function notifyListeners(user: AuthUser | null): void {
  listeners.forEach((listener) => {
    try {
      listener(user);
    } catch (err) {
      console.error('Error notifying auth listener:', err);
    }
  });
}

export interface GitHubAccountDetails {
  login: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  company: string;
  location: string;
  email: string;
  createdAt: string;
}

// Convert Supabase User object into our AuthUser format
function mapSupabaseUser(user: any): AuthUser {
  const metadata = user.user_metadata || {};
  const appMetadata = user.app_metadata || {};
  const provider = (appMetadata.provider || metadata.provider || (user.identities?.[0]?.provider) || 'google') as 'github' | 'google';

  const name = metadata.full_name || metadata.name || metadata.user_name || metadata.preferred_username || user.email?.split('@')[0] || 'Visitor';
  const avatarUrl = metadata.avatar_url || metadata.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0284c7&color=fff`;
  const handle = metadata.user_name || metadata.preferred_username || (user.email ? user.email.split('@')[0] : 'visitor');

  return {
    id: user.id,
    name,
    email: user.email || '',
    avatarUrl,
    provider: provider === 'github' ? 'github' : 'google',
    handle: handle.startsWith('@') ? handle : `@${handle}`,
    verifiedAt: user.created_at || new Date().toISOString(),
    bio: metadata.bio || '',
    githubUrl: provider === 'github' ? (metadata.user_name ? `https://github.com/${metadata.user_name}` : undefined) : undefined,
    publicRepos: metadata.public_repos,
    followers: metadata.followers,
    company: metadata.company,
    location: metadata.location
  };
}

export const authService = {
  // Check if Supabase cloud backend is configured
  isCloudConfigured(): boolean {
    return isSupabaseConfigured();
  },

  // Retrieve currently authenticated user
  getCurrentUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id && parsed.name) {
        return parsed as AuthUser;
      }
      return null;
    } catch {
      return null;
    }
  },

  // Save unfinished note draft before OAuth redirect
  saveDraft(draft: DraftNote): void {
    try {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {}
  },

  // Get and retain/clear draft
  getDraft(): DraftNote | null {
    try {
      const raw = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  clearDraft(): void {
    try {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {}
  },

  // Update display name for authenticated visitor
  async updateDisplayName(newName: string): Promise<AuthUser | null> {
    const current = this.getCurrentUser();
    if (!current) return null;

    const clean = newName.trim();
    if (!clean) return current;

    const updated: AuthUser = {
      ...current,
      name: clean
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));

    // Update in Supabase profiles table if available
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: current.id,
            display_name: clean,
            avatar_url: current.avatarUrl,
            updated_at: new Date().toISOString()
          });
      } catch (err) {
        console.error('Failed to sync profile with Supabase:', err);
      }
    }

    notifyListeners(updated);
    return updated;
  },

  // Initiate real Google OAuth with PKCE redirect
  async signInWithGoogleOAuth(draft?: DraftNote): Promise<{ error?: string }> {
    if (draft) {
      this.saveDraft(draft);
    }
    sessionStorage.setItem('return_to_margins', 'true');

    const supabase = getSupabase();
    if (!supabase) {
      return { 
        error: 'Supabase credentials not configured in .env. Please see the setup instructions to enable production Google OAuth.' 
      };
    }

    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) return { error: error.message };
      return {};
    } catch (err: any) {
      return { error: err?.message || 'Failed to initiate Google OAuth.' };
    }
  },

  // Initiate real GitHub OAuth with PKCE redirect
  async signInWithGithubOAuth(draft?: DraftNote): Promise<{ error?: string }> {
    if (draft) {
      this.saveDraft(draft);
    }
    sessionStorage.setItem('return_to_margins', 'true');

    const supabase = getSupabase();
    if (!supabase) {
      return { 
        error: 'Supabase credentials not configured in .env. Please see the setup instructions to enable production GitHub OAuth.' 
      };
    }

    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo
        }
      });

      if (error) return { error: error.message };
      return {};
    } catch (err: any) {
      return { error: err?.message || 'Failed to initiate GitHub OAuth.' };
    }
  },

  // Fetch full details of any GitHub user account using public GitHub API
  async fetchGithubAccount(username: string): Promise<{ data?: GitHubAccountDetails; error?: string }> {
    const clean = username.trim().replace(/^@/, '').replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
    if (!clean) {
      return { error: 'Please enter a GitHub username.' };
    }

    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(clean)}`);
      if (res.status === 404) {
        return { error: `GitHub user "@${clean}" was not found. Please verify the username.` };
      }
      
      if (!res.ok) {
        // Fallback gracefully on rate limit (status 403) or server errors
        return {
          data: {
            login: clean,
            name: clean,
            avatarUrl: `https://github.com/${clean}.png`,
            htmlUrl: `https://github.com/${clean}`,
            bio: 'GitHub Contributor',
            publicRepos: 0,
            followers: 0,
            following: 0,
            company: '',
            location: '',
            email: `${clean}@users.noreply.github.com`,
            createdAt: new Date().toISOString()
          }
        };
      }

      const json = await res.json();
      return {
        data: {
          login: json.login,
          name: json.name || json.login,
          avatarUrl: json.avatar_url || `https://github.com/${clean}.png`,
          htmlUrl: json.html_url || `https://github.com/${clean}`,
          bio: json.bio || '',
          publicRepos: json.public_repos || 0,
          followers: json.followers || 0,
          following: json.following || 0,
          company: json.company || '',
          location: json.location || '',
          email: json.email || `${json.login}@users.noreply.github.com`,
          createdAt: json.created_at || new Date().toISOString()
        }
      };
    } catch {
      // Offline / network fallback
      return {
        data: {
          login: clean,
          name: clean,
          avatarUrl: `https://github.com/${clean}.png`,
          htmlUrl: `https://github.com/${clean}`,
          bio: '',
          publicRepos: 0,
          followers: 0,
          following: 0,
          company: '',
          location: '',
          email: `${clean}@users.noreply.github.com`,
          createdAt: new Date().toISOString()
        }
      };
    }
  },

  // Authenticate visitor with their verified GitHub account details
  async signInWithGithubAccount(account: GitHubAccountDetails): Promise<AuthUser> {
    const user: AuthUser = {
      id: `gh-${account.login.toLowerCase()}`,
      name: account.name || account.login,
      email: account.email,
      avatarUrl: account.avatarUrl,
      provider: 'github',
      handle: `@${account.login}`,
      verifiedAt: new Date().toISOString(),
      bio: account.bio,
      githubUrl: account.htmlUrl,
      publicRepos: account.publicRepos,
      followers: account.followers,
      following: account.following,
      company: account.company,
      location: account.location
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

    // Upsert into Supabase profiles table if available
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            display_name: user.name,
            avatar_url: user.avatarUrl,
            provider: 'github',
            updated_at: new Date().toISOString()
          });
      } catch (err) {
        console.warn('Profile sync fallback:', err);
      }
    }

    notifyListeners(user);
    return user;
  },

  // Developer preview direct sign in (used when cloud credentials are pending setup)
  async signInWithGithubPreview(username: string): Promise<AuthUser> {
    const fetchRes = await this.fetchGithubAccount(username);
    if (fetchRes.data) {
      return this.signInWithGithubAccount(fetchRes.data);
    }
    const cleanUsername = username.trim().replace(/^@/, '') || 'developer';
    return this.signInWithGithubAccount({
      login: cleanUsername,
      name: cleanUsername,
      avatarUrl: `https://github.com/${cleanUsername}.png`,
      htmlUrl: `https://github.com/${cleanUsername}`,
      bio: '',
      publicRepos: 0,
      followers: 0,
      following: 0,
      company: '',
      location: '',
      email: `${cleanUsername}@users.noreply.github.com`,
      createdAt: new Date().toISOString()
    });
  },

  signInWithGooglePreview(name: string, email: string): AuthUser {
    const cleanName = name.trim() || 'Google User';
    const cleanEmail = email.trim() || 'user@gmail.com';
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=4285F4&color=fff&bold=true`;

    const user: AuthUser = {
      id: `google-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      email: cleanEmail,
      avatarUrl,
      provider: 'google',
      handle: cleanEmail.split('@')[0],
      verifiedAt: new Date().toISOString()
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    notifyListeners(user);
    return user;
  },

  // Sign out of both Supabase and local storage
  async signOut(): Promise<void> {
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    notifyListeners(null);
  },

  // Subscribe to authentication changes across components
  subscribe(listener: AuthListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // Handle active session sync upon initialization
  initAuthSync(): void {
    const supabase = getSupabase();
    if (!supabase) return;

    // Check existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const mapped = mapSupabaseUser(session.user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mapped));
        notifyListeners(mapped);
      }
    });

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const mapped = mapSupabaseUser(session.user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mapped));
        notifyListeners(mapped);
      } else if (_event === 'SIGNED_OUT') {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        notifyListeners(null);
      }
    });
  }
};

// Initialize auth sync on bundle load
if (typeof window !== 'undefined') {
  authService.initAuthSync();
}
