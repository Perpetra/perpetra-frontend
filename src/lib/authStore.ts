import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  authenticatedAddress: string | null
  login: (token: string, address: string) => void
  logout: () => void
  clearToken: () => void
  hasToken: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      authenticatedAddress: null,
      login: (token, address) => set({ token, authenticatedAddress: address }),
      logout: () => set({ token: null, authenticatedAddress: null }),
      clearToken: () => set((prev) => ({ ...prev, token: null })),
      hasToken: () => Boolean(get().token),
    }),
    {
      name: 'auth',
      partialize: (state) => ({ token: state.token, authenticatedAddress: state.authenticatedAddress }),
    },
  ),
)
