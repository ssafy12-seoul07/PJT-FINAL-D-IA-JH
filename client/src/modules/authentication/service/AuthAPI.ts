import { API_BASE_URL } from '@/shared/constants/API'
import { useAuthStore } from '../store/auth'
import axios from 'axios'
import type {
  LoginFormProps,
  RegisterBodyInterface,
} from '../interface/AuthenticationInterface'
import { ErrorHandlingService } from '@/shared/service/ErrorHandling'

// API 클래스를 함수로 변경
export function useAuthAPI() {
  const authStore = useAuthStore()

  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
  })

  // 요청 인터셉터 설정
  api.interceptors.request.use((config) => {
    const token = authStore.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // 응답 인터셉터에 ErrorHandling 적용
  ErrorHandlingService.setupInterceptors(api)

  return {
    async postAuthSignUp(body: RegisterBodyInterface) {
      const response = await api.post('/auth/signup', body)
      return response.data.data
    },

    async postAuthLogin(body: LoginFormProps) {
      const response = await api.post('/auth/login', body)
      return response.data.data
    },

    async getUserInfo() {
      const response = await api.get(`/users/my`)
      return response.data.data
    },

    async getFamilyInfo() {
      const response = await api.get(`/families/my`)
      return response.data.data
    },
  }
}
