<template>
  <div />
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue'
  import { onMounted } from 'vue'

  onMounted(() => {
    // 전역 메시지 설정
    message.config({
      top: '20vh', // 상단에서 20% 위치에 고정
      duration: 2, // 기본 지속시간 2초
      maxCount: 3, // 동시에 표시될 수 있는 최대 메시지 수
    })
  })
</script>

<style>
  /* 스타일을 scoped로 하지 않아 전역적으로 적용 */
  .ant-message {
    top: 20vh !important;
  }
</style>
