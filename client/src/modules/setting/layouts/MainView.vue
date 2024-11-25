<template>
  <div>
    <BaseHeader>
      <template #left>
        <HeaderActionButton
          icon="chevron-left"
          action="back"
          @on-click="handleAction"
        />
        <HeaderTitle title="설정" />
      </template>
    </BaseHeader>
    <h1>my-daily</h1>
  </div>
</template>

<script setup lang="ts">
  import BaseHeader from '@/shared/components/BaseHeader.vue'
  import HeaderActionButton from '@/shared/components/HeaderActionButton.vue'
  import HeaderTitle from '@/shared/components/HeaderTitle.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const handleAction = (action: string) => {
    switch (action) {
      case 'back':
        router.back()
        break
    }
  }
</script>

<style scoped></style>
