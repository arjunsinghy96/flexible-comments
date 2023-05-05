import { createRouter, createWebHistory } from 'vue-router'
import CommentsView from '@/views/CommentsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CommentsView
    }
  ]
})

export default router
