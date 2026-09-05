import React from 'react';
import { Search, X } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../lib/i18n';

interface HeroSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
  currentLanguage: Language;
}

export const HeroSearchBar: React.FC<HeroSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];

  const quickTags = [
    { key: 'Jobs', label: t.tags.Jobs },
    { key: 'Scholarships', label: t.tags.Scholarships },
    { key: 'Languages', label: t.tags.Languages },
    { key: 'Education', label: t.tags.Education },
    { key: 'Tenders', label: t.tags.Tenders },
  ];

  return (
    <section className="w-full pt-8 pb-4 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Large Prominent Search Bar */}
        <div className="relative flex items-center">
          <div className="absolute left-4.5 sm:left-5.5 text-slate-400 pointer-events-none flex items-center">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
          </div>

          <input
            id="homepage-main-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4.5 bg-white border-2 border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:outline-none rounded-2xl text-sm sm:text-base text-slate-900 placeholder-slate-400 shadow-xs transition-all"
          />

          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              title={t.clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">{t.quickSearch}</span>
          {quickTags.map((item) => {
            const isSelected =
              searchQuery.toLowerCase() === item.key.toLowerCase() ||
              searchQuery.toLowerCase() === item.label.toLowerCase();

            return (
              <button
                key={item.key}
                onClick={() => onSearchChange(item.label)}
                className={`px-3 py-1 rounded-full border transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {searchQuery && typeof resultCount === 'number' && (
            <span className="ml-auto text-xs text-blue-600 font-semibold">
              {resultCount} {resultCount === 1 ? t.matchFound : t.matchesFound}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
