<template>
  <div>
    <BaseHeader>
      <template #center>
        <HeaderTitle title="회원가입" />
      </template>
    </BaseHeader>
    <main>
      <!-- <LogoComponent /> -->
      <RegisterForm />
    </main>
  </div>
</template>

<script setup lang="ts">
  import BaseHeader from '@/shared/components/BaseHeader.vue'
  import HeaderTitle from '@/shared/components/HeaderTitle.vue'
  import RegisterForm from '../components/RegisterForm.vue'
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
