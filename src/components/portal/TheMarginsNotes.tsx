import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Plus, 
  Send, 
  Sparkles, 
  Trash2, 
  Star, 
  X,
  Lock,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  Github,
  LogOut
} from 'lucide-react';
import { NoteItem, NoteCategory, AuthUser } from './types';
import { notesService } from './notesService';
import { authService } from './authService';
import { AuthGateModal } from './AuthGateModal';

interface TheMarginsNotesProps {
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const TheMarginsNotes: React.FC<TheMarginsNotesProps> = ({
  onBack,
  onShowToast
}) => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(authService.getCurrentUser());
  
  // Composer form state
  const [message, setMessage] = useState<string>('');
  const [category, setCategory] = useState<NoteCategory>('Critique & Suggestions');
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Owner moderation state
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(false);
  const [ownerPasscode, setOwnerPasscode] = useState<string>('');
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState<boolean>(false);
  const [adminNotes, setAdminNotes] = useState<NoteItem[] | null>(null);

  const categories: ('All' | NoteCategory)[] = [
    'All',
    'Critique & Suggestions',
    'Portfolio Feedback',
    'Collaboration Idea',
    'Technical Architecture',
    'Appreciation',
    'A Question'
  ];

  const refreshNotes = () => {
    setNotes(notesService.getPublicNotes());
  };

  useEffect(() => {
    refreshNotes();
    const unsubscribe = authService.subscribe((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleReaction = (noteId: string) => {
    const res = notesService.toggleReaction(noteId);
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, reactionCount: res.reactionCount, userReacted: res.userReacted }
          : n
      )
    );
    if (res.userReacted) {
      onShowToast('✓ Appreciation recorded.');
    }
  };

  const handleOpenComposer = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
    } else {
      setIsComposerOpen((prev) => !prev);
    }
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const result = notesService.submitNote({
      author: currentUser,
      message,
      category,
      rating
    });

    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.error || 'Failed to submit thought.');
      return;
    }

    onShowToast('✓ Your verified thought has been shared in The Margins.');
    setMessage('');
    setRating(5);
    setIsComposerOpen(false);
    refreshNotes();
  };

  const handleUnlockOwner = (e: React.FormEvent) => {
    e.preventDefault();
    if (notesService.verifyOwnerPasscode(ownerPasscode)) {
      setIsOwnerMode(true);
      setIsPasscodeModalOpen(false);
      setAdminNotes(notesService.getModerationNotes(ownerPasscode));
      onShowToast('Owner moderation console unlocked.');
    } else {
      onShowToast('Invalid owner passcode.');
    }
  };

  const handleAdminStatusChange = (noteId: string, status: 'approved' | 'pending' | 'rejected', isFeatured?: boolean) => {
    notesService.updateNoteModeration(ownerPasscode, noteId, status, isFeatured);
    setAdminNotes(notesService.getModerationNotes(ownerPasscode));
    refreshNotes();
    onShowToast(`Updated note status: ${status}`);
  };

  const handleAdminDelete = (noteId: string) => {
    if (confirm('Permanently delete this note?')) {
      notesService.deleteNote(ownerPasscode, noteId);
      setAdminNotes(notesService.getModerationNotes(ownerPasscode));
      refreshNotes();
      onShowToast('Note deleted.');
    }
  };

  const filteredNotes = activeCategory === 'All'
    ? notes
    : notes.filter((n) => n.category === activeCategory);

  const formatNoteDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Navigation & Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200/80 dark:border-zinc-800 gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {!isOwnerMode ? (
            <button
              onClick={() => setIsPasscodeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 bg-stone-100 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/60 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>OWNER ACCESS</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              MODERATOR ACTIVE
            </span>
          )}

          {/* User Auth Status / Action */}
          {!currentUser ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SIGN IN TO SHARE THOUGHTS</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 font-mono text-xs">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-stone-300 dark:border-zinc-600"
                />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 max-w-[100px] truncate">
                  {currentUser.name}
                </span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-stone-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold">
                  {currentUser.provider}
                </span>
                <button
                  onClick={() => {
                    authService.signOut();
                    onShowToast('Signed out successfully.');
                  }}
                  title="Sign out"
                  className="text-zinc-400 hover:text-rose-500 cursor-pointer pl-1"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleOpenComposer}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 dark:bg-cyan-500 text-white font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isComposerOpen ? 'CLOSE' : 'LEAVE A THOUGHT'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Statement */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 font-mono text-xs text-sky-600 dark:text-cyan-400 font-semibold uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>THE MARGINS // AUTHENTIC THOUGHTS & REVIEWS</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Annotations, feedback, and reviews.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-xl text-pretty leading-relaxed">
          Zero simulated reviews or fake comments. An open public canvas for verified peers and recruiters to share feedback, suggestions, and critique.
        </p>
      </div>

      {isOwnerMode && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-800 dark:text-amber-300 flex items-center justify-between">
          <span>OWNER MODERATION ACTIVE · {adminNotes?.length ?? 0} TOTAL RECORDS</span>
          <span className="text-[10px] uppercase font-bold text-amber-600">Verified Access</span>
        </div>
      )}

      {/* Composer Drawer (Unlocked via Auth) */}
      {isComposerOpen && currentUser && (
        <form 
          onSubmit={handleSubmitNote}
          className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-sky-300 dark:border-cyan-500/50 shadow-md space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-sky-600 dark:text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>POSTING AS {currentUser.name.toUpperCase()} ({currentUser.provider.toUpperCase()} VERIFIED)</span>
            </div>
            <button
              type="button"
              onClick={() => setIsComposerOpen(false)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-sans text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NoteCategory)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 text-xs font-sans text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
              >
                <option value="Critique & Suggestions">Critique & Suggestions (How to improve)</option>
                <option value="Portfolio Feedback">Portfolio Feedback</option>
                <option value="Collaboration Idea">Collaboration Idea</option>
                <option value="Technical Architecture">Technical Architecture</option>
                <option value="Appreciation">Appreciation</option>
                <option value="A Question">A Question</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
                Portfolio Craftsmanship Rating
              </label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    className="p-1 text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        starVal <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300 dark:text-zinc-600'
                      }`} 
                    />
                  </button>
                ))}
                <span className="font-mono text-xs font-bold text-amber-500 ml-2">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 mb-1">
              <span>Your Thought or Review (Max 400 chars)</span>
              <span className={message.length > 380 ? 'text-amber-500 font-bold' : ''}>
                {message.length} / 400
              </span>
            </div>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share constructive feedback, ideas on what can be improved, architectural questions, or your review..."
              maxLength={400}
              className="w-full p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 text-xs sm:text-sm font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-sky-500 resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[10px] text-zinc-400">
              Verified identity ensures high-quality feedback. Plain text only.
            </span>
            <button
              type="submit"
              disabled={isSubmitting || message.trim().length < 5}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 dark:bg-cyan-500 text-white font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Posting...' : 'Post Verified Review'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-transparent font-bold shadow-2xs'
                : 'bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-stone-200/80 dark:border-zinc-800 hover:border-stone-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes Cards Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-2 p-10 sm:p-14 text-center rounded-2xl bg-white dark:bg-zinc-900/60 border border-stone-200/90 dark:border-zinc-800 font-sans space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
              <MessageSquare className="w-6 h-6 opacity-60" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                The floor is yours. No fake reviews.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                We've wiped all artificial comments. Authenticate with GitHub or Google to be the first to share your thoughts, critique, or suggestions to elevate this portfolio.
              </p>
            </div>

            <div>
              <button
                onClick={handleOpenComposer}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>LEAVE THE FIRST THOUGHT</span>
              </button>
            </div>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                note.isFeatured
                  ? 'bg-sky-50/40 dark:bg-cyan-950/20 border-sky-300 dark:border-cyan-800/80 shadow-xs'
                  : 'bg-white dark:bg-zinc-900/70 border-stone-200/80 dark:border-zinc-800/90 shadow-2xs'
              }`}
            >
              <div>
                {/* Card Header: Category, Rating & Date */}
                <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase font-semibold">
                    {note.category}
                  </span>

                  <div className="flex items-center gap-2 text-zinc-400">
                    {note.rating && (
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: note.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}
                    {note.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-sky-600 dark:text-cyan-400 font-bold">
                        <Sparkles className="w-3 h-3" />
                        FEATURED
                      </span>
                    )}
                    <span>{formatNoteDate(note.createdAt)}</span>
                  </div>
                </div>

                {/* Message Body */}
                <p className="font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed text-pretty mb-4">
                  "{note.message}"
                </p>
              </div>

              {/* Card Footer: Verified Author & Appreciation */}
              <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  {note.authorAvatar ? (
                    <img
                      src={note.authorAvatar}
                      alt={note.displayName}
                      className="w-5 h-5 rounded-full object-cover shrink-0 border border-stone-300 dark:border-zinc-700"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-stone-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-[10px]">
                      {note.displayName[0]}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-[11px] sm:text-xs">
                        {note.displayName}
                      </span>
                      {note.authorProvider && (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase px-1 py-0.2 rounded bg-stone-100 dark:bg-zinc-800 text-zinc-500">
                          {note.authorProvider === 'github' ? (
                            <Github className="w-2.5 h-2.5" />
                          ) : (
                            <span className="text-blue-500 font-bold">G</span>
                          )}
                          <span className="hidden sm:inline">Verified</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleReaction(note.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                      note.userReacted
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 font-bold'
                        : 'text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/60 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${note.userReacted ? 'fill-current' : ''}`} />
                    <span>{note.reactionCount}</span>
                  </button>

                  {isOwnerMode && (
                    <div className="flex items-center gap-1 pl-2 border-l border-stone-200 dark:border-zinc-800">
                      <button
                        onClick={() => handleAdminStatusChange(note.id, note.status, !note.isFeatured)}
                        title="Toggle Featured"
                        className="p-1 text-zinc-400 hover:text-amber-500"
                      >
                        <Star className={`w-3 h-3 ${note.isFeatured ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleAdminDelete(note.id)}
                        title="Delete Note"
                        className="p-1 text-zinc-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Owner Passcode Modal */}
      {isPasscodeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleUnlockOwner}
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-800 p-6 shadow-2xl space-y-4 animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                OWNER AUTHENTICATION
              </span>
              <button
                type="button"
                onClick={() => setIsPasscodeModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-sans text-xs text-zinc-500">
              Enter the portfolio owner passcode to moderate visitor thoughts, feature selected entries, or remove spam.
            </p>

            <input
              type="password"
              required
              autoFocus
              value={ownerPasscode}
              onChange={(e) => setOwnerPasscode(e.target.value)}
              placeholder="Enter passcode (e.g. srinjoy2026)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              UNLOCK MODERATION
            </button>
          </form>
        </div>
      )}

      {/* Visitor Authentication Gate Modal */}
      <AuthGateModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsComposerOpen(true);
          onShowToast(`✓ Signed in as ${user.name} via ${user.provider.toUpperCase()}`);
        }}
      />
    </div>
  );
};
