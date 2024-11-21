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
          @on-click="handleAction"
        />
        <HeaderActionButton
          icon="gear"
          action="setting"
          @on-click="handleAction"
        />
      </template>
    </BaseHeader>
    <h1>houseworks</h1>
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
      case 'setting':
        router.push({ name: 'Setting' })
        break
      case 'addHouseWork':
        console.log('addHouseWork')
        break
    }
  }
</script>

<style scoped></style>
