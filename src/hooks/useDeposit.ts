import { erc20Abi } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import { USDC_ADDRESS, VAULT_ADDRESS, VAULT_ABI } from '@/lib/constants'
import { parseUSDCAmount } from '@/lib/parseUSDCAmount'

export function useDeposit() {
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const deposit = async (value: string) => {
    if (!address) throw new Error('Wallet not connected')

    const amount = parseUSDCAmount(value)

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
  }

  return { deposit }
}
