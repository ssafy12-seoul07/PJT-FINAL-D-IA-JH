<template>
  <div>
    <BaseHeader>
      <template #left>
        <HeaderActionButton icon="broom" />
        <HeaderTitle title="집안일" />
      </template>
      <template #right>
        <HeaderActionButton
          icon="plus"
          action="addHouseWork"
          @on-click="handleAction('open')"
        />
        <HeaderActionButton
          icon="gear"
          action="setting"
          @on-click="handleAction"
        />
      </template>
    </BaseHeader>
    <WeekSelector />
    <WeekCalendar />
    <BottomNavBar />
    <BottomSheet v-if="mode === 'open'" @on-close="handleAction" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'

  import BaseHeader from '@/shared/components/BaseHeader.vue'
  import BottomNavBar from '@/shared/components/BottomNavBar.vue'
  import BottomSheet from '@/shared/components/BottomSheet.vue'
  import HeaderActionButton from '@/shared/components/HeaderActionButton.vue'
  import HeaderTitle from '@/shared/components/HeaderTitle.vue'

  import WeekSelector from '@/modules/housework-calendar/components/WeekSelector.vue'
  import WeekCalendar from '@/modules/housework-calendar/components/WeekCalendar.vue'
  import { useHouseworkCalendarStore } from '@/modules/housework-calendar/store/housework-calendar'

  const router = useRouter()
  const handleAction = (action: string) => {
    switch (action) {
      case 'setting':
        router.push({ name: 'Setting' })
        break
      case 'open':
        mode.value = 'open'
        break
      case 'close':
        mode.value = 'close'
        break
    }
  }

  const mode = ref<'open' | 'close'>('close')

  const { getHouseworks } = useHouseworkCalendarStore()

  onMounted(async () => await getHouseworks())
</script>

<style scoped></style>
