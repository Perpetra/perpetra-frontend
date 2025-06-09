import { formatUnits } from 'viem'

export function formatUSDCAmount(value: bigint | string): string {
  return formatUnits(BigInt(value), 6)
}
