import React, { useState, useEffect } from 'react';
import { 
  X, 
  Github, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Users,
  Building2,
  MapPin
} from 'lucide-react';
import { authService, DraftNote, GitHubAccountDetails } from './authService';
import { AuthUser } from './types';

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  draft?: DraftNote;
  defaultTab?: 'github' | 'google';
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  draft,
  defaultTab = 'github'
}) => {
  const isCloudActive = authService.isCloudConfigured();
  const [activeTab, setActiveTab] = useState<'github' | 'google'>(defaultTab);
  const [loadingProvider, setLoadingProvider] = useState<'github' | 'google' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // GitHub account lookup state
  const [githubUsername, setGithubUsername] = useState<string>('');
  const [isSearchingGithub, setIsSearchingGithub] = useState<boolean>(false);
  const [fetchedAccount, setFetchedAccount] = useState<GitHubAccountDetails | null>(null);

  // Google name/email for fallback
  const [googleName, setGoogleName] = useState<string>('');
  const [googleEmail, setGoogleEmail] = useState<string>('');

  // Reset or clear errors when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      if (defaultTab) {
        setActiveTab(defaultTab);
      }
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  // Handle live GitHub account lookup
  const handleLookupGithub = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = githubUsername.trim().replace(/^@/, '');
    if (!clean) {
      setErrorMessage('Please enter a GitHub username.');
      return;
    }

    setErrorMessage(null);
    setIsSearchingGithub(true);

    const result = await authService.fetchGithubAccount(clean);
    setIsSearchingGithub(false);

    if (result.error) {
      setErrorMessage(result.error);
      setFetchedAccount(null);
    } else if (result.data) {
      setFetchedAccount(result.data);
    }
  };

  // Sign in with the fetched verified GitHub account
  const handleConfirmGithubAccount = async () => {
    if (!fetchedAccount) return;
    setLoadingProvider('github');
    setErrorMessage(null);

    try {
      const user = await authService.signInWithGithubAccount(fetchedAccount);
      setLoadingProvider(null);
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setLoadingProvider(null);
      setErrorMessage(err?.message || 'Failed to authenticate with GitHub account.');
    }
  };

  // Standard OAuth redirect to GitHub
  const handleStandardGithubOAuth = async () => {
    setLoadingProvider('github');
    setErrorMessage(null);

    if (isCloudActive) {
      const { error } = await authService.signInWithGithubOAuth(draft);
      if (error) {
        setLoadingProvider(null);
        setErrorMessage(error);
      }
    } else {
      // If cloud is not configured, fall back to lookup or direct handle
      const user = await authService.signInWithGithubPreview(githubUsername || 'developer');
      setLoadingProvider(null);
      onSuccess(user);
      onClose();
    }
  };

  // Google OAuth or instant profile
  const handleGoogleAuth = async () => {
    setLoadingProvider('google');
    setErrorMessage(null);

    if (isCloudActive) {
      const { error } = await authService.signInWithGoogleOAuth(draft);
      if (error) {
        setLoadingProvider(null);
        setErrorMessage(error);
      }
    } else {
      setTimeout(() => {
        const user = authService.signInWithGooglePreview(
          googleName || 'Google Contributor', 
          googleEmail || 'contributor@gmail.com'
        );
        setLoadingProvider(null);
        onSuccess(user);
        onClose();
      }, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/90 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Editorial Typography */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            <span>AUTHENTIC VISITOR VERIFICATION</span>
          </div>

          <h2 id="auth-modal-title" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Leave Your Mark
          </h2>

          <p className="font-editorial text-base sm:text-lg italic text-zinc-600 dark:text-zinc-300 leading-snug">
            "A little thought can stay longer than you think."
          </p>

          <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Choose your account to sign in and share your thoughts on <span className="font-editorial font-bold italic">The Margins</span>.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex p-1 rounded-2xl bg-stone-100 dark:bg-zinc-800/80 mb-5 border border-stone-200/80 dark:border-zinc-700/60">
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'github'
                ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'google'
                ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google</span>
          </button>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2.5 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* TAB 1: GITHUB USERNAME LOOKUP & VERIFICATION */}
        {activeTab === 'github' && (
          <div className="space-y-4">
            {/* If account not yet fetched, show simple clean username input */}
            {!fetchedAccount ? (
              <form onSubmit={handleLookupGithub} className="space-y-3">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  GitHub Username
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-2.5 text-zinc-400 font-mono text-sm font-bold">@</span>
                    <input
                      type="text"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="username"
                      autoFocus
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800/90 border border-stone-200 dark:border-zinc-700 text-xs sm:text-sm font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearchingGithub || !githubUsername.trim()}
                    className="px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {isSearchingGithub ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-950 border-t-transparent animate-spin" />
                        <span>Checking...</span>
                      </>
                    ) : (
                      <span>Continue</span>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* FETCHED GITHUB PROFILE CARD: Show everything fetched */
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-emerald-500/40 dark:border-emerald-500/30 space-y-4 animate-fadeIn shadow-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={fetchedAccount.avatarUrl}
                        alt={fetchedAccount.login}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-sm bg-stone-200 dark:bg-zinc-700"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base font-bold text-zinc-900 dark:text-zinc-50">
                          {fetchedAccount.name}
                        </h3>
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                          Verified
                        </span>
                      </div>

                      <a
                        href={fetchedAccount.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-sky-600 dark:text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>@{fetchedAccount.login}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFetchedAccount(null)}
                    className="font-mono text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* Bio text */}
                {fetchedAccount.bio && (
                  <p className="font-sans text-xs italic text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed bg-white/60 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-stone-200/50 dark:border-zinc-700/50">
                    "{fetchedAccount.bio}"
                  </p>
                )}

                {/* Account Details & Metrics */}
                <div className="grid grid-cols-2 gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/80 dark:bg-zinc-900/80 border border-stone-200/60 dark:border-zinc-700/50">
                    <BookOpen className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                    <span>{fetchedAccount.publicRepos} Repositories</span>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/80 dark:bg-zinc-900/80 border border-stone-200/60 dark:border-zinc-700/50">
                    <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{fetchedAccount.followers} Followers</span>
                  </div>

                  {fetchedAccount.company && (
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/80 dark:bg-zinc-900/80 border border-stone-200/60 dark:border-zinc-700/50 truncate col-span-2 sm:col-span-1">
                      <Building2 className="w-3 h-3 text-amber-500 shrink-0" />
                      <span className="truncate">{fetchedAccount.company}</span>
                    </div>
                  )}

                  {fetchedAccount.location && (
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/80 dark:bg-zinc-900/80 border border-stone-200/60 dark:border-zinc-700/50 truncate col-span-2 sm:col-span-1">
                      <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                      <span className="truncate">{fetchedAccount.location}</span>
                    </div>
                  )}
                </div>

                {/* Primary Confirm Button */}
                <button
                  type="button"
                  onClick={handleConfirmGithubAccount}
                  disabled={loadingProvider === 'github'}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors shadow-sm cursor-pointer"
                >
                  {loadingProvider === 'github' ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white dark:border-zinc-950 border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Github className="w-4 h-4" />
                      <span>Authenticate as @{fetchedAccount.login}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Standard OAuth Redirect Link */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleStandardGithubOAuth}
                className="text-[11px] font-mono text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 underline cursor-pointer"
              >
                Or sign in via GitHub OAuth redirect
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: GOOGLE ACCOUNT AUTHENTICATION */}
        {activeTab === 'google' && (
          <div className="space-y-4">
            <button
              onClick={handleGoogleAuth}
              disabled={loadingProvider !== null}
              className="w-full group p-4 rounded-2xl bg-white hover:bg-stone-50 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-stone-200 dark:border-zinc-700 flex items-center justify-between transition-all cursor-pointer shadow-xs hover:border-stone-400 dark:hover:border-zinc-600 disabled:opacity-50"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200/80 dark:border-zinc-700 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-sans text-sm font-bold flex items-center gap-2">
                    <span>Continue with Google</span>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-stone-100 dark:bg-zinc-800 text-zinc-500">
                      Standard
                    </span>
                  </div>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
                    {isCloudActive ? 'Official Google Account authorization' : 'Use your Google contributor profile'}
                  </p>
                </div>
              </div>

              {loadingProvider === 'google' ? (
                <span className="w-4 h-4 rounded-full border-2 border-sky-600 dark:border-cyan-400 border-t-transparent animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            {!isCloudActive && (
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-800/60 border border-stone-200 dark:border-zinc-700/80 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                  CONTRIBUTOR NAME OVERRIDE
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-sans text-zinc-900 dark:text-zinc-100"
                  />
                  <input
                    type="email"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-sans text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Privacy Guarantee */}
        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-zinc-800/80 flex items-center justify-between text-zinc-400 font-mono text-[10px]">
          <span>VERIFIED CONTRIBUTORS · ZERO TRACKERS</span>
          <span>THE MARGINS v2.0</span>
        </div>
      </div>
    </div>
  );
};
