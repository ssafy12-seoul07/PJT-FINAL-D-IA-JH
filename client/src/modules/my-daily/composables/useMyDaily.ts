import { useUserStore } from '@/modules/authentication/store/user'
import { computed } from 'vue'
import { useMyDailyStore } from '../store/my-daily'
import type { MyHouseworkInterface } from '../interface/MyDailyInterface'
import type { workoutStatInterface } from '@/shared/interface/WorkoutStatInterface'

const useMyDaily = () => {
  const userStore = useUserStore()
  const myDailyStore = useMyDailyStore()

  const myName = computed(() => userStore.userInfo?.name || '')
  const myWorkoutStat = computed<workoutStatInterface | null>(
    () => myDailyStore.myWorkoutStat || null
  )
  const myHousework = computed<MyHouseworkInterface[] | null>(
    () => myDailyStore.myHousework || null
  )

  const getMyName = async () => {
    if (!userStore.userInfo) {
      await userStore.getUserInfo()
    }
    return myName.value
  }

  const getMyWorkoutStat = async () => {
    await myDailyStore.getMyWorkoutStat()
    return myWorkoutStat.value
  }

  const getMyHousework = async (
    from: Date = new Date(),
    to: Date = new Date()
  ) => {
    const userId = userStore.userInfo?.id
    await myDailyStore.getMyHousework(from, to, userId)
    return myHousework.value
  }

  const getMyTodayHousework = async () => {
    // const today = new Date()
    const today = new Date('2024-11-21') // 오늘 00:00:00
    today.setHours(0, 0, 0, 0)
    console.log(today)
    const endOfDay = new Date(today)
    endOfDay.setHours(23, 59, 59, 999) // 오늘 23:59:59.999

    return await getMyHousework(today, endOfDay)
  }

  return {
    myName,
    myWorkoutStat,
    myHousework,
    getMyName,
    getMyWorkoutStat,
    getMyTodayHousework,
  }
}

export default useMyDaily
