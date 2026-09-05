import React from 'react';
import { LogIn, LogOut, User, ShieldAlert, Sparkles } from 'lucide-react';
import type { UserProfile, Language } from '../types';
import { checkIsSuperAdmin } from '../lib/hubStore';
import { translations } from '../lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  user: UserProfile | null;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onSignOut: () => void;
  onOpenSubscription: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentLanguage,
  onLanguageChange,
  onOpenSignIn,
  onOpenSignUp,
  onSignOut,
  onOpenSubscription,
  onOpenAdmin,
}) => {
  const isSubscribed = user?.subscriptionStatus === 'active';
  const isSuperAdmin = checkIsSuperAdmin(user);
  const t = translations[currentLanguage];

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* 1. OmniScope Logo & Language Switcher right beside it */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-base sm:text-lg shadow-xs">
              O
            </div>
            <div>
              <span className="text-slate-900 font-extrabold tracking-tight text-lg sm:text-xl">
                OmniScope<span className="text-blue-600 ml-0.5">.</span>
              </span>
              <span className="hidden lg:inline-block ml-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {t.countryBadge}
              </span>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="h-5 w-px bg-slate-200 shrink-0" />

          {/* Simple language switcher beside logo: English | አማርኛ | Afaan Oromoo | ትግርኛ */}
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>

        {/* Right Side Status & Auth */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Admin badge if Super Admin */}
          {isSuperAdmin && (
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-semibold transition cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.adminBadge}</span>
            </button>
          )}

          {user ? (
            /* Signed In User Pill */
            <div className="flex items-center gap-2">
              {isSubscribed ? (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t.subscribedBadge}
                </span>
              ) : (
                <button
                  onClick={onOpenSubscription}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-full border border-amber-200 text-xs font-semibold transition cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>{t.subscribeShort}</span>
                </button>
              )}

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                <button
                  onClick={onSignOut}
                  title={t.signOut}
                  className="text-xs font-semibold text-slate-500 hover:text-red-600 p-1 rounded-md transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Visitor Action */
            <button
              onClick={onOpenSignIn}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 hover:text-blue-600 hover:bg-slate-50 border border-slate-200/80 transition cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.signIn}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
