import { API_BASE_URL } from '@/shared/constants/API'
import { useAuthStore } from '../store/auth'
import axios from 'axios'
import type {
  LoginFormProps,
  RegisterBodyInterface,
} from '../interface/AuthenticationInterface'
import { useErrorHandling } from '@/shared/composables/useErrorHandling'

// API 클래스를 함수로 변경
export function useAuthAPI() {
  const authStore = useAuthStore()
  const { setupInterceptors } = useErrorHandling()

  const createAPIInstance = () => {
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

    // 응답 인터셉터 설정
    setupInterceptors(api)

    return api
  }

  const api = createAPIInstance()

  const postAuthSignup = async (body: RegisterBodyInterface) => {
    const {
      data: { body: responseBody },
    } = await api.post('/auth/signup', body)
    return responseBody
  }

  const postAuthLogin = async (body: LoginFormProps) => {
    const {
      data: { body: responseBody },
    } = await api.post('/auth/login', body)
    return responseBody
  }

  return {
    postAuthSignup,
    postAuthLogin,
  }
}
