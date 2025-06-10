import { parseUnits } from 'viem'

export function parseUSDCAmount(value: string | number): bigint {
  return parseUnits(String(value), 6)
}
