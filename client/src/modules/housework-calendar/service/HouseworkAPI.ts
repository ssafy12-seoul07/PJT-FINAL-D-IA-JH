import { API_BASE_URL } from '@/shared/constants/API'
import { useAuthStore } from '@/modules/authentication/store/auth'
import axios from 'axios'
import { useErrorHandling } from '@/shared/composables/useErrorHandling'
import type { HouseworkFormProps } from '../interface/HouseworkCalendarInterface'
import useFormatDate from '@/shared/composables/useFormatDate'

// API 클래스를 함수로 변경
export function useHouseworkAPI() {
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

  const getHousework = async (from: Date, to: Date) => {
    const {
      data: { body: responseBody },
    } = await api.get('/family-houseworks', {
      params: {
        from: useFormatDate(from), // 날짜를 ISO 문자열로 변환
        to: useFormatDate(to),
      },
    })
    return responseBody
  }

  const postHousework = async (newWork: HouseworkFormProps) => {
    const {
      data: { body: responseBody },
    } = await api.post('/family-houseworks', newWork)
    return responseBody
  }

  const patchHousework = async (id: number, newWork: HouseworkFormProps) => {
    const {
      data: { body: responseBody },
    } = await api.patch(`/family-houseworks/${id}`, newWork)
    return responseBody
  }

  const deleteHousework = async (id: number) => {
    const {
      data: { body: responseBody },
    } = await api.delete(`/family-houseworks/${id}`)
    return responseBody
  }

  const patchHouseworkComplete = async (id: number) => {
    const {
      data: { body: responseBody },
    } = await api.patch(`/family-houseworks/${id}/complete`)
    return responseBody
  }

  const patchHouseworkOngoing = async (id: number) => {
    const {
      data: { body: responseBody },
    } = await api.patch(`/family-houseworks/${id}/ongoing`)
    return responseBody
  }

  return {
    getHousework,
    postHousework,
    patchHousework,
    deleteHousework,
    patchHouseworkComplete,
    patchHouseworkOngoing,
  }
}
