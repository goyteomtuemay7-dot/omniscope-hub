import React, { useState } from 'react';
import {
  ShieldAlert,
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  ToggleLeft,
  ToggleRight,
  Layers,
  Image as ImageIcon,
  Users,
  CreditCard,
  Settings,
  History,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Lock
} from 'lucide-react';
import type { BannerSlide, AppService, SystemSettings, UserProfile, ChapaTransactionRecord, AuditLogItem } from '../types';
import {
  saveBanners,
  saveApps,
  saveSettings,
  getStoredTransactions,
  getStoredAuditLogs,
  checkIsSuperAdmin
} from '../lib/hubStore';

interface SuperAdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  banners: BannerSlide[];
  onUpdateBanners: (banners: BannerSlide[]) => void;
  apps: AppService[];
  onUpdateApps: (apps: AppService[]) => void;
  settings: SystemSettings;
  onUpdateSettings: (settings: SystemSettings) => void;
  onOpenSignIn: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  isOpen,
  onClose,
  currentUser,
  banners,
  onUpdateBanners,
  apps,
  onUpdateApps,
  settings,
  onUpdateSettings,
  onOpenSignIn
}) => {
  if (!isOpen) return null;

  const isSuperAdmin = checkIsSuperAdmin(currentUser);

  // Tabs
  type TabType = 'banners' | 'apps' | 'users' | 'transactions' | 'settings' | 'logs';
  const [activeTab, setActiveTab] = useState<TabType>('banners');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Local state for editing
  const [localBanners, setLocalBanners] = useState<BannerSlide[]>(banners);
  const [localApps, setLocalApps] = useState<AppService[]>(apps);
  const [localSettings, setLocalSettings] = useState<SystemSettings>(settings);

  // Users management state (local sample + current user)
  const [userList, setUserList] = useState<Array<{ email: string; uid: string; status: 'active' | 'inactive'; role: string }>>([
    { email: currentUser?.email || 'goyteom21@gmail.com', uid: currentUser?.uid || 'admin_usr_0', status: currentUser?.subscriptionStatus === 'active' ? 'active' : 'inactive', role: 'super_admin' },
    { email: 'abebe.kebede@telebirr.et', uid: 'usr_abebe_1', status: 'active', role: 'user' },
    { email: 'selamawit.cbe@cbe.com.et', uid: 'usr_selam_2', status: 'active', role: 'user' },
    { email: 'dawit.m@aau.edu.et', uid: 'usr_dawit_3', status: 'inactive', role: 'user' },
  ]);

  const transactions = getStoredTransactions();
  const auditLogs = getStoredAuditLogs();

  const showFeedback = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // BANNER HANDLERS
  const handleToggleBanner = (id: string) => {
    const updated = localBanners.map(b => b.id === id ? { ...b, active: !b.active } : b);
    setLocalBanners(updated);
    onUpdateBanners(updated);
    saveBanners(updated, currentUser?.email || 'superadmin');
    showFeedback('Banner visibility updated');
  };

  const handleDeleteBanner = (id: string) => {
    const updated = localBanners.filter(b => b.id !== id);
    setLocalBanners(updated);
    onUpdateBanners(updated);
    saveBanners(updated, currentUser?.email || 'superadmin');
    showFeedback('Banner slide removed');
  };

  const handleAddBanner = () => {
    const newBanner: BannerSlide = {
      id: `banner-${Date.now()}`,
      title: 'New Opportunity Bulletin',
      subtitle: 'Official announcement for all OmniScope members.',
      tag: 'Announcement',
      badge: 'New',
      ctaText: 'Explore',
      ctaLink: '#explore-omniscope',
      bgGradient: 'from-blue-700 via-indigo-700 to-slate-900',
      active: true,
      order: localBanners.length + 1
    };
    const updated = [newBanner, ...localBanners];
    setLocalBanners(updated);
    onUpdateBanners(updated);
    saveBanners(updated, currentUser?.email || 'superadmin');
    showFeedback('New banner slide added');
  };

  // APP HANDLERS
  const handleToggleAppStatus = (id: string) => {
    const updated = localApps.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'active' ? 'coming_soon' as const : 'active' as const };
      }
      return a;
    });
    setLocalApps(updated);
    onUpdateApps(updated);
    saveApps(updated, currentUser?.email || 'superadmin');
    showFeedback('Application status toggled');
  };

  const handleAddApp = () => {
    const newApp: AppService = {
      id: `app-${Date.now()}`,
      name: 'OmniScope Education',
      codeName: `omniscope-edu-${Date.now()}`,
      tagline: 'Ethiopian university course repository and national exam archives',
      description: 'Central learning and exam resource indexing entrance exam preparation, university lecture notes, and regional curriculum guides.',
      mainPurpose: 'Access academic prep materials and national entrance exams.',
      status: 'coming_soon',
      icon: 'GraduationCap',
      category: 'Education & Academics',
      badge: 'Coming Soon',
      stats: '12,000+ Exam Questions',
      features: ['UGET past exam papers', 'Engineering notes repository', 'Interactive quizzes'],
      order: localApps.length + 1
    };
    const updated = [...localApps, newApp];
    setLocalApps(updated);
    onUpdateApps(updated);
    saveApps(updated, currentUser?.email || 'superadmin');
    showFeedback('New application registered in OmniScope Hub');
  };

  // SETTINGS HANDLERS
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    saveSettings(localSettings, currentUser?.email || 'superadmin');
    showFeedback('System settings successfully updated');
  };

  // USER TOGGLE
  const handleToggleUserSubscription = (uid: string) => {
    setUserList(prev => prev.map(u => {
      if (u.uid === uid) {
        const nextStatus = u.status === 'active' ? 'inactive' : 'active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    showFeedback('User subscription status updated');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Super Admin Management Portal
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                  Central Hub
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentUser?.email ? `Authenticated as: ${currentUser.email}` : 'Security Gate'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FEEDBACK NOTIFICATION */}
        {saveSuccessMsg && (
          <div className="bg-emerald-600 text-white text-xs font-semibold px-6 py-2 flex items-center gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* SECURITY CHECK: ACCESS DENIED IF NOT SUPER ADMIN */}
        {!isSuperAdmin ? (
          <div className="p-8 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Restricted to Super Administrators
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You must be signed in with an authorized OmniScope Super Admin account (such as <strong className="text-slate-900">goyteom21@gmail.com</strong>) to access hub configuration controls.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenSignIn();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Sign In With Super Admin Account
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                Return to Public Hub
              </button>
            </div>
          </div>
        ) : (
          /* SUPER ADMIN DASHBOARD TABS & CONTENT */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Tab navigation */}
            <div className="flex items-center gap-1 px-6 border-b border-slate-200 bg-slate-50 overflow-x-auto text-xs font-semibold text-slate-600">
              <button
                onClick={() => setActiveTab('banners')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'banners' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Swipeable Banners ({localBanners.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('apps')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'apps' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Applications Catalog ({localApps.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'users' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Users & Subscriptions</span>
              </button>

              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'transactions' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Chapa Ledger ({transactions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'settings' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Platform Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('logs')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'logs' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Audit Trail</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* TAB 1: BANNERS */}
              {activeTab === 'banners' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Manage Swipeable Banners</h3>
                      <p className="text-xs text-slate-500">
                        Updates appear immediately on the public landing page. Slides auto-rotate every {settings.bannerIntervalSeconds} seconds.
                      </p>
                    </div>
                    <button
                      onClick={handleAddBanner}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Slide</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {localBanners.map((slide, idx) => (
                      <div
                        key={slide.id}
                        className={`p-4 rounded-xl border transition-all ${
                          slide.active ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900">{slide.title}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                                  {slide.tag}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">{slide.subtitle}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() => handleToggleBanner(slide.id)}
                              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition ${
                                slide.active
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {slide.active ? 'Active on Hub' : 'Hidden'}
                            </button>

                            <button
                              onClick={() => handleDeleteBanner(slide.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition cursor-pointer"
                              title="Delete Banner"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: APPLICATIONS CATALOG */}
              {activeTab === 'apps' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Manage Application Ecosystem</h3>
                      <p className="text-xs text-slate-500">
                        Add, toggle active status, and modify registered Ethiopian services without touching code.
                      </p>
                    </div>
                    <button
                      onClick={handleAddApp}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Register New App</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {localApps.map((app, idx) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900">{app.name}</h4>
                              <span className="text-xs text-slate-400">({app.codeName})</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 font-medium">"{app.mainPurpose}"</p>
                            <span className="text-[11px] text-slate-400 mt-1 inline-block">
                              Category: {app.category} • Stats: {app.stats || 'Integrated'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                          <button
                            onClick={() => handleToggleAppStatus(app.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                              app.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {app.status === 'active' ? 'Status: Active' : 'Status: Coming Soon'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: USERS & SUBSCRIPTIONS */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Registered Users & Subscription Access</h3>
                    <p className="text-xs text-slate-500">
                      View authenticated users and override subscription access for manual verification.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[10px]">
                        <tr>
                          <th className="py-3 px-4">User Email</th>
                          <th className="py-3 px-4">Role</th>
                          <th className="py-3 px-4">Subscription Status</th>
                          <th className="py-3 px-4 text-right">Admin Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {userList.map((usr) => (
                          <tr key={usr.uid} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-semibold text-slate-900">{usr.email}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                usr.role === 'super_admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {usr.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                usr.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {usr.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleToggleUserSubscription(usr.uid)}
                                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] cursor-pointer"
                              >
                                {usr.status === 'active' ? 'Revoke Access' : 'Grant 30-Day Access'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: CHAPA TRANSACTIONS */}
              {activeTab === 'transactions' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Chapa ETB Payments & Webhook Logs</h3>
                    <p className="text-xs text-slate-500">
                      Real-time payment transactions recorded from Chapa gateway (Telebirr, CBE Birr, Amole, and cards).
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Tx Reference</th>
                          <th className="py-3 px-4">Customer Email</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Channel</th>
                          <th className="py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {transactions.map((tx) => (
                          <tr key={tx.txRef} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-mono font-bold text-slate-800 text-[11px]">{tx.txRef}</td>
                            <td className="py-3 px-4">{tx.email}</td>
                            <td className="py-3 px-4 font-bold text-slate-900">{tx.amount} {tx.currency}</td>
                            <td className="py-3 px-4">{tx.method || 'Chapa Gateway'}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                tx.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: SYSTEM SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Platform System Settings</h3>
                    <p className="text-xs text-slate-500">
                      Control footer metadata, address, contact email, and default monthly subscription price.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Platform Name
                      </label>
                      <input
                        type="text"
                        value={localSettings.platformName}
                        onChange={(e) => setLocalSettings({ ...localSettings, platformName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={localSettings.tagline}
                        onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Physical Address
                      </label>
                      <input
                        type="text"
                        value={localSettings.address}
                        onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={localSettings.contactEmail}
                        onChange={(e) => setLocalSettings({ ...localSettings, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Monthly Subscription Price (ETB)
                      </label>
                      <input
                        type="number"
                        value={localSettings.subscriptionPriceETB}
                        onChange={(e) => setLocalSettings({ ...localSettings, subscriptionPriceETB: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Banner Interval (Seconds)
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="10"
                        value={localSettings.bannerIntervalSeconds}
                        onChange={(e) => setLocalSettings({ ...localSettings, bannerIntervalSeconds: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-blue-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Platform Settings</span>
                  </button>
                </form>
              )}

              {/* TAB 6: AUDIT TRAIL */}
              {activeTab === 'logs' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Administrative Audit Trail</h3>
                    <p className="text-xs text-slate-500">
                      Complete history of administrative operations performed on OmniScope Hub.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{log.action}</div>
                          <div className="text-slate-500">{log.details}</div>
                        </div>
                        <div className="text-right text-[11px] text-slate-400">
                          <div>{log.adminEmail}</div>
                          <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
