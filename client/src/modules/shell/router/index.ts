import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'Main',
  //   component: () => import('@/modules/shell/layouts/MainView.vue'),
  // },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import('@/modules/authentication/layouts/RegisterView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/authentication/layouts/LoginView.vue'),
  },
  {
    path: '/my-daily',
    name: 'MyDaily',
    component: () => import('@/modules/my-daily/layouts/MainView.vue'),
  },
  {
    path: '/family-daily',
    name: 'FamilyDaily',
    component: () => import('@/modules/family-daily/layouts/MainView.vue'),
  },
  {
    path: '/houseworks',
    name: 'HouseworkCalendar',
    component: () =>
      import('@/modules/housework-calendar/layouts/MainView.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/modules/setting/layouts/MainView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
