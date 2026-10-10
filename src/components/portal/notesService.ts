import { NoteItem, NoteCategory, AuthUser } from './types';

// Storage key updated to ensure all previously seeded mock notes are wiped
const STORAGE_KEY = 'portal_os_authentic_thoughts_v2';
const REACTIONS_KEY = 'portal_os_authentic_reactions_v2';
const RATE_LIMIT_KEY = 'portal_os_authentic_ratelimit_v2';
const OWNER_PASSCODE = 'srinjoy2026';

// Completely empty: Zero fake reviews or simulated comments
const SEED_NOTES: NoteItem[] = [];

// Helper to sanitize plain text and strip HTML tags
function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

// Read notes from storage
function loadAllNotes(): NoteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_NOTES));
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAllNotes(notes: NoteItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to save notes to localStorage:', err);
  }
}

function getStoredReactions(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(REACTIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredReactions(reactions: Record<string, boolean>): void {
  try {
    localStorage.setItem(REACTIONS_KEY, JSON.stringify(reactions));
  } catch {}
}

export const notesService = {
  // Get public approved notes, with user reaction states populated
  getPublicNotes(): NoteItem[] {
    const all = loadAllNotes();
    const reactions = getStoredReactions();

    const approved = all.filter((n) => n.status === 'approved');

    // Deterministic sort: Featured first, then newest
    approved.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return approved.map((n) => ({
      ...n,
      userReacted: !!reactions[n.id]
    }));
  },

  // Submit a new authenticated note/review with rate-limiting and validation
  submitNote(input: {
    author: AuthUser;
    message: string;
    category: NoteCategory;
    rating?: number;
  }): { success: boolean; note?: NoteItem; error?: string } {
    if (!input.author || !input.author.id || !input.author.name) {
      return { 
        success: false, 
        error: 'Authentication required. Please sign in with Google or GitHub to post your thoughts.' 
      };
    }

    // 1. Rate-limiting check
    const now = Date.now();
    try {
      const historyStr = localStorage.getItem(RATE_LIMIT_KEY);
      const history: number[] = historyStr ? JSON.parse(historyStr) : [];
      const recent = history.filter((t) => now - t < 1000 * 60 * 10); // 10 minutes window

      if (recent.length >= 5) {
        return {
          success: false,
          error: 'Rate limit reached: Maximum 5 submissions per 10 minutes to maintain quality. Please try again shortly.'
        };
      }

      recent.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
    } catch {}

    // 2. Validate message length
    const cleanMessage = sanitizeText(input.message);
    if (!cleanMessage || cleanMessage.length < 5) {
      return { success: false, error: 'Please enter a thought with at least 5 characters.' };
    }
    if (cleanMessage.length > 400) {
      return { success: false, error: 'Message exceeds maximum length of 400 characters.' };
    }

    // 3. Construct authentic note
    const newNote: NoteItem = {
      id: `thought-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      displayName: input.author.name,
      message: cleanMessage,
      category: input.category,
      createdAt: new Date().toISOString(),
      isFeatured: false,
      reactionCount: 1, // Author automatic upvote
      status: 'approved',
      authorAvatar: input.author.avatarUrl,
      authorProvider: input.author.provider,
      authorHandle: input.author.handle,
      authorEmail: input.author.email,
      rating: input.rating && input.rating >= 1 && input.rating <= 5 ? input.rating : undefined
    };

    const notes = loadAllNotes();
    notes.unshift(newNote);
    saveAllNotes(notes);

    // Record author reaction
    const reactions = getStoredReactions();
    reactions[newNote.id] = true;
    saveStoredReactions(reactions);

    return { success: true, note: newNote };
  },

  // Toggle appreciation reaction for a note
  toggleReaction(noteId: string): { reactionCount: number; userReacted: boolean } {
    const notes = loadAllNotes();
    const reactions = getStoredReactions();
    const hasReacted = !!reactions[noteId];

    const noteIndex = notes.findIndex((n) => n.id === noteId);
    if (noteIndex === -1) {
      return { reactionCount: 0, userReacted: false };
    }

    if (hasReacted) {
      notes[noteIndex].reactionCount = Math.max(0, notes[noteIndex].reactionCount - 1);
      delete reactions[noteId];
    } else {
      notes[noteIndex].reactionCount += 1;
      reactions[noteId] = true;
    }

    saveAllNotes(notes);
    saveStoredReactions(reactions);

    return {
      reactionCount: notes[noteIndex].reactionCount,
      userReacted: !hasReacted
    };
  },

  // Owner moderation login & queue access
  verifyOwnerPasscode(passcode: string): boolean {
    return passcode.trim() === OWNER_PASSCODE;
  },

  getModerationNotes(passcode: string): NoteItem[] | null {
    if (!this.verifyOwnerPasscode(passcode)) return null;
    return loadAllNotes();
  },

  updateNoteModeration(passcode: string, noteId: string, status: 'approved' | 'pending' | 'rejected', isFeatured?: boolean): boolean {
    if (!this.verifyOwnerPasscode(passcode)) return false;
    const notes = loadAllNotes();
    const note = notes.find((n) => n.id === noteId);
    if (!note) return false;

    note.status = status;
    if (typeof isFeatured === 'boolean') {
      note.isFeatured = isFeatured;
    }
    saveAllNotes(notes);
    return true;
  },

  deleteNote(passcode: string, noteId: string): boolean {
    if (!this.verifyOwnerPasscode(passcode)) return false;
    let notes = loadAllNotes();
    notes = notes.filter((n) => n.id !== noteId);
    saveAllNotes(notes);
    return true;
  }
};
