import { useWriteContract } from 'wagmi'

import { useDepositContracts } from '@/hooks/useDepositContracts'
import { DEPOSIT_ABI } from '@/lib/constants'

export function useWithdraw() {
  const { writeContractAsync, isPending, error } = useWriteContract()
  const depositContracts = useDepositContracts()

  const withdraw = async (amount: bigint) => {
    if (!depositContracts) return

    return writeContractAsync({
      address: depositContracts?.depositContract,
      abi: DEPOSIT_ABI,
      functionName: 'requestWithdraw',
      args: [amount],
    })
  }

  return {
    withdraw,
    isPending,
    error,
  }
}
