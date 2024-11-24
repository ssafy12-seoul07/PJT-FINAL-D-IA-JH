<template>
  <div class="housework-task-container" @click="handleCardClick('open')">
    <div class="color-divider"></div>
    <div class="task-container">
      <div>[{{ name }}] {{ description }}</div>
      <div>{{ startTime }} ~ {{ dueTime }}</div>
    </div>
    <div class="profile-container">
      <ProfileImg :profileImageName="null" />
    </div>
    <BottomSheet
      v-if="mode === 'open'"
      v-bind="props"
      @on-close="handleCardClick"
    />
  </div>
</template>

<script setup lang="ts">
  import type { HouseworkInterface } from '../interface/HouseworkInterface'
  import ProfileImg from './ProfileImg.vue'
  import useTimeToString from '../composables/useTimeToString'
  import { computed, ref } from 'vue'
  import BottomSheet from './BottomSheet.vue'
  const props = defineProps<HouseworkInterface>()

  const startTime = computed(() => useTimeToString(props.startAt))
  const dueTime = computed(() => useTimeToString(props.dueAt))

  const mode = ref<'open' | 'close'>('close')

  const handleCardClick = (action: string) => {
    console.log(action)
    switch (action) {
      case 'open':
        mode.value = 'open'
        break
      case 'close':
        mode.value = 'close'
        break
    }
  }
</script>

<style scoped>
  div.housework-task-container {
    width: 100%;
    background-color: white;
    border-radius: 8px;
    margin-bottom: 8px;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
    padding: 12px 8px;
    &:hover {
      cursor: pointer;
    }
  }
  div.color-divider {
    width: 4px;
    background-color: #5462eb;
    border-radius: 2px;
    margin-right: 8px;
  }
  div.task-container {
    flex: 1;
    > div:first-child {
      margin-bottom: 8px;
    }
    > div:last-child {
      color: #757575;
      font-size: 12px;
    }
  }
  div.profile-container {
    display: flex;
    align-items: flex-end;
  }
</style>
