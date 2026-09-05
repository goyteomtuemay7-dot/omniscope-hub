import React from 'react';
import { LogIn, UserPlus, ShieldCheck, LogOut, Sparkles, User } from 'lucide-react';
import type { UserProfile, Language } from '../types';
import { translations } from '../lib/i18n';

interface HomepageAuthSectionProps {
  user: UserProfile | null;
  currentLanguage: Language;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onSignOut: () => void;
  onOpenSubscription: () => void;
}

export const HomepageAuthSection: React.FC<HomepageAuthSectionProps> = ({
  user,
  currentLanguage,
  onOpenSignIn,
  onOpenSignUp,
  onSignOut,
  onOpenSubscription,
}) => {
  const isSubscribed = user?.subscriptionStatus === 'active';
  const t = translations[currentLanguage];

  return (
    <section className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {!user ? (
          /* VISITOR VIEW: Clearly show Sign In and Create New Account */
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t.ssoTitle}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {t.authHeadline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-md">
                {t.authSubheadline}
              </p>
            </div>

            {/* Clearly visible Sign In and Create New Account buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                id="homepage-sign-in-btn"
                onClick={onOpenSignIn}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 shadow-xs transition cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-blue-600" />
                <span>{t.signIn}</span>
              </button>

              <button
                id="homepage-create-account-btn"
                onClick={onOpenSignUp}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.createAccount}</span>
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED USER VIEW */
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-5 h-5 text-blue-600" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {user.displayName || t.memberGreeting}
                  </span>
                  {isSubscribed ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {t.statusSubscribed}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {t.statusInactive}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {!isSubscribed && (
                <button
                  onClick={onOpenSubscription}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.subscribe300Btn}</span>
                </button>
              )}

              <button
                onClick={onSignOut}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.signOut}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
