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
  return { userInfo, familyInfo, getUserInfo, getFamilyInfo }
})
