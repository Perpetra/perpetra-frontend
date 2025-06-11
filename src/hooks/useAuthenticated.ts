import { useAccount } from 'wagmi'

import { useAuthStore } from '@/lib/authStore'

export function useAuthenticated() {
  const { hasToken } = useAuthStore()
  const { isConnected } = useAccount()

  return hasToken() && isConnected
}
