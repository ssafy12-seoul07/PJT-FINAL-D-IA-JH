import { computed } from 'vue'
import type { workoutStatInterface } from '@/shared/interface/WorkoutStatInterface'
import { useFamilyDailyStore } from '../store/family-daily'

const useMyDaily = () => {
  const familyDailyStore = useFamilyDailyStore()

  const familyWorkoutStat = computed<workoutStatInterface[] | null>(
    () => familyDailyStore.familyWorkoutStat || null
  )

  const getFamilyWorkoutStat = async () => {
    await familyDailyStore.getFamilyWorkoutStat()
    return familyWorkoutStat.value
  }

  return {
    familyWorkoutStat,
    getFamilyWorkoutStat,
  }
}

export default useMyDaily
