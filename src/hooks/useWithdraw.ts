import { useWriteContract } from 'wagmi'

import { VAULT_ADDRESS, VAULT_ABI } from '@/lib/constants'
import { parseUSDCAmount } from '@/lib/parseUSDCAmount'

export function useWithdraw() {
  const { writeContractAsync, isPending, error } = useWriteContract()

  const withdraw = async (amount: string) => {
    const parsedAmount = parseUSDCAmount(amount)

    return writeContractAsync({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'withdraw',
      args: [parsedAmount],
    })
  }

  return {
    withdraw,
    isPending,
    error,
  }
}
