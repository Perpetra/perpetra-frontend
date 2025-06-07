import { darkTheme, RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { WagmiProvider, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'

import { WALLETCONNECT_PROJECT_ID } from '@/lib/constants'

import type { PropsWithChildren } from 'react'

const config = getDefaultConfig({
  appName: 'Perpetra',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
})

const queryClient = new QueryClient()

export function Providers({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: 'oklch(0.205 0 0)',
            accentColorForeground: 'oklch(0.985 0 0)',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
