import { useAccount, useChainId } from 'wagmi'

import { VAULT_CONTRACTS } from '@/lib/constants'
import { SupportedChainId, VaultContractMap } from '@/lib/types'

export function useVaultContracts(): VaultContractMap | undefined {
  const chainId = useChainId()
  const { isConnected } = useAccount()

  if (!isConnected || !chainId || !Object.hasOwn(VAULT_CONTRACTS, chainId)) return

  return VAULT_CONTRACTS[chainId as SupportedChainId]
}
