import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { baseSepolia, sepolia, avalancheFuji } from 'wagmi/chains'

import { WALLETCONNECT_PROJECT_ID } from '@/lib/constants'

export const wagmiConfig = getDefaultConfig({
  appName: 'Perpetra',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [sepolia, avalancheFuji, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [avalancheFuji.id]: http(),
    [baseSepolia.id]: http(),
  },
})
