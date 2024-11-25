import { message, type FormProps } from 'ant-design-vue'
import { useHouseworkAPI } from '../service/HouseworkAPI'
import type { HouseworkFormProps } from '../interface/HouseworkCalendarInterface'
import { useDateTime } from './useTimeFormat'
import { useMyDailyStore } from '@/modules/my-daily/store/my-daily'
import { useUserStore } from '@/modules/authentication/store/user'
const { formatToKrISOString, getStartOfDay, getEndOfDay } = useDateTime()

export function useHouseworkSubmit() {
  const houseworkAPI = useHouseworkAPI()
  const userStore = useUserStore()

  const handleFinish = async (values: HouseworkFormProps) => {
    try {
      const newForm: HouseworkFormProps = {
        name: values.name,
        description: values.description,
        color: values.color,
        assignedUserId: values.assignedUserId,
        calorieAmount: +values.calorieAmount,
        startAt: values?.timeRange?.[0]
          ? formatToKrISOString(values.timeRange[0])
          : getStartOfDay(),
        dueAt: values?.timeRange?.[1]
          ? formatToKrISOString(values.timeRange[1])
          : getEndOfDay(),
      }
      const response = await houseworkAPI.postHousework(
        newForm as HouseworkFormProps
      )

      // myDaily store 가져오기
      const myDailyStore = useMyDailyStore()

      // 현재 사용자 ID와 할당된 사용자 ID 비교
      const currentUserId = await userStore.getCurrentUserId() // 현재 로그인한 사용자 ID 가져오는 함수 필요
      if (values.assignedUserId === currentUserId && myDailyStore.myHousework) {
        // 새로운 일정을 store에 추가
        myDailyStore.myHousework.push({
          ...response, // API 응답으로 받은 데이터
          // 필요한 경우 MyHouseworkInterface에 맞게 데이터 형식 변환
        })
      }

      message.success('집안일이 등록되었습니다')
    } catch (error) {
      console.error(error)
    }
  }

  const handleFinishFailed: FormProps['onFinishFailed'] = (errors) => {
    console.log(errors)
  }

  return {
    handleFinish,
    handleFinishFailed,
  }
}
