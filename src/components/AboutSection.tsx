import React from 'react';
import { ShieldCheck, Layers, Sparkles, CheckCircle, RefreshCw, KeyRound, Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-omniscope" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-3">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>National Infrastructure</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ABOUT OMNISCOPE
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            OmniScope is Ethiopia’s centralized opportunity information system created to unify fragmented public and private opportunities—including professional employment, higher education grants, public tenders, and regulatory intelligence—into one reliable and transparent hub.
          </p>
        </div>

        {/* Central Concept Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-300">
            The OmniScope Architectural Principle
          </span>
          <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
            ONE ACCOUNT • ONE SUBSCRIPTION • MULTIPLE OMNISCOPE APPLICATIONS
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            No repeated logins. No multiple fees. When you sign up and activate your monthly pass on OmniScope Hub, you gain universal Single Sign-On access to all connected Ethiopian services.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <KeyRound className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                1. Unified Ethiopian SSO
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Log in once with your Google account or email. Your credentials, profile, and subscription status automatically synchronize across all OmniScope applications without separate registrations.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-semibold text-blue-600">
              Zero credential fragmentation
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                2. Single 300 ETB Pass
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Instead of paying each portal separately, one monthly 300 ETB payment via Chapa (Telebirr, CBE Birr, or debit cards) grants complete access to all active and upcoming apps.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-semibold text-emerald-600">
              Telebirr & CBE Birr Integrated
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                3. Verified Ethiopian Data
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every job, tender, scholarship, and regulatory guide indexed on OmniScope is verified against authentic Ethiopian public and corporate sources to eliminate scams and misleading listings.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-semibold text-indigo-600">
              100% Authentic Listings
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
