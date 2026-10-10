import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const processOAuthCallback = async () => {
      const supabase = getSupabase();

      if (!supabase) {
        // Fallback if accessed without Supabase configured
        setStatus('error');
        setErrorMessage('Authentication configuration missing. Returning to portfolio...');
        setTimeout(() => navigate('/'), 2000);
        return;
      }

      try {
        // Check if there is an authorization code in URL for PKCE
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        }

        // Verify active session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          if (isMounted) {
            setStatus('success');
            // Brief moment for visual feedback before seamless return
            setTimeout(() => {
              navigate('/?portal=margins&restored=true', { replace: true });
            }, 800);
          }
        } else {
          // If no session found in URL, wait a moment or redirect
          setTimeout(async () => {
            const { data: { session: retrySession } } = await supabase.auth.getSession();
            if (retrySession?.user) {
              if (isMounted) {
                setStatus('success');
                navigate('/?portal=margins&restored=true', { replace: true });
              }
            } else {
              if (isMounted) {
                setStatus('error');
                setErrorMessage('No active session found. Please try signing in again.');
              }
            }
          }, 1000);
        }
      } catch (err: any) {
        console.error('OAuth Callback processing error:', err);
        if (isMounted) {
          setStatus('error');
          setErrorMessage(err?.message || 'Failed to complete OAuth authentication.');
        }
      }
    };

    processOAuthCallback();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-cyan-500/20 selection:text-cyan-400">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/90 dark:border-zinc-800 shadow-2xl p-8 text-center space-y-6">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono text-[11px] font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
          <span>AUTHENTIC VISITOR HANDSHAKE</span>
        </div>

        {/* Dynamic State View */}
        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-cyan-950/40 border border-sky-200 dark:border-cyan-800/80 flex items-center justify-center mx-auto text-sky-600 dark:text-cyan-400">
              <span className="w-4 h-4 rounded-full border-2 border-sky-600 dark:border-cyan-400 border-t-transparent animate-spin" />
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Verifying Credentials
              </h2>
              <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Completing secure PKCE exchange with OAuth provider and restoring your workspace...
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Identity Verified
              </h2>
              <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Welcome back! Returning you straight to <span className="font-editorial italic">The Margins</span>...
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 flex items-center justify-center mx-auto text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Verification Incomplete
              </h2>
              <p className="font-sans text-xs text-rose-600 dark:text-rose-400">
                {errorMessage}
              </p>
            </div>

            <button
              onClick={() => navigate('/?portal=margins')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors shadow-xs"
            >
              <span>Return to The Margins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Telemetry Footer */}
        <div className="pt-4 border-t border-stone-100 dark:border-zinc-800/80 font-mono text-[10px] text-zinc-400">
          <span>PORTAL OS // PKCE PROTOCOL v2.0</span>
        </div>

      </div>
    </div>
  );
};
