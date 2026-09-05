import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Languages,
  FileText,
  Building2,
  TrendingUp,
  Layers,
  Check,
  ArrowRight
} from 'lucide-react';
import type { AppService } from '../types';

interface WhatWeOfferSectionProps {
  apps: AppService[];
  onExploreApp: () => void;
}

export const WhatWeOfferSection: React.FC<WhatWeOfferSectionProps> = ({
  apps,
  onExploreApp
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Languages':
        return <Languages className="w-5 h-5" />;
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

  return (
    <section id="what-omniscope-offers" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Service Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            WHAT OMNISCOPE OFFERS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            A comprehensive suite of Ethiopian opportunity domains unified under one single subscription.
          </p>
        </div>

        {/* Dynamic Service Offerings Grid directly mapped from registered apps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    {getIcon(app.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{app.name}</h3>
                    <span className="text-[11px] text-slate-500 font-medium">{app.category}</span>
                  </div>
                </div>

                {/* Main Purpose statement */}
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                  {app.mainPurpose}
                </p>

                {/* Primary capability bullets */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  {app.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  {app.status === 'active' ? '● Active in Hub' : '○ Upcoming Release'}
                </span>
                <button
                  onClick={onExploreApp}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
