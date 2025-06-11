import { useState } from 'react'
import { erc20Abi } from 'viem'
import { useWriteContract } from 'wagmi'

import { useVaultContracts } from '@/hooks/useVaultContracts'
import { VAULT_ABI } from '@/lib/constants'

export function useDeposit() {
  const { writeContractAsync } = useWriteContract()
  const [isPending, setIsPending] = useState(false)
  const vaultContracts = useVaultContracts()

  const deposit = async (amount: bigint) => {
    if (!vaultContracts) return

    try {
      setIsPending(true)
      // Step 1: Approve Vault to spend USDC
      await writeContractAsync({
        address: vaultContracts.usdc,
        abi: erc20Abi,
        functionName: 'approve',
        args: [vaultContracts.vault, amount],
      })

      // Step 2: Call deposit on Vault
      await writeContractAsync({
        address: vaultContracts.vault,
        abi: VAULT_ABI,
        functionName: 'deposit',
        args: [amount],
      })
    } finally {
      setIsPending(false)
    }
  }

  return { deposit, isPending }
}
