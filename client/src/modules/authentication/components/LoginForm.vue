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
  import type { FormInstance } from 'ant-design-vue'
  import type { LoginFormProps } from '../interface/AuthenticationInterface'
  import type { Rule } from 'ant-design-vue/es/form'
  import { useLoginSubmit } from '../composables/useLoginSubmit'

  const formRef = ref<FormInstance>()
  const formState = reactive<LoginFormProps>({
    email: '',
    password: '',
  })
  const { handleFinish, handleFinishFailed } = useLoginSubmit()

  const isValid = ref(false)

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
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
