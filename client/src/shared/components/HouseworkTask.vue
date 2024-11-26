<template>
  <div
    class="housework-task-container"
    @click="handleCardClick('open')"
    :class="{ completed: isCompleted }"
  >
    <div class="color-divider" :style="dividerStyle"></div>
    <div class="task-container">
      <div>[{{ name }}] {{ description }}</div>
      <div>{{ startTime }} ~ {{ dueTime }}</div>
    </div>
    <div class="profile-container">
      <ProfileContainer :userId="assignedUserId" />
    </div>
    <BottomSheet
      v-if="mode === 'open'"
      v-bind="props"
      @on-close="handleCardClick"
      @click.stop
    />
  </div>
</template>

<script setup lang="ts">
  import type { HouseworkInterface } from '../interface/HouseworkInterface'
  import useTimeToString from '../composables/useTimeToString'
  import { computed, ref } from 'vue'
  import BottomSheet from './BottomSheet.vue'
  import ProfileContainer from './ProfileContainer.vue'
  const props = defineProps<HouseworkInterface>()

  const startTime = computed(() => useTimeToString(props.startAt))
  const dueTime = computed(() => useTimeToString(props.dueAt))
  const isCompleted = computed(() => props.doneAt !== null)

  const mode = ref<'open' | 'close'>('close')

  const handleCardClick = (action: 'open' | 'close') => {
    console.log(action)
    mode.value = action
  }

  const dividerStyle = computed(() => ({
    backgroundColor: props.color || 'var(--task-default)',
  }))
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
    background-color: var(--task-default);
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
  div.completed {
    background-color: #f6f6f6;
    > div.task-container {
      > div {
        color: #757575;
        text-decoration: line-through;
      }
    }
  }
</style>
