import { useQuery, useMutation } from '@tanstack/react-query'

import { API_ROUTES, QUERY_KEYS } from '@/lib/constants'
import {
  FundingBalanceResponse,
  CreateOrderRequest,
  OrderResponse,
  Order,
  Position,
  ClosePositionRequest,
  Trade,
  AuthRequest,
  AuthResponse,
  DarkPoolSummaryResponse,
} from '@/lib/types'

import { axiosInstance } from './axios'

export const useGetFundingBalance = () =>
  useQuery({
    queryKey: QUERY_KEYS.balance,
    queryFn: async (): Promise<FundingBalanceResponse> => {
      const res = await axiosInstance.get(API_ROUTES.balance)
      return res.data
    },
  })

export const useCreateOrder = () =>
  useMutation({
    mutationFn: async (data: CreateOrderRequest): Promise<OrderResponse> => {
      const res = await axiosInstance.post(API_ROUTES.orders, data)
      return res.data.data
    },
  })

export const useGetOrders = () =>
  useQuery({
    queryKey: QUERY_KEYS.orders,
    queryFn: async (): Promise<Order[]> => {
      const res = await axiosInstance.get(API_ROUTES.orders)
      return res.data?.data
    },
    refetchInterval: 1000,
  })

export const useGetPositions = () =>
  useQuery({
    queryKey: QUERY_KEYS.positions,
    queryFn: async (): Promise<Position[]> => {
      const res = await axiosInstance.get(API_ROUTES.positions)
      return res.data?.data
    },
    refetchInterval: 1000,
  })

export const useClosePosition = () =>
  useMutation({
    mutationFn: (data: ClosePositionRequest) => axiosInstance.post(API_ROUTES.positionsClose, data),
  })

export const useGetTradeHistory = () =>
  useQuery({
    queryKey: QUERY_KEYS.trades,
    queryFn: async (): Promise<Trade[]> => {
      const res = await axiosInstance.get(API_ROUTES.trades)
      return res.data?.data
    },
    refetchInterval: 1000,
  })

export const useAuth = () => {
  return useMutation({
    mutationFn: async (data: AuthRequest) => {
      const response = await axiosInstance.post<AuthResponse>(API_ROUTES.auth, data)
      return response.data
    },
  })
}

export const useGetDarkPoolSummary = () => {
  return useQuery({
    queryKey: QUERY_KEYS.darkPoolSummary,
    queryFn: async (): Promise<DarkPoolSummaryResponse> => {
      const res = await axiosInstance.get(API_ROUTES.darkPoolSummary)
      return res.data
    },
  })
}
