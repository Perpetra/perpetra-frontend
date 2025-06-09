import { useQuery, useMutation } from '@tanstack/react-query'

import { API_ROUTES, QUERY_KEYS } from '@/lib/constants'
import type {
  FundingBalanceResponse,
  DepositRequest,
  WithdrawRequest,
  CreateOrderRequest,
  OrderResponse,
  Order,
  Position,
  ClosePositionRequest,
  Trade,
  Network,
} from '@/lib/types'

import { axiosInstance } from './axios'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const IS_MOCK_ENABLED = true

const mockBalance: FundingBalanceResponse = { balance: '1523.12' }
const mockOrders: Order[] = [
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
  { id: '1', type: 'long', amount: 100, leverage: 5, status: 'active', result: null },
]
const mockPositions: Position[] = [{ id: '1', type: 'short', entryPrice: 28000, currentPrice: 27500, pnl: 2 }]
const mockTrades: Trade[] = [
  {
    id: '1',
    type: 'long',
    entryPrice: 27000,
    closePrice: 28500,
    size: 500,
    result: 'win',
    closedAt: new Date().toISOString(),
  },
]

export const useGetFundingBalance = (address: string, network: Network) =>
  useQuery({
    queryKey: QUERY_KEYS.funding.balance(network),
    queryFn: async (): Promise<FundingBalanceResponse> => {
      if (IS_MOCK_ENABLED) {
        await delay(300)
        return mockBalance
      }
      const res = await axiosInstance.get(API_ROUTES.funding.balance, {
        params: { address, network },
      })
      return res.data
    },
    enabled: !!address && !!network,
  })

export const usePostDeposit = () =>
  useMutation({
    mutationFn: async (data: DepositRequest) => {
      if (IS_MOCK_ENABLED) {
        await delay(300)
        return
      }
      return axiosInstance.post(API_ROUTES.funding.deposit, data)
    },
  })

export const usePostWithdraw = () =>
  useMutation({
    mutationFn: async (data: WithdrawRequest) => {
      if (IS_MOCK_ENABLED) {
        await delay(300)
        return
      }
      return axiosInstance.post(API_ROUTES.funding.withdraw, data)
    },
  })

export const useCreateOrder = () =>
  useMutation({
    mutationFn: async (data: CreateOrderRequest): Promise<OrderResponse> => {
      if (IS_MOCK_ENABLED) {
        await delay(500)
        return { id: 'mock-order-id', status: 'received' }
      }
      const res = await axiosInstance.post(API_ROUTES.orders.create, data)
      return res.data
    },
  })

export const useGetOrders = (address: string) =>
  useQuery({
    queryKey: QUERY_KEYS.orders.list,
    queryFn: async (): Promise<Order[]> => {
      if (IS_MOCK_ENABLED) {
        await delay(300)
        return mockOrders
      }
      const res = await axiosInstance.get(API_ROUTES.orders.list, {
        params: { address },
      })
      return res.data
    },
    enabled: !!address,
  })

export const useGetPositions = (address: string) =>
  useQuery({
    queryKey: QUERY_KEYS.positions.list,
    queryFn: async (): Promise<Position[]> => {
      if (IS_MOCK_ENABLED) {
        await delay(300)
        return mockPositions
      }
      const res = await axiosInstance.get(API_ROUTES.positions.list, {
        params: { address },
      })
      return res.data
    },
    enabled: !!address,
  })

export const useClosePosition = () =>
  useMutation({
    mutationFn: async (data: ClosePositionRequest) => {
      if (IS_MOCK_ENABLED) {
        await delay(300)
        return
      }
      return axiosInstance.post(API_ROUTES.positions.close, data)
    },
  })

export const useGetTradeHistory = (address: string) =>
  useQuery({
    queryKey: QUERY_KEYS.trades.history,
    queryFn: async (): Promise<Trade[]> => {
      if (IS_MOCK_ENABLED) {
        await delay(300)
        return mockTrades
      }
      const res = await axiosInstance.get(API_ROUTES.trades.history, {
        params: { address },
      })
      return res.data
    },
    enabled: !!address,
  })
