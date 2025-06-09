import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { WalletAuthGuard } from '@/components/WalletAccountGuard'
import { wagmiConfig } from '@/lib/wagmiConfig'

import type { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
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
          <WalletAuthGuard>{children}</WalletAuthGuard>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
