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
