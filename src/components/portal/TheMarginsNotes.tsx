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

  // Auth modal preferred tab
  const [authDefaultTab, setAuthDefaultTab] = useState<'github' | 'google'>('github');

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

  const handleGoogleSignIn = async () => {
    const { error } = await authService.signInWithGoogleOAuth({ message, category, rating });
    if (error) {
      console.error('Google Sign In error:', error);
      onShowToast(`⚠️ ${error}`);
      setAuthDefaultTab('google');
      setIsAuthModalOpen(true);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27] gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {!isOwnerMode ? (
            <button
              onClick={() => setIsPasscodeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>OWNER</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase bg-[#e8edd9] text-[#486616] dark:bg-[#201f1c] dark:text-[#d5ef9c] border border-[#486616]/30 dark:border-[#d5ef9c]/30">
              MODERATOR ACTIVE
            </span>
          )}

          {/* User Auth Status / Leave Your Mark Button */}
          {!currentUser ? (
            <button
              onClick={handleOpenComposer}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LEAVE YOUR MARK</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Authenticated Identity Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] font-mono text-xs">
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-[#dcd6c8] dark:border-[#383731]"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#486616] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] flex items-center justify-center text-[10px] font-bold">
                    {currentUser.name[0]}
                  </div>
                )}
                
                <span className="font-semibold text-[#1a1917] dark:text-[#f0ede5] max-w-[120px] truncate">
                  {currentUser.name}
                </span>

                {currentUser.handle && (
                  <a
                    href={currentUser.githubUrl || `https://github.com/${currentUser.handle.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] font-mono text-[10px] flex items-center gap-0.5"
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
                  className="text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] cursor-pointer ml-1"
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
                  className="text-[#8c877b] hover:text-rose-500 cursor-pointer ml-1"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleOpenComposer}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors cursor-pointer shadow-xs"
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
        <div className="flex items-center gap-2 font-mono text-xs text-[#486616] dark:text-[#d5ef9c] font-semibold uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>THE MARGINS // DIGITAL GUESTBOOK</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
          Leave a little piece of yourself here.
        </h2>
        <p className="font-serif text-lg italic text-[#58554d] dark:text-[#a8a69f] max-w-xl leading-relaxed">
          "A little thought can stay longer than you think."
        </p>
        <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] max-w-2xl leading-relaxed">
          An authentic public journal powered by GitHub & Google authentication. Sign in to leave a thought, architectural critique, feedback, or say hello.
        </p>

        {/* Clean Sign-in Box for Unauthenticated Visitors */}
        {!currentUser && (
          <div className="mt-4 p-4 sm:p-5 rounded-3xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 backdrop-blur-md border border-[#dcd6c8] dark:border-[#2d2c27] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <span className="font-mono text-xs text-[#8c877b] dark:text-[#a8a69f] font-semibold uppercase tracking-wider text-center sm:text-left">
              Share Your Thoughts:
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {/* Sign in with GitHub button */}
              <button
                type="button"
                onClick={() => {
                  setAuthDefaultTab('github');
                  setIsAuthModalOpen(true);
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#f4efe5] hover:bg-[#eeeae0] dark:bg-[#201f1c] dark:hover:bg-[#262521] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] font-sans text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:border-[#486616]/40 dark:hover:border-[#d5ef9c]/40"
              >
                <Github className="w-4 h-4 shrink-0 text-[#1a1917] dark:text-[#f0ede5]" />
                <span className="font-semibold">Sign in with GitHub</span>
              </button>

              {/* Sign in with Google button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#f4efe5] hover:bg-[#eeeae0] dark:bg-[#201f1c] dark:hover:bg-[#262521] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] font-sans text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:border-[#486616]/40 dark:hover:border-[#d5ef9c]/40"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="font-semibold">Sign in with Google</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Display Name Modal */}
      {isEditingName && (
        <div className="p-4 rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#486616]/40 dark:border-[#d5ef9c]/40 shadow-md animate-fadeIn">
          <form onSubmit={handleSaveDisplayName} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-wider">
                CUSTOMIZE PUBLIC DISPLAY NAME
              </span>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f]">
              Choose how your name appears on your public notes:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                required
                maxLength={40}
                value={customDisplayName}
                onChange={(e) => setCustomDisplayName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] text-xs font-sans text-[#1a1917] dark:text-[#f0ede5] focus:outline-none focus:border-[#486616] dark:focus:border-[#d5ef9c]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Owner Moderation Banner */}
      {isOwnerMode && (
        <div className="p-3.5 rounded-xl bg-[#e8edd9] dark:bg-[#201f1c] border border-[#486616]/30 dark:border-[#d5ef9c]/30 text-xs font-mono text-[#486616] dark:text-[#d5ef9c] flex items-center justify-between">
          <span>OWNER MODERATION ACTIVE · {adminNotes?.length ?? 0} TOTAL RECORDS</span>
          <span className="text-[10px] uppercase font-bold text-[#486616] dark:text-[#d5ef9c]">PASSCODE VERIFIED</span>
        </div>
      )}

      {/* Composer Drawer (Unlocked via Auth) */}
      {isComposerOpen && currentUser && (
        <form 
          onSubmit={handleSubmitNote}
          className="p-5 sm:p-6 rounded-3xl bg-[#eeeae0]/90 dark:bg-[#1a1917]/95 border border-[#486616]/40 dark:border-[#d5ef9c]/40 shadow-lg space-y-4 animate-fadeIn"
        >
          {/* Contributor Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#dcd6c8] dark:border-[#2d2c27] gap-3">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#486616] dark:ring-[#d5ef9c] shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-[#486616] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] flex items-center justify-center font-bold text-sm">
                    {currentUser.name[0]}
                  </div>
                )}
                {currentUser.provider === 'github' && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] flex items-center justify-center border border-[#f8f6f0] dark:border-[#131312]">
                    <Github className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#1a1917] dark:text-[#f0ede5]">
                    {currentUser.name}
                  </h4>
                  {currentUser.handle && (
                    <a
                      href={currentUser.githubUrl || `https://github.com/${currentUser.handle.replace(/^@/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#486616] dark:text-[#d5ef9c] hover:underline flex items-center gap-1"
                    >
                      <span>{currentUser.handle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#e8edd9] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] font-bold border border-[#486616]/30 dark:border-[#d5ef9c]/30">
                    VERIFIED {currentUser.provider.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5 text-[#8c877b] dark:text-[#6e6b63] font-mono text-[10px]">
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
                  <p className="font-sans text-xs italic text-[#58554d] dark:text-[#a8a69f] mt-1 line-clamp-1">
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
              className="text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] cursor-pointer self-start sm:self-center"
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
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#8c877b] dark:text-[#a8a69f] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NoteCategory)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] text-xs font-sans text-[#1a1917] dark:text-[#f0ede5] focus:outline-none focus:border-[#486616] dark:focus:border-[#d5ef9c]"
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
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#8c877b] dark:text-[#a8a69f] mb-1">
                Portfolio Craftsmanship Rating
              </label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    className="p-1 text-[#bfb8a6] dark:text-[#494841] hover:text-[#8c6b12] dark:hover:text-[#f3d47c] transition-colors cursor-pointer"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        starVal <= rating ? 'fill-[#8c6b12] text-[#8c6b12] dark:fill-[#f3d47c] dark:text-[#f3d47c]' : 'text-[#bfb8a6] dark:text-[#494841]'
                      }`} 
                    />
                  </button>
                ))}
                <span className="font-mono text-xs font-bold text-[#8c6b12] dark:text-[#f3d47c] ml-2">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#8c877b] dark:text-[#6e6b63] mb-1">
              <span>Your Thought or Annotation (Max 400 chars)</span>
              <span className={message.length > 380 ? 'text-[#8c6b12] dark:text-[#f3d47c] font-bold' : ''}>
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
              className="w-full p-3.5 rounded-xl bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] text-xs sm:text-sm font-sans text-[#1a1917] dark:text-[#f0ede5] placeholder-[#8c877b] dark:placeholder-[#6e6b63] focus:outline-none focus:border-[#486616] dark:focus:border-[#d5ef9c] resize-none leading-relaxed"
            />
          </div>

          {/* Live Review Preview Card on The Margins */}
          <div className="p-4 rounded-2xl bg-[#f4efe5]/80 dark:bg-[#201f1c]/80 border border-[#dcd6c8] dark:border-[#383731] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-[#8c877b] dark:text-[#6e6b63]">
              <span className="flex items-center gap-1.5 text-[#486616] dark:text-[#d5ef9c]">
                <Sparkles className="w-3 h-3" />
                <span>LIVE REVIEW PREVIEW ON THE MARGINS</span>
              </span>
              <span>{category}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] shadow-2xs space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-semibold text-[10px] border border-[#dcd6c8] dark:border-[#383731]">
                  {category}
                </span>
                <div className="flex items-center gap-0.5 text-[#8c6b12] dark:text-[#f3d47c]">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current text-current" />
                  ))}
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#1a1917] dark:text-[#f0ede5] italic leading-relaxed">
                "{message.trim() || 'Your thought will appear here as you type...'}"
              </p>

              <div className="pt-2 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-[#dcd6c8] dark:border-[#383731] ring-1 ring-[#486616]/30 dark:ring-[#d5ef9c]/30"
                  />
                  <span className="font-semibold text-[#1a1917] dark:text-[#f0ede5] text-[11px]">
                    {currentUser.name}
                  </span>
                  {currentUser.handle && (
                    <span className="text-[#8c877b] dark:text-[#6e6b63] text-[10px]">
                      {currentUser.handle}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#8c877b] dark:text-[#6e6b63]">Just now</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
            <span className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63]">
              Verified identity · Escaped plain text · Draft auto-saved
            </span>
            <button
              type="submit"
              disabled={isSubmitting || message.trim().length < 5}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] disabled:opacity-50 transition-all cursor-pointer shadow-xs"
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
                ? 'bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] border-transparent font-bold shadow-2xs'
                : 'bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 text-[#58554d] dark:text-[#a8a69f] border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#486616]/40 dark:hover:border-[#d5ef9c]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes Stream Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-2 p-10 sm:p-14 text-center rounded-3xl bg-[#eeeae0]/70 dark:bg-[#1a1917]/70 border border-[#dcd6c8] dark:border-[#2d2c27] font-sans space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] flex items-center justify-center mx-auto text-[#8c877b] dark:text-[#a8a69f]">
              <MessageSquare className="w-6 h-6 opacity-60" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#1a1917] dark:text-[#f0ede5]">
                The floor is yours.
              </h3>
              <p className="text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                No fake reviews or artificial comments. Authenticate with Google or GitHub to leave the first note in <span className="font-serif italic">The Margins</span>.
              </p>
            </div>

            <div>
              <button
                onClick={handleOpenComposer}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors cursor-pointer shadow-xs"
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
                  ? 'bg-[#e8edd9]/30 dark:bg-[#201f1c] border-[#486616]/40 dark:border-[#d5ef9c]/40 shadow-xs'
                  : 'bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border-[#dcd6c8] dark:border-[#2d2c27] shadow-2xs'
              }`}
            >
              <div>
                {/* Header: Category, Rating & Status */}
                <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] uppercase font-semibold border border-[#dcd6c8] dark:border-[#383731]">
                    {note.category}
                  </span>

                  <div className="flex items-center gap-2 text-[#8c877b] dark:text-[#6e6b63]">
                    {note.rating && (
                      <div className="flex items-center gap-0.5 text-[#8c6b12] dark:text-[#f3d47c]">
                        {Array.from({ length: note.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current text-current" />
                        ))}
                      </div>
                    )}
                    {note.isFeatured && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#486616] dark:text-[#d5ef9c] font-bold">
                        <Sparkles className="w-3 h-3" />
                        FEATURED
                      </span>
                    )}
                    <span>{formatNoteDate(note.createdAt)}</span>
                  </div>
                </div>

                {/* Message Body */}
                <p className="font-sans text-xs sm:text-sm text-[#1a1917] dark:text-[#f0ede5] leading-relaxed text-pretty mb-4">
                  "{note.message}"
                </p>
              </div>

              {/* Footer: Verified Author & Actions */}
              <div className="pt-3.5 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {note.authorAvatar ? (
                    <img
                      src={note.authorAvatar}
                      alt={note.displayName}
                      className="w-6 h-6 rounded-full object-cover shrink-0 border border-[#dcd6c8] dark:border-[#383731] ring-1 ring-[#486616]/30 dark:ring-[#d5ef9c]/30"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] flex items-center justify-center shrink-0 text-[10px]">
                      {note.displayName[0]}
                    </div>
                  )}

                  <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-[#1a1917] dark:text-[#f0ede5] truncate text-[11px] sm:text-xs">
                      {note.displayName}
                    </span>

                    {note.authorHandle && (
                      <a
                        href={note.authorGithubUrl || `https://github.com/${note.authorHandle.replace(/^@/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
                      >
                        {note.authorProvider === 'github' && <Github className="w-2.5 h-2.5" />}
                        <span>{note.authorHandle}</span>
                      </a>
                    )}

                    {note.authorProvider && !note.authorHandle && (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#f4efe5] dark:bg-[#201f1c] text-[#8c877b] dark:text-[#a8a69f] border border-[#dcd6c8] dark:border-[#383731] shrink-0">
                        {note.authorProvider === 'github' ? (
                          <Github className="w-2.5 h-2.5" />
                        ) : (
                          <span className="text-blue-500 font-bold">G</span>
                        )}
                        <span className="hidden sm:inline">Verified</span>
                      </span>
                    )}

                    {note.isOwnNote && (
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#e8edd9] text-[#486616] dark:bg-[#201f1c] dark:text-[#d5ef9c] font-bold border border-[#486616]/30 dark:border-[#d5ef9c]/30 shrink-0">
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
                        : 'text-[#8c877b] hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/60 dark:hover:bg-[#201f1c]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${note.userReacted ? 'fill-current' : ''}`} />
                    <span>{note.reactionCount}</span>
                  </button>

                  {/* Actions for Own Note */}
                  {note.isOwnNote && (
                    <div className="flex items-center gap-1 pl-1 border-l border-[#dcd6c8] dark:border-[#2d2c27]">
                      <button
                        onClick={() => handleStartEdit(note)}
                        title="Edit My Note"
                        className="p-1 text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteOwnNote(note.id)}
                        title="Delete My Note"
                        className="p-1 text-[#8c877b] hover:text-rose-500 cursor-pointer"
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
                      className="p-1 text-[#bfb8a6] dark:text-[#494841] hover:text-amber-500 cursor-pointer transition-colors"
                    >
                      <Flag className="w-3 h-3" />
                    </button>
                  )}

                  {/* Owner Controls */}
                  {isOwnerMode && (
                    <div className="flex items-center gap-1 pl-2 border-l border-[#dcd6c8] dark:border-[#2d2c27]">
                      <button
                        onClick={() => handleAdminStatusChange(note.id, note.status, !note.isFeatured)}
                        title="Toggle Featured"
                        className="p-1 text-[#8c877b] hover:text-amber-500 cursor-pointer"
                      >
                        <Star className={`w-3 h-3 ${note.isFeatured ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleAdminDelete(note.id)}
                        title="Delete Note as Owner"
                        className="p-1 text-[#8c877b] hover:text-rose-500 cursor-pointer"
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
            className="w-full max-w-sm rounded-2xl bg-[#f8f6f0] dark:bg-[#131312] border border-[#dcd6c8] dark:border-[#2d2c27] p-6 shadow-2xl space-y-4 animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5] flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-500" />
                REPORT INAPPROPRIATE CONTENT
              </span>
              <button
                type="button"
                onClick={() => setReportingNoteId(null)}
                className="text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f]">
              Please specify why this note violates community guidelines:
            </p>

            <textarea
              required
              rows={3}
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Spam, abusive language, inappropriate content..."
              className="w-full p-3 rounded-xl bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] text-xs font-sans text-[#1a1917] dark:text-[#f0ede5] focus:outline-none focus:border-amber-500 resize-none"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReportingNoteId(null)}
                className="px-4 py-2 rounded-xl border border-[#dcd6c8] dark:border-[#383731] text-xs font-mono text-[#58554d] dark:text-[#a8a69f]"
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
            className="w-full max-w-sm rounded-2xl bg-[#f8f6f0] dark:bg-[#131312] border border-[#dcd6c8] dark:border-[#2d2c27] p-6 shadow-2xl space-y-4 animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
                OWNER AUTHENTICATION
              </span>
              <button
                type="button"
                onClick={() => setIsPasscodeModalOpen(false)}
                className="text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f]">
              Enter the portfolio owner passcode to moderate visitor thoughts, feature selected entries, or remove spam.
            </p>

            <input
              type="password"
              required
              autoFocus
              value={ownerPasscode}
              onChange={(e) => setOwnerPasscode(e.target.value)}
              placeholder="Enter passcode (e.g. srinjoy2026)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] text-xs font-mono text-[#1a1917] dark:text-[#f0ede5] focus:outline-none focus:border-[#486616] dark:focus:border-[#d5ef9c]"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors cursor-pointer"
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
        defaultTab={authDefaultTab}
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
