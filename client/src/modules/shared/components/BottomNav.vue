<template>
  <RouterLink :to="navigationMenu.navTo">
    <font-awesome-icon :icon="navigationMenu.icon" />
    <span>
      {{ navigationMenu.navName }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue';
import type { BottomNavProps } from '../interface/navigation';
import { useRoute } from 'vue-router';

const props = defineProps<BottomNavProps>()
const route = useRoute();

const navigationMenu = ref(props);

</script>

<style scoped>
a {
  text-decoration: none;
  color: #757575;

  &:hover {
    font-weight: bold;
  }

  svg {
    font-size: 24px;
  }

  display: flex;
  flex-direction: column;

}
</style>
