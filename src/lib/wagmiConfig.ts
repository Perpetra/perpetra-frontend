import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { baseSepolia, sepolia } from 'wagmi/chains'

import { WALLETCONNECT_PROJECT_ID } from '@/lib/constants'

export const wagmiConfig = getDefaultConfig({
  appName: 'Perpetra',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [sepolia, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
})
