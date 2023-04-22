import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/main/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/favorite',
      name: 'favorite',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/favorites/FavoritesPage.vue')
    }
  ]
})

export default router
