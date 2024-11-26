<template>
  <div>
    <button @click="handleChangeWeek('prev')">
      <font-awesome-icon icon="chevron-left" />
    </button>
    <h3>{{ startDate }} ~ {{ endDate }}</h3>
    <button @click="handleChangeWeek('next')">
      <font-awesome-icon icon="chevron-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import type { WeekSelectorProps } from '../interface/HouseworkCalendarInterface'

  defineProps<WeekSelectorProps>()

  const emit = defineEmits(['changeWeek'])

  const handleChangeWeek = (action: string) => {
    emit('changeWeek', action)
  }
</script>

<style scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    h3 {
      width: 60%;
      text-align: center;
      font-weight: bold;
    }
    button {
      border: none;
      padding: 4px;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      &:hover {
        cursor: pointer;
        filter: brightness(95%);
      }
    }
  }
</style>
