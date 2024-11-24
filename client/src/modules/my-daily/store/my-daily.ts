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

  const getMyHousework = async (from: Date, to: Date, userId?: number) => {
    if (!myHousework.value) {
      myHousework.value = await useMyDaily.getMyHousework(from, to, userId)
    }
  }

  return { myWorkoutStat, myHousework, getMyWorkoutStat, getMyHousework }
})