import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/book/index.vue'),
    redirect: '/book'
  },
  // 魔法书
  {
    path: '/book',
    name: 'book',
    component: () => import('@/views/book/index.vue'),
  },
  // 展示案例
  {
    path: '/case',
    name: 'case',
    component: () => import('@/views/case/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router