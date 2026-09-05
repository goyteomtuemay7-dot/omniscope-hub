import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from 'firebase/auth';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { auth, db, syncUserDocument } from './lib/firebase';
import { Navbar } from './components/Navbar';
import { HeroSearchBar } from './components/HeroSearchBar';
import { SwipeableBanner } from './components/SwipeableBanner';
import { HomepageAuthSection } from './components/HomepageAuthSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { AboutOmniScope } from './components/AboutOmniScope';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { JobsModal } from './components/JobsModal';
import { PricingModal } from './components/PricingModal';
import { PaymentStatusBanner } from './components/PaymentStatusBanner';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import {
  getStoredBanners,
  getStoredApps,
  getStoredSettings,
  SUPER_ADMIN_EMAILS
} from './lib/hubStore';
import {
  getInitialLanguage,
  saveLanguage,
  getLocalizedBanners,
  getLocalizedApps
} from './lib/i18n';
import type { UserProfile, BannerSlide, AppService, SystemSettings, Language } from './types';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Multilingual State: English | አማርኛ | Afaan Oromoo | ትግርኛ
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    saveLanguage(newLang);
  };

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Dynamic state
  const [banners, setBanners] = useState<BannerSlide[]>(getStoredBanners());
  const [apps, setApps] = useState<AppService[]>(getStoredApps());
  const [settings, setSettings] = useState<SystemSettings>(getStoredSettings());

  // Firestore unsubscribe ref
  const unsubscribeSnapshotRef = useRef<(() => void) | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (unsubscribeSnapshotRef.current) {
        unsubscribeSnapshotRef.current();
        unsubscribeSnapshotRef.current = null;
      }

      if (firebaseUser) {
        try {
          const initialProfile = await syncUserDocument(firebaseUser);
          const isSuperAdminEmail = firebaseUser.email && SUPER_ADMIN_EMAILS.includes(firebaseUser.email.toLowerCase().trim());
          if (isSuperAdminEmail) {
            initialProfile.role = 'super_admin';
          }
          setUser(initialProfile);

          const userDocRef = doc(db, 'users', firebaseUser.uid);
          unsubscribeSnapshotRef.current = onSnapshot(
            userDocRef,
            (snap) => {
              if (snap.exists()) {
                const data = snap.data();
                setUser((prev) => ({
                  uid: firebaseUser.uid,
                  email: data.email || firebaseUser.email || '',
                  displayName: data.displayName || firebaseUser.displayName || 'OmniScope Member',
                  photoURL: firebaseUser.photoURL,
                  subscriptionStatus: data.subscriptionStatus || 'inactive',
                  planType: data.planType || 'none',
                  validUntil: data.validUntil || null,
                  role: isSuperAdminEmail ? 'super_admin' : (data.role || prev?.role || 'user'),
                  createdAt: data.createdAt,
                  updatedAt: data.updatedAt,
                }));
              }
            },
            (error) => {
              console.warn('Firestore snapshot listener note:', error);
            }
          );
        } catch (err) {
          console.error('Error syncing user profile:', err);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshotRef.current) {
        unsubscribeSnapshotRef.current();
      }
    };
  }, []);

  // Real-time Firestore sync for config/banners, config/applications, config/settings
  useEffect(() => {
    try {
      const bannerSub = onSnapshot(doc(db, 'config', 'banners'), (docSnap) => {
        if (docSnap.exists() && Array.isArray(docSnap.data().items)) {
          setBanners(docSnap.data().items);
        }
      }, () => {});

      const appsSub = onSnapshot(doc(db, 'config', 'applications'), (docSnap) => {
        if (docSnap.exists() && Array.isArray(docSnap.data().items)) {
          setApps(docSnap.data().items);
        }
      }, () => {});

      const settingsSub = onSnapshot(doc(db, 'config', 'settings'), (docSnap) => {
        if (docSnap.exists()) {
          setSettings(prev => ({ ...prev, ...docSnap.data() }));
        }
      }, () => {});

      return () => {
        bannerSub();
        appsSub();
        settingsSub();
      };
    } catch (_) {}
  }, []);

  const handleSignOut = async () => {
    try {
      if (unsubscribeSnapshotRef.current) {
        unsubscribeSnapshotRef.current();
        unsubscribeSnapshotRef.current = null;
      }
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  const handleRefreshUser = useCallback(async () => {
    if (auth.currentUser) {
      try {
        const snap = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (snap.exists()) {
          const data = snap.data();
          const isSuperAdminEmail = auth.currentUser.email && SUPER_ADMIN_EMAILS.includes(auth.currentUser.email.toLowerCase().trim());
          setUser({
            uid: auth.currentUser.uid,
            email: data.email || auth.currentUser.email || '',
            displayName: data.displayName || auth.currentUser.displayName || 'OmniScope Member',
            photoURL: auth.currentUser.photoURL,
            subscriptionStatus: data.subscriptionStatus || 'inactive',
            planType: data.planType || 'none',
            validUntil: data.validUntil || null,
            role: isSuperAdminEmail ? 'super_admin' : (data.role || 'user'),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        }
      } catch (e) {
        console.warn('User refresh error:', e);
      }
    }
  }, []);

  const handlePaymentSuccess = (_txRef: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      return {
        ...prev,
        subscriptionStatus: 'active',
        planType: 'monthly_etb',
        validUntil: expiry,
      };
    });
  };

  const openAuthWithMode = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Localize banners and apps reactively according to current language
  const localizedBanners = useMemo(() => {
    return getLocalizedBanners(banners, language);
  }, [banners, language]);

  const localizedApps = useMemo(() => {
    return getLocalizedApps(apps, language);
  }, [apps, language]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. OmniScope logo/header with language switcher beside logo */}
      <Navbar
        user={user}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        onOpenSignIn={() => openAuthWithMode('signin')}
        onOpenSignUp={() => openAuthWithMode('signup')}
        onSignOut={handleSignOut}
        onOpenSubscription={() => setIsPricingModalOpen(true)}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Large search bar */}
        <HeroSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentLanguage={language}
        />

        {/* 3. Swipeable banner (dynamically localized) */}
        <SwipeableBanner
          banners={localizedBanners}
          intervalSeconds={settings.bannerIntervalSeconds || 3}
          onCtaClick={(link) => {
            if (link && (link.startsWith('http://') || link.startsWith('https://'))) {
              window.open(link, '_blank', 'noopener,noreferrer');
            } else if (link?.startsWith('#')) {
              const target = document.querySelector(link);
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            } else {
              const el = document.getElementById('homepage-main-search');
              if (el) el.focus();
            }
          }}
        />

        {/* 4. Authentication (Clearly show Sign In and Create New Account below the banner) */}
        <HomepageAuthSection
          user={user}
          currentLanguage={language}
          onOpenSignIn={() => openAuthWithMode('signin')}
          onOpenSignUp={() => openAuthWithMode('signup')}
          onSignOut={handleSignOut}
          onOpenSubscription={() => setIsPricingModalOpen(true)}
        />

        {/* 5. Applications (Simple cards/list items with icon, name, short description, Explore/Open button) */}
        <ApplicationsSection
          apps={localizedApps}
          searchQuery={searchQuery}
          user={user}
          currentLanguage={language}
          onOpenAuth={(mode) => openAuthWithMode(mode || 'signin')}
          onOpenSubscription={() => setIsPricingModalOpen(true)}
          onOpenJobsApp={() => {
            window.open('https://omniscope-jobs-app.vercel.app', '_blank', 'noopener,noreferrer');
          }}
        />

        {/* 6. About OmniScope (Short, simple description at bottom) */}
        <AboutOmniScope currentLanguage={language} />
      </main>

      {/* 7. Footer (Contact, Privacy Policy, Terms, and copyright) */}
      <Footer
        settings={settings}
        user={user}
        currentLanguage={language}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* SYSTEM MODALS (Preserving 100% of functional capabilities) */}
      {/* SSO Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        currentLanguage={language}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(profile) => {
          setUser(profile);
          setIsAuthModalOpen(false);
        }}
      />

      {/* Chapa 300 ETB Payment & Subscription Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        user={user}
        currentLanguage={language}
        onOpenAuth={() => openAuthWithMode('signup')}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Active Connected Jobs Application Modal */}
      <JobsModal
        isOpen={isJobsModalOpen}
        onClose={() => setIsJobsModalOpen(false)}
        userEmail={user?.email}
      />

      {/* Super Admin Dashboard (Isolated from normal public experience) */}
      <SuperAdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        currentUser={user}
        banners={banners}
        onUpdateBanners={setBanners}
        apps={apps}
        onUpdateApps={setApps}
        settings={settings}
        onUpdateSettings={setSettings}
        onOpenSignIn={() => openAuthWithMode('signin')}
      />

      {/* Background Payment Status Banner (Auto-detects Chapa webhook callback) */}
      <PaymentStatusBanner
        currentUserId={user?.uid}
        onRefreshUser={handleRefreshUser}
      />
    </div>
  );
}
