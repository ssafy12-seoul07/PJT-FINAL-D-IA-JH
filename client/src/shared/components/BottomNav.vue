<template>
  <RouterLink :to="navigationMenu.navTo" :style="color">
    <font-awesome-icon :icon="navigationMenu.icon" />
    <span>
      {{ navigationMenu.navName }}
    </span>
    <div :style="barColor" />
  </RouterLink>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { computed, ref, watch } from 'vue'
  import type { BottomNavProps } from '../interface/NavigationInterface'
  import { useRoute } from 'vue-router'

  const navigationMenu = defineProps<BottomNavProps>()
  const route = useRoute()
  const isActive = ref(false)

  watch(
    () => route.path,
    (newPath) => {
      if (newPath.includes(navigationMenu.navTo)) {
        isActive.value = true
      } else {
        isActive.value = false
      }
    }
  )

  const color = computed(() => ({
    color: isActive.value ? navigationMenu.activeColor : '#757575',
  }))

  const barColor = computed(() => ({
    'background-color': isActive.value ? navigationMenu.activeColor : 'inherit',
  }))
</script>

<style scoped>
  a {
    text-decoration: none;
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
      background-color: white;
      transition: 0.1s ease-in-out;
    }

    svg {
      font-size: 24px;
      margin-bottom: 4px;
    }

    span {
      white-space: nowrap;
      font-size: 12px;
    }

    > div {
      position: absolute;
      width: inherit;
      height: 4px;
      left: 0;
      top: 0;
    }
  }
</style>
