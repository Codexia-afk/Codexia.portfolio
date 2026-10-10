import { NoteItem, NoteCategory, AuthUser } from './types';
import { getSupabase } from '../../lib/supabase';

const STORAGE_KEY = 'portal_os_authentic_thoughts_v2';
const REACTIONS_KEY = 'portal_os_authentic_reactions_v2';
const RATE_LIMIT_KEY = 'portal_os_authentic_ratelimit_v2';
const REPORTS_KEY = 'portal_os_note_reports_v1';
const OWNER_PASSCODE = 'srinjoy2026';

function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

function loadLocalNotes(): NoteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalNotes(notes: NoteItem[]): void {
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
  // Retrieve public and personal notes
  async getPublicNotes(currentUserId?: string): Promise<NoteItem[]> {
    const reactions = getStoredReactions();
    const supabase = getSupabase();

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('guestbook_notes')
          .select(`
            id,
            user_id,
            display_name_snapshot,
            message,
            category,
            rating,
            moderation_status,
            is_featured,
            reaction_count,
            created_at,
            updated_at,
            profiles (
              avatar_url,
              provider
            )
          `)
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          return data.map((item: any) => {
            const isOwn = !!currentUserId && item.user_id === currentUserId;
            return {
              id: item.id,
              userId: item.user_id,
              displayName: item.display_name_snapshot,
              message: item.message,
              category: item.category as NoteCategory,
              createdAt: item.created_at,
              isFeatured: item.is_featured,
              reactionCount: item.reaction_count || 0,
              status: item.moderation_status,
              userReacted: !!reactions[item.id],
              authorAvatar: item.profiles?.avatar_url,
              authorProvider: item.profiles?.provider,
              rating: item.rating,
              isOwnNote: isOwn
            };
          });
        }
      } catch (err) {
        console.warn('Falling back to local notes due to Supabase fetch error:', err);
      }
    }

    // Local fallback
    const local = loadLocalNotes();
    const filtered = local.filter((n) => 
      n.status === 'approved' || (currentUserId && n.userId === currentUserId)
    );

    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered.map((n) => ({
      ...n,
      isOwnNote: !!currentUserId && n.userId === currentUserId,
      userReacted: !!reactions[n.id]
    }));
  },

  // Submit a new authenticated note
  async submitNote(input: {
    author: AuthUser;
    message: string;
    category: NoteCategory;
    rating?: number;
  }): Promise<{ success: boolean; note?: NoteItem; error?: string }> {
    if (!input.author || !input.author.id || !input.author.name) {
      return { 
        success: false, 
        error: 'Authentication required. Please sign in with Google or GitHub.' 
      };
    }

    // Rate limiting check
    const now = Date.now();
    try {
      const historyStr = localStorage.getItem(RATE_LIMIT_KEY);
      const history: number[] = historyStr ? JSON.parse(historyStr) : [];
      const recent = history.filter((t) => now - t < 1000 * 60 * 10);

      if (recent.length >= 5) {
        return {
          success: false,
          error: 'Rate limit reached: Maximum 5 submissions per 10 minutes to maintain quality.'
        };
      }

      recent.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
    } catch {}

    const cleanMessage = sanitizeText(input.message);
    if (!cleanMessage || cleanMessage.length < 5) {
      return { success: false, error: 'Please enter a note with at least 5 characters.' };
    }
    if (cleanMessage.length > 400) {
      return { success: false, error: 'Message exceeds maximum length of 400 characters.' };
    }

    const notePayload: NoteItem = {
      id: `thought-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: input.author.id,
      displayName: input.author.name,
      message: cleanMessage,
      category: input.category,
      createdAt: new Date().toISOString(),
      isFeatured: false,
      reactionCount: 1,
      status: 'approved',
      authorAvatar: input.author.avatarUrl,
      authorProvider: input.author.provider,
      authorHandle: input.author.handle,
      authorEmail: input.author.email,
      authorBio: input.author.bio,
      authorGithubUrl: input.author.githubUrl,
      rating: input.rating && input.rating >= 1 && input.rating <= 5 ? input.rating : undefined,
      isOwnNote: true
    };

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('guestbook_notes')
          .insert({
            user_id: input.author.id,
            display_name_snapshot: input.author.name,
            message: cleanMessage,
            category: input.category,
            rating: input.rating,
            moderation_status: 'approved',
            reaction_count: 1
          })
          .select()
          .single();

        if (!error && data) {
          notePayload.id = data.id;
        }
      } catch (err) {
        console.warn('Note saved to local cache; Supabase sync error:', err);
      }
    }

    // Save to local storage cache
    const local = loadLocalNotes();
    local.unshift(notePayload);
    saveLocalNotes(local);

    // Save author's initial reaction
    const reactions = getStoredReactions();
    reactions[notePayload.id] = true;
    saveStoredReactions(reactions);

    return { success: true, note: notePayload };
  },

  // Edit own note
  async editNote(input: {
    noteId: string;
    authorId: string;
    message: string;
    category: NoteCategory;
    rating?: number;
  }): Promise<{ success: boolean; error?: string }> {
    const cleanMessage = sanitizeText(input.message);
    if (!cleanMessage || cleanMessage.length < 5) {
      return { success: false, error: 'Please enter at least 5 characters.' };
    }

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('guestbook_notes')
          .update({
            message: cleanMessage,
            category: input.category,
            rating: input.rating,
            updated_at: new Date().toISOString()
          })
          .eq('id', input.noteId)
          .eq('user_id', input.authorId);

        if (error) {
          return { success: false, error: error.message };
        }
      } catch (err: any) {
        return { success: false, error: err?.message };
      }
    }

    // Update in local cache
    const local = loadLocalNotes();
    const idx = local.findIndex((n) => n.id === input.noteId);
    if (idx !== -1) {
      if (local[idx].userId && local[idx].userId !== input.authorId) {
        return { success: false, error: 'You do not have permission to edit this note.' };
      }
      local[idx].message = cleanMessage;
      local[idx].category = input.category;
      if (input.rating) local[idx].rating = input.rating;
      saveLocalNotes(local);
    }

    return { success: true };
  },

  // Delete own note or owner deletion
  async deleteNote(input: {
    noteId: string;
    authorId?: string;
    passcode?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const isOwner = input.passcode ? input.passcode.trim() === OWNER_PASSCODE : false;

    const supabase = getSupabase();
    if (supabase) {
      try {
        let query = supabase.from('guestbook_notes').delete().eq('id', input.noteId);
        if (!isOwner && input.authorId) {
          query = query.eq('user_id', input.authorId);
        }
        const { error } = await query;
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err?.message };
      }
    }

    // Local deletion
    let local = loadLocalNotes();
    local = local.filter((n) => n.id !== input.noteId);
    saveLocalNotes(local);

    return { success: true };
  },

  // Report inappropriate note
  async reportNote(input: {
    noteId: string;
    reporterId?: string;
    reason: string;
  }): Promise<{ success: boolean; error?: string }> {
    const cleanReason = sanitizeText(input.reason);
    if (!cleanReason) {
      return { success: false, error: 'Please enter a valid reason for reporting.' };
    }

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('note_reports')
          .insert({
            note_id: input.noteId,
            reporter_id: input.reporterId || null,
            reason: cleanReason
          });
        if (error) console.warn('Supabase report submission notice:', error.message);
      } catch {}
    }

    // Record locally
    try {
      const raw = localStorage.getItem(REPORTS_KEY);
      const reports = raw ? JSON.parse(raw) : [];
      reports.push({
        id: `report-${Date.now()}`,
        noteId: input.noteId,
        reporterId: input.reporterId,
        reason: cleanReason,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
    } catch {}

    return { success: true };
  },

  // Toggle appreciation reaction for a note
  async toggleReaction(noteId: string): Promise<{ reactionCount: number; userReacted: boolean }> {
    const local = loadLocalNotes();
    const reactions = getStoredReactions();
    const hasReacted = !!reactions[noteId];

    const noteIndex = local.findIndex((n) => n.id === noteId);
    let newCount = 0;

    if (noteIndex !== -1) {
      if (hasReacted) {
        local[noteIndex].reactionCount = Math.max(0, local[noteIndex].reactionCount - 1);
        delete reactions[noteId];
      } else {
        local[noteIndex].reactionCount += 1;
        reactions[noteId] = true;
      }
      newCount = local[noteIndex].reactionCount;
      saveLocalNotes(local);
      saveStoredReactions(reactions);
    }

    // Sync with Supabase if available
    const supabase = getSupabase();
    if (supabase && noteIndex !== -1) {
      try {
        await supabase
          .from('guestbook_notes')
          .update({ reaction_count: newCount })
          .eq('id', noteId);
      } catch {}
    }

    return {
      reactionCount: newCount,
      userReacted: !hasReacted
    };
  },

  // Owner moderation access
  verifyOwnerPasscode(passcode: string): boolean {
    return passcode.trim() === OWNER_PASSCODE;
  },

  getModerationNotes(passcode: string): NoteItem[] | null {
    if (!this.verifyOwnerPasscode(passcode)) return null;
    return loadLocalNotes();
  },

  updateNoteModeration(passcode: string, noteId: string, status: 'approved' | 'pending' | 'rejected', isFeatured?: boolean): boolean {
    if (!this.verifyOwnerPasscode(passcode)) return false;
    const notes = loadLocalNotes();
    const note = notes.find((n) => n.id === noteId);
    if (!note) return false;

    note.status = status;
    if (typeof isFeatured === 'boolean') {
      note.isFeatured = isFeatured;
    }
    saveLocalNotes(notes);

    const supabase = getSupabase();
    if (supabase) {
      supabase
        .from('guestbook_notes')
        .update({
          moderation_status: status,
          is_featured: note.isFeatured
        })
        .eq('id', noteId)
        .then(() => {});
    }

    return true;
  }
};
