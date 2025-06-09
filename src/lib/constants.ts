export const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ''

export const API_URL = '/api'

export const API_ROUTES = {
  funding: {
    balance: '/v1/funding/balance',
    deposit: '/v1/funding/deposit',
    withdraw: '/v1/funding/withdraw',
  },
  orders: {
    create: '/v1/orders',
    list: '/v1/orders',
  },
  positions: {
    list: '/v1/positions',
    close: '/v1/positions/close',
  },
  trades: {
    history: '/v1/trades',
  },
}

export const QUERY_KEYS = {
  funding: {
    balance: (network?: string) => ['fundingBalance', network] as const,
  },
  orders: {
    list: ['orders'],
  },
  positions: {
    list: ['positions'],
  },
  trades: {
    history: ['trades'],
  },
}
