<template>
  <div>
    <BaseHeader>
      <template #left>
        <HeaderActionButton icon="chevron-left" @on-click="navigateToBack" />
        <HeaderTitle title="나의 하루" />
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
  const navigateToBack = () => {
    router.back()
  }
</script>

<style scoped></style>
