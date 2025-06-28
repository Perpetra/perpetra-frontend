import { Address } from 'viem'

export type SupportedChainId = 11155111 | 84532

export type DepositContractMap = {
  usdc: Address
  depositContract: Address
}

export type FundingBalanceResponse = {
  balance: string
}

export type CreateOrderRequest = {
  type: 'long' | 'short'
  amount: number
  leverage: number
  limitPrice?: number
  expiresAt?: string
}
export type AuthRequest = {
  address: string
  signature: string
  message: string
}
export type AuthResponse = {
  token: string
}
export type DarkPoolSummaryResponse = {
  lastExecutionPrice: number
  dailyVolume: number
}

export type OrderResponse = {
  id: string
  status: 'received'
}

export type Order = {
  id: string
  type: 'long' | 'short'
  amount: number
  leverage: number
  status: 'open' | 'cancelled'
  limitPrice?: number
  expiresAt?: string
}

export type Position = {
  id: string
  type: 'long' | 'short'
  entryPrice: number
  currentPrice: number
  pnl: number
}

export type ClosePositionRequest = {
  positionId: string
}

export type Trade = {
  id: string
  type: 'long' | 'short'
  entryPrice: number
  closePrice: number
  size: number
  result: 'win' | 'loss'
  closedAt: string
}
