<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item name="email">
      <a-input v-model:value="formState.email" placeholder="Email">
        <template #prefix
          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item name="password">
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      >
        <template #prefix
          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="isSubmitDisabled">
        로그인
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, watch } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { type FormProps, type FormInstance, message } from 'ant-design-vue'
  import type { LoginFormProps } from '../interface/AuthenticationInterface'
  import type { Rule } from 'ant-design-vue/es/form'
  import { useAuthAPI } from '../service/AuthAPI.js'
  import { useAuthStore } from '../store/auth.js'
  import { useRouter } from 'vue-router'

  const formRef = ref<FormInstance>()
  const formState = reactive<LoginFormProps>({
    email: '',
    password: '',
  })
  const authAPI = useAuthAPI()
  const authStore = useAuthStore()
  const router = useRouter()

  const isValid = ref(false)
  const loading = ref(false)

  // watch를 사용하여 폼 상태 변경 감지 및 validation
  watch(
    [() => formState.email, () => formState.password],
    async () => {
      if (!formState.email || !formState.password) {
        isValid.value = false
        return
      }

      try {
        await formRef.value?.validate()
        isValid.value = true
      } catch {
        isValid.value = false
      }
    },
    { immediate: true }
  )

  // computed는 동기적으로 상태 반환
  const isSubmitDisabled = computed(() => {
    return !formState.email || !formState.password || !isValid.value
  })

  const rules: Record<string, Rule[]> = {
    email: [
      {
        required: true,
        message: '이메일을 입력해주세요',
        trigger: ['change', 'blur'],
      },
      // {
      //   type: 'email',
      //   message: '올바른 이메일 형식이 아닙니다',
      //   trigger: 'blur',
      // },
    ],
    password: [
      {
        required: true,
        message: '비밀번호를 입력해주세요',
        trigger: ['change', 'blur'],
      },
    ],
  }

  const handleFinish: FormProps['onFinish'] = async (values) => {
    loading.value = true
    try {
      const response = await authAPI.postAuthLogin(values as LoginFormProps)
      console.log(response)

      // 로그인 성공 시 토큰 저장
      authStore.setAccessToken(response.accessToken)

      // 로그인 성공 메시지
      message.success('로그인되었습니다')

      // 메인 페이지로 이동
      router.push({ name: 'MyDaily' })
    } finally {
      loading.value = false
    }
  }

  const handleFinishFailed: FormProps['onFinishFailed'] = (errors) => {
    console.log(errors)
  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
