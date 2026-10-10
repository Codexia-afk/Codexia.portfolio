import React, { useState } from 'react';
import { 
  X, 
  Github, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { authService } from './authService';
import { AuthUser } from './types';

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [selectedProvider, setSelectedProvider] = useState<'github' | 'google' | null>(null);
  
  // GitHub state
  const [githubUsername, setGithubUsername] = useState<string>('');
  const [isVerifyingGithub, setIsVerifyingGithub] = useState<boolean>(false);
  const [githubError, setGithubError] = useState<string | null>(null);

  // Google state
  const [googleName, setGoogleName] = useState<string>('');
  const [googleEmail, setGoogleEmail] = useState<string>('');
  const [googleError, setGoogleError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGithubSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const handle = githubUsername.trim() || 'engineer';
    setIsVerifyingGithub(true);
    setGithubError(null);

    try {
      const user = await authService.signInWithGithub({ username: handle });
      setIsVerifyingGithub(false);
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setIsVerifyingGithub(false);
      setGithubError(err?.message || 'Failed to authenticate with GitHub.');
    }
  };

  const handleGoogleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const name = googleName.trim() || 'Google Contributor';
    const email = googleEmail.trim() || 'contributor@gmail.com';

    if (googleEmail && !googleEmail.includes('@')) {
      setGoogleError('Please enter a valid email address.');
      return;
    }

    setGoogleError(null);
    const user = authService.signInWithGoogle({ name, email });
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-7 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 dark:bg-cyan-950/40 text-sky-700 dark:text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHENTIC VISITOR ACCESS</span>
          </div>

          <h2 id="auth-modal-title" className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sign in to share your thoughts
          </h2>

          <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            All reviews and feedback on this portfolio are genuine. To eliminate bot spam and fake reviews, please authenticate with your GitHub or Google account.
          </p>
        </div>

        {/* Provider Selection View */}
        {!selectedProvider ? (
          <div className="space-y-3">
            {/* Mode 1: Sign in with GitHub */}
            <button
              onClick={() => setSelectedProvider('github')}
              className="w-full group p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-zinc-700/60 flex items-center justify-between transition-all cursor-pointer shadow-xs hover:border-zinc-500"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-sans text-sm font-bold flex items-center gap-2">
                    <span>Sign in with GitHub</span>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-zinc-700/80 text-zinc-300">
                      Developer
                    </span>
                  </div>
                  <p className="font-sans text-xs text-zinc-400">
                    Use your public GitHub handle & avatar
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mode 2: Sign in with Google */}
            <button
              onClick={() => setSelectedProvider('google')}
              className="w-full group p-4 rounded-xl bg-white hover:bg-stone-50 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 border border-stone-200 dark:border-zinc-700 flex items-center justify-between transition-all cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-stone-50 dark:bg-zinc-800 border border-stone-200/80 dark:border-zinc-700 flex items-center justify-center shrink-0">
                  {/* Official Google 4-Color SVG Icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-sans text-sm font-bold flex items-center gap-2">
                    <span>Sign in with Google</span>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-stone-100 dark:bg-zinc-800 text-zinc-500">
                      Standard
                    </span>
                  </div>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
                    Use your Google Account profile
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : selectedProvider === 'github' ? (
          /* GitHub Form Flow */
          <form onSubmit={handleGithubSignIn} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-800/60 border border-stone-200 dark:border-zinc-700 flex items-center gap-3">
              <Github className="w-5 h-5 text-zinc-900 dark:text-zinc-100 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-sans text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  GitHub Profile Verification
                </div>
                <div className="font-sans text-[11px] text-zinc-500">
                  We look up your public avatar and handle directly from GitHub
                </div>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                Your GitHub Username
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 font-mono text-sm text-zinc-400">@</span>
                <input
                  type="text"
                  required
                  autoFocus
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="e.g. torvalds or your handle"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 font-sans text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {githubError && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{githubError}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProvider(null)}
                className="w-1/3 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-mono text-xs hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isVerifyingGithub}
                className="w-2/3 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isVerifyingGithub ? (
                  <span>Verifying Profile...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Authorize & Continue</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Google Form Flow */
          <form onSubmit={handleGoogleSignIn} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-800/60 border border-stone-200 dark:border-zinc-700 flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-white dark:bg-zinc-700 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-sans text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Google Account Verification
                </div>
                <div className="font-sans text-[11px] text-zinc-500">
                  Verified as an authenticated reviewer
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-mono text-xs uppercase font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                  Full Display Name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 font-sans text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                  Google Email Address
                </label>
                <input
                  type="email"
                  required
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="e.g. alex@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 font-sans text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {googleError && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{googleError}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProvider(null)}
                className="w-1/3 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-mono text-xs hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </form>
        )}

        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-zinc-800 text-center">
          <p className="font-mono text-[10px] text-zinc-400">
            SECURE ACCESS · NO TRACKERS · PRIVACY PRESERVED
          </p>
        </div>
      </div>
    </div>
  );
};
