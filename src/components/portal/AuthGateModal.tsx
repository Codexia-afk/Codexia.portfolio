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
        className="w-full max-w-lg rounded-3xl bg-[#f8f6f0] dark:bg-[#131312] border border-[#dcd6c8] dark:border-[#2d2c27] shadow-2xl p-6 sm:p-8 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#486616]/10 dark:bg-[#d5ef9c]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] hover:bg-[#eeeae0] dark:hover:bg-[#1a1917] transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Editorial Typography */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#eeeae0] dark:bg-[#1a1917] text-[#486616] dark:text-[#d5ef9c] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#2d2c27]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#486616] dark:text-[#d5ef9c]" />
            <span>AUTHENTIC VISITOR VERIFICATION</span>
          </div>

          <h2 id="auth-modal-title" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
            Leave Your Mark
          </h2>

          <p className="font-serif text-base sm:text-lg italic text-[#58554d] dark:text-[#a8a69f] leading-snug">
            "A little thought can stay longer than you think."
          </p>

          <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-1 leading-relaxed">
            Choose your account to sign in and share your thoughts on <span className="font-serif font-bold italic">The Margins</span>.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex p-1 rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] mb-5 border border-[#dcd6c8] dark:border-[#2d2c27]">
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'github'
                ? 'bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] shadow-xs'
                : 'text-[#58554d] dark:text-[#a8a69f] hover:text-[#1a1917] dark:hover:text-[#f0ede5]'
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
                ? 'bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] shadow-xs'
                : 'text-[#58554d] dark:text-[#a8a69f] hover:text-[#1a1917] dark:hover:text-[#f0ede5]'
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
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#8c877b] dark:text-[#a8a69f]">
                  GitHub Username
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-2.5 text-[#8c877b] font-mono text-sm font-bold">@</span>
                    <input
                      type="text"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="username"
                      autoFocus
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#f4efe5] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] text-xs sm:text-sm font-mono text-[#1a1917] dark:text-[#f0ede5] focus:outline-none focus:border-[#486616] dark:focus:border-[#d5ef9c] focus:ring-1 focus:ring-[#486616]/30 dark:focus:ring-[#d5ef9c]/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearchingGithub || !githubUsername.trim()}
                    className="px-5 py-2.5 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {isSearchingGithub ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#131312] border-t-transparent animate-spin" />
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
              <div className="p-4 sm:p-5 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#486616]/40 dark:border-[#d5ef9c]/40 space-y-4 animate-fadeIn shadow-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={fetchedAccount.avatarUrl}
                        alt={fetchedAccount.login}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#486616] dark:ring-[#d5ef9c] shadow-sm bg-[#dcd6c8] dark:bg-[#201f1c]"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#486616] dark:bg-[#d5ef9c] border-2 border-[#f8f6f0] dark:border-[#131312] flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-[#f8f6f0] dark:text-[#131312]" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base font-bold text-[#1a1917] dark:text-[#f0ede5]">
                          {fetchedAccount.name}
                        </h3>
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#e8edd9] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] font-bold border border-[#486616]/30 dark:border-[#d5ef9c]/30">
                          Verified
                        </span>
                      </div>

                      <a
                        href={fetchedAccount.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[#486616] dark:text-[#d5ef9c] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>@{fetchedAccount.login}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFetchedAccount(null)}
                    className="font-mono text-[10px] text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* Bio text */}
                {fetchedAccount.bio && (
                  <p className="font-sans text-xs italic text-[#58554d] dark:text-[#a8a69f] line-clamp-2 leading-relaxed bg-[#f8f6f0]/80 dark:bg-[#131312]/80 p-2.5 rounded-xl border border-[#dcd6c8]/60 dark:border-[#2d2c27]/60">
                    "{fetchedAccount.bio}"
                  </p>
                )}

                {/* Account Details & Metrics */}
                <div className="grid grid-cols-2 gap-2 text-[#58554d] dark:text-[#a8a69f] font-mono text-[11px]">
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731]">
                    <BookOpen className="w-3 h-3 text-[#486616] dark:text-[#d5ef9c]" />
                    <span>{fetchedAccount.publicRepos} Repositories</span>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731]">
                    <Users className="w-3 h-3 text-[#486616] dark:text-[#d5ef9c]" />
                    <span>{fetchedAccount.followers} Followers</span>
                  </div>

                  {fetchedAccount.company && (
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] truncate col-span-2 sm:col-span-1">
                      <Building2 className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="truncate">{fetchedAccount.company}</span>
                    </div>
                  )}

                  {fetchedAccount.location && (
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] truncate col-span-2 sm:col-span-1">
                      <MapPin className="w-3 h-3 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span className="truncate">{fetchedAccount.location}</span>
                    </div>
                  )}
                </div>

                {/* Primary Confirm Button */}
                <button
                  type="button"
                  onClick={handleConfirmGithubAccount}
                  disabled={loadingProvider === 'github'}
                  className="w-full py-3 px-4 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors shadow-sm cursor-pointer"
                >
                  {loadingProvider === 'github' ? (
                    <span className="w-4 h-4 rounded-full border-2 border-[#f8f6f0] dark:border-[#131312] border-t-transparent animate-spin" />
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
                className="text-[11px] font-mono text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] underline cursor-pointer"
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
              className="w-full group p-4 rounded-2xl bg-[#eeeae0] hover:bg-[#f4efe5] dark:bg-[#1a1917] dark:hover:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#2d2c27] backdrop-blur-sm flex items-center justify-between transition-all cursor-pointer shadow-xs hover:border-[#486616]/40 dark:hover:border-[#d5ef9c]/40 disabled:opacity-50"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] flex items-center justify-center shrink-0">
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
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#f8f6f0] dark:bg-[#201f1c] text-[#8c877b] dark:text-[#a8a69f] border border-[#dcd6c8] dark:border-[#383731]">
                      Standard
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f]">
                    {isCloudActive ? 'Official Google Account authorization' : 'Use your Google contributor profile'}
                  </p>
                </div>
              </div>

              {loadingProvider === 'google' ? (
                <span className="w-4 h-4 rounded-full border-2 border-[#486616] dark:border-[#d5ef9c] border-t-transparent animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#8c877b] group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            {!isCloudActive && (
              <div className="p-3.5 rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#486616] dark:text-[#d5ef9c] block">
                  CONTRIBUTOR NAME OVERRIDE
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#2d2c27] text-xs font-sans text-[#1a1917] dark:text-[#f0ede5] focus:outline-none focus:border-[#486616] dark:focus:border-[#d5ef9c]"
                  />
                  <input
                    type="email"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#2d2c27] text-xs font-sans text-[#1a1917] dark:text-[#f0ede5] focus:outline-none focus:border-[#486616] dark:focus:border-[#d5ef9c]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Privacy Guarantee */}
        <div className="mt-6 pt-4 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between text-[#8c877b] dark:text-[#6e6b63] font-mono text-[10px]">
          <span>VERIFIED CONTRIBUTORS · ZERO TRACKERS</span>
          <span>THE MARGINS v2.0</span>
        </div>
      </div>
    </div>
  );
};
