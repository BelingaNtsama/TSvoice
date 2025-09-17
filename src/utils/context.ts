// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import { mockUsers, createMockUser } from '../utils/mockUser';
import type { User, PlanType } from '../utils/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, plan: PlanType) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
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
          toast.success(`Bienvenue ${foundUser.name} !`);
          return true;
        }

        set({ isLoading: false });
        toast.error('Email ou mot de passe incorrect');
        return false;
      },

      register: async (email: string, password: string, name: string, plan: PlanType) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));
      
        const existingUser = mockUsers.find((u) => u.email === email);
        console.log(password)
        if (existingUser) {
          set({ isLoading: false });
          toast.error('Cet email est déjà utilisé');
          return false;
        }
      
        const newUser = createMockUser(email, name, plan);
        mockUsers.push(newUser);
        set({ user: newUser, isLoading: false });
        toast.success(`Bienvenue ${newUser.name} ! Votre plan ${plan} est activé.`);
        return true;
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const googleUser = createMockUser('google@user.com', 'Google User', 'gratuit');
        mockUsers.push(googleUser); // Optionnel si tu veux le stocker
        set({ user: googleUser, isLoading: false });

        toast.success(`Connecté avec Google : ${googleUser.name}`);
        return true;
      },

      logout: () => {
        set({ user: null });
        toast.info('Déconnexion réussie. À bientôt !');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => () => {
        // Tu peux afficher un toast ou synchroniser ici si besoin
      },
    }
  )
);
