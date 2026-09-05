import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Zap, Layers, CreditCard, Building } from 'lucide-react';
import type { UserProfile } from '../types';

interface HeroProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
  onScrollToPricing: () => void;
  onScrollToApps: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  user,
  onOpenAuth,
  onScrollToPricing,
  onScrollToApps,
}) => {
  const isSubscribed = user?.subscriptionStatus === 'active';

  return (
    <section className="relative overflow-hidden pt-12 pb-14 lg:pt-16 lg:pb-20 bg-slate-50 border-b border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-6 shadow-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span>Omniscope Hub</span>
          <span className="text-blue-300">•</span>
          <span>Ethiopian National Opportunity System</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-tight">
          One Single Sign-On for all{' '}
          <span className="text-blue-600">
            Ethiopian Opportunities
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Access verified career openings, federal procurement bids, higher-ed scholarships, and business registry guides across Ethiopia. Powered by Firebase SSO and Chapa ETB payments.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {!user ? (
            <>
              <button
                id="hero-register-btn"
                onClick={onOpenAuth}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition shadow-sm cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                Register with Google / Email
              </button>
              <button
                id="hero-explore-pricing-btn"
                onClick={onScrollToPricing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm sm:text-base transition shadow-xs cursor-pointer"
              >
                <span>View 300 ETB Plan</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>
            </>
          ) : isSubscribed ? (
            <>
              <button
                id="hero-launch-apps-btn"
                onClick={onScrollToApps}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                Open App Dashboard
              </button>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Active Plan: Monthly ETB</span>
              </div>
            </>
          ) : (
            <>
              <button
                id="hero-unlock-hub-btn"
                onClick={onScrollToPricing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition shadow-sm cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                Unlock Apps Hub (300 ETB)
              </button>
              <button
                onClick={onScrollToApps}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm sm:text-base transition shadow-xs cursor-pointer"
              >
                <span>Preview 5 Apps</span>
                <Layers className="w-4 h-4 text-slate-400" />
              </button>
            </>
          )}
        </div>

        {/* Feature Pill Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Single Sign-On</div>
              <div className="text-[11px] text-slate-500">Google & Email Auth</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Chapa Payments</div>
              <div className="text-[11px] text-slate-500">Telebirr & CBE Cards</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">5 Central Apps</div>
              <div className="text-[11px] text-slate-500">Jobs, Tenders, Grants</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Cloud Firestore</div>
              <div className="text-[11px] text-slate-500">Real-time sync</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
