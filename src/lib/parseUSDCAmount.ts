import { parseUnits } from 'viem'

export function parseUSDCAmount(value: string): bigint {
  return parseUnits(value, 6)
}
