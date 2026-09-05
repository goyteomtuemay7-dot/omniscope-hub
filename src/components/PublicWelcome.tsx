import React from 'react';
import { ArrowDown, Compass, CheckCircle, Sparkles, Layers } from 'lucide-react';
import type { SystemSettings } from '../types';

interface PublicWelcomeProps {
  settings: SystemSettings;
  onGetStarted: () => void;
  onExploreServices: () => void;
}

export const PublicWelcome: React.FC<PublicWelcomeProps> = ({
  settings,
  onGetStarted,
  onExploreServices,
}) => {
  return (
    <section id="welcome-section" className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 bg-white border-b border-slate-200 overflow-hidden">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* National Hub Flag Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-bold tracking-tight">WELCOME TO OMNISCOPE</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">National Information Network</span>
        </div>

        {/* Primary Subtitle & Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Ethiopia's Opportunity <br className="hidden sm:inline" />
          <span className="text-blue-600">Information Hub</span>
        </h1>

        {/* Purpose Description */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          OmniScope is Ethiopia’s unified opportunity system designed to bring verified careers, federal procurement bids, higher-education scholarships, language tools, and business registry intelligence together into one single accessible platform.
        </p>

        {/* Call to Action: GET STARTED (Explores OmniScope without forcing login) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            id="public-get-started-btn"
            onClick={onGetStarted}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition shadow-sm hover:shadow-md cursor-pointer group"
          >
            <Compass className="w-5 h-5 text-blue-100 group-hover:rotate-45 transition-transform" />
            <span>GET STARTED</span>
            <ArrowDown className="w-4 h-4 text-blue-200 animate-bounce" />
          </button>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm sm:text-base transition cursor-pointer"
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span>What OmniScope Offers</span>
          </button>
        </div>

        {/* Core Principles Pills */}
        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-700">Explore Publicly Before Subscribing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-700">One Central Ethiopian Account</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-indigo-600" />
            <span className="font-medium text-slate-700">One Subscription For All Apps</span>
          </div>
        </div>
      </div>
    </section>
  );
};
