import { useAuthStore } from '@/modules/authentication/store/auth'
import { useRouter } from 'vue-router'
import type { APIErrorResponseBody } from '../interface/APIInterface'

export function useErrorHandlers() {
  const authStore = useAuthStore()
  const router = useRouter()

  const handleNotFound = (errorBody: APIErrorResponseBody) => {
    throw new Error(errorBody.detail)
  }

  const handleUnauthorized = (errorBody: APIErrorResponseBody) => {
    authStore.deleteAccessToken()
    router.push({ name: 'Login' })
    throw new Error(errorBody.detail)
  }

  const handleForbidden = (errorBody: APIErrorResponseBody) => {
    throw new Error(errorBody.detail)
  }

  const handleBadRequest = (errorBody: APIErrorResponseBody) => {
    throw new Error(errorBody.detail)
  }

  const handleDefaultError = (errorBody: APIErrorResponseBody) => {
    throw new Error(errorBody.detail)
  }

  return {
    handleNotFound,
    handleUnauthorized,
    handleForbidden,
    handleBadRequest,
    handleDefaultError,
  }
}
