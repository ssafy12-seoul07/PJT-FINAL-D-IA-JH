<template>
  <div class="week-selector">
    <button
      @click.prevent="before"
    >GO BEFORE
    </button>
    <div>
      <span>{{ from }}</span> ~ <span>{{ to }}</span>
    </div>
    <button
      @click.prevent="after"
    >GO AFTER
    </button>
  </div>

</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import useFormatDate2 from '@/shared/composables/useFormatDate2'
  import { useHouseworkCalendarStore } from '@/modules/housework-calendar/store/housework-calendar'

  const { startDate, endDate, before, after } = useHouseworkCalendarStore()
  const from = computed(() => useFormatDate2(startDate))
  const to = computed(() => useFormatDate2(endDate))

</script>

<style scoped>
  .week-selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 16px;
  }
</style>
