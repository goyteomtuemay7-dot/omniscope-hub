import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Briefcase,
  FileText,
  GraduationCap,
  Building2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Bell,
  CheckCircle2,
  Layers,
  Calendar,
  CreditCard
} from 'lucide-react';
import { APPS_LIST } from '../data/appsData';
import type { UserProfile } from '../types';

interface AppHubDashboardProps {
  user: UserProfile | null;
  onOpenPricing: () => void;
  onOpenJobs: () => void;
}

export const AppHubDashboard: React.FC<AppHubDashboardProps> = ({
  user,
  onOpenPricing,
  onOpenJobs,
}) => {
  const isSubscribed = user?.subscriptionStatus === 'active';
  const [notifiedApps, setNotifiedApps] = useState<string[]>([]);

  const handleNotifyToggle = (appId: string) => {
    setNotifiedApps((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'Building2':
        return <Building2 className="w-6 h-6" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  const formatValidUntil = (validUntil: any) => {
    if (!validUntil) return 'Dec 15, 2026';
    try {
      if (typeof validUntil.toDate === 'function') {
        return validUntil.toDate().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
      return new Date(validUntil).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '30 Days Access';
    }
  };

  return (
    <section id="apps-hub-section" className="py-12 sm:py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & User Welcome */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-6 border-b border-slate-200 gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
              {user?.displayName ? `Welcome Back, ${user.displayName}` : 'App Dashboard'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Access your connected Ethiopian applications and manage your professional opportunities.
            </p>
          </div>

          {/* Billing Info Widget in Header */}
          <div className="flex items-center gap-4">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs min-w-[220px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                <span>Billing Status</span>
                {isSubscribed ? (
                  <span className="text-emerald-600 font-bold">Active</span>
                ) : (
                  <span className="text-amber-600 font-bold">Inactive</span>
                )}
              </p>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500">Plan</span>
                <span className="font-semibold text-slate-700">
                  {isSubscribed ? 'Monthly ETB' : 'None'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-500">Renewal</span>
                <span className="font-semibold text-slate-700">
                  {isSubscribed ? formatValidUntil(user?.validUntil) : 'Pending'}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    isSubscribed ? 'bg-blue-600 w-full' : 'bg-amber-400 w-1/12'
                  }`}
                />
              </div>
            </div>

            {!isSubscribed && (
              <button
                id="header-unlock-cta"
                onClick={onOpenPricing}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unlock (300 ETB)</span>
              </button>
            )}
          </div>
        </div>

        {/* Locked state banner if not subscribed */}
        {!isSubscribed && (
          <div className="mb-8 p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  App Dashboard Locked • 300 ETB Monthly Access
                </div>
                <div className="text-xs text-slate-600">
                  Subscribe via Chapa (Telebirr / CBE Cards) to unlock App 1 [omniscope-jobs] and all upcoming modules.
                </div>
              </div>
            </div>
            <button
              onClick={onOpenPricing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              Pay 300 ETB via Chapa
            </button>
          </div>
        )}

        {/* 5 Apps Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS_LIST.map((app, index) => {
            const isActive = app.status === 'active';
            const isLocked = !isSubscribed;

            if (isActive) {
              return (
                <div
                  key={app.id}
                  id={`app-card-${index + 1}`}
                  onClick={!isLocked ? onOpenJobs : onOpenPricing}
                  className="group relative bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Icon */}
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                      {getIcon(app.icon)}
                    </div>

                    {/* Active Pill */}
                    <div className="absolute top-6 right-6">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        ACTIVE
                      </span>
                    </div>

                    {/* App Title */}
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {app.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                      Find high-impact roles and verified opportunities tailored for Ethiopia.
                    </p>
                  </div>

                  {/* Bottom Action Area */}
                  {isLocked ? (
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-tight flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        Requires Subscription
                      </span>
                      <span className="text-xs font-semibold text-blue-600 underline">
                        Unlock (300 ETB)
                      </span>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">
                        Open Application
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              );
            }

            // Coming Soon Cards (Dashed style from Design HTML)
            return (
              <div
                key={app.id}
                id={`app-card-${index + 1}`}
                className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 hover:bg-white transition-all min-h-[220px]"
              >
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center mb-3 text-lg font-bold">
                  {getIcon(app.icon)}
                </div>
                <h3 className="text-base font-bold text-slate-600 mb-1">
                  {app.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  {app.tagline || 'Coming Soon'}
                </p>
                <button
                  onClick={() => handleNotifyToggle(app.id)}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                    notifiedApps.includes(app.id)
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-slate-500 hover:text-slate-700 border-slate-200'
                  }`}
                >
                  <Bell className="w-3 h-3" />
                  <span>{notifiedApps.includes(app.id) ? 'Subscribed' : 'Notify Me'}</span>
                </button>
              </div>
            );
          })}

          {/* 6th Card: Explore API / Developer Services card from Design HTML */}
          <div className="bg-blue-600 p-6 rounded-2xl shadow-sm flex flex-col justify-center items-start text-white">
            <h3 className="text-lg font-bold mb-2">Explore Hub API</h3>
            <p className="text-sm text-blue-100 mb-4 leading-relaxed">
              Integrate Omniscope verified data, jobs, and SSO into your own applications.
            </p>
            <button
              onClick={() => alert('Omniscope Hub REST & Webhook APIs are active for registered partners.')}
              className="bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer"
            >
              Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
