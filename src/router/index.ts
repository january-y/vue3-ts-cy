import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/notFound/NotFound.vue'),
    },
  ],
})

// 路由守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache('token')
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router
