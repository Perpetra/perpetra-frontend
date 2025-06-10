import { useWriteContract } from 'wagmi'

import { VAULT_ADDRESS, VAULT_ABI } from '@/lib/constants'

export function useWithdraw() {
  const { writeContractAsync, isPending, error } = useWriteContract()

  const withdraw = async (amount: bigint) =>
    writeContractAsync({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'withdraw',
      args: [amount],
    })

  return {
    withdraw,
    isPending,
    error,
  }
}
