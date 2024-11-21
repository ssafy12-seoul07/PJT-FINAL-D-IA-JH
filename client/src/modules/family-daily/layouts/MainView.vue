<template>
  <div>
    <BaseHeader>
      <template #left>
        <HeaderActionButton icon="people-roof" />
        <HeaderTitle title="가족의 하루" />
      </template>
      <template #right>
        <HeaderActionButton
          icon="gear"
          action="setting"
          @on-click="handleAction"
        />
      </template>
    </BaseHeader>
    <h1>family-daily</h1>
    <BottomNavBar />
  </div>
</template>

<script setup lang="ts">
  import BaseHeader from '@/shared/components/BaseHeader.vue'
import BottomNavBar from '@/shared/components/BottomNavBar.vue';
  import HeaderActionButton from '@/shared/components/HeaderActionButton.vue'
  import HeaderTitle from '@/shared/components/HeaderTitle.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const handleAction = (action: string) => {
    switch (action) {
      case 'back':
        router.back()
        break
      case 'setting':
        router.push({ name: 'Setting' })
    }
  }
</script>

<style scoped></style>
