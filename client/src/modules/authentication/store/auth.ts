import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(
    localStorage.getItem('my-access-token')
      ? JSON.parse(localStorage.getItem('my-access-token')!)
      : null
  )

  const getAccessToken = () => {
    return accessToken.value
  }

  const setAccessToken = (token: string) => {
    if (token) {
      accessToken.value = token
      localStorage.setItem('my-access-token', JSON.stringify(token))
    }
  }

  const deleteAccessToken = () => {
    accessToken.value = null
    localStorage.removeItem('my-access-token')
  }

  return { accessToken, getAccessToken, setAccessToken, deleteAccessToken }
})
