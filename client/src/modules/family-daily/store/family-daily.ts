import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { workoutStatInterface } from '@/shared/interface/WorkoutStatInterface'
import { useFamilyDailyAPI } from '../service/FamilyDailyAPI'

export const useFamilyDailyStore = defineStore('family-daily', () => {
  const familyWorkoutStat = ref<workoutStatInterface[] | null>(null)
  const useFamilyDaily = useFamilyDailyAPI()

  const getFamilyWorkoutStat = async () => {
    if (!familyWorkoutStat.value) {
      familyWorkoutStat.value = await useFamilyDaily.getFamilyWorkoutStat()
    }
    return familyWorkoutStat.value
  }

  return { familyWorkoutStat, getFamilyWorkoutStat }
})
