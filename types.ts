
export enum PricingZone {
  AFRICA = 'AFRICA',
  EUROPE = 'EUROPE',
  GLOBAL = 'GLOBAL'
}

export type Language = 'fr' | 'en' | 'it' | 'es';
export type TimeFormat = '24h' | '12h' | 'seconds';

export interface AIPersona {
  name: string;
  role: string;
  philosophy: string;
  tonality: string;
  coreValues: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Contenu riche (Markdown-like)
  starkInsight: string;
  practicalExercise: string;
  quiz?: QuizQuestion[];
}

export interface AcademyModule {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  isPremium?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  parts: { text: string }[];
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read';
}

export interface CloneInstance {
  id: string;
  name: string;
  primaryColor: string;
  catalogType: 'neolife' | 'custom';
  url: string;
}

export interface ReferralContext {
  referrerId: string;
  referrerName: string;
  shopUrl?: string;
  language?: Language;
}

export interface DashboardStats {
  prospects: number;
  salesVolume: number;
  subscriptionMRR: number;
  commissions: number;
  conversions: number;
  activeAffiliates: number;
}

export interface AdminMonitorStats {
  totalNetSaaS: number;
  aiEffectiveness: number;
  orphanLeadsCount: number;
  totalActiveHubs: number;
}

export interface WhiteLabelInstance {
  id: string;
  clientName: string;
  industry: string;
  aiName: string;
  currency: string;
  primaryColor: string;
  catalogType: 'neolife' | 'custom';
  logoUrl: string;
  setupFee: number;
  royaltyRate: number;
  isLocked: boolean;
  deploymentDate: Date;
  status: 'ACTIVE' | 'PENDING' | 'LOCKED';
}
