import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Trial from '../views/trial.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/projects',
      name: 'projects',
      component: Trial,
    },
  ],
})

export default router
