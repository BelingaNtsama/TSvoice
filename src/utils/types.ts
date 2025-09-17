export type PlanType = 'gratuit' | 'simple' | 'entreprise';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: PlanType;
  credits: number;
  maxCredits: number;
  features: string[];
  joinDate: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, plan: PlanType) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  faqItems: FAQItem[]; // Obligatoire : tableau d'éléments FAQ
}