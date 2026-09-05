import React from 'react';
import { MapPin, Mail, Phone, Lock } from 'lucide-react';
import type { SystemSettings, UserProfile, Language } from '../types';
import { checkIsSuperAdmin } from '../lib/hubStore';
import { translations } from '../lib/i18n';

interface FooterProps {
  settings: SystemSettings;
  user: UserProfile | null;
  currentLanguage: Language;
  onOpenAdmin: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  user,
  currentLanguage,
  onOpenAdmin,
  onScrollToTop,
}) => {
  const isSuperAdmin = checkIsSuperAdmin(user);
  const t = translations[currentLanguage];

  return (
    <footer className="w-full bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
              O
            </div>
            <span className="font-bold text-slate-900 text-sm">
              {settings.platformName || 'OmniScope'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{settings.address || t.defaultAddress}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <a href={`mailto:${settings.contactEmail}`} className="hover:text-blue-600 transition-colors">
                {settings.contactEmail || 'contact@omniscope.et'}
              </a>
            </div>
            {settings.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>{settings.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {settings.platformName || 'OmniScope'}. {t.allRightsReserved}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onScrollToTop}
              className="hover:text-slate-600 transition-colors cursor-pointer"
            >
              {t.backToTop}
            </button>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">
              {t.privacyPolicy}
            </span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">
              {t.termsOfService}
            </span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              title={isSuperAdmin ? t.adminDashboard : t.staffAccess}
            >
              <Lock className="w-3 h-3" />
              <span>{isSuperAdmin ? t.adminDashboard : t.staffAccess}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
