import { useState } from 'react'
import { erc20Abi } from 'viem'
import { useWriteContract } from 'wagmi'

import { useDepositContracts } from '@/hooks/useDepositContracts'
import { DEPOSIT_ABI } from '@/lib/constants'

export function useDeposit() {
  const { writeContractAsync } = useWriteContract()
  const [isPending, setIsPending] = useState(false)
  const depositContracts = useDepositContracts()

  const deposit = async (amount: bigint) => {
    if (!depositContracts) return

    try {
      setIsPending(true)
      // Step 1: Approve Vault to spend USDC
      await writeContractAsync({
        address: depositContracts.usdc,
        abi: erc20Abi,
        functionName: 'approve',
        args: [depositContracts.depositContract, amount],
      })

      // Step 2: Call deposit on Vault
      await writeContractAsync({
        address: depositContracts.depositContract,
        abi: DEPOSIT_ABI,
        functionName: 'deposit',
        args: [amount],
      })
    } finally {
      setIsPending(false)
    }
  }

  return { deposit, isPending }
}
