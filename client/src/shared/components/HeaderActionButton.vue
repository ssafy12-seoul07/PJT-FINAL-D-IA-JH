<template>
  <button @click.prevent="handleClick" class="header-action-button">
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script setup lang="ts">
  import type { HeaderActionButtonProps } from '../interface/HeaderActionButtonInterface'
  defineProps<HeaderActionButtonProps>()

  const emit = defineEmits(['on-click'])

  function handleClick() {
    emit('on-click')
  }
</script>

<style scoped>
  .header-action-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .header-action-button svg {
    width: 16px;
    height: 16px;
  }
</style>
