import { API_BASE_URL } from '@/shared/constants/API'
import { useAuthStore } from '@/modules/authentication/store/auth'
import axios from 'axios'
import { useErrorHandling } from '@/shared/composables/useErrorHandling'
import useFormatDate from '../../../shared/composables/useFormatDate'

// API 클래스를 함수로 변경
export function useMyDailyAPI() {
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

  const getMyWorkoutStat = async () => {
    const {
      data: { body: responseBody },
    } = await api.get('/workout-stats/my')
    return responseBody
  }

  const getMyHousework = async (from: Date, to: Date, userId?: number) => {
    const {
      data: { body: responseBody },
    } = await api.get('/family-houseworks', {
      params: {
        from: useFormatDate(from), // 날짜를 ISO 문자열로 변환
        to: useFormatDate(to),
        ...(userId && { assignedUserId: userId }), // userId가 있을 때만 포함
      },
    })
    return responseBody
  }

  return {
    getMyWorkoutStat,
    getMyHousework,
  }
}
