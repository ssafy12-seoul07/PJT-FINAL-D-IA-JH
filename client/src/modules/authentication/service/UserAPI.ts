import { API_BASE_URL } from '@/shared/constants/API'
import { useAuthStore } from '../store/auth'
import axios from 'axios'
import { useErrorHandling } from '@/shared/composables/useErrorHandling'

// API 클래스를 함수로 변경
export function useUserAPI() {
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

  const getUserInfo = async () => {
    const {
      data: { body: responseBody },
    } = await api.get('/users/my')
    return responseBody
  }

  const getFamilyInfo = async () => {
    const {
      data: { body: responseBody },
    } = await api.get('/families/my')
    return responseBody
  }
  const getFamilyList = async () => {
    const {
      data: { body: responseBody },
    } = await api.get('/users/my-family')
    return responseBody
  }

  return {
    getUserInfo,
    getFamilyInfo,
    getFamilyList,
  }
}
