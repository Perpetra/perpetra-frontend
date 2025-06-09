import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { avalanche, base, mainnet } from 'wagmi/chains'

import { WALLETCONNECT_PROJECT_ID } from '@/lib/constants'

export const wagmiConfig = getDefaultConfig({
  appName: 'Perpetra',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, avalanche, base],
  transports: {
    [mainnet.id]: http(),
    [avalanche.id]: http(),
    [base.id]: http(),
  },
})
