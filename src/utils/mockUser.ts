import type { User, PlanType } from "./types";

export const PLAN_FEATURES = {
  gratuit: ['100 crédits/mois', 'Voix de base', 'Fichiers MP3', 'Support communautaire'],
  simple: [
    '1000 crédits/mois',
    'Toutes les voix',
    'Fichiers MP3 & WAV',
    'Clonage de voix (1 voix)',
    'Support email',
  ],
  entreprise: [
    'Crédits illimités',
    'Voix premium',
    'Tous formats audio',
    'Clonage illimité',
    'API access',
    'Support prioritaire',
    'Intégrations personnalisées',
  ],
};

export const PLAN_CREDITS = {
  gratuit: { current: 45, max: 100 },
  simple: { current: 750, max: 1000 },
  entreprise: { current: 999999, max: 999999 },
};

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@gratuit.com',
    name: 'Utilisateur Gratuit',
    plan: 'gratuit',
    credits: 45,
    maxCredits: 100,
    features: PLAN_FEATURES.gratuit,
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    email: 'demo@simple.com',
    name: 'Utilisateur Simple',
    plan: 'simple',
    credits: 750,
    maxCredits: 1000,
    features: PLAN_FEATURES.simple,
    joinDate: '2024-02-10',
  },
  {
    id: '3',
    email: 'demo@entreprise.com',
    name: 'Utilisateur Entreprise',
    plan: 'entreprise',
    credits: 999999,
    maxCredits: 999999,
    features: PLAN_FEATURES.entreprise,
    joinDate: '2024-03-05',
  },
];

// Fonction pour créer un nouvel utilisateur selon le plan
export const createMockUser = (email: string, name: string, plan: PlanType): User => {
  const planData = PLAN_CREDITS[plan];
  return {
    id: Date.now().toString(),
    email,
    name,
    plan,
    credits: planData.current,
    maxCredits: planData.max,
    features: PLAN_FEATURES[plan],
    joinDate: new Date().toISOString().split('T')[0],
  };
};
