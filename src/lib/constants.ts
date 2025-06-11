import { SupportedChainId, VaultContractMap } from '@/lib/types'

export const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ''

export const API_URL = 'https://perpetra-api.aftermiracle.com'

export const API_ROUTES = {
  auth: '/auth',
  balance: '/funding/balance',
  orders: '/orders',
  positions: '/positions',
  positionsClose: '/positions/close',
  trades: '/trades',
  darkPoolSummary: '/darkpool/summary',
}

export const QUERY_KEYS = {
  balance: ['balance'],
  orders: ['orders'],
  positions: ['positions'],
  trades: ['trades'],
  darkPoolSummary: ['darkPoolSummary'],
}

export const VAULT_CONTRACTS: Record<SupportedChainId, VaultContractMap> = {
  // sepolia
  11155111: {
    // https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238
    usdc: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    // https://sepolia.etherscan.io/address/0x4bb3f2fd69dceff340a1cdb61c2b1f503dcab8a5
    vault: '0x4BB3f2fD69dceFf340A1cDb61C2B1F503dcAb8A5',
  },
  // baseSepolia
  84532: {
    // https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e
    usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    // https://sepolia.basescan.org/address/0xb8A45224783767C6Fd2b3845c60ea5B87138a8f4
    vault: '0xb8A45224783767C6Fd2b3845c60ea5B87138a8f4',
  },
  // avalancheFuji
  43113: {
    usdc: '0x333...',
    vault: '0xccc...',
  },
}

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
