import { useHouseworkAPI } from '@/modules/housework-calendar/service/HouseworkAPI'
import { message } from 'ant-design-vue'

const useHouseworkActions = () => {
  const houseworkAPI = useHouseworkAPI()

  const deleteHousework = async (id: number) => {
    await houseworkAPI.deleteHousework(id)
    message.success(`선택한 집안일이 삭제되었습니다`)
  }
  const completeHousework = async (id: number) => {
    const response = await houseworkAPI.patchHouseworkComplete(id)
    message.success(`집안일이 완료되었습니다`)
    return response
  }
  const setHouseworkOngoing = async (id: number) => {
    const response = await houseworkAPI.patchHouseworkOngoing(id)
    message.success(`집안일이 미완료로 변경되었습니다`)
    return response
  }

  return {
    deleteHousework,
    completeHousework,
    setHouseworkOngoing,
  }
}

export default useHouseworkActions
