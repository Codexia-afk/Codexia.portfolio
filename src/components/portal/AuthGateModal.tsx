import React, { useState } from 'react';
import { 
  X, 
  Github, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle
} from 'lucide-react';
import { authService, DraftNote } from './authService';
import { AuthUser } from './types';

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  draft?: DraftNote;
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  draft
}) => {
  const isCloudActive = authService.isCloudConfigured();
  const [loadingProvider, setLoadingProvider] = useState<'github' | 'google' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Developer preview direct state
  const [showPreviewForm, setShowPreviewForm] = useState<boolean>(!isCloudActive);
  const [githubUsername, setGithubUsername] = useState<string>('');
  const [isVerifyingGithub, setIsVerifyingGithub] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGoogleOAuth = async () => {
    setLoadingProvider('google');
    setErrorMessage(null);

    if (isCloudActive) {
      const { error } = await authService.signInWithGoogleOAuth(draft);
      if (error) {
        setLoadingProvider(null);
        setErrorMessage(error);
      }
    } else {
      // Direct instant verification when credentials are pending in .env
      setTimeout(() => {
        const user = authService.signInWithGooglePreview('Google Contributor', 'contributor@gmail.com');
        setLoadingProvider(null);
        onSuccess(user);
        onClose();
      }, 500);
    }
  };

  const handleGithubOAuth = async () => {
    setLoadingProvider('github');
    setErrorMessage(null);

    if (isCloudActive) {
      const { error } = await authService.signInWithGithubOAuth(draft);
      if (error) {
        setLoadingProvider(null);
        setErrorMessage(error);
      }
    } else {
      // Direct instant verification when credentials are pending in .env
      setIsVerifyingGithub(true);
      try {
        const user = await authService.signInWithGithubPreview(githubUsername || 'developer');
        setIsVerifyingGithub(false);
        setLoadingProvider(null);
        onSuccess(user);
        onClose();
      } catch (err: any) {
        setIsVerifyingGithub(false);
        setLoadingProvider(null);
        setErrorMessage(err?.message || 'Failed to authenticate via GitHub.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/90 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Editorial Typography */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            <span>AUTHENTIC VISITOR ACCESS</span>
          </div>

          <h2 id="auth-modal-title" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Leave Your Mark
          </h2>

          <p className="font-editorial text-base sm:text-lg italic text-zinc-600 dark:text-zinc-300 leading-snug">
            "A little thought can stay longer than you think."
          </p>

          <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            To prevent artificial spam and ensure all impressions on <span className="font-editorial font-bold italic">The Margins</span> are genuine, authenticate with your GitHub or Google account.
          </p>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2.5 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Primary OAuth Provider Buttons */}
        <div className="space-y-3">
          {/* Mode 1: GitHub */}
          <button
            onClick={handleGithubOAuth}
            disabled={loadingProvider !== null}
            className="w-full group p-4 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-zinc-800 dark:border-zinc-700 flex items-center justify-between transition-all cursor-pointer shadow-xs hover:border-zinc-600 disabled:opacity-50"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-700 flex items-center justify-center shrink-0 border border-zinc-700/60">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-sans text-sm font-bold flex items-center gap-2">
                  <span>Continue with GitHub</span>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                    Developer
                  </span>
                </div>
                <p className="font-sans text-xs text-zinc-400">
                  {isCloudActive ? 'Direct OAuth redirect to GitHub' : 'Use your public GitHub identity'}
                </p>
              </div>
            </div>

            {loadingProvider === 'github' ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            )}
          </button>

          {/* Mode 2: Google */}
          <button
            onClick={handleGoogleOAuth}
            disabled={loadingProvider !== null}
            className="w-full group p-4 rounded-2xl bg-white hover:bg-stone-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 border border-stone-200 dark:border-zinc-700 flex items-center justify-between transition-all cursor-pointer shadow-xs hover:border-stone-400 dark:hover:border-zinc-600 disabled:opacity-50"
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
                  {isCloudActive ? 'Official Google Account authorization' : 'Use your Google Account profile'}
                </p>
              </div>
            </div>

            {loadingProvider === 'google' ? (
              <span className="w-4 h-4 rounded-full border-2 border-sky-600 dark:border-cyan-400 border-t-transparent animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>

        {/* Developer Custom Profile Override (Visible in preview mode) */}
        {!isCloudActive && (
          <div className="mt-5 p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-800/60 border border-stone-200 dark:border-zinc-700/80 space-y-3">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                LOCAL PREVIEW MODE ACTIVE
              </span>
              <button
                type="button"
                onClick={() => setShowPreviewForm(!showPreviewForm)}
                className="font-mono text-[10px] text-sky-600 dark:text-cyan-400 underline cursor-pointer"
              >
                {showPreviewForm ? 'Hide Details' : 'Configure Handle'}
              </button>
            </div>

            {showPreviewForm && (
              <div className="space-y-2 pt-1 border-t border-stone-200/60 dark:border-zinc-700/60 text-xs">
                <p className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400">
                  Supabase keys (<code className="font-mono text-[10px] text-sky-600">VITE_SUPABASE_URL</code>) can be placed in <code className="font-mono text-[10px]">.env</code> for live cloud OAuth. You can enter your GitHub handle below to preview with your live GitHub avatar:
                </p>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-2 font-mono text-xs text-zinc-400">@</span>
                    <input
                      type="text"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="github-username"
                      className="w-full pl-6 pr-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-mono text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <button
                    onClick={handleGithubOAuth}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono text-[11px] font-bold cursor-pointer"
                  >
                    {isVerifyingGithub ? 'Loading...' : 'Sign In'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Privacy Guarantee */}
        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-zinc-800/80 flex items-center justify-between text-zinc-400 font-mono text-[10px]">
          <span>PKCE SECURE · ZERO TRACKERS</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>PRIVACY PRESERVED</span>
        </div>

      </div>
    </div>
  );
};
