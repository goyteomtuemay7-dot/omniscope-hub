import React from 'react';
import { Layers } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../lib/i18n';

interface AboutOmniScopeProps {
  currentLanguage: Language;
}

export const AboutOmniScope: React.FC<AboutOmniScopeProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>{t.aboutBadge}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t.aboutHeading}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          {t.aboutParagraph}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-bold text-slate-500 tracking-wide uppercase">
          {t.aboutTagline}
        </div>
      </div>
    </section>
  );
};
