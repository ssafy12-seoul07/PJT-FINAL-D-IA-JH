<template>
  <button
    @click.prevent="handleClick"
    class="header-action-button"
    :class="{ 'no-action': !props.action }"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script setup lang="ts">
  import type { HeaderActionButtonProps } from '@/shared/interface/HeaderActionButtonInterface.ts'
  const props = defineProps<HeaderActionButtonProps>()

  const emit = defineEmits(['on-click'])

  function handleClick() {
    emit('on-click', props.action)
  }
</script>

<style scoped>
  .header-action-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    &:hover {
      background-color: white;
      filter: brightness(90%);
    }
  }

  .header-action-button.no-action {
    cursor: default;
    background: none;
    filter: none;
  }

  .header-action-button svg {
    width: 16px;
    height: 16px;
  }

  .fa-gear:hover {
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
