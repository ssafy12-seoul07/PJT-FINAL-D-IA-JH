<template>
  <a-form
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
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive, UnwrapRef, computed } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import type { FormProps } from 'ant-design-vue'
  import type { LoginFormProps } from '../interface/AuthenticationInterface.ts'
  import type { Rule, FormInstance } from 'ant-design-vue/es/form'

  const formRef = ref<FormInstance>()
  const formState: UnwrapRef<LoginFormProps> = reactive({
    email: '',
    password: '',
  })

  const isSubmitDisabled = computed(() => {
    if (!formState.email || !formState.password) return true

    // 현재 form의 validation 상태 확인
    const isValid = formRef.value
      ?.getFieldsError()
      .every((item) => item.errors.length === 0)
    return !isValid
  })

  const rules: Record<string, Rule[]> = {
    email: [
      {
        required: true,
        message: '이메일을 입력해주세요',
        trigger: ['change', 'blur'],
      },
      {
        type: 'email',
        message: '올바른 이메일 형식이 아닙니다',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '비밀번호를 입력해주세요',
        trigger: ['change', 'blur'],
      },
    ],
  }

  const handleFinish: FormProps['onFinish'] = (values) => {
    console.log(values, formState)
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
