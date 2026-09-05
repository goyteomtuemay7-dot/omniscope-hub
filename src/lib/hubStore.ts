import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { DEFAULT_BANNERS, APPS_LIST, DEFAULT_SETTINGS } from '../data/appsData';
import type { BannerSlide, AppService, SystemSettings, UserProfile, ChapaTransactionRecord, AuditLogItem } from '../types';

export const SUPER_ADMIN_EMAILS = [
  'goyteom21@gmail.com',
  'admin@omniscope.et',
  'superadmin@omniscope.et'
];

export function checkIsSuperAdmin(user: UserProfile | null): boolean {
  if (!user || !user.email) return false;
  const email = user.email.toLowerCase().trim();
  return SUPER_ADMIN_EMAILS.includes(email) || user.role === 'super_admin';
}

const STORAGE_KEYS = {
  BANNERS: 'omniscope_hub_banners',
  APPS: 'omniscope_hub_apps',
  SETTINGS: 'omniscope_hub_settings',
  TRANSACTIONS: 'omniscope_hub_transactions',
  LOGS: 'omniscope_hub_audit_logs',
};

// Initial local storage hydration
export function getStoredBanners(): BannerSlide[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BANNERS);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return DEFAULT_BANNERS;
}

export function getStoredApps(): AppService[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPS);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return APPS_LIST;
}

export function getStoredSettings(): SystemSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return DEFAULT_SETTINGS;
}

export function getStoredTransactions(): ChapaTransactionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return [
    {
      txRef: 'omniscope_sample_101',
      userId: 'usr_abebe_01',
      email: 'abebe.bekele@telebirr.et',
      amount: 300,
      currency: 'ETB',
      status: 'success',
      createdAt: Date.now() - 3600000 * 2,
      method: 'Telebirr (Chapa)'
    },
    {
      txRef: 'omniscope_sample_102',
      userId: 'usr_selam_02',
      email: 'selamawit.t@cbe.com.et',
      amount: 300,
      currency: 'ETB',
      status: 'success',
      createdAt: Date.now() - 3600000 * 18,
      method: 'CBE Birr (Chapa)'
    },
    {
      txRef: 'omniscope_sample_103',
      userId: 'usr_dawit_03',
      email: 'dawit.m@aau.edu.et',
      amount: 300,
      currency: 'ETB',
      status: 'pending',
      createdAt: Date.now() - 3600000 * 42,
      method: 'Amole (Chapa)'
    }
  ];
}

export function getStoredAuditLogs(): AuditLogItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return [
    {
      id: 'log-1',
      action: 'PLATFORM_INITIALIZED',
      details: 'OmniScope Central Hub launched with 6 opportunity applications',
      adminEmail: 'system@omniscope.et',
      timestamp: Date.now() - 86400000
    }
  ];
}

export async function saveBanners(banners: BannerSlide[], adminEmail = 'superadmin'): Promise<void> {
  localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
  try {
    await setDoc(doc(db, 'config', 'banners'), { items: banners, updatedAt: Date.now() }, { merge: true });
  } catch (e) {
    console.warn('Firestore banners sync:', e);
  }
  logAuditAction('BANNERS_UPDATED', `Saved ${banners.length} banner slides`, adminEmail);
}

export async function saveApps(apps: AppService[], adminEmail = 'superadmin'): Promise<void> {
  localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(apps));
  try {
    await setDoc(doc(db, 'config', 'applications'), { items: apps, updatedAt: Date.now() }, { merge: true });
  } catch (e) {
    console.warn('Firestore apps sync:', e);
  }
  logAuditAction('APPS_CATALOG_UPDATED', `Updated catalog (${apps.length} apps)`, adminEmail);
}

export async function saveSettings(settings: SystemSettings, adminEmail = 'superadmin'): Promise<void> {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  try {
    await setDoc(doc(db, 'config', 'settings'), { ...settings, updatedAt: Date.now() }, { merge: true });
  } catch (e) {
    console.warn('Firestore settings sync:', e);
  }
  logAuditAction('SETTINGS_UPDATED', `Modified platform configurations`, adminEmail);
}

export function logAuditAction(action: string, details: string, adminEmail: string): void {
  const currentLogs = getStoredAuditLogs();
  const newLog: AuditLogItem = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    action,
    details,
    adminEmail,
    timestamp: Date.now()
  };
  const updated = [newLog, ...currentLogs.slice(0, 49)];
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
}

export function recordTransaction(tx: ChapaTransactionRecord): void {
  const current = getStoredTransactions();
  const existingIndex = current.findIndex(t => t.txRef === tx.txRef);
  let updated: ChapaTransactionRecord[];
  if (existingIndex >= 0) {
    current[existingIndex] = tx;
    updated = [...current];
  } else {
    updated = [tx, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
}
