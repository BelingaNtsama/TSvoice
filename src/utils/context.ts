// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Pour persister l'état
import { toast } from 'sonner';
import { mockUsers, createMockUser } from '../utils/mockUser';
import type { User, PlanType } from '../utils/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, plan: PlanType) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const foundUser = mockUsers.find((u) => u.email === email);

        if (foundUser && password === 'demo123') {
          set({ user: foundUser, isLoading: false });
          toast({
            title: 'Connexion réussie',
            description: `Bienvenue ${foundUser.name} !`,
          });
          return true;
        }

        set({ isLoading: false });
        toast({
          title: 'Erreur de connexion',
          description: 'Email ou mot de passe incorrect',
          variant: 'destructive',
        });
        return false;
      },

      register: async (email, password, name, plan) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const existingUser = mockUsers.find((u) => u.email === email);
        if (existingUser) {
          set({ isLoading: false });
          toast({
            title: "Erreur d'inscription",
            description: 'Cet email est déjà utilisé',
            variant: 'destructive',
          });
          return false;
        }

        const newUser = createMockUser(email, name, plan);
        mockUsers.push(newUser);
        set({ user: newUser, isLoading: false });
        toast({
          title: 'Inscription réussie',
          description: `Bienvenue ${newUser.name} ! Votre plan ${plan} est activé.`,
        });
        return true;
      },

      logout: () => {
        set({ user: null });
        toast({
          title: 'Déconnexion',
          description: 'À bientôt !',
        });
      },
    }),
    {
      name: 'auth-storage', // Nom unique pour localStorage
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Optionnel: peut être utilisé pour effectuer des actions après la réhydratation
      },
    }
  )
);
