import { useState } from 'react'
import { erc20Abi } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import { USDC_ADDRESS, VAULT_ADDRESS, VAULT_ABI } from '@/lib/constants'

export function useDeposit() {
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [isPending, setIsPending] = useState(false)

  const deposit = async (amount: bigint) => {
    if (!address) throw new Error('Wallet not connected')

    try {
      setIsPending(true)
      // Step 1: Approve Vault to spend USDC
      await writeContractAsync({
        address: USDC_ADDRESS,
        abi: erc20Abi,
        functionName: 'approve',
        args: [VAULT_ADDRESS, amount],
      })

      // Step 2: Call deposit on Vault
      await writeContractAsync({
        address: VAULT_ADDRESS,
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
