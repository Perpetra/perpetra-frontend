export type Network = 'Ethereum' | 'Avalanche' | 'Base'

export type FundingBalanceResponse = {
  balance: string
}

export type DepositRequest = {
  address: string
  network: Network
  txHash: string
  amount: string
}

export type WithdrawRequest = DepositRequest

export type CreateOrderRequest = {
  address: string
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

export type OrderResponse = {
  id: string
  status: 'received'
}

export type Order = {
  id: string
  type: 'long' | 'short'
  amount: number
  leverage: number
  status: 'active' | 'executed' | 'cancelled'
  result?: 'win' | 'loss' | null
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
