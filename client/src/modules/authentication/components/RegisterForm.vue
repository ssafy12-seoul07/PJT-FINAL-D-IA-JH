<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <div class="form-container">
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
        <a-form-item-rest>
          <a-checkbox v-model:checked="formState.noFamily">1인가구</a-checkbox>
        </a-form-item-rest>
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
          <a-radio
            v-for="imgCnt in profileImg"
            :key="imgCnt"
            :value="`profile${imgCnt}.jpg`"
            ><img :src="getProfileImage(imgCnt)"
          /></a-radio>
        </a-radio-group>
      </a-form-item>
    </div>
    <a-form-item
      :wrapper-col="{ offset: 16, span: 16 }"
      class="form-submit-container"
    >
      <a-button type="primary" html-type="submit">가입하기</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue'
  import type { Rule } from 'ant-design-vue/es/form'
  import type { RegisterFormProps } from '../interface/AuthenticationInterface.js'
  import { useRegisterSubmit } from '../composables/useRegisterSubmit'

  const formRef = ref()
  const labelCol = { span: 6 }
  const wrapperCol = { span: 18 }
  const formState = reactive<RegisterFormProps>({
    name: '',
    email: '',
    password: '',
    familyId: null,
    goalKcal: 0,
    profileImageName: '',
    noFamily: false,
  })
  const profileImg = Array.from({ length: 24 }, (_, i) => i + 1)
  const { handleFinish, handleFinishFailed } = useRegisterSubmit()

  const getProfileImage = (num: number) => {
    return new URL(`/src/assets/images/profile${num}.jpg`, import.meta.url).href
  }
  // 1인가구 체크박스와 familyId의 연동
  watch(
    () => formState.noFamily,
    (newVal: boolean) => {
      if (newVal) {
        formState.familyId = null
      }
      // familyId 필드의 검증을 다시 실행
      formRef.value?.validateFields(['familyId'])
    }
  )

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
        validator: async (_rule: Rule, value: number | null) => {
          // 1인가구가 체크되어 있으면 검증 통과
          if (formState.noFamily) {
            return Promise.resolve()
          }

          // 1인가구가 체크되어 있지 않은데 familyId가 없으면 에러
          if (!value && !formState.noFamily) {
            return Promise.reject('가족ID를 입력하거나 1인가구를 선택해주세요')
          }

          // familyId가 입력되어 있으면 검증 통과
          return Promise.resolve()
        },
        trigger: ['change', 'blur'],
      },
      // 숫자만 입력 가능하도록 추가 검증
      {
        type: 'number',
        message: '숫자만 입력 가능합니다',
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
</script>

<style scoped>
  .form-container {
    width: 100%;
    height: 100%;
    /* background-color: black; */
    width: 100%;
    overflow: scroll;
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
    h3 {
      color: #757575;
      margin: 8px;
    }

    height: 720px; /* 가로가 430 이상일때 */
    @media (max-width: 430px) {
      height: calc(100vh - 150px); /* 가로가 430 이하일때 */
    }

    #form_item_profileImageName {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
      label {
        margin: 0;
      }
      img {
        width: 52px;
        height: 52px;
      }
    }
  }

  .form-submit-container {
    padding-top: 8px;
  }
</style>
