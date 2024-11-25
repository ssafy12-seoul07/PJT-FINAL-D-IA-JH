<template>
  <div class="housework-list-container">
    <div class="filter-container">
      <a-checkbox v-model:checked="hideCompleted">완료 제외</a-checkbox>
      <a-checkbox v-model:checked="showMyTasksOnly">나의 집안일</a-checkbox>
      <a-select
        v-model:value="selectedFamily"
        placeholder="구성원 선택"
        option-label-prop="children"
        maxTagCount="1"
        style="width: 30%"
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
    </div>
    <div class="list-container">
      <HouseworkTask
        v-for="task in sortedMyHousework"
        :key="task.id"
        v-bind="task"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import type { HouseworkInterface } from '@/shared/interface/HouseworkInterface'
  import HouseworkTask from '@/shared/components/HouseworkTask.vue'
  import { useUserStore } from '@/modules/authentication/store/user'
  const props = defineProps<{
    selectedDateTaskList: HouseworkInterface[]
  }>()
  const hideCompleted = ref(false)
  const showMyTasksOnly = ref(false)
  const selectedFamily = ref(null)

  const userStore = useUserStore()
  onMounted(async () => {
    await userStore.getFamilyInfo()
  })
  const familyList = computed(() => userStore.familyInfo?.members || null)

  const getProfileImagePath = (profileImageName: string | null) => {
    if (!profileImageName)
      return new URL(`@/assets/images/defaultImg.jpg`, import.meta.url).href
    return new URL(`@/assets/images/${profileImageName}`, import.meta.url).href
  }

  const currentUserId = ref<number | null>(null)

  // 컴포넌트 마운트 시 현재 사용자 ID를 가져옴
  onMounted(async () => {
    currentUserId.value = await userStore.getCurrentUserId()
  })

  const sortedMyHousework = computed(() => {
    if (!props.selectedDateTaskList) return []

    return [...props.selectedDateTaskList]
      .filter((task) => {
        // 완료 제외 필터
        if (hideCompleted.value && task.doneAt !== null) {
          return false
        }

        // 나의 집안일 필터
        if (
          showMyTasksOnly.value &&
          task.assignedUserId !== currentUserId.value
        ) {
          return false
        }

        // 구성원 선택 필터
        if (
          selectedFamily.value &&
          task.assignedUserId !== selectedFamily.value
        ) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      })
  })
</script>

<style scoped>
  div.housework-list-container {
    div.filter-container {
      background-color: var(--background-color);
      padding: 4px 16px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    div.list-container {
      padding: 8px 16px;
      background-color: #f0f0f0;
      overflow: scroll;
      -ms-overflow-style: none; /* IE, Edge */
      scrollbar-width: none; /* Firefox */

      height: 579px; /* 가로가 430 이상일때 */
      @media (max-width: 430px) {
        height: calc(100vh - 306px); /* 가로가 430 이하일때 */
      }
    }
  }
</style>
