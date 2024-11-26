import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import type { FormProps } from 'ant-design-vue'
import { useAuthAPI } from '../service/AuthAPI'
import { useAuthStore } from '../store/auth'
import type { RegisterBodyInterface } from '../interface/AuthenticationInterface'

export function useRegisterSubmit() {
  const authAPI = useAuthAPI()
  const authStore = useAuthStore()
  const router = useRouter()

  const handleFinish: FormProps['onFinish'] = async (values) => {
    try {
      const response = await authAPI.postAuthSignup(
        values as RegisterBodyInterface
      )
      authStore.setAccessToken(response.accessToken)
      message.success('회원가입되었습니다')
      router.push({ name: 'MyDaily' })
    } catch (error) {
      // 에러 처리
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
