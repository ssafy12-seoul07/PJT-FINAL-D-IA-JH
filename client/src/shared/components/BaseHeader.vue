<template>
  <header>
    <div class="header-left">
      <slot name="left"></slot>
    </div>
    <div class="header-center">
      <slot name="center"></slot>
    </div>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 32px 12px 16px;
    width: 100%;

    .header-left,
    .header-center,
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-center {
      flex-grow: 1;
      justify-content: center;
    }
  }
</style>
