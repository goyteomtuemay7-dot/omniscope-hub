import React from 'react';
import { LogIn, UserPlus, LogOut, User, Sparkles, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import type { UserProfile } from '../types';

interface AuthBarSectionProps {
  user: UserProfile | null;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onSignOut: () => void;
  onOpenSubscription: () => void;
}

export const AuthBarSection: React.FC<AuthBarSectionProps> = ({
  user,
  onOpenSignIn,
  onOpenSignUp,
  onSignOut,
  onOpenSubscription
}) => {
  const isSubscribed = user?.subscriptionStatus === 'active';

  return (
    <div id="auth-section" className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        {user ? (
          /* AUTHENTICATED STATE */
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* User Profile */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-base shadow-xs shrink-0">
                {user.displayName ? (
                  user.displayName.charAt(0).toUpperCase()
                ) : (
                  <User className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {user.displayName || 'OmniScope Member'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                    SSO Synced
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Subscription Status & Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
              {isSubscribed ? (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Premium Active (All Apps Unlocked)</span>
                </div>
              ) : (
                <button
                  onClick={onOpenSubscription}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Subscription Inactive • Unlock (300 ETB)</span>
                </button>
              )}

              {/* Sign out button (ONLY shown when authenticated) */}
              <button
                id="auth-bar-sign-out"
                onClick={onSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* VISITOR STATE: Sign In / Create Account buttons placed below welcome and swipeable banner */
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                Ready to participate in Ethiopia's Opportunity Hub?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                One OmniScope account connects you across all national services and application modules.
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
              <button
                id="auth-bar-signin-btn"
                onClick={onOpenSignIn}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition shadow-xs cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-blue-600" />
                <span>SIGN IN</span>
              </button>

              <button
                id="auth-bar-signup-btn"
                onClick={onOpenSignUp}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>CREATE ACCOUNT</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
