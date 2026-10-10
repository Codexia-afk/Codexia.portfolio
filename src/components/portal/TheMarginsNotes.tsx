import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Plus, 
  Send, 
  Sparkles, 
  Trash2, 
  Edit3,
  Star, 
  X,
  Lock,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  Github,
  LogOut,
  Flag,
  ExternalLink
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
  const [category, setCategory] = useState<NoteCategory>('A Thought');
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Edit note state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Report modal state
  const [reportingNoteId, setReportingNoteId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState<string>('');
  const [isSubmittingReport, setIsSubmittingReport] = useState<boolean>(false);

  // Edit profile display name state
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [customDisplayName, setCustomDisplayName] = useState<string>('');

  // Owner moderation state
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(false);
  const [ownerPasscode, setOwnerPasscode] = useState<string>('');
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState<boolean>(false);
  const [adminNotes, setAdminNotes] = useState<NoteItem[] | null>(null);

  // Quick GitHub inline account lookup
  const [quickGithubUsername, setQuickGithubUsername] = useState<string>('');
  const [isQuickFetching, setIsQuickFetching] = useState<boolean>(false);

  const categories: ('All' | NoteCategory)[] = [
    'All',
    'Just Saying Hello',
    'A Thought',
    'A Suggestion',
    'A Question',
    'Some Appreciation',
    'Critique & Suggestions',
    'Portfolio Feedback',
    'Collaboration Idea',
    'Technical Architecture'
  ];

  const refreshNotes = async () => {
    const list = await notesService.getPublicNotes(currentUser?.id);
    setNotes(list);
  };

  useEffect(() => {
    refreshNotes();

    // Check for unfinished draft restoration
    const draft = authService.getDraft();
    if (draft) {
      setMessage(draft.message || '');
      setCategory(draft.category || 'A Thought');
      setRating(draft.rating || 5);
      authService.clearDraft();
      if (authService.getCurrentUser()) {
        setIsComposerOpen(true);
        onShowToast('✓ Restored your unfinished note draft.');
      }
    }

    const unsubscribe = authService.subscribe((user) => {
      setCurrentUser(user);
      if (user && draft) {
        setIsComposerOpen(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    refreshNotes();
  }, [currentUser]);

  const handleToggleReaction = async (noteId: string) => {
    const res = await notesService.toggleReaction(noteId);
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
      // Save any partial text in draft
      if (message.trim()) {
        authService.saveDraft({ message, category, rating });
      }
      setIsAuthModalOpen(true);
    } else {
      setEditingNoteId(null);
      setIsComposerOpen((prev) => !prev);
    }
  };

  const handleQuickGithubLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = quickGithubUsername.trim().replace(/^@/, '');
    if (!clean) return;

    setIsQuickFetching(true);
    const result = await authService.fetchGithubAccount(clean);
    setIsQuickFetching(false);

    if (result.error) {
      onShowToast(`⚠️ ${result.error}`);
      return;
    }

    if (result.data) {
      const user = await authService.signInWithGithubAccount(result.data);
      setCurrentUser(user);
      setQuickGithubUsername('');
      onShowToast(`✓ Verified as @${result.data.login}. Profile details loaded!`);
      setIsComposerOpen(true);
    }
  };

  const handleStartEdit = (note: NoteItem) => {
    setEditingNoteId(note.id);
    setMessage(note.message);
    setCategory(note.category);
    if (note.rating) setRating(note.rating);
    setIsComposerOpen(true);
  };

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      authService.saveDraft({ message, category, rating });
      setIsAuthModalOpen(true);
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    if (editingNoteId) {
      // Update existing note
      const res = await notesService.editNote({
        noteId: editingNoteId,
        authorId: currentUser.id,
        message,
        category,
        rating
      });

      setIsSubmitting(false);
      if (!res.success) {
        setFormError(res.error || 'Failed to update note.');
        return;
      }

      onShowToast('✓ Your note has been updated.');
      setEditingNoteId(null);
    } else {
      // Create new note
      const result = await notesService.submitNote({
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

      onShowToast('✓ Your thought has been left in The Margins.');
    }

    setMessage('');
    setRating(5);
    setIsComposerOpen(false);
    authService.clearDraft();
    await refreshNotes();
  };

  const handleDeleteOwnNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to permanently delete this note?')) return;

    const res = await notesService.deleteNote({
      noteId,
      authorId: currentUser?.id
    });

    if (res.success) {
      onShowToast('✓ Note deleted.');
      await refreshNotes();
    } else {
      onShowToast(res.error || 'Failed to delete note.');
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingNoteId || !reportReason.trim()) return;

    setIsSubmittingReport(true);
    await notesService.reportNote({
      noteId: reportingNoteId,
      reporterId: currentUser?.id,
      reason: reportReason.trim()
    });

    setIsSubmittingReport(false);
    setReportingNoteId(null);
    setReportReason('');
    onShowToast('✓ Report received. Thank you for keeping The Margins safe.');
  };

  const handleSaveDisplayName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDisplayName.trim()) return;

    await authService.updateDisplayName(customDisplayName.trim());
    setIsEditingName(false);
    onShowToast(`✓ Display name updated to ${customDisplayName.trim()}`);
    await refreshNotes();
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

  const handleAdminDelete = async (noteId: string) => {
    if (confirm('Permanently delete this note as owner?')) {
      await notesService.deleteNote({ noteId, passcode: ownerPasscode });
      setAdminNotes(notesService.getModerationNotes(ownerPasscode));
      await refreshNotes();
      onShowToast('Note deleted by owner.');
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
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Navigation & Identity Bar */}
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 bg-stone-100 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/60 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>OWNER</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              MODERATOR ACTIVE
            </span>
          )}

          {/* User Auth Status / Leave Your Mark Button */}
          {!currentUser ? (
            <button
              onClick={handleOpenComposer}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LEAVE YOUR MARK</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Authenticated Identity Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-zinc-800/90 border border-stone-200 dark:border-zinc-700 font-mono text-xs">
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-stone-300 dark:border-zinc-600"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.name[0]}
                  </div>
                )}
                
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 max-w-[120px] truncate">
                  {currentUser.name}
                </span>

                {currentUser.handle && (
                  <a
                    href={currentUser.githubUrl || `https://github.com/${currentUser.handle.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 font-mono text-[10px] flex items-center gap-0.5"
                  >
                    {currentUser.provider === 'github' && <Github className="w-2.5 h-2.5" />}
                    <span>{currentUser.handle}</span>
                  </a>
                )}

                <button
                  onClick={() => {
                    setCustomDisplayName(currentUser.name);
                    setIsEditingName(true);
                  }}
                  title="Edit Display Name"
                  className="text-zinc-400 hover:text-sky-600 dark:hover:text-cyan-400 cursor-pointer ml-1"
                >
                  <Edit3 className="w-3 h-3" />
                </button>

                <button
                  onClick={async () => {
                    await authService.signOut();
                    onShowToast('Signed out.');
                    await refreshNotes();
                  }}
                  title="Sign out"
                  className="text-zinc-400 hover:text-rose-500 cursor-pointer ml-1"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleOpenComposer}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 dark:bg-cyan-500 text-white font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isComposerOpen ? 'CLOSE COMPOSER' : 'WRITE NOTE'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Headline & Philosophy */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-sky-600 dark:text-cyan-400 font-semibold uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>THE MARGINS // DIGITAL GUESTBOOK</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Leave a little piece of yourself here.
        </h2>
        <p className="font-editorial text-lg italic text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed">
          "A little thought can stay longer than you think."
        </p>
        <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          An authentic public journal powered by GitHub & Google authentication. Type your username to load your profile picture and repositories, or authenticate to leave your review.
        </p>

        {/* Quick Connect Banner for Unauthenticated Visitors */}
        {!currentUser && (
          <div className="mt-4 p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-zinc-950 dark:bg-zinc-800 text-white flex items-center justify-center shrink-0 border border-zinc-700/80">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span>Sign In with GitHub to Leave a Review</span>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                    Live Details Fetch
                  </span>
                </h4>
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
                  Type your username to load your profile picture, repositories & review on The Margins.
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickGithubLogin} className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-zinc-400 font-mono text-xs font-bold">@</span>
                <input
                  type="text"
                  value={quickGithubUsername}
                  onChange={(e) => setQuickGithubUsername(e.target.value)}
                  placeholder="github-username"
                  className="w-36 sm:w-48 pl-6 pr-3 py-1.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                type="submit"
                disabled={isQuickFetching || !quickGithubUsername.trim()}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isQuickFetching ? 'Fetching...' : 'Verify & Post'}
              </button>
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs font-semibold hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer shrink-0"
              >
                Options
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Edit Display Name Modal */}
      {isEditingName && (
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-sky-300 dark:border-cyan-500/60 shadow-md animate-fadeIn">
          <form onSubmit={handleSaveDisplayName} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
                CUSTOMIZE PUBLIC DISPLAY NAME
              </span>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="font-sans text-xs text-zinc-500">
              Choose how your name appears on your public notes:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                required
                maxLength={40}
                value={customDisplayName}
                onChange={(e) => setCustomDisplayName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-sans text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Owner Moderation Banner */}
      {isOwnerMode && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-800 dark:text-amber-300 flex items-center justify-between">
          <span>OWNER MODERATION ACTIVE · {adminNotes?.length ?? 0} TOTAL RECORDS</span>
          <span className="text-[10px] uppercase font-bold text-amber-600">PASSCODE VERIFIED</span>
        </div>
      )}

      {/* Composer Drawer (Unlocked via Auth) */}
      {isComposerOpen && currentUser && (
        <form 
          onSubmit={handleSubmitNote}
          className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-sky-300 dark:border-cyan-500/50 shadow-lg space-y-4 animate-fadeIn"
        >
          {/* Contributor Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800 gap-3">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/80 shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
                    {currentUser.name[0]}
                  </div>
                )}
                {currentUser.provider === 'github' && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-950 text-white flex items-center justify-center border border-white dark:border-zinc-900">
                    <Github className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-display text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {currentUser.name}
                  </h4>
                  {currentUser.handle && (
                    <a
                      href={currentUser.githubUrl || `https://github.com/${currentUser.handle.replace(/^@/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-sky-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>{currentUser.handle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                    VERIFIED {currentUser.provider.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5 text-zinc-500 font-mono text-[10px]">
                  <span>Reviewing Portfolio</span>
                  {currentUser.publicRepos !== undefined && currentUser.publicRepos > 0 && (
                    <>
                      <span>·</span>
                      <span>{currentUser.publicRepos} Repos</span>
                    </>
                  )}
                  {currentUser.followers !== undefined && currentUser.followers > 0 && (
                    <>
                      <span>·</span>
                      <span>{currentUser.followers} Followers</span>
                    </>
                  )}
                </div>

                {currentUser.bio && (
                  <p className="font-sans text-xs italic text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                    "{currentUser.bio}"
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsComposerOpen(false);
                setEditingNoteId(null);
              }}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer self-start sm:self-center"
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
                <option value="Just Saying Hello">Just Saying Hello</option>
                <option value="A Thought">A Thought</option>
                <option value="A Suggestion">A Suggestion</option>
                <option value="A Question">A Question</option>
                <option value="Some Appreciation">Some Appreciation</option>
                <option value="Critique & Suggestions">Critique & Suggestions (Constructive)</option>
                <option value="Portfolio Feedback">Portfolio Feedback</option>
                <option value="Collaboration Idea">Collaboration Idea</option>
                <option value="Technical Architecture">Technical Architecture</option>
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
              <span>Your Thought or Annotation (Max 400 chars)</span>
              <span className={message.length > 380 ? 'text-amber-500 font-bold' : ''}>
                {message.length} / 400
              </span>
            </div>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a thought, architecture suggestion, question, or encouragement..."
              maxLength={400}
              className="w-full p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 text-xs sm:text-sm font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-sky-500 resize-none leading-relaxed"
            />
          </div>

          {/* Live Review Preview Card on The Margins */}
          <div className="p-4 rounded-2xl bg-stone-50/80 dark:bg-zinc-800/40 border border-stone-200/80 dark:border-zinc-700/60 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-zinc-400">
              <span className="flex items-center gap-1.5 text-sky-600 dark:text-cyan-400">
                <Sparkles className="w-3 h-3" />
                <span>LIVE REVIEW PREVIEW ON THE MARGINS</span>
              </span>
              <span>{category}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/90 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-[10px]">
                  {category}
                </span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
                "{message.trim() || 'Your thought will appear here as you type...'}"
              </p>

              <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-stone-300 dark:border-zinc-700 ring-1 ring-emerald-500/30"
                  />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-[11px]">
                    {currentUser.name}
                  </span>
                  {currentUser.handle && (
                    <span className="text-zinc-400 text-[10px]">
                      {currentUser.handle}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-zinc-400">Just now</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
            <span className="font-mono text-[10px] text-zinc-400">
              Verified identity · Escaped plain text · Draft auto-saved
            </span>
            <button
              type="submit"
              disabled={isSubmitting || message.trim().length < 5}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 dark:bg-cyan-500 text-white font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSubmitting 
                  ? 'Saving...' 
                  : editingNoteId 
                    ? 'Update Note' 
                    : currentUser.handle 
                      ? `Publish Review as ${currentUser.handle}` 
                      : 'Publish to The Margins'}
              </span>
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
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-transparent font-bold shadow-2xs'
                : 'bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-stone-200/80 dark:border-zinc-800 hover:border-stone-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes Stream Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-2 p-10 sm:p-14 text-center rounded-3xl bg-white dark:bg-zinc-900/60 border border-stone-200/90 dark:border-zinc-800 font-sans space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
              <MessageSquare className="w-6 h-6 opacity-60" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                The floor is yours.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                No fake reviews or artificial comments. Authenticate with Google or GitHub to leave the first note in <span className="font-editorial italic">The Margins</span>.
              </p>
            </div>

            <div>
              <button
                onClick={handleOpenComposer}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>LEAVE YOUR MARK</span>
              </button>
            </div>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`p-5 sm:p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                note.isFeatured
                  ? 'bg-sky-50/40 dark:bg-cyan-950/20 border-sky-300 dark:border-cyan-800/80 shadow-xs'
                  : 'bg-white dark:bg-zinc-900/70 border-stone-200/80 dark:border-zinc-800/90 shadow-2xs'
              }`}
            >
              <div>
                {/* Header: Category, Rating & Status */}
                <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-lg bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase font-semibold">
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

              {/* Footer: Verified Author & Actions */}
              <div className="pt-3.5 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {note.authorAvatar ? (
                    <img
                      src={note.authorAvatar}
                      alt={note.displayName}
                      className="w-6 h-6 rounded-full object-cover shrink-0 border border-stone-300 dark:border-zinc-700 ring-1 ring-emerald-500/30"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-[10px]">
                      {note.displayName[0]}
                    </div>
                  )}

                  <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-[11px] sm:text-xs">
                      {note.displayName}
                    </span>

                    {note.authorHandle && (
                      <a
                        href={note.authorGithubUrl || `https://github.com/${note.authorHandle.replace(/^@/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        {note.authorProvider === 'github' && <Github className="w-2.5 h-2.5" />}
                        <span>{note.authorHandle}</span>
                      </a>
                    )}

                    {note.authorProvider && !note.authorHandle && (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase px-1.5 py-0.2 rounded bg-stone-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                        {note.authorProvider === 'github' ? (
                          <Github className="w-2.5 h-2.5" />
                        ) : (
                          <span className="text-blue-500 font-bold">G</span>
                        )}
                        <span className="hidden sm:inline">Verified</span>
                      </span>
                    )}

                    {note.isOwnNote && (
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold shrink-0">
                        YOU
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Appreciation Reaction */}
                  <button
                    onClick={() => handleToggleReaction(note.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${
                      note.userReacted
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 font-bold'
                        : 'text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/60 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${note.userReacted ? 'fill-current' : ''}`} />
                    <span>{note.reactionCount}</span>
                  </button>

                  {/* Actions for Own Note */}
                  {note.isOwnNote && (
                    <div className="flex items-center gap-1 pl-1 border-l border-stone-200 dark:border-zinc-800">
                      <button
                        onClick={() => handleStartEdit(note)}
                        title="Edit My Note"
                        className="p-1 text-zinc-400 hover:text-sky-600 dark:hover:text-cyan-400 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteOwnNote(note.id)}
                        title="Delete My Note"
                        className="p-1 text-zinc-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Report Inappropriate Note */}
                  {!note.isOwnNote && !isOwnerMode && (
                    <button
                      onClick={() => setReportingNoteId(note.id)}
                      title="Report Inappropriate Content"
                      className="p-1 text-zinc-300 dark:text-zinc-600 hover:text-amber-500 cursor-pointer transition-colors"
                    >
                      <Flag className="w-3 h-3" />
                    </button>
                  )}

                  {/* Owner Controls */}
                  {isOwnerMode && (
                    <div className="flex items-center gap-1 pl-2 border-l border-stone-200 dark:border-zinc-800">
                      <button
                        onClick={() => handleAdminStatusChange(note.id, note.status, !note.isFeatured)}
                        title="Toggle Featured"
                        className="p-1 text-zinc-400 hover:text-amber-500 cursor-pointer"
                      >
                        <Star className={`w-3 h-3 ${note.isFeatured ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleAdminDelete(note.id)}
                        title="Delete Note as Owner"
                        className="p-1 text-zinc-400 hover:text-rose-500 cursor-pointer"
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

      {/* Report Modal */}
      {reportingNoteId && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleReportSubmit}
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-800 p-6 shadow-2xl space-y-4 animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-500" />
                REPORT INAPPROPRIATE CONTENT
              </span>
              <button
                type="button"
                onClick={() => setReportingNoteId(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-sans text-xs text-zinc-500">
              Please specify why this note violates community guidelines:
            </p>

            <textarea
              required
              rows={3}
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Spam, abusive language, inappropriate content..."
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-sans text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReportingNoteId(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingReport || !reportReason.trim()}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-amber-700 disabled:opacity-50"
              >
                {isSubmittingReport ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      )}

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
        draft={{ message, category, rating }}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsComposerOpen(true);
          onShowToast(`✓ Signed in as ${user.name} via ${user.provider.toUpperCase()}`);
        }}
      />
    </div>
  );
};
