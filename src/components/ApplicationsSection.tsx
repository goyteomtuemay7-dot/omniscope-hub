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
  CheckCircle2,
  X,
  CreditCard,
  UserPlus
} from 'lucide-react';
import type { AppService, UserProfile, Language } from '../types';
import { translations } from '../lib/i18n';

interface ApplicationsSectionProps {
  apps: AppService[];
  searchQuery: string;
  user: UserProfile | null;
  currentLanguage: Language;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onOpenSubscription: () => void;
  onOpenJobsApp: () => void;
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({
  apps,
  searchQuery,
  user,
  currentLanguage,
  onOpenAuth,
  onOpenSubscription,
  onOpenJobsApp,
}) => {
  const [selectedApp, setSelectedApp] = useState<AppService | null>(null);
  const isSubscribed = user?.subscriptionStatus === 'active';
  const t = translations[currentLanguage];

  // Filter applications based on search query
  const query = searchQuery.trim().toLowerCase();
  const filteredApps = apps.filter((app) => {
    if (!query) return true;
    return (
      app.name.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query) ||
      app.mainPurpose.toLowerCase().includes(query) ||
      app.category.toLowerCase().includes(query) ||
      app.features.some((f) => f.toLowerCase().includes(query))
    );
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Languages':
        return <LanguagesIcon className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const handleAction = (app: AppService) => {
    if (app.status === 'active') {
      if (!user) {
        setSelectedApp(app);
      } else if (!isSubscribed) {
        setSelectedApp(app);
      } else {
        // Subscribed and active -> open directly!
        if (app.codeName === 'omniscope-jobs') {
          onOpenJobsApp();
        } else {
          setSelectedApp(app);
        }
      }
    } else {
      setSelectedApp(app);
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.appsHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.appsSubheading}
            </p>
          </div>
          {searchQuery && (
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              {t.filteredBadge} ({filteredApps.length})
            </span>
          )}
        </div>

        {/* Applications List/Cards */}
        {filteredApps.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">
              {t.noMatches} "{searchQuery}"
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {t.noMatchesHint}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredApps.map((app) => {
              const isActive = app.status === 'active';

              return (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon & Name */}
                    <div className="flex items-start gap-3 mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                        {getIcon(app.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-base font-bold text-slate-900 truncate">
                            {app.name}
                          </h3>
                          {isActive ? (
                            <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {t.activeBadge}
                            </span>
                          ) : (
                            <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                              {t.upcomingBadge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {app.category}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {app.description}
                    </p>
                  </div>

                  {/* Bottom Action: Explore / Open */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {app.stats || 'Integrated'}
                    </span>

                    <button
                      onClick={() => handleAction(app)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold transition cursor-pointer"
                    >
                      <span>{isActive && isSubscribed ? t.openAppBtn : t.exploreBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DETAIL & PREVIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  {getIcon(selectedApp.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedApp.name}</h3>
                  <p className="text-xs text-slate-500">{selectedApp.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {t.modalPurpose}
                </span>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-slate-800 font-medium">
                  {selectedApp.mainPurpose}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {t.modalAbout}
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {selectedApp.description}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {t.modalKeyFeatures}
                </span>
                <div className="space-y-1.5">
                  {selectedApp.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribed & Active */}
              {selectedApp.status === 'active' && user && isSubscribed && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                  <span className="font-semibold text-xs">{t.modalSubActive}</span>
                  <button
                    onClick={() => {
                      setSelectedApp(null);
                      if (selectedApp.codeName === 'omniscope-jobs') {
                        onOpenJobsApp();
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition"
                  >
                    {t.modalOpenNow}
                  </button>
                </div>
              )}

              {/* Unauthenticated or Inactive */}
              {selectedApp.status === 'active' && (!user || !isSubscribed) && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs">{t.modalRestrictedTitle}</h4>
                      <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                        {!user
                          ? t.modalRestrictedVisitor
                          : t.modalRestrictedUser}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!user ? (
                      <button
                        onClick={() => {
                          setSelectedApp(null);
                          onOpenAuth('signup');
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{t.modalActionAuth}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedApp(null);
                          onOpenSubscription();
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{t.modalActionSubscribe}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer transition"
              >
                {t.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
