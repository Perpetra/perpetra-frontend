import axios from 'axios'

import { useAuthStore } from '@/lib/authStore'
import { API_URL } from '@/lib/constants'

export const axiosInstance = axios.create({ baseURL: API_URL })

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearToken()
    }

    return Promise.reject(error)
  },
)
