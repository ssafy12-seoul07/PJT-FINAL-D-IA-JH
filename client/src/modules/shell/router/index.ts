import { useAuthStore } from '@/modules/authentication/store/auth'
import { message } from 'ant-design-vue'
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
    meta: { requiresAuth: true },
  },
  {
    path: '/family-daily',
    name: 'FamilyDaily',
    component: () => import('@/modules/family-daily/layouts/MainView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/houseworks',
    name: 'HouseworkCalendar',
    component: () =>
      import('@/modules/housework-calendar/layouts/MainView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/modules/setting/layouts/MainView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 인증이 필요한 페이지인지 확인
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      if (!authStore.getAccessToken()) {
        // 토큰이 유효하지 않으면 로그인 페이지로 리다이렉트
        message.error(`로그인 정보가 없습니다`)
        next({
          path: '/login',
          query: { redirect: to.fullPath }, // 로그인 후 원래 가려던 페이지로 이동하기 위해
        })
      } else {
        next() // 인증됐으면 진행
      }
    } catch (error) {
      // 에러 발생시 로그인 페이지로
      console.log(error)
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    // 인증이 필요없는 페이지는 그대로 진행
    next()
  }
})

export default router
