import { createRouter, createWebHistory } from 'vue-router'

function loadModulesRoutes () {
  const modules = import.meta.glob('../modules/*/routes.ts', { eager: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modulesRoutes = Object.values(modules).flatMap((mod: any) => mod.default || [])
  return modulesRoutes
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/oauth/callback',
      name: 'oauthCallback',
      component: () => import('../views/OauthView.vue'),
    },
    // Public product related routes
    // Docs routes
    // App-modules routes
    // WARNING : all modules' routes should be loaded as children of this element
    // https://router.vuejs.org/guide/advanced/dynamic-routing#Adding-nested-routes
    {
      name: 'app',
      path: '/app/',
      component: () => import('../views/AppView.vue'),
      children: loadModulesRoutes()
    }
  ],
})

export default router
