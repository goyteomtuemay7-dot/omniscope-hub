import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import type { UserProfile } from '../types';

export const firebaseConfig = {
  apiKey: "AIzaSyD-4iSzPK-FwTgX2qxNcpTtjkhz_U24AiU",
  authDomain: "omniscope-hub.firebaseapp.com",
  projectId: "omniscope-hub",
  storageBucket: "omniscope-hub.firebasestorage.app",
  messagingSenderId: "463968399883",
  appId: "1:463968399883:web:ea1a87e72194df951f0d0e",
};

// Initialize Firebase
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

/**
 * Ensures a user document exists in Firestore path `users/{userId}`
 * Default fields per specification:
 * - email: string
 * - subscriptionStatus: "inactive"
 * - planType: "none"
 * - validUntil: null
 */
export async function syncUserDocument(user: User): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const initialData = {
      email: user.email || '',
      subscriptionStatus: 'inactive' as const,
      planType: 'none',
      validUntil: null,
      displayName: user.displayName || user.email?.split('@')[0] || 'Omniscope Member',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userRef, initialData);
    return {
      uid: user.uid,
      ...initialData,
      photoURL: user.photoURL,
    };
  }

  const data = snap.data();
  return {
    uid: user.uid,
    email: data.email || user.email || '',
    displayName: data.displayName || user.displayName || user.email?.split('@')[0] || 'Omniscope Member',
    photoURL: user.photoURL,
    subscriptionStatus: data.subscriptionStatus || 'inactive',
    planType: data.planType || 'none',
    validUntil: data.validUntil || null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/**
 * Update user subscription directly (used for confirmation/activation)
 */
export async function updateUserSubscription(
  userId: string,
  subscriptionStatus: 'active' | 'inactive',
  planType: string = 'monthly_etb',
  validUntilDays: number = 30
) {
  const userRef = doc(db, 'users', userId);
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + validUntilDays);

  const updatePayload = {
    subscriptionStatus,
    planType,
    validUntil: Timestamp.fromDate(expiryDate),
    updatedAt: serverTimestamp(),
  };

  await updateDoc(userRef, updatePayload);
  return updatePayload;
}
