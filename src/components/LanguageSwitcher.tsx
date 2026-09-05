import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { LANGUAGES } from '../lib/i18n';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <div className="relative inline-flex items-center" ref={dropdownRef}>
      {/* Tablet & Desktop: Clearly show English | አማርኛ | Afaan Oromoo | ትግርኛ beside the logo */}
      <nav
        aria-label="Language selector"
        className="hidden sm:flex items-center text-xs font-semibold bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 shadow-2xs"
      >
        {LANGUAGES.map((lang, index) => {
          const isActive = currentLanguage === lang.code;
          return (
            <React.Fragment key={lang.code}>
              {index > 0 && <span className="text-slate-300 select-none px-1">|</span>}
              <button
                id={`lang-switch-${lang.code}`}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                title={lang.name}
              >
                {lang.nativeName}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Mobile view: Compact clean selector with Globe icon and dropdown showing all 4 languages */}
      <div className="flex sm:hidden items-center">
        <button
          id="lang-mobile-toggle"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
          aria-expanded={dropdownOpen}
          aria-haspopup="listbox"
          title="Change language"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate max-w-[80px]">{currentOption.nativeName}</span>
          <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
              Select Language
            </div>
            {LANGUAGES.map((lang) => {
              const isActive = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400">{lang.name}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
