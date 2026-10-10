import { AuthUser } from './types';

const AUTH_STORAGE_KEY = 'portal_os_auth_user_v2';

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

export const authService = {
  // Retrieve currently authenticated user from localStorage
  getCurrentUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id && parsed.name && parsed.provider) {
        return parsed as AuthUser;
      }
      return null;
    } catch {
      return null;
    }
  },

  // Authenticate using GitHub (fetches real public avatar & metadata when available)
  async signInWithGithub(options: { 
    username?: string; 
    name?: string; 
    email?: string;
  }): Promise<AuthUser> {
    const rawUsername = (options.username || 'developer').trim().replace(/^@/, '');
    const cleanUsername = rawUsername || 'developer';
    let avatarUrl = `https://github.com/${cleanUsername}.png`;
    let displayName = options.name?.trim() || cleanUsername;
    let email = options.email?.trim() || `${cleanUsername}@users.noreply.github.com`;

    // Try fetching public GitHub profile data
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.avatar_url) avatarUrl = data.avatar_url;
        if (data.name) displayName = data.name;
        if (data.email) email = data.email;
      }
    } catch {
      // Offline or rate-limited: use fallback github avatar
    }

    const user: AuthUser = {
      id: `gh-${cleanUsername.toLowerCase()}-${Date.now()}`,
      name: displayName,
      email,
      avatarUrl,
      provider: 'github',
      handle: `@${cleanUsername}`,
      verifiedAt: new Date().toISOString()
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    notifyListeners(user);
    return user;
  },

  // Authenticate using Google
  signInWithGoogle(options: {
    name: string;
    email: string;
    avatarUrl?: string;
  }): AuthUser {
    const cleanName = options.name.trim() || 'Google User';
    const cleanEmail = options.email.trim() || 'user@gmail.com';
    
    // Generate clean Google-style avatar if not provided
    const encodedName = encodeURIComponent(cleanName);
    const avatarUrl = options.avatarUrl || 
      `https://ui-avatars.com/api/?name=${encodedName}&background=4285F4&color=fff&bold=true`;

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

  // Sign out
  signOut(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    notifyListeners(null);
  },

  // Subscribe to authentication changes across components
  subscribe(listener: AuthListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};
