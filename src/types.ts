export type Language = 'en' | 'am' | 'om' | 'ti';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  subscriptionStatus: 'inactive' | 'active' | 'cancelled';
  planType: string;
  validUntil: any | null; // Firestore Timestamp or string or null
  role?: 'user' | 'super_admin';
  createdAt?: any;
  updatedAt?: any;
}

export interface ChapaInitRequest {
  email: string;
  amount?: number;
  userId: string;
  returnUrl?: string;
}

export interface ChapaInitResponse {
  status: 'success' | 'error';
  message: string;
  checkoutUrl?: string;
  txRef?: string;
  isSimulated?: boolean;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  bgGradient?: string;
  active: boolean;
  order: number;
}

export interface AppService {
  id: string;
  name: string;
  codeName: string;
  tagline: string;
  description: string;
  mainPurpose: string;
  status: 'active' | 'coming_soon';
  icon: string;
  category: string;
  badge?: string;
  stats?: string;
  features: string[];
  externalUrl?: string;
  order?: number;
}

export interface SystemSettings {
  platformName: string;
  tagline: string;
  address: string;
  contactEmail: string;
  phone?: string;
  subscriptionPriceETB: number;
  currency: string;
  bannerIntervalSeconds: number;
}

export interface EthiopianJob {
  id: string;
  title: string;
  organization: string;
  category: 'Tech' | 'NGO' | 'Finance' | 'Engineering' | 'Healthcare';
  location: string;
  type: 'Full-time' | 'Remote' | 'Contract';
  salaryETB: string;
  deadline: string;
  urgent?: boolean;
  featured?: boolean;
}

export interface ChapaTransactionRecord {
  txRef: string;
  userId: string;
  email: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: number;
  method?: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  details: string;
  adminEmail: string;
  timestamp: number;
}
