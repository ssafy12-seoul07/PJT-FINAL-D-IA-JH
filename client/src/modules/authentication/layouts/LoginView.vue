<template>
  <div>
    <BaseHeader>
      <template #center>
        <HeaderTitle title="로그인" />
      </template>
    </BaseHeader>
    <main>
      <!-- <LogoComponent /> -->
      <LoginForm />
    </main>
  </div>
</template>

<script setup lang="ts">
  import BaseHeader from '@/shared/components/BaseHeader.vue'
  import HeaderTitle from '@/shared/components/HeaderTitle.vue'
  import LoginForm from '../components/LoginForm.vue'
  // import LogoComponent from '@/shared/components/LogoComponent.vue'
</script>

<style scoped>
  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
  }
</style>
