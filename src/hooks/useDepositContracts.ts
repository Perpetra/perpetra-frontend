import { useAccount, useChainId } from 'wagmi'

import { DEPOSIT_CONTRACTS } from '@/lib/constants'
import { SupportedChainId, DepositContractMap } from '@/lib/types'

export function useDepositContracts(): DepositContractMap | undefined {
  const chainId = useChainId()
  const { isConnected } = useAccount()

  if (!isConnected || !chainId || !Object.hasOwn(DEPOSIT_CONTRACTS, chainId)) return

  return DEPOSIT_CONTRACTS[chainId as SupportedChainId]
}
