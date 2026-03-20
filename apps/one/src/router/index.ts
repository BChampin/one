import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/App.vue'),
  //   children: [
  //     { path: '', name: 'index', alias: ['home'], component: () => import('@/pages/IndexPage.vue') }
  //   ],
  // },
  { path: '/', name: 'index', component: () => import('@/pages/IndexPage.vue') },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('@/pages/ErrorNotFound.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
