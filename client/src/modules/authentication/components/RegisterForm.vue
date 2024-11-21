<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
  >
    <a-form-item ref="name" label="이름" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item ref="email" label="이메일" name="email">
      <a-input v-model:value="formState.email" type="email" />
    </a-form-item>

    <a-form-item ref="password" label="비밀번호" name="password">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item ref="familyId" label="가족ID" name="familyId">
      <a-input
        v-model:value="formState.familyId"
        :disabled="formState.noFamily"
        type="number"
      />
      <a-checkbox v-model:checked="formState.noFamily">1인가구</a-checkbox>
    </a-form-item>

    <a-form-item label="목표칼로리" name="goalKcal">
      <a-input-number
        v-model:value="formState.goalKcal"
        type="number"
        min="0"
        max="2147483647"
      />
      kcal
    </a-form-item>

    <a-form-item
      label="프로필이미지"
      name="profileImageName"
      :label-col="{ span: 24 }"
      :wrapper-col="{ span: 24 }"
    >
      <a-radio-group v-model:value="formState.profileImageName">
        <a-radio value="1">Sponsor</a-radio>
        <a-radio value="2">Venue</a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { UnwrapRef } from 'vue'
  import type { Rule } from 'ant-design-vue/es/form'
  import type { RegisterFormProps } from '../interface/AuthenticationInterface.js'

  const formRef = ref()
  const labelCol = { span: 6 }
  const wrapperCol = { span: 18 }
  const formState: UnwrapRef<FormState> = reactive<RegisterFormProps>({
    name: '',
    email: '',
    password: '',
    familyId: null,
    goalKcal: 0,
    profileImageName: null,
    noFamily: false,
  })

  const rules: Record<string, Rule[]> = {
    name: [
      {
        required: true,
        message: '이름을 입력해주세요',
        trigger: ['change', 'blur'],
      },
      {
        min: 1,
        max: 10,
        message: '이름은 10글자까지 가능합니다',
        trigger: 'blur',
      },
    ],
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
      { min: 8, message: '비밀번호는 8자 이상이어야 합니다', trigger: 'blur' },
      {
        pattern: /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,}$/,
        message: '비밀번호는 영문 소문자와 숫자를 포함해야 합니다',
        trigger: 'blur',
      },
    ],
    familyId: [
      {
        required: true,
        message: '본인의 들어갈 가족ID를 입력해주세요.',
        trigger: ['change', 'blur'],
      },
    ],
    goalKcal: [
      {
        required: true,
        message: '하루에 소모하고 싶은 목표칼로리를 적어주세요',
        trigger: ['change', 'blur'],
      },
      {
        type: 'number',
        min: 1,
        message: '목표칼로리는 1 이상이어야 합니다',
        trigger: ['change', 'blur'],
      },
    ],
    profileImageName: [
      {
        required: true,
        message: '프로필 이미지를 선택해주세요',
        trigger: 'change',
      },
    ],
  }

  // const onSubmit = () => {
  //   formRef.value
  //     .validate()
  //     .then(() => {
  //       console.log('values', formState, toRaw(formState))
  //     })
  //     .catch((error) => {
  //       console.log('error', error)
  //     })
  // }

  // const resetForm = () => {
  //   formRef.value.resetFields()
  // }
</script>
