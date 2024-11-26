import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  familyInfoInterface,
  userInfoInterface,
} from '../interface/UserInfomationInterface'
import { useUserAPI } from '../service/UserAPI'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<userInfoInterface | null>(null)
  const familyInfo = ref<familyInfoInterface | null>(null)
  const userAPI = useUserAPI()

  const getUserInfo = async () => {
    if (!userInfo.value) {
      userInfo.value = await userAPI.getUserInfo()
    }
    return userInfo.value
  }

  const getCurrentUserId = async () => {
    const user = await getUserInfo()
    return (user as userInfoInterface).id
  }

  const getFamilyInfo = async () => {
    if (!familyInfo.value) {
      const family = await userAPI.getFamilyInfo()
      const members = await userAPI.getFamilyList()
      familyInfo.value = {
        ...family,
        members: members,
      }
    }
    return familyInfo.value
  }

  const resetUserStore = () => {
    userInfo.value = null
    familyInfo.value = null
  }
  return {
    userInfo,
    familyInfo,
    getCurrentUserId,
    getUserInfo,
    getFamilyInfo,
    resetUserStore,
  }
})
