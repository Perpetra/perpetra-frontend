import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Logo } from '@/assets/Logo'
import { Funding } from '@/components/Header/Funding'
import { SignMessageButton } from '@/components/Header/SignMessageButton'
import { useAuthStore } from '@/lib/authStore'

export function Header() {
  const { isConnected } = useAccount()
  const { hasToken } = useAuthStore()

  return (
    <header className='flex items-center justify-between p-4'>
      <a className='flex items-center gap-2' href='/'>
        <Logo />
        <div className='font-bold text-xl'>Perpetra</div>
      </a>
      <div className='flex items-center gap-3'>
        {isConnected && (hasToken() ? <Funding /> : <SignMessageButton />)}
        <ConnectButton chainStatus='icon' accountStatus='address' showBalance={false} />
      </div>
    </header>
  )
}
