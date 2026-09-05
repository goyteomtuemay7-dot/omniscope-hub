import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Languages as LanguagesIcon,
  FileText,
  Building2,
  TrendingUp,
  Layers,
  ArrowRight,
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  Info,
  X,
  ExternalLink,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import type { AppService, UserProfile } from '../types';

interface ExploreAppsSectionProps {
  apps: AppService[];
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenPricing: () => void;
  onOpenJobsApp: () => void;
}

export const ExploreAppsSection: React.FC<ExploreAppsSectionProps> = ({
  apps,
  user,
  onOpenAuth,
  onOpenPricing,
  onOpenJobsApp
}) => {
  const [selectedApp, setSelectedApp] = useState<AppService | null>(null);
  const isSubscribed = user?.subscriptionStatus === 'active';

  const getIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Languages':
        return <LanguagesIcon className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  const handleAppAction = (app: AppService) => {
    if (app.status === 'active') {
      if (!user) {
        // Visitor attempting protected functionality -> show details modal with clear message
        setSelectedApp(app);
      } else if (!isSubscribed) {
        // Authenticated but not subscribed -> show details modal with subscribe prompt
        setSelectedApp(app);
      } else {
        // Active & Subscribed -> launch directly!
        if (app.codeName === 'omniscope-jobs') {
          onOpenJobsApp();
        } else {
          setSelectedApp(app);
        }
      }
    } else {
      // Coming soon or informational
      setSelectedApp(app);
    }
  };

  return (
    <section id="explore-omniscope" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Connected Opportunities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore OmniScope
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Browse our ecosystem of specialized Ethiopian opportunity applications. Explore what each application provides before creating an account or subscribing.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => {
            const isActive = app.status === 'active';

            return (
              <div
                key={app.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Row: Icon & Status Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                      {getIcon(app.icon, "w-6 h-6")}
                    </div>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active & Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">
                        {app.badge || 'Coming Soon'}
                      </span>
                    )}
                  </div>

                  {/* App Name */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {app.name}
                  </h3>

                  {/* Main Purpose (Explicit requirement from prompt) */}
                  <div className="mb-3 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                    "{app.mainPurpose}"
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 mb-5 leading-relaxed">
                    {app.description}
                  </p>
                </div>

                {/* Card Action: Explore / Learn More */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {app.stats || app.category}
                  </span>

                  <button
                    onClick={() => handleAppAction(app)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold transition cursor-pointer"
                  >
                    <span>{isActive && isSubscribed ? 'Open App' : 'Explore / Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAILED APPLICATION PREVIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  {getIcon(selectedApp.icon, "w-5 h-5")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedApp.name}</h3>
                  <p className="text-xs text-slate-500">{selectedApp.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-700">
              {/* Primary Purpose */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Main Purpose & Objective
                </h4>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-slate-900 font-medium text-sm">
                  {selectedApp.mainPurpose}
                </div>
              </div>

              {/* What this application is for */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  About This Application
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedApp.description}
                </p>
              </div>

              {/* Key Features & Services */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Services & Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedApp.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACCESS RESTRICTION NOTICE (If not subscribed or not signed in) */}
              {selectedApp.status === 'active' && (!user || !isSubscribed) && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold">
                        Access Protection
                      </h5>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        Create an OmniScope account and subscribe to access this application. One single OmniScope subscription (300 ETB) unlocks all active and upcoming services.
                      </p>

                      <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                        {!user ? (
                          <button
                            onClick={() => {
                              setSelectedApp(null);
                              onOpenAuth();
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Create Account / Sign In</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedApp(null);
                              onOpenPricing();
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Subscribe (300 ETB / month)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* If user IS subscribed and application is active */}
              {selectedApp.status === 'active' && user && isSubscribed && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-bold">Your OmniScope Access is Active</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedApp(null);
                        if (selectedApp.codeName === 'omniscope-jobs') {
                          onOpenJobsApp();
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Launch Application Now
                    </button>
                  </div>
                </div>
              )}

              {/* Coming Soon notice */}
              {selectedApp.status !== 'active' && (
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs">
                  <p className="font-semibold text-slate-800">
                    Integration Pipeline
                  </p>
                  <p className="mt-1 text-slate-500">
                    {selectedApp.name} is scheduled for national launch. Subscribers will automatically receive instant access with no secondary account or payment required.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
