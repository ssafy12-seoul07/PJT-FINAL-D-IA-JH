<template>
  <div class="week-selector">
    <button
      @click.prevent="before"
    >GO BEFORE
    </button>
    <div>
      <span>{{ useFormatDate2(startDate) }}</span> ~ <span>{{ useFormatDate2(endDate) }}</span>
    </div>
    <button
      @click.prevent="after"
    >GO AFTER
    </button>
  </div>

</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useCurrentWeekStore } from '@/modules/housework-calendar/store/current-week'
  import useFormatDate2 from '../../../shared/composables/useFormatDate2'

  const {getCurrentWeek, before, after} = useCurrentWeekStore();
  const currentWeek = getCurrentWeek();
  const startDate = computed(() => useFormatDate2(currentWeek.startDate));
  const endDate = computed(() => useFormatDate2(currentWeek.endDate));
</script>

<style scoped>
  .week-selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10%;
  }
</style>
