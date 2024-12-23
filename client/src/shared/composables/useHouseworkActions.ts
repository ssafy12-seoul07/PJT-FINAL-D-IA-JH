import { useHouseworkAPI } from '@/modules/housework-calendar/service/HouseworkAPI'
import { message } from 'ant-design-vue'
import { useMyDailyStore } from '@/modules/my-daily/store/my-daily'
import { useFamilyDailyStore } from '@/modules/family-daily/store/family-daily'
import { useHouseworkStore } from '@/modules/housework-calendar/store/houseworks'

const useHouseworkActions = () => {
  const houseworkAPI = useHouseworkAPI()
  const myDailyStore = useMyDailyStore()
  const familyDailyStore = useFamilyDailyStore()
  const houseworkStore = useHouseworkStore()

  const deleteHousework = async (id: number) => {
    try {
      await houseworkAPI.deleteHousework(id)
      if (myDailyStore.myHousework) {
        myDailyStore.myHousework = [
          ...myDailyStore.myHousework.filter(
            (housework) => housework.id !== id
          ),
        ]
      }
      if (houseworkStore.weekTaskList) {
        houseworkStore.weekTaskList = [
          ...houseworkStore.weekTaskList.filter(
            (housework) => housework.id !== id
          ),
        ]
      }
      await myDailyStore.refreshMyWorkoutStat()
      await familyDailyStore.refreshFamilyWorkoutStat()
      message.success(`선택한 집안일이 삭제되었습니다`)
    } catch (error) {
      console.error('Failed to delete housework:', error)
    }
  }
  const completeHousework = async (id: number) => {
    try {
      const response = await houseworkAPI.patchHouseworkComplete(id)
      if (myDailyStore.myHousework) {
        myDailyStore.myHousework = myDailyStore.myHousework.map((housework) =>
          housework.id === id ? response : housework
        )
      }
      if (houseworkStore.weekTaskList) {
        houseworkStore.weekTaskList = houseworkStore.weekTaskList.map(
          (housework) => (housework.id === id ? response : housework)
        )
      }
      await myDailyStore.refreshMyWorkoutStat()
      await familyDailyStore.refreshFamilyWorkoutStat()
      message.success(`집안일이 완료되었습니다`)
      return response
    } catch (error) {
      console.error('Failed to complete housework:', error)
    }
  }
  const setHouseworkOngoing = async (id: number) => {
    try {
      const response = await houseworkAPI.patchHouseworkOngoing(id)
      if (myDailyStore.myHousework) {
        myDailyStore.myHousework = myDailyStore.myHousework.map((housework) =>
          housework.id === id ? response : housework
        )
      }
      if (houseworkStore.weekTaskList) {
        houseworkStore.weekTaskList = houseworkStore.weekTaskList.map(
          (housework) => (housework.id === id ? response : housework)
        )
      }
      await myDailyStore.refreshMyWorkoutStat()
      await familyDailyStore.refreshFamilyWorkoutStat()
      message.success(`집안일이 미완료로 변경되었습니다`)
      return response
    } catch (error) {
      console.error('Failed to set housework ongoing:', error)
    }
  }

  return {
    deleteHousework,
    completeHousework,
    setHouseworkOngoing,
  }
}

export default useHouseworkActions
