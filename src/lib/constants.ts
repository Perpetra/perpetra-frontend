export const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ''

export const API_URL = 'https://perpetra-api.aftermiracle.com'

export const API_ROUTES = {
  auth: '/auth',
  funding: {
    balance: '/funding/balance',
    deposit: '/funding/deposit',
    withdraw: '/funding/withdraw',
  },
  orders: '/orders',
  positions: '/positions',
  positionsClose: '/positions/close',
  trades: '/trades',
}

export const QUERY_KEYS = {
  balance: ['balance'],
  orders: ['orders'],
  positions: ['positions'],
  trades: ['trades'],
}

export const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
export const VAULT_ADDRESS = '0x4BB3f2fD69dceFf340A1cDb61C2B1F503dcAb8A5'

export const VAULT_ABI = [
  {
    name: 'deposit',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    outputs: [],
  },
]
