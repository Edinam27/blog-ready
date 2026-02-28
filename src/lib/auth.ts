
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// This is a simple mock authentication
// In a real application, you would use a proper authentication system
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simple admin auth (in production use a proper auth system)
        if (email === 'admin@example.com' && password === 'ekajiEKAJI1$') {
          const user = {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin' as const,
          };
          
          set({ user, isLoggedIn: true, isLoading: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
