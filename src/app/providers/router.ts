import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

export function createRouterProvider(app: App<Element>) {
  const router = createRouter({
    history: createWebHistory(),
    routes: []
  })

  app.use(router)

  return app
}
