import axios from 'axios'

import { API_URL } from '@/lib/constants'

export const axiosInstance = axios.create({ baseURL: API_URL })
