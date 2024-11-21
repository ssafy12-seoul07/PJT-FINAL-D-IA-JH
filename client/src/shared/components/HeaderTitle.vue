<template>
  <h1 class="header-title">{{ title }}</h1>
</template>

<script setup lang="ts">
  import type { HeaderTitleProps } from '../interface/HeaderTitleInterface.ts'
  defineProps<HeaderTitleProps>()
</script>

<style scoped>
  .header-title {
    font-size: 16px;
    font-weight: bold;
  }
</style>
