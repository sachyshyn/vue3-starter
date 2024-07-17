import { createRouter, createWebHistory } from 'vue-router'

export function createRouterProvider() {
  return createRouter({
    history: createWebHistory(),
    routes: []
  })
}
