import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Logo } from '@/assets/Logo'
import { Funding } from '@/components/Header/Funding'

export function Header() {
  const { isConnected } = useAccount()

  return (
    <header className='flex items-center justify-between p-4'>
      <a className='flex items-center gap-2' href='/'>
        <Logo />
        <div className='font-bold text-xl'>Perpetra</div>
      </a>
      <div className='flex items-center gap-3'>
        {isConnected && <Funding />}
        <ConnectButton chainStatus='icon' accountStatus='address' showBalance={false} />
      </div>
    </header>
  )
}
