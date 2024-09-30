import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import CardDetails from './views/CardDetails.vue'
import LoginPage from './views/LoginPage.vue'
import SettingsPage from './views/SettingsPage.vue'

import { useAuth } from './composables/useAuth'
const { isAuthenticated } = useAuth()

const routes = [
  { path: '/homework5/', name: 'Home', component: HomePage },
  { path: '/homework5/other', name: 'Other', component: () => import('@/views/OtherPage.vue') },
  { path: '/homework5/employees/:id', name: 'CardDetails', component: CardDetails },
  { path: '/homework5/login', name: 'LoginPage', component: LoginPage },
  { path: '/homework5/settings', name: 'SettingsPage', component: SettingsPage, meta: {requiresAuth: true} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//  Navigation guard (for settings page)
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({name: 'LoginPage', query: {redirect: to.fullPath}})
  } else {
    next()
  }
}) //  Will run before actually routing pages


export default router
