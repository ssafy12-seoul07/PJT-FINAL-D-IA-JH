import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MyHouseworkInterface } from '../interface/MyDailyInterface'
import type { workoutStatInterface } from '@/shared/interface/WorkoutStatInterface'
import { useMyDailyAPI } from '../service/MyDailyAPI'

export const useMyDailyStore = defineStore('my-daily', () => {
  const myWorkoutStat = ref<workoutStatInterface | null>(null)
  const myHousework = ref<MyHouseworkInterface[] | null>(null)
  const useMyDaily = useMyDailyAPI()

  const getMyWorkoutStat = async () => {
    if (!myWorkoutStat.value) {
      myWorkoutStat.value = await useMyDaily.getMyWorkoutStat()
    }
  }

  const refreshMyWorkoutStat = async () => {
    try {
      myWorkoutStat.value = await useMyDaily.getMyWorkoutStat()
      console.log('my refreshed')
    } catch (error) {
      console.error('Failed to refresh workout stat:', error)
      throw error
    }
  }

  const getMyHousework = async (from: Date, to: Date, userId?: number) => {
    if (!myHousework.value) {
      myHousework.value = await useMyDaily.getMyHousework(from, to, userId)
    }
  }

  const resetMyDaily = () => {
    myWorkoutStat.value = null
    myHousework.value = null
  }

  return {
    myWorkoutStat,
    myHousework,
    getMyWorkoutStat,
    refreshMyWorkoutStat,
    getMyHousework,
    resetMyDaily,
  }
})
