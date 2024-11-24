<template>
  <div class="bottom-sheet-overlay-container" @click.stop>
    <div class="bottom-sheet-overlay"></div>
    <div class="bottom-sheet-container">
      <header>
        <button @click="handleCloseBottomSheet">
          <font-awesome-icon icon="xmark" />
        </button>
        <button v-if="mode !== 'read'" @click="handleSubmitForm">
          <font-awesome-icon icon="check" style="color: var(--green)" />
        </button>
        <button v-else @click="handleEditForm">
          <font-awesome-icon icon="pencil" style="color: var(--orange)" />
        </button>
      </header>
      <main>
        <a-form
          :model="formState"
          layout="vertical"
          :colon="false"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :disabled="mode === 'read'"
        >
          <a-form-item>
            <a-input v-model:value="formState.name" placeholder="집안일 제목">
              <template #prefix
                ><ScheduleOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-model:value="formState.description"
              placeholder="집안일 내용"
            >
              <template #prefix
                ><BarsOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item label="구분색" name="color">
            <a-color-picker v-model="formState.color" placeholder="color" />
          </a-form-item>
          <a-form-item
            :label="mode === 'create' ? '맡을 사람' : '맡은 사람'"
            name="assignedUserId"
          >
            <a-select
              v-model:value="formState.assignedUserId"
              mode="multiple"
              style="width: 100%"
              placeholder="맡은 사람"
              option-label-prop="children"
              maxTagCount="1"
            >
              <a-select-option
                v-for="member in familyList"
                :key="member.id"
                :value="member.id"
                :label="member.name"
              >
                <div style="display: flex; align-items: center; gap: 8px">
                  <span role="img" :aria-label="member.name">
                    <img
                      :src="getProfileImagePath(member.profileImageName)"
                      style="
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        display: block;
                      "
                    />
                  </span>
                  <span>{{ member.name }}</span>
                </div>
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="timeRange" label="시작시간 - 종료시간">
            <a-time-range-picker
              v-model:value="formState.timeRange"
              :placeholder="['시작 시각', '종료 시각']"
              :disabled="formState.isAllDay"
            />
            <a-form-item-rest>
              <a-checkbox
                v-model:checked="formState.isAllDay"
                style="margin-left: 8px"
                >하루종일</a-checkbox
              >
            </a-form-item-rest>
          </a-form-item>
          <a-form-item>
            <a-input
              v-model:value="formState.calorieAmount"
              placeholder="예상소모 칼로리"
              type="number"
            >
              <template #prefix
                ><FireOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
              <template #suffix>
                <span>kcal</span>
                <a-popover title="집안일 칼로리 소모 가이드 (30분 기준)">
                  <template #content>
                    <ul style="margin: 0">
                      <li>
                        가벼운 활동 (약 50kcal) : 설거지, 먼지 닦기, 정리정돈
                      </li>
                      <li>
                        보통 활동 (약 100kcal) : 청소기 사용, 걸레질, 침구 정리
                      </li>
                      <li>
                        격렬한 활동 (약 150kcal) : 대청소, 창문 닦기, 욕실 청소
                      </li>
                    </ul>
                  </template>
                  <InfoCircleOutlined />
                </a-popover>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item placeholder="TimeRange" name="timeRange"> </a-form-item>
          <div class="button-container">
            <a-form-item>
              <a-button danger type="primary">삭제</a-button>
            </a-form-item>
            <a-form-item>
              <a-button v-if="formState.doneAt">미완료</a-button>
              <a-button v-else type="primary">완료</a-button>
            </a-form-item>
          </div>
        </a-form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import dayjs from 'dayjs'
  import timezone from 'dayjs/plugin/timezone'
  import utc from 'dayjs/plugin/utc'
  import {
    BarsOutlined,
    ScheduleOutlined,
    FireOutlined,
    InfoCircleOutlined,
  } from '@ant-design/icons-vue'
  import type { HouseworkInterface } from '../interface/HouseworkInterface'
  import useIsFullDay from '../composables/useIsFullDay'
  import { useUserStore } from '@/modules/authentication/store/user'
  const userStore = useUserStore()
  const familyList = computed(() => userStore.familyInfo?.members || null)

  const getProfileImagePath = (profileImageName: string | null) => {
    if (!profileImageName)
      return new URL(`@/assets/images/defaultImg.jpg`, import.meta.url).href
    return new URL(`@/assets/images/${profileImageName}`, import.meta.url).href
  }

  dayjs.extend(utc)
  dayjs.extend(timezone)
  // 한국 시간대 설정
  dayjs.tz.setDefault('Asia/Seoul')

  const props = defineProps<Partial<HouseworkInterface>>()

  const mode = ref<'create' | 'read' | 'edit'>(props.name ? 'read' : 'create')

  const formState = ref({
    name: props.name ?? '',
    description: props.description ?? '',
    color: props.color ?? '',
    calorieAmount: props.calorieAmount ?? '',
    timeRange: [
      props.startAt ? dayjs(props.startAt).tz() : '',
      props.dueAt ? dayjs(props.dueAt).tz() : '',
    ],
    isAllDay:
      props.startAt && props.dueAt
        ? useIsFullDay(props.startAt, props.dueAt)
        : false,
    doneAt: props.doneAt ?? '',
    assignedUserId: props.assignedUserId ? [props.assignedUserId] : [],
  })

  const labelCol = { span: 8 }
  const wrapperCol = { span: 24 }

  const emit = defineEmits(['onClose'])

  const handleCloseBottomSheet = () => {
    emit('onClose', 'close')
  }

  const handleEditForm = async () => {
    mode.value = 'read'
  }

  const handleSubmitForm = async () => {
    handleCloseBottomSheet()
  }
</script>

<style scoped>
  div.bottom-sheet-overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  div.bottom-sheet-overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    cursor: default;
    @media (max-width: 430px) {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }

  div.bottom-sheet-container {
    width: 100%;
    background-color: white;
    bottom: 0;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    z-index: 99;
    @media (max-width: 430px) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    cursor: default;

    header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 16px 20px;
      padding-bottom: 0;
      button {
        width: 30px;
        height: 30px;
        background-color: white;
        border: none;
        padding: 8px;
        border-radius: 4px;
        &:hover {
          filter: brightness(95%);
          cursor: pointer;
        }
      }
    }

    main {
      padding: 20px;
      .ant-form-item {
        margin-bottom: 16px;
      }
      .button-container {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
