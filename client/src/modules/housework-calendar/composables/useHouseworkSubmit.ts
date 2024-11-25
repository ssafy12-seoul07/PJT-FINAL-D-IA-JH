import { message, type FormProps } from 'ant-design-vue'
import { useHouseworkAPI } from '../service/HouseworkAPI'
import { useDateTime } from './useTimeFormat'
import { useMyDailyStore } from '@/modules/my-daily/store/my-daily'
import { useUserStore } from '@/modules/authentication/store/user'
import type { HouseworkFormProps } from '../interface/HouseworkCalendarInterface'
import type { HouseworkFormModeType } from '@/shared/interface/HouseworkInterface'
import type { MyHouseworkInterface } from '@/modules/my-daily/interface/MyDailyInterface'
const { formatToKrISOString, getStartOfDay, getEndOfDay } = useDateTime()

export function useHouseworkSubmit() {
  const houseworkAPI = useHouseworkAPI()
  const userStore = useUserStore()
  const myDailyStore = useMyDailyStore()

  const updateMyDailyStore = async (
    values: HouseworkFormProps,
    response: MyHouseworkInterface,
    isEdit = false
  ) => {
    const currentUserId = await userStore.getCurrentUserId()

    if (values.assignedUserId !== currentUserId || !myDailyStore.myHousework)
      return

    if (isEdit) {
      updateExistingHousework(myDailyStore.myHousework, values.id!, response)
    } else {
      myDailyStore.myHousework.push({ ...response })
    }
  }

  const updateExistingHousework = (
    myHousework: MyHouseworkInterface[],
    id: number,
    response: MyHouseworkInterface
  ) => {
    const index = myHousework.findIndex(
      (housework: MyHouseworkInterface) => housework.id === id
    )
    if (index !== -1) {
      myHousework[index] = {
        ...myHousework[index],
        ...response,
      }
    }
  }

  const createNewForm = (values: HouseworkFormProps): HouseworkFormProps => ({
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
  })

  const createHousework = async (values: HouseworkFormProps) => {
    const newForm = createNewForm(values)
    const response = await houseworkAPI.postHousework(newForm)
    await updateMyDailyStore(values, response)
    message.success('집안일이 등록되었습니다')
    return response
  }

  const updateHousework = async (values: HouseworkFormProps) => {
    const newForm = createNewForm(values)
    const response = await houseworkAPI.patchHousework(values.id!, newForm)
    await updateMyDailyStore(values, response, true)
    message.success('집안일이 수정되었습니다')
    return response
  }

  const handleFinish = async (
    values: HouseworkFormProps,
    mode: HouseworkFormModeType
  ) => {
    try {
      if (mode === 'create') {
        await createHousework(values)
      } else if (values.id) {
        await updateHousework(values)
      }
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
