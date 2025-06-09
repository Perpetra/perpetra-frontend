import { PropsWithChildren, useEffect } from 'react'
import { useAccount } from 'wagmi'

import { useAuthStore } from '@/lib/authStore'

export function WalletAuthGuard({ children }: PropsWithChildren) {
  const { address, isConnected } = useAccount()
  const { authenticatedAddress, logout } = useAuthStore()

  useEffect(() => {
    if (!isConnected || !address || !authenticatedAddress) return

    if (address.toLowerCase() !== authenticatedAddress.toLowerCase()) {
      logout()
    }
  }, [address, isConnected, authenticatedAddress, logout])

  return <>{children}</>
}
