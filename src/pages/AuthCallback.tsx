import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import { authService } from '../components/portal/authService';

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
          authService.handleSession(session);
          if (isMounted) {
            setStatus('success');
            // Brief moment for visual feedback before seamless return
            setTimeout(() => {
              navigate('/?portal=margins&restored=true', { replace: true });
            }, 600);
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
    <div className="min-h-screen bg-[#f8f6f0] dark:bg-[#131312] flex flex-col items-center justify-center p-6 text-[#1a1917] dark:text-[#f0ede5] font-sans selection:bg-[#486616]/20 selection:text-[#1a1917] dark:selection:bg-[#d5ef9c]/30 dark:selection:text-[#d5ef9c]">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dcd6c8_1px,transparent_1px),linear-gradient(to_bottom,#dcd6c8_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2d2c27_1px,transparent_1px),linear-gradient(to_bottom,#2d2c27_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] shadow-2xl p-8 text-center space-y-6">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe5] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] font-mono text-[11px] font-bold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#486616] dark:text-[#d5ef9c]" />
          <span>AUTHENTIC VISITOR HANDSHAKE</span>
        </div>

        {/* Dynamic State View */}
        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e8edd9] dark:bg-[#201f1c] border border-[#486616]/30 dark:border-[#d5ef9c]/30 flex items-center justify-center mx-auto text-[#486616] dark:text-[#d5ef9c]">
              <span className="w-4 h-4 rounded-full border-2 border-[#486616] dark:border-[#d5ef9c] border-t-transparent animate-spin" />
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
                Verifying Credentials
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f]">
                Completing secure PKCE exchange with OAuth provider and restoring your workspace...
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e8edd9] dark:bg-[#201f1c] border border-[#486616]/40 dark:border-[#d5ef9c]/40 flex items-center justify-center mx-auto text-[#486616] dark:text-[#d5ef9c]">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
                Identity Verified
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f]">
                Welcome back! Returning you straight to <span className="font-serif italic">The Margins</span>...
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
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
                Verification Incomplete
              </h2>
              <p className="font-sans text-xs text-rose-600 dark:text-rose-400">
                {errorMessage}
              </p>
            </div>

            <button
              onClick={() => navigate('/?portal=margins')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors shadow-xs"
            >
              <span>Return to The Margins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Telemetry Footer */}
        <div className="pt-4 border-t border-[#dcd6c8] dark:border-[#2d2c27] font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63]">
          <span>PORTAL OS // PKCE PROTOCOL v2.0</span>
        </div>

      </div>
    </div>
  );
};
