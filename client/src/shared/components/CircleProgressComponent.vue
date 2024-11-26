<template>
  <div class="circle-progress-wrapper" :style="wrapperStyle">
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 36 36"
      class="circular-progress"
    >
      <!-- Background Circle -->
      <circle
        cx="18"
        cy="18"
        r="16"
        :fill="backgroundColor"
        stroke="transparent"
      />

      <!-- Progress Circle -->
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="transparent"
        :stroke="color"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-width="3"
        class="progress-circle"
        :class="{ active }"
      />

      <!-- Text in the center -->
      <text
        x="18"
        y="18"
        text-anchor="middle"
        dominant-baseline="middle"
        :fill="color"
        class="progress-text"
      >
        {{ text }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import type { CircleProgressInterface } from '../interface/CircleProgressInterface'

  const props = defineProps<CircleProgressInterface>()

  const circumference = computed(() => 2 * Math.PI * 16)
  const initialDashOffset = ref(circumference.value)
  const dashOffset = computed(
    () => circumference.value * (1 - props.progress / 100)
  )

  const wrapperStyle = computed(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
    top: `${props?.top}px`,
    left: `${props?.left}px`,
  }))

  onMounted(() => {
    // 약간의 지연 후 애니메이션 시작
    setTimeout(() => {
      initialDashOffset.value = dashOffset.value
    }, 100)
  })
</script>

<style scoped>
  .circle-progress-wrapper {
    position: absolute;
  }

  .circular-progress {
    transform: rotate(-90deg);
  }

  .progress-circle {
    transition: all 1s ease-out;
    stroke-dashoffset: v-bind(initialDashOffset);
  }

  .progress-circle.active {
    animation: pulse 2s infinite;
  }

  .progress-text {
    transform: rotate(90deg);
    font-size: 8px;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
