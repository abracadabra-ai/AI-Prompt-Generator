import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/book.vue'),
  },
  // 魔法书
  {
    path: '/book',
    name: 'book',
    component: () => import('@/views/book.vue'),
  },
  // 展示案例
  {
    path: '/case',
    name: 'case',
    component: () => import('@/views/case.vue'),
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router