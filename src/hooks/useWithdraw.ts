import { useWriteContract } from 'wagmi'

import { useVaultContracts } from '@/hooks/useVaultContracts'
import { VAULT_ABI } from '@/lib/constants'

export function useWithdraw() {
  const { writeContractAsync, isPending, error } = useWriteContract()
  const vaultContracts = useVaultContracts()

  const withdraw = async (amount: bigint) => {
    if (!vaultContracts) return

    return writeContractAsync({
      address: vaultContracts.vault,
      abi: VAULT_ABI,
      functionName: 'withdraw',
      args: [amount],
    })
  }

  return {
    withdraw,
    isPending,
    error,
  }
}
